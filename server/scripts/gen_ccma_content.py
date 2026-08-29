#!/usr/bin/env python3
"""Generate NHA CCMA exam content (theory + MCQs) for ccmapractice — EN only, status APPROVED.
Usage: python3 gen_ccma_content.py <EXAM_CODE> [--chapters "1:120,2:65,..."] [--questions-per-chapter 150]
Original content only — NHA/OSHA/HIPAA/CDC guidelines are public standards (no verbatim copyrighted text).
"""
import json, os, re, sys, time, urllib.request, subprocess

ROOT = "/home/chuck/projects/ccmapractice"
ENV_PATH = os.path.join(ROOT, "server/.env")

def load_env(path):
    env = {}
    for line in open(path):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env

env = load_env(ENV_PATH)
API_KEY = env.get("OPENAI_API_KEY")
DB_URL = env.get("DATABASE_URL")
API_URL = (env.get("OPENAI_BASE_URL") or "https://api.deepseek.com").rstrip("/") + "/chat/completions"

def call(prompt, model, max_tokens=10000, temperature=0.5):
    body = json.dumps({
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": temperature,
        "max_tokens": max_tokens,
    }).encode()
    req = urllib.request.Request(API_URL, data=body, headers={
        "Content-Type": "application/json", "Authorization": "Bearer " + API_KEY})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=600) as r:
                resp = json.loads(r.read().decode())
            return resp["choices"][0]["message"]["content"].strip()
        except Exception as e:
            print(f"    (essai {attempt+1}: {str(e)[:120]})", flush=True)
            time.sleep(10)
    return None

