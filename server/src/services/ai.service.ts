import OpenAI from 'openai';
import { z } from 'zod';
import { prisma } from '../config/database';
import { env } from '../config/env';

// ─── Types ─────────────────────────────────────────────────────

export type QType = 'MCQ' | 'TRUEFALSE' | 'WRITTEN';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

interface GenerateOptions {
  examId: string;
  chapterId: string;
  type: QType;
  difficulty: Difficulty;
  count: number;
}

// ─── OpenAI client ─────────────────────────────────────────────

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY, baseURL: env.OPENAI_BASE_URL });

// ─── Output schemas (Zod) ─────────────────────────────────────

const mcqSchema = z.object({
  question: z.string().min(20),
  options: z.array(z.string().min(2)).length(4),
  correctAnswer: z.string().min(1),
  explanation: z.string().min(40),
}).superRefine((q, ctx) => {
  // correctAnswer must match an option text exactly.
  if (!q.options.includes(q.correctAnswer)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'correctAnswer must match one option text exactly',
      path: ['correctAnswer'],
    });
  }
});

const trueFalseSchema = z.object({
  question: z.string(),
  correctAnswer: z.enum(['TRUE', 'FALSE']),
  explanation: z.string(),
});

const writtenSchema = z.object({
  question: z.string(),
  correctAnswer: z.string(),
  explanation: z.string(),
});

// ─── Quality guards ─────────────────────────────────────────────

function hasGenericPlaceholderOptions(options: string[]): boolean {
  const normalized = options.map((o) => o.trim().toUpperCase());
  const placeholders = new Set(['A', 'B', 'C', 'D', 'OPTION A', 'OPTION B', 'OPTION C', 'OPTION D']);
  return normalized.every((o) => placeholders.has(o));
}

function looksMemorizationOnly(question: string): boolean {
  const q = question.toLowerCase();
  return (
    q.startsWith('what does ') ||
    q.startsWith('define ') ||
    q.startsWith('which of the following is the definition')
  );
}

function hasScenarioSignal(question: string): boolean {
  const q = question.toLowerCase();
  const signals = [
    'during', 'after', 'while', 'patient', 'presents', 'vital', 'temperature',
    'pulse', 'respiration', 'blood', 'pressure', 'spo2', 'heart rate', 'medication',
    'administer', 'venipuncture', 'phlebotomy', 'tube', 'specimen', 'urine',
    'glucose', 'ekg', 'ecg', 'electrocardiogram', 'injection', 'wound', 'dressing',
    'ppe', 'sterile', 'hipaa', 'consent', 'insurance', 'appointment', 'chart',
    'documentation', 'precautions', 'sanitize', 'autoclave'
  ];
  return signals.some((s) => q.includes(s));
}

function passesQualityGuards(item: Record<string, unknown>, type: QType): boolean {
  if (type !== 'MCQ') return true;

  const question = String(item.question ?? '').trim();
  const explanation = String(item.explanation ?? '').trim();
  const options = Array.isArray(item.options) ? item.options.map((x) => String(x)) : [];
  const correct = String(item.correctAnswer ?? '').trim();

  if (!question || !explanation || options.length !== 4 || !correct) return false;
  if (hasGenericPlaceholderOptions(options)) return false;
  if (!options.includes(correct)) return false;
  if (looksMemorizationOnly(question)) return false;
  if (!hasScenarioSignal(question)) return false;

  const hasGuidelineSignal = /\b(OSHA|HIPAA|CDC|AHA|CLIA)\b|Standard Precautions|Bloodborne Pathogens|waived testing/i.test(explanation);
  if (!hasGuidelineSignal) return false;

  return true;
}


// ─── Prompt builders ───────────────────────────────────────────

