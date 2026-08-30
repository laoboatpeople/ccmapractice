#!/usr/bin/env python3
"""Inject 5 curated diagrams (OpenStax CC-BY + Wikimedia) into CCMA theory chapters."""
import os, subprocess, urllib.request, re, sys, time

DB = None
for line in open(os.path.join(os.path.dirname(__file__), "..", ".env")):
    if line.startswith("DATABASE_URL="):
        DB = line.strip().split("=", 1)[1].strip()
        break
if not DB:
    sys.exit("DATABASE_URL not found")

IMG_DIR = "/home/chuck/projects/ccmapractice/client/public/images/theory"
UA = {"User-Agent": "ccmapractice-bot/1.0 (exam prep; contact info@ccmapractice.com)"}

def psql(sql):
    r = subprocess.run(["psql", DB, "-t", "-A", "-c", sql], capture_output=True, text=True)
    if r.returncode != 0:
        print("PSQL ERR:", r.stderr[:200])
    return r.stdout

def download(url, path):
    if os.path.exists(path) and os.path.getsize(path) > 5000:
        return True
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    with open(path, "wb") as f:
        f.write(data)
    return len(data) > 5000

# (chapter, source_url, local_filename, caption)
IMAGES = [
    (4,  "https://upload.wikimedia.org/wikipedia/commons/a/a4/Gait_Belt.jpg",
         "gait-belt-assist.jpg", "Assisted ambulation with a gait belt"),
    (5,  "https://upload.wikimedia.org/wikipedia/commons/a/a1/Subcutaneous_injection.png",
         "subcutaneous-injection-abdomen.png", "Subcutaneous injection into the abdomen"),
    (5,  "https://upload.wikimedia.org/wikipedia/commons/9/99/Injection_Subcutaneous_Correct_Angles.png",
         "subcutaneous-injection-correct-angles.png", "Correct angles for subcutaneous injection (45\u00b0)"),
    (9,  "https://raw.githubusercontent.com/openstax/osbooks-anatomy-physiology/main/media/2021_ECG_Placement_of_Electrodes.jpg",
         "ecg-lead-placement-12-lead.jpg", "Standard 12-lead ECG electrode placement"),
    (9,  "https://raw.githubusercontent.com/openstax/osbooks-anatomy-physiology/main/media/2022_Electrocardiogram.jpg",
         "ecg-waveform-pqrst.jpg", "ECG waveform: P-QRS-T waves, intervals and segments"),
]

for num, url, fname, caption in IMAGES:
    ch_dir = os.path.join(IMG_DIR, str(num))
    os.makedirs(ch_dir, exist_ok=True)
    path = os.path.join(ch_dir, fname)
    if not download(url, path):
        print(f"ch{num}: DOWNLOAD FAILED {fname}")
        continue
    row = psql(f"SELECT id FROM chapters WHERE exam_id=(SELECT id FROM exams WHERE code='CCMA' AND is_active=TRUE) AND number={num} ORDER BY number LIMIT 1").strip()
    if not row:
        print(f"ch{num}: chapter not found")
        continue
    chid = row.split("|")[0]
    rel = f"/images/theory/{num}/{fname}"
    marker = f"![{caption}]({rel})"
    theory = psql(f"SELECT theory_content FROM chapters WHERE id='{chid}'")
    if marker in theory:
        print(f"ch{num}: {fname} already injected")
        continue
    block = f"\n\n### {caption}\n\n{marker}"
    esc = block.replace("'", "''")
    psql(f"UPDATE chapters SET theory_content = theory_content || '{esc}' WHERE id='{chid}'")
    print(f"ch{num}: + {rel}")
    time.sleep(0.3)

print("DONE")