def psql(sql):
    r = subprocess.run(["psql", DB_URL, "-t", "-A", "-c", sql], capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        raise RuntimeError(r.stderr[:300])
    return r.stdout.strip()

# ---------- NHA CCMA prompts ----------
THEORY_PROMPT = """You are an NHA (National Healthcareer Association) CCMA exam preparation expert, based on the official NHA CCMA exam blueprint ({ref}).

Write a complete, original study chapter in English (US) titled "{chapter}" for the Certified Clinical Medical Assistant exam. The exam tests clinical and administrative medical assistant knowledge; it is CLOSED BOOK — candidates must know the material.

Requirements:
- Pure theory / reference content (NOT questions-and-answers). Textbook-style.
- Structure: learning objectives first, then sections (## 1.1, 1.2...) with clear headings.
- Cover the key concepts, procedures, protocols, and definitions candidates must know for THIS chapter's content area, aligned with the NHA CCMA test plan weights.
- Reference the relevant US guidelines by NAME only (OSHA Bloodborne Pathogens Standard, HIPAA Privacy Rule, CDC Standard Precautions, AHA CPR guidelines, CLIA waived testing, CDC immunization schedule) — never reproduce them verbatim.
- Include a "Common Exam Traps" section: the classic wrong answers and why students pick them (e.g. confusing order-of-draw, mixing HIPAA/consent rules, wrong vital sign ranges).
- Use original wording. Plain text markdown. No SVG. No LaTeX (use Unicode: ×, ≤, ≥, °).
- Length: 1500-2200 words.
"""

QUESTIONS_PROMPT = """You are an NHA (National Healthcareer Association) CCMA exam preparation expert for the {cert} certification ({code}, {ref}).

Generate exactly {N} original multiple-choice practice questions for the chapter "{chapter}". The CCMA exam is CLOSED BOOK and tests clinical knowledge, procedures, and guidelines.

Rules:
- Each question must be realistic exam-style: clinical scenarios ("A patient presents with...", "Which of the following is the correct order of draw..."), procedures (vital signs, injections, phlebotomy, EKG, specimen handling), medical terminology, admin tasks, communication, law/ethics.
- Factual accuracy is critical. Use standard values: normal vital sign ranges (adult temp 97.8-99.1°F/36.5-37.3°C, pulse 60-100, respirations 12-20, BP <120/80, SpO2 95-100%), order of draw (light blue, red, SST, green, lavender, gray), 5 rights of medication administration, standard precautions.
- 4 options labeled a), b), c), d). Exactly ONE correct. Distractors must be plausible (wrong values, wrong order, common mistakes).
- Explanation: 1-3 sentences citing the guideline/policy (e.g. "OSHA Bloodborne Pathogens Standard requires...", "per CDC standard precautions...") and why the answer is correct.
- Output ONLY a JSON array, no markdown fences, no extra text:
[{{"question":"...","options":["...","...","...","..."],"answer":"a","explanation":"...","difficulty":"EASY|MEDIUM|HARD"}}]
- difficulty distribution: roughly 25% EASY, 55% MEDIUM, 20% HARD.
"""

def gen_theory(exam, chapter):
    prompt = THEORY_PROMPT.format(cert=exam["name"], code=exam["code"], ref=exam["ref"], chapter=chapter["name"])
    return call(prompt, "deepseek-chat", max_tokens=8000, temperature=0.4)

def extract_json_array(text):
    m = re.search(r"\[.*\]", text, re.S)
    if not m: return None
    try:
        return json.loads(m.group(0))
    except Exception:
        return None

def gen_questions_batch(exam, chapter, n):
    prompt = QUESTIONS_PROMPT.format(cert=exam["name"], code=exam["code"], ref=exam["ref"], chapter=chapter["name"], N=n)
    out = call(prompt, "deepseek-chat", max_tokens=12000, temperature=0.8)
    if not out: return []
    return extract_json_array(out) or []

def main():
    exam_code = sys.argv[1] if len(sys.argv) > 1 else "CCMA"
    chapters_arg = sys.argv[2] if len(sys.argv) > 2 else "all"
    per_chapter_default = int(sys.argv[3]) if len(sys.argv) > 3 else 150

    # mapping per chapter: "1:120,2:65" ou "all" (per_chapter par défaut) ou "1,2,3"
    mapping = {}
    if ":" in chapters_arg:
        for part in chapters_arg.split(","):
            num, cnt = part.split(":")
            mapping[int(num)] = int(cnt)
        chapter_list = sorted(mapping.keys())
    elif chapters_arg == "all":
        chapter_list = None
    else:
        chapter_list = [int(x) for x in chapters_arg.split(",")]

    row = psql(f"SELECT id, name FROM exams WHERE code='{exam_code}' AND is_active=TRUE")
    if not row:
        print(f"EXAM NOT FOUND: {exam_code}"); return
    exam_id, exam_name = row.split("|")

    REF = {"CCMA": "NHA CCMA test plan (150 scored + 30 pretest, 390/500)"}
    exam = {"code": exam_code, "name": exam_name, "ref": REF.get(exam_code, "NHA CCMA test plan")}

    ch_rows = psql(f"SELECT id, number, name FROM chapters WHERE exam_id='{exam_id}' ORDER BY number").splitlines()
    chapters = [dict(zip(("id", "number", "name"), r.split("|", 2))) for r in ch_rows]

    for ch in chapters:
        num = int(ch["number"])
        if chapter_list is not None and num not in chapter_list:
            continue
        per_chapter = mapping.get(num, per_chapter_default)
        print(f"=== {exam_code} ch{num}: {ch['name']} (target {per_chapter} Q) ===", flush=True)

        has_theory = psql(f"SELECT (theory_content IS NOT NULL AND theory_content != '') FROM chapters WHERE id='{ch['id']}'")
        if has_theory == "t":
            print("  theory: SKIP (exists)", flush=True)
        else:
            print("  theory: generating...", flush=True)
            theory = gen_theory(exam, ch)
            if theory:
                esc = theory.replace("'", "''")
                psql(f"UPDATE chapters SET theory_content='{esc}' WHERE id='{ch['id']}'")
                print(f"  theory: OK ({len(theory)} chars)", flush=True)
            else:
                print("  theory: FAILED", flush=True)

        qcount = int(psql(f"SELECT count(*) FROM questions WHERE chapter_id='{ch['id']}'"))
        print(f"  questions: {qcount} existing, target {per_chapter}", flush=True)
        if qcount >= per_chapter:
            print("  questions: SKIP", flush=True)
            continue

        all_q = []
        while len(all_q) < per_chapter:
            batch = gen_questions_batch(exam, ch, 25)
            for q in batch:
                if not all(k in q for k in ("question", "options", "answer", "explanation")): continue
                if not isinstance(q["options"], list) or len(q["options"]) != 4: continue
                if q["answer"] not in "abcd": continue
                diff = q.get("difficulty", "MEDIUM")
                if diff not in ("EASY", "MEDIUM", "HARD"): diff = "MEDIUM"
                q["difficulty"] = diff
                all_q.append(q)
            print(f"    +{len(batch)} -> {len(all_q)}/{per_chapter}", flush=True)

        for q in all_q[:per_chapter]:
            try:
                question = q["question"].replace("'", "''")
                opts = q["options"]
                opts_sql = "ARRAY[" + ",".join("'" + o.replace("'", "''") + "'" for o in opts) + "]"
                ans = q["answer"][0]
                expl = (q.get("explanation") or "").replace("'", "''")
                diff = q["difficulty"]
                psql(f"INSERT INTO questions (id, exam_id, chapter_id, type, difficulty, question, options, correct_answer, explanation, status, ai_source) VALUES (gen_random_uuid()::text, '{exam_id}','{ch['id']}','MCQ','{diff}','{question}',{opts_sql},'{ans}','{expl}','APPROVED','ccma-gen-v1')")
            except Exception as e:
                print(f"    insert skip: {str(e)[:100]}", flush=True)
        print(f"  questions: inserted {min(len(all_q), per_chapter)}", flush=True)
        time.sleep(1)

    print(f"DONE {exam_code}")

if __name__ == "__main__":
    main()