function buildSystemPrompt(type: QType, difficulty: Difficulty): string {
  const mcqRules = `
CRITICAL — MCQ FORMAT: You MUST return a JSON ARRAY where each element is:
{
  "question": "string",
  "options": ["real option 1", "real option 2", "real option 3", "real option 4"],
  "correctAnswer": "exact text of one option",
  "explanation": "detailed explanation citing a US healthcare guideline (OSHA, HIPAA, CDC, AHA, CLIA)"
}
Rules:
- MUST return a JSON ARRAY (not an object, not wrapped in { questions: [] })
- options MUST be exactly 4 plausible full-text distractors
- NEVER use placeholder options like "A", "B", "C", "D"
- correctAnswer MUST match one option text exactly
- explanation MUST be non-empty, practical, and include at least one US guideline reference cue (e.g., OSHA Bloodborne Pathogens Standard, HIPAA Privacy Rule, CDC Standard Precautions, AHA CPR guidelines, CLIA waived testing requirements)
- Every question MUST be scenario-based (clinical/patient care context), not memorization-only
- Return ONLY the array — no markdown, no preamble, no commentary.`;

  const base = `You are an NHA CCMA (Certified Clinical Medical Assistant) examination generator AI.

Your goal is to generate extremely realistic NHA CCMA certification exam questions based on the official NHA CCMA exam blueprint and current US healthcare guidelines: the OSHA Bloodborne Pathogens Standard, the HIPAA Privacy Rule, CDC Standard Precautions, AHA CPR guidelines, and CLIA waived testing requirements.

IMPORTANT:
The questions must simulate REAL NHA CCMA exam logic and philosophy, not generic textbook quizzes.

The exam style MUST prioritize:

* scenario-based reasoning
* clinical judgment
* patient care decision making
* “best answer” logic
* practical application
* real medical office and clinical environments
* patient intake situations
* clinical findings
* vital sign interpretation
* infection control judgment
* human factors
* guideline exceptions
* minimum safety requirements
* patient safety implications

The questions must test UNDERSTANDING, not memorization.

==================================================
EXAM STYLE REQUIREMENTS
=======================

Generate questions similar to real NHA CCMA certification exams:

* Multiple choice
* 4 answer choices
* One best answer
* Distractors must be plausible
* Questions should often contain:

  * clinical patient scenarios ("A patient presents with...")
  * medical assistant daily tasks
  * abnormal vital sign findings
  * medication administration situations
  * phlebotomy and specimen handling situations
  * EKG lead placement and tracing situations
  * infection control situations
  * patient education situations
  * administrative and front-office situations

Questions should frequently require:

* applying OSHA, HIPAA, CDC, AHA, and CLIA guidelines
* determining the correct clinical action
* identifying the correct procedure steps
* determining correct documentation
* identifying the appropriate tube or draw order
* analyzing patient care situations

DO NOT generate simple memorization-only questions unless necessary.

==================================================
QUESTION DISTRIBUTION
=====================

Distribute questions according to realistic NHA CCMA blueprint emphasis:

HIGH PRIORITY:

* Patient Intake and Vitals
* General Patient Care
* Infection Control and Safety
* Phlebotomy
* EKG and Cardiovascular Testing
* Point of Care Testing and Laboratory Procedures
* Medical Law and Ethics
* Patient Care Coordination and Education
* Administrative Assisting
* Communication and Customer Service
* Foundational Knowledge and Basic Science
* Anatomy and Physiology

MEDIUM PRIORITY:

* formulas
* pure theory
* definitions
* historical information

==================================================
SUBJECTS TO COVER
=================

Use the NHA CCMA exam blueprint topics exhaustively.

Generate questions for ALL applicable topics:

---

## Foundational Knowledge and Basic Science

* medical terminology (prefixes, suffixes, root words)
* body systems overview
* basic pharmacology
* common abbreviations and symbols

---

## Anatomy and Physiology

* major organs and their functions
* cardiovascular, respiratory, and musculoskeletal systems
* normal versus abnormal findings

---

## Patient Intake and Vitals

* patient intake process
* measuring and recording vital signs
* normal vital sign ranges
* identifying abnormal vital signs
* patient history and chief complaint documentation

---

## General Patient Care

* assisting with examinations and procedures
* preparing the examination room
* patient positioning
* wound care and dressings
* specimen collection
* patient preparation for procedures

---

## Infection Control and Safety

* CDC Standard Precautions
* OSHA Bloodborne Pathogens Standard
* hand hygiene
* PPE use
* sanitization, disinfection, and sterilization
* medical asepsis versus surgical asepsis
* sharps safety and disposal
* exposure control plan

---

## Point of Care Testing and Laboratory Procedures

* CLIA waived testing
* glucose testing
* urine testing (dipstick, pregnancy)
* rapid strep, flu, and COVID-19 tests
* quality control and documentation

---

## Phlebotomy

* venipuncture procedure
* order of draw
* tube types, additives, and stopper colors
* needle and syringe selection
* pediatric and geriatric considerations
* specimen labeling and handling
* complications of venipuncture

---

## EKG and Cardiovascular Testing

* EKG lead placement (limb and precordial leads)
* preparing the patient for an EKG
* artifact recognition
* normal sinus rhythm versus abnormalities
* Holter monitor patient instructions

---

## Patient Care Coordination and Education

* patient education techniques
* discharge instructions
* coordination of care and referrals
* barriers to learning
* culturally competent care

---

## Administrative Assisting

* scheduling appointments
* medical records management
* insurance and billing basics (ICD-10, CPT)
* telephone etiquette and message taking
* patient registration

---

## Communication and Customer Service

* therapeutic communication
* active listening
* handling difficult patients
* professional boundaries
* patient confidentiality

---

## Medical Law and Ethics

* HIPAA Privacy Rule
* informed consent
* patient rights
* scope of practice
* advance directives
* mandatory reporting
* professional ethics and liability

==================================================
OFFICIAL SOURCE LINKS
=====================

Use these official references as primary source material when generating questions, explanations, and study content.

---

## NHA CCMA SOURCES

NHA CCMA Exam — 150 scored + 30 pretest questions, 3 hours, passing score 390/500:
https://www.nhanow.com/certifications/certified-clinical-medical-assistant

NHA CCMA Candidate Handbook:
https://www.nhanow.com/candidate-handbook

OSHA Bloodborne Pathogens Standard (29 CFR 1910.1030):
https://www.osha.gov/bloodborne-pathogens

HIPAA Privacy Rule (45 CFR Part 160 and 164):
https://www.hhs.gov/hipaa/for-professionals/privacy/index.html

CDC Standard Precautions:
https://www.cdc.gov/infection-control/hcp/basics/standard-precautions.html

AHA CPR and ECC Guidelines:
https://cpr.heart.org/

CLIA Waived Testing (CMS):
https://www.cms.gov/medicare/quality/clinical-laboratory-improvement-amendments

==================================================
SOURCE USAGE RULES
==================

When generating questions:

* Prefer US healthcare guidelines and clinical terminology first.
* Use the OSHA Bloodborne Pathogens Standard for infection control and sharps safety content.
* Use the HIPAA Privacy Rule for confidentiality and privacy content.
* Use CDC Standard Precautions for infection control content.
* Use AHA CPR guidelines for emergency response and CPR content.
* Use CLIA waived testing requirements for point of care testing content.
* Use the NHA CCMA exam blueprint for subject weighting.

Questions must combine:

* guideline provisions
* real-world clinical practice
* practical clinical judgment
* medical assistant operational context
* NHA CCMA exam philosophy

==================================================
CLINICAL REFERENCE VALUES
=========================

Use these exact values when generating questions and explanations:

Normal adult vital signs:

* Temperature: 97.8-99.1°F (36.5-37.3°C) oral
* Pulse: 60-100 beats per minute
* Respirations: 12-20 breaths per minute
* Blood pressure: <120/80 mmHg
* Oxygen saturation (SpO2): 95-100%

Phlebotomy order of draw (venipuncture):

1. Light blue (sodium citrate, coagulation studies)
2. Red (no additive, serum chemistry)
3. SST / gold or tiger top (serum separator tube, clot activator)
4. Green (heparin, plasma chemistry)
5. Lavender (EDTA, CBC and hematology)
6. Gray (sodium fluoride, glucose testing)

Medication administration:

* The 5 rights: right patient, right medication, right dose, right route, right time
* Common injection routes: intradermal (ID), subcutaneous (SQ/SC), intramuscular (IM), intravenous (IV)
* Common intramuscular sites: deltoid, vastus lateralis, ventrogluteal

==================================================
QUESTION FORMATTING
===================

For each generated question provide:

1. Question category
2. Difficulty level
3. Question
4. Four answer choices
5. Correct answer
6. Detailed explanation
7. Why the other answers are wrong
8. Guideline reference if applicable
9. Clinical reasoning
10. Real-world clinical context

==================================================
DIFFICULTY LEVELS
=================

Generate:

* Beginner
* Intermediate
* Advanced
* NHA CCMA certification exam difficulty

Advanced questions should:

* combine multiple guideline provisions
* include partial symptoms
* require elimination logic
* involve clinical interpretation
* require “best/most appropriate” clinical decisions

==================================================
SCENARIO EXAMPLES
=================

Examples of desired style:

GOOD:
“A patient presents with dizziness and a blood pressure reading of 88/56 mmHg. What is the MOST appropriate action for the medical assistant?”

GOOD:
“A medical assistant must collect a CBC and a PT/INR for the same patient. In which order should the tubes be drawn?”

GOOD:
“A medical assistant notices a coworker discussing a patient's diagnosis in the waiting room where other patients can hear. Which rule has been violated?”

BAD:
“What does BP stand for?”

==================================================
OUTPUT REQUIREMENTS
===================

Generate:

* highly varied questions
* no duplicates
* realistic distractors
* professional clinical terminology
* authentic medical office context
* American terminology where applicable

Questions must feel indistinguishable from actual NHA CCMA preparation material.

Prioritize:
UNDERSTANDING > MEMORIZATION.`;

  return type === 'MCQ' ? `${base}${mcqRules}` : base;
}

