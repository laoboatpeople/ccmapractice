#!/usr/bin/env python3
"""Fetch realistic medical images (Wikimedia/CDC/OpenStax) for CCMA theory chapters.
Usage: python3 fetch_medical_images.py [chapter_number|all]
- Downloads via Wikimedia API (800px thumb), verifies license (PD/CC0/CC-BY/CC-BY-SA accepted)
- Saves to client/public/images/theory/<ch>/<slug>.jpg
- Injects ![desc](/images/theory/<ch>/<slug>.jpg) into theory_content (idempotent)
"""
import json, os, re, sys, time, urllib.request, urllib.parse, subprocess

ROOT = "/home/chuck/projects/ccmapractice"
ENV_PATH = os.path.join(ROOT, "server/.env")
IMG_DIR = os.path.join(ROOT, "client/public/images/theory")

def load_env(path):
    env = {}
    for line in open(path):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env

env = load_env(ENV_PATH)
DB_URL = env.get("DATABASE_URL")

def psql(sql):
    r = subprocess.run(["psql", DB_URL, "-t", "-A", "-c", sql], capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        raise RuntimeError(r.stderr[:300])
    return r.stdout.strip()

# Chapters → list of (search keyword, caption)
IMAGES = {
    1: [
        ("animal cell structure diagram", "Animal cell structure"),
        ("diagram of the major organs human body", "Major organs of the human body"),
    ],
    2: [
        ("cardiovascular system diagram", "Cardiovascular system"),
        ("respiratory system diagram", "Respiratory system"),
        ("digestive system diagram", "Digestive system"),
    ],
    3: [
        ("sphygmomanometer blood pressure", "Blood pressure measurement"),
        ("stethoscope", "Stethoscope"),
        ("pulse oximeter", "Pulse oximeter"),
    ],
    4: [
        ("hospital patient bed position", "Patient positioning"),
    ],
    5: [
        ("intramuscular injection deltoid", "Intramuscular injection sites"),
    ],
    6: [
        ("hand washing hygiene steps", "Hand hygiene"),
        ("personal protective equipment", "Personal protective equipment"),
    ],
    7: [
        ("glucometer blood glucose meter", "Blood glucose testing"),
    ],
    8: [
        ("drawing blood venipuncture phlebotomy", "Venipuncture procedure"),
        ("vacutainer blood collection tubes", "Blood collection tubes"),
    ],
    9: [
        ("ekg electrocardiogram setup", "EKG setup and waveform"),
        ("precordial leads ecg", "Precordial lead placement"),
    ],
    10: [
        ("patient education nurse", "Patient education"),
    ],
    11: [
        ("electronic health record computer", "Electronic health record"),
    ],
    12: [
        ("doctor patient communication", "Therapeutic communication"),
    ],
    13: [
        ("hipaa privacy", "HIPAA privacy"),
    ],
}

ACCEPTED_LICENSES = ["public domain", "cc0", "cc by", "cc by-sa"]

def api_search(keyword):
    q = urllib.parse.urlencode({
        "action": "query", "list": "search", "srsearch": f"filetype:bitmap {keyword}",
        "srnamespace": "6", "srlimit": "3", "format": "json"})
    req = urllib.request.Request(f"https://commons.wikimedia.org/w/api.php?{q}",
                                 headers={"User-Agent": "ccmapractice-bot/1.0 (exam prep; contact info@ccmapractice.com)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())

def api_file(file_title):
    q = urllib.parse.urlencode({
        "action": "query", "titles": f"File:{file_title}",
        "prop": "imageinfo", "iiprop": "url|extmetadata", "iiurlwidth": "800",
        "format": "json"})
    req = urllib.request.Request(f"https://commons.wikimedia.org/w/api.php?{q}",
                                 headers={"User-Agent": "ccmapractice-bot/1.0 (exam prep; contact info@ccmapractice.com)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())

def find_image(keyword):
    try:
        d = api_search(keyword)
        for hit in d.get("query", {}).get("search", []):
            title = hit.get("title", "")  # "File:..."
            fd = api_file(title.split(":", 1)[-1])
            for pid, page in fd.get("query", {}).get("pages", {}).items():
                ii = page.get("imageinfo", [{}])[0]
                thumb = ii.get("thumburl") or ii.get("url")
                em = ii.get("extmetadata", {})
                lic = (em.get("LicenseShortName", {}).get("value", "") or "").lower()
                if not thumb: continue
                if not any(a in lic for a in ACCEPTED_LICENSES): continue
                return thumb, lic
    except Exception as e:
        print(f"    search error: {str(e)[:80]}")
    return None, ""

def download(url, path):
    req = urllib.request.Request(url, headers={
        "User-Agent": "ccmapractice-bot/1.0 (exam prep; contact info@ccmapractice.com)"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    with open(path, "wb") as f:
        f.write(data)
    return len(data)

def slugify(name):
    base = os.path.splitext(name)[0].lower()
    base = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    return base[:60] or "image"

def main():
    which = sys.argv[1] if len(sys.argv) > 1 else "all"
    # Get chapters from DB
    rows = psql("SELECT id, number, name FROM chapters WHERE exam_id=(SELECT id FROM exams WHERE code='CCMA' AND is_active=TRUE) ORDER BY number").splitlines()
    chapters = [dict(zip(("id", "number", "name"), r.split("|", 2))) for r in rows]

    for ch in chapters:
        num = int(ch["number"])
        if which != "all" and num != int(which):
            continue
        wanted = IMAGES.get(num, [])
        if not wanted:
            print(f"ch{num}: no images mapped, SKIP")
            continue
        ch_dir = os.path.join(IMG_DIR, str(num))
        os.makedirs(ch_dir, exist_ok=True)

        # existing theory (to append)
        theory = psql(f"SELECT theory_content FROM chapters WHERE id='{ch['id']}'") or ""
        added = 0
        for file_name, caption in wanted:
            thumb, lic = find_image(file_name)
            if not thumb:
                print(f"  ch{num}: no image found for '{file_name}'")
                continue
            slug = slugify(file_name)
            ext = ".png" if ".png" in thumb else ".jpg"
            path = os.path.join(ch_dir, slug + ext)
            if not os.path.exists(path):
                try:
                    download(thumb, path)
                except Exception as e:
                    print(f"  ch{num}: download failed {file_name}: {str(e)[:80]}")
                    continue
            rel = f"/images/theory/{num}/{slug}{ext}"
            marker = f"![{caption}]({rel})"
            if marker in theory:
                print(f"  ch{num}: {slug} already injected")
                continue
            # append image block at end of theory
            block = f"\n\n### {caption}\n\n{marker}"
            esc = block.replace("'", "''")
            psql(f"UPDATE chapters SET theory_content = theory_content || '{esc}' WHERE id='{ch['id']}'")
            theory += block
            added += 1
            print(f"  ch{num}: + {rel} ({lic})")
            time.sleep(0.3)
        print(f"ch{num}: {added} images added")
        time.sleep(0.5)

if __name__ == "__main__":
    main()