function buildUserPrompt(
  chapterName: string,
  examName: string,
  type: QType,
  difficulty: Difficulty,
  count: number
): string {
  const typeLabel = {
    MCQ: `${count} multiple-choice questions (4 options each)`,
    TRUEFALSE: `${count} true/false statements`,
    WRITTEN: `${count} written/short-answer questions`,
  }[type];

  return `Generate ${typeLabel} for the following chapter:
- Exam: ${examName}
- Chapter: ${chapterName}
- Difficulty: ${difficulty}
- Output format: JSON array as specified in the schema.

Hard constraints for this batch:
1) Use NHA CCMA certification exam style (scenario-based, guideline application, clinical judgment, best/most appropriate action).
2) Use realistic clinical and medical office context with professional healthcare terminology.
3) For MCQ, provide 4 full-text plausible options (NO placeholders like A/B/C/D).
4) correctAnswer must be the exact text of one option.
5) explanation must include practical clinical reasoning + at least one US guideline reference cue (OSHA Bloodborne Pathogens Standard, HIPAA Privacy Rule, CDC Standard Precautions, AHA CPR guidelines, CLIA waived testing).
6) Avoid pure definition/memorization stems.
7) Questions must be meaningfully varied (no duplicates/rephrasings).

Return ONLY the JSON array with no additional text.`;
}

// ─── Core generation ───────────────────────────────────────────

async function generateForType(
  chapterName: string,
  examName: string,
  type: QType,
  difficulty: Difficulty,
  count: number
): Promise<unknown[]> {
  const systemPrompt = buildSystemPrompt(type, difficulty);
  const userPrompt = buildUserPrompt(chapterName, examName, type, difficulty, count);

  const schema = type === 'MCQ' ? mcqSchema
    : type === 'TRUEFALSE' ? trueFalseSchema
    : writtenSchema;

  const validated: unknown[] = [];
  const seenQuestions = new Set<string>();

  // Retry loop: keep requesting until we have enough valid high-quality items or hit max attempts.
  const maxAttempts = 5;
  let attempt = 0;

  while (validated.length < count && attempt < maxAttempts) {
    const remaining = count - validated.length;
    const requestCount = Math.min(remaining + 6, Math.max(remaining, 8));

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `${userPrompt}\n\nAttempt ${attempt + 1}/${maxAttempts}. Generate ${requestCount} items to compensate for strict validation filtering.`
        },
      ],
      temperature: 0.7,
    });

    const raw = response.choices[0]?.message?.content ?? '[]';

    let parsed: unknown;
    try {
      const json = JSON.parse(raw);
      parsed = Array.isArray(json) ? json : (json.questions ?? json.data ?? []);
    } catch {
      console.warn('[AI Parse Error] malformed JSON, skipping attempt');
      attempt += 1;
      continue;
    }

    if (!Array.isArray(parsed)) {
      console.warn('[AI Parse Error] response is not array, skipping attempt');
      attempt += 1;
      continue;
    }

    for (const item of parsed) {
      try {
        const result = schema.parse(item) as Record<string, unknown>;

        if (!passesQualityGuards(result, type)) {
          continue;
        }

        const key = String(result.question ?? '').trim().toLowerCase();
        if (!key || seenQuestions.has(key)) {
          continue;
        }

        seenQuestions.add(key);
        validated.push(result);

        if (validated.length >= count) break;
      } catch (err) {
        console.warn('[AI Validation Error]', err);
      }
    }

    attempt += 1;
  }

  return validated.slice(0, count);
}

// ─── Public API ───────────────────────────────────────────────

/**
 * Generate a simplified explanation of an exam question for struggling students.
 * Uses plain, simple language (2-3 sentences).
 */
async function tutorExplain(question: string, explanation: string): Promise<string> {
  const prompt = `Explain this NHA CCMA (Certified Clinical Medical Assistant) exam question in simple terms, as if you were explaining it to a student who is struggling. Question: ${question}. Correct answer / explanation: ${explanation}. Give a short explanation (2-3 sentences) in very simple language.`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'deepseek-chat',
    messages: [
      { role: 'system', content: 'You are a CCMA tutor who explains clinical concepts and US healthcare guidelines in very simple, accessible language.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.5,
    max_tokens: 300,
  });

  const content = response.choices[0]?.message?.content?.trim() ?? '';
  return content || 'Sorry, I could not generate a simplified explanation at the moment.';
}

export const aiService = {
  /**
   * Simplify an exam question explanation for the tutor feature.
   * Returns a short plain-language explanation (2-3 sentences) in English (EN-US).
   */
  async tutorExplain(question: string, explanation: string): Promise<string> {
    return tutorExplain(question, explanation);
  },

  /**
   * Generate questions for a chapter and persist as PENDING.
   * Callers: questions route POST /generate
   */
  /**
   * Generate questions for a chapter and persist as PENDING.
   * Callers: questions route POST /generate
   */
  async generateQuestions(opts: GenerateOptions): Promise<void> {
    const { examId, chapterId, type, difficulty, count } = opts;

    const [exam, chapter] = await Promise.all([
      prisma.exam.findUnique({ where: { id: examId } }),
      prisma.chapter.findUnique({ where: { id: chapterId } }),
    ]);

    if (!exam || !chapter) {
      throw new Error('Exam or chapter not found');
    }

    const questions = await generateForType(
      chapter.name,
      exam.name,
      type,
      difficulty,
      count
    );

    if (questions.length < count) {
      throw new Error(`AI generated insufficient valid questions: requested ${count}, got ${questions.length}`);
    }

    // Batch insert all as PENDING
    const toInsert = questions.map((q: unknown) => {
      const qObj = q as Record<string, unknown>;
      return {
        examId,
        chapterId,
        type,
        difficulty,
        question: qObj.question as string,
        options: (qObj.options as string[]) ?? [],
        correctAnswer: String(qObj.correctAnswer),
        explanation: qObj.explanation as string,
        status: 'PENDING' as const,
        aiSource: `generated:${exam.code}:${chapter.number}`,
      };
    });

    await prisma.question.createMany({ data: toInsert });

    console.log(`[AI] Generated ${toInsert.length} questions for ${exam.code} / Ch.${chapter.number}`);
  },

  /**
   * Generate theory content for a chapter based on its approved questions.
   * Uses AI to synthesize all question explanations into cohesive study material.
   * Saves to theoryContent / theoryContentFr on the Chapter record.
   * Returns { en: string, fr: string }.
   */
  async generateTheory(chapterId: string): Promise<{ en: string; fr: string }> {
    const [chapter, questions] = await Promise.all([
      prisma.chapter.findUnique({
        where: { id: chapterId },
        include: { exam: { select: { code: true, name: true } } },
      }),
      prisma.question.findMany({
        where: { chapterId, status: 'APPROVED' },
        select: { question: true, question_fr: true, explanation: true, explanation_fr: true },
        take: 100,
      }),
    ]);

    if (!chapter) throw new Error('Chapter not found');
    if (questions.length === 0) throw new Error('No approved questions in this chapter');

    const examCode = chapter.exam?.code ?? '';
    const chapterName = chapter.name;

    // Build source material for AI
    const enMaterial = questions.map((q, i) =>
      `Q${i + 1}: ${q.question}\nExplanation: ${q.explanation}`
    ).join('\n---\n');

    const frMaterial = questions.map((q, i) =>
      `Q${i + 1}: ${q.question_fr || q.question}\nExplication: ${q.explanation_fr || q.explanation}`
    ).join('\n---\n');

    // Generate English theory
    const enPrompt = `You are an NHA CCMA (Certified Clinical Medical Assistant) textbook author. Based on the following exam questions and their explanations for chapter "${chapterName}" of exam "${examCode}", write comprehensive, well-structured theory/study material. 

The goal is NOT to list the questions and answers. Instead, synthesize the KNOWLEDGE behind them into proper textbook-style reference material.

Structure your response with:
1. A brief overview of what this chapter covers
2. Key concepts explained in detail with technical accuracy
3. Important formulas, regulations, or procedures
4. Common relationships between concepts

Write in clear, professional English suitable for NHA CCMA certification exam preparation. Use markdown formatting with headings (##, ###), bullet points, and emphasis where appropriate.

CRITICAL: Respond directly with the theory content. No preamble, no introductory phrases like "Absolutely", "Here is", "Certainly", or "Of course". Start immediately with the first heading.

Here are the source questions and explanations:\n\n${enMaterial}`;

    const frPrompt = `Tu es un auteur de manuel de préparation à l'examen NHA CCMA (Certified Clinical Medical Assistant). À partir des questions d'examen et leurs explications pour le chapitre "${chapter.name_fr || chapterName}" de l'examen "${examCode}", rédige un contenu théorique / matériel d'étude complet et bien structuré.

Le but N'EST PAS de lister les questions et réponses. Tu dois plutôt synthétiser les CONNAISSANCES derrière ces questions en un véritable contenu de référence de type manuel.

Structure ta réponse avec :
1. Un aperçu de ce que couvre ce chapitre
2. Les concepts clés expliqués en détail avec précision technique
3. Les formules, règlements ou procédures importantes
4. Les relations entre les concepts

Écris en français clair et professionnel adapté à la préparation à l'examen NHA CCMA. Utilise le format markdown avec des titres (##, ###), listes à puces et emphase où approprié.

CRITIQUE : Réponds directement avec le contenu théorique. Aucun préambule, aucune phrase d'introduction comme "Absolument", "Voici", "D'accord", "Bien sûr". Commence immédiatement par le premier titre.

Voici les questions et explications sources :\n\n${frMaterial}`;

    const [enResponse, frResponse] = await Promise.all([
      openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are an expert NHA CCMA textbook author creating study material for medical assistants.' },
          { role: 'user', content: enPrompt },
        ],
        temperature: 0.4,
        max_tokens: 16384,
      }),
      openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'deepseek-chat',
        messages: [
          { role: 'system', content: 'Tu es un auteur expert de manuel NHA CCMA créant du matériel d\'étude pour les assistants médicaux certifiés.' },
          { role: 'user', content: frPrompt },
        ],
        temperature: 0.4,
        max_tokens: 16384,
      }),
    ]);

    const en = enResponse.choices[0]?.message?.content?.trim() ?? '';
    const fr = frResponse.choices[0]?.message?.content?.trim() ?? '';

    // Save to chapter
    await prisma.chapter.update({
      where: { id: chapterId },
      data: { theoryContent: en, theoryContentFr: fr },
    });

    console.log(`[AI] Generated theory for ${examCode} / Ch.${chapter.number}`);

    return { en, fr };
  },
};
