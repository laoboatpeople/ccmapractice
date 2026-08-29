'use client';

import { useState } from 'react';
import Link from 'next/link';

const questions = [
  {
    id: 1,
    topic: 'Vital Signs',
    stem: 'A medical assistant records a patient\u2019s vital signs: blood pressure 118/76 mmHg, pulse 72 bpm, respirations 14/min, oral temperature 98.6\u00B0F (37\u00B0C). Which of the following is the correct interpretation?',
    options: [
      'A: The temperature is elevated and should be rechecked',
      'B: All vital signs are within normal adult ranges',
      'C: The pulse is bradycardic',
      'D: The blood pressure indicates stage 2 hypertension',
    ],
    correctIndex: 1,
    explanation:
      'Normal adult vital signs are approximately: blood pressure < 120/80 mmHg, pulse 60\u2013100 bpm, respirations 12\u201320/min, and oral temperature about 98.6\u00F0F (37\u00B0C). All values in this scenario fall within those ranges.',
    ref: 'NHA CCMA Blueprint Ch. 3 (Patient Intake and Vitals)',
  },
  {
    id: 2,
    topic: 'Phlebotomy — Order of Draw',
    stem: 'During venipuncture, which tube should be collected FIRST when using the evacuated tube system?',
    options: [
      'A: Lavender-top (EDTA) tube',
      'B: Light blue-top (sodium citrate) tube',
      'C: Blood culture bottles (yellow-top or culture media)',
      'D: Red-top (serum) tube',
    ],
    correctIndex: 2,
    explanation:
      'The standard order of draw begins with blood culture bottles to prevent contamination by additives from other tubes, followed by light blue (coagulation), red/SST (serum), green (heparin), lavender (EDTA), and gray (fluoride) tubes.',
    ref: 'NHA CCMA Blueprint Ch. 8 (Phlebotomy); CLSI order of draw',
  },
  {
    id: 3,
    topic: 'Medication Administration',
    stem: 'Which of the following is NOT one of the five rights of medication administration?',
    options: [
      'A: Right patient',
      'B: Right medication',
      'C: Right diagnosis',
      'D: Right dose',
    ],
    correctIndex: 2,
    explanation:
      'The five rights of medication administration are: right patient, right medication, right dose, right route, and right time. "Right diagnosis" is not one of the five rights.',
    ref: 'NHA CCMA Blueprint Ch. 4 (General Patient Care Part 1)',
  },
  {
    id: 4,
    topic: 'HIPAA',
    stem: 'A patient\u2019s family member calls the clinic and asks for the patient\u2019s lab results. The patient has not authorized this disclosure. What should the medical assistant do?',
    options: [
      'A: Provide the results since the caller is family',
      'B: Politely explain that protected health information cannot be shared without the patient\u2019s authorization',
      'C: Provide partial results but not the diagnosis',
      'D: Ask the caller to come in person to receive the results',
    ],
    correctIndex: 1,
    explanation:
      'Under the HIPAA Privacy Rule, protected health information (PHI) may only be disclosed with the patient\u2019s written authorization (or another permitted exception). Family members are not automatically entitled to PHI without authorization.',
    ref: 'HIPAA Privacy Rule; NHA CCMA Blueprint Ch. 13 (Medical Law and Ethics)',
  },
  {
    id: 5,
    topic: 'Infection Control',
    stem: 'According to the CDC, which of the following is the single most important practice for preventing the spread of infection in healthcare settings?',
    options: [
      'A: Wearing a mask at all times',
      'B: Hand hygiene',
      'C: Isolating every patient',
      'D: Sterilizing all instruments daily',
    ],
    correctIndex: 1,
    explanation:
      'The CDC identifies hand hygiene as the single most important practice to reduce the transmission of infectious agents in healthcare settings. It should be performed before and after patient contact, after glove removal, and when moving from a contaminated to a clean body site.',
    ref: 'CDC Hand Hygiene Guidelines; NHA CCMA Blueprint Ch. 6 (Infection Control and Safety)',
  },
  {
    id: 6,
    topic: 'Phlebotomy — Tube Additives',
    stem: 'A lavender-top (EDTA) tube is used for which of the following laboratory tests?',
    options: [
      'A: Prothrombin time (PT/INR)',
      'B: Complete blood count (CBC)',
      'C: Blood glucose',
      'D: Electrolyte panel',
    ],
    correctIndex: 1,
    explanation:
      'The lavender-top tube contains EDTA, an anticoagulant used for hematology tests such as the complete blood count (CBC). PT/INR uses a light blue (sodium citrate) tube; glucose may use gray (fluoride) or SST tubes depending on the test.',
    ref: 'NHA CCMA Blueprint Ch. 8 (Phlebotomy)',
  },
  {
    id: 7,
    topic: 'Medication Administration — Routes',
    stem: 'A medication is administered into the subcutaneous layer of the upper arm. Which route of administration is this?',
    options: [
      'A: Intramuscular (IM)',
      'B: Intravenous (IV)',
      'C: Subcutaneous (SUBQ)',
      'D: Intradermal (ID)',
    ],
    correctIndex: 2,
    explanation:
      'Subcutaneous (SUBQ) injections are delivered into the subcutaneous tissue, just below the skin — common sites include the upper arm, abdomen, and thigh. Common SUBQ medications include insulin and heparin.',
    ref: 'NHA CCMA Blueprint Ch. 4 (General Patient Care Part 1)',
  },
  {
    id: 8,
    topic: 'EKG',
    stem: 'When performing a 12-lead EKG, where is the V1 precordial lead placed?',
    options: [
      'A: Fourth intercostal space, left sternal border',
      'B: Fourth intercostal space, right sternal border',
      'C: Fifth intercostal space, midclavicular line',
      'D: Left anterior axillary line',
    ],
    correctIndex: 1,
    explanation:
      'V1 is placed in the fourth intercostal space at the right sternal border. V2 is at the fourth intercostal space at the left sternal border; V4 is at the fifth intercostal space at the midclavicular line.',
    ref: 'NHA CCMA Blueprint Ch. 9 (EKG and Cardiovascular Testing)',
  },
  {
    id: 9,
    topic: 'Point of Care Testing',
    stem: 'A point-of-care glucose test is performed on a capillary blood sample obtained by fingerstick. Which CLIA category applies to most glucose meter testing performed in physician offices?',
    options: [
      'A: Waived testing',
      'B: Moderate complexity testing',
      'C: High complexity testing',
      'D: Provider-performed microscopy',
    ],
    correctIndex: 0,
    explanation:
      'Most glucose meter (glucometer) tests performed in physician offices are CLIA-waived — simple, low-risk tests with a low probability of error. Waived tests are the most common category in ambulatory settings.',
    ref: 'CLIA Waived Testing; NHA CCMA Blueprint Ch. 7 (Point of Care Testing and Laboratory Procedures)',
  },
  {
    id: 10,
    topic: 'Patient Intake',
    stem: 'During patient intake, a patient reports chest pain that began 30 minutes ago and rates it 7/10. Which is the MOST appropriate action for the medical assistant?',
    options: [
      'A: Complete the intake forms and continue as scheduled',
      'B: Notify the provider or clinical supervisor immediately and monitor the patient',
      'C: Instruct the patient to take an aspirin and lie down',
      'D: Document the complaint and tell the patient to call 911 if it worsens',
    ],
    correctIndex: 1,
    explanation:
      'Chest pain is a potentially life-threatening complaint. The medical assistant should notify the provider or clinical supervisor immediately, keep the patient comfortable, and monitor vital signs. Medical assistants should not independently diagnose, treat, or triage beyond their scope.',
    ref: 'NHA CCMA Blueprint Ch. 3 (Patient Intake and Vitals); scope of practice',
  },
];

function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'sample-questions' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to subscribe');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">
        📥 Get 10 Free CCMA Practice Questions
      </h3>
      <p className="text-sm text-[#94A3B8] mb-4">
        Subscribe to the CCMAPractice newsletter and we&apos;ll send you a free sample pack.
      </p>
      {status === 'success' ? (
        <p className="text-green-400 text-sm font-medium">✅ You&apos;re subscribed! Check your email for your free sample questions PDF.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-lg bg-[#1A2035] border border-white/10 text-[#F8FAFC] text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#C8102E]"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2.5 rounded-lg bg-[#C8102E] hover:bg-[#2563EB] text-white text-sm font-medium disabled:opacity-50 transition-colors"
          >
            {status === 'loading' ? 'Sending...' : 'Get Free Sample'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2">Something went wrong. Try again or email us directly.</p>
      )}
    </div>
  );
}

function QuestionCard({ q }: { q: typeof questions[0] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C8102E] text-white text-xs font-bold">
          {q.id}
        </span>
        <span className="text-xs font-medium text-[#C8102E] uppercase tracking-wider">{q.topic}</span>
      </div>
      <p className="text-sm text-[#F8FAFC] font-medium mb-4">{q.stem}</p>
      <ul className="space-y-2 mb-4">
        {q.options.map((opt, i) => (
          <li
            key={i}
            className={`text-xs text-[#94A3B8] p-2 rounded ${
              i === q.correctIndex ? 'border-l-2 border-[#C8102E] bg-[#C8102E]/5' : ''
            }`}
          >
            {opt}
          </li>
        ))}
      </ul>
      <details className="group">
        <summary className="inline-flex items-center gap-1 text-xs font-medium text-[#C8102E] hover:text-[#60A5FA] cursor-pointer list-none">
          <span>▶</span>
          <span>Show Answer</span>
        </summary>
        <div className="mt-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-xs font-medium text-green-400 mb-1">
            ✅ Correct Answer: {q.options[q.correctIndex]}
          </p>
          <p className="text-xs text-[#94A3B8]">{q.explanation}</p>
          <p className="text-xs text-[#64748B] mt-1 italic">Reference: {q.ref}</p>
        </div>
      </details>
    </div>
  );
}

export default function FreePracticeQuestionsClient() {
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-[#F8FAFC]">
      {/* Nav */}
      <nav className="border-b border-white/5 bg-[#0A0E1A]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo/logo-main.png?v=4" alt="CCMAPractice" className="h-7 w-auto" />
          </a>
          <a href="/blog" className="text-sm text-[#94A3B8] hover:text-white transition-colors">
            ← Back to Blog
          </a>
        </div>
      </nav>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Free CCMA Practice Questions</h1>
        <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-6">
          10 realistic NHA CCMA-style clinical questions covering vital signs, phlebotomy, medication
          administration, and HIPAA — with the guideline reference for every answer. Click to reveal the answer and explanation.
        </p>
        <a
          href="/auth/register"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#C8102E] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors"
        >
          Start Your Free Practice →
        </a>
      </header>

      {/* Email Capture (Top) */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <EmailCapture />
      </div>

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="text-sm text-[#94A3B8] leading-relaxed">
          <p>
            These 10 sample questions represent the type of questions you will
            encounter on the NHA CCMA exam. Each question covers a specific
            clinical area of the official blueprint — vital signs and patient
            intake, phlebotomy and the order of draw, medication administration,
            HIPAA, infection control, EKG, and point of care testing.
          </p>
          <p className="mt-4">
            Click the <strong className="text-[#F8FAFC]">Show Answer</strong> button under each question to see
            the correct answer, a detailed explanation, and the guideline
            reference. Use these questions to practice your clinical reasoning
            and identify areas that need more study.
          </p>
          <p className="mt-4">
            CCMAPractice has <strong className="text-[#F8FAFC]">1,200+ CCMA practice questions</strong> covering all
            thirteen blueprint chapters — from foundational knowledge and anatomy
            to phlebotomy, EKG, and medical law and ethics. Sign up
            for free to access the full question bank with adaptive difficulty,
            timed simulations, and AI-powered explanations.
          </p>
        </div>
      </section>

      {/* Questions */}
      <div className="max-w-4xl mx-auto px-6 space-y-6 mb-16">
        {questions.map((q) => (
          <QuestionCard key={q.id} q={q} />
        ))}
      </div>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#C8102E]/10 to-[#4C7FBF]/5 p-8 text-center">
          <h2 className="text-2xl font-bold text-[#F8FAFC] mb-3">
            Ready for 1,200+ Questions?
          </h2>
          <p className="text-sm text-[#94A3B8] max-w-xl mx-auto mb-6">
            Get unlimited access to NHA CCMA-style clinical practice questions
            with adaptive difficulty, timed simulations, AI Tutor explanations,
            and detailed progress tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/auth/register"
              className="px-6 py-3 rounded-lg bg-[#C8102E] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors"
            >
              Create Free Account
            </a>
            <a
              href="/pricing"
              className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/[0.05] text-[#F8FAFC] text-sm font-medium transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Email Capture (Bottom) */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <EmailCapture />
      </div>

      {/* Related Resources */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">📚 More Study Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/blog/ccma-b1-certification-guide" className="p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <h3 className="font-semibold text-[#F8FAFC] mb-1 text-sm">The Complete CCMA Certification Guide</h3>
            <p className="text-xs text-[#64748B]">Everything you need to earn your CCMA certification.</p>
          </a>
          <a href="/blog/ccma-study-guide" className="p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <h3 className="font-semibold text-[#F8FAFC] mb-1 text-sm">CCMA Study Guide</h3>
            <p className="text-xs text-[#64748B]">Master the 13 blueprint chapters of the NHA CCMA exam.</p>
          </a>
          <a href="/blog/ccma-exam-structure" className="p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <h3 className="font-semibold text-[#F8FAFC] mb-1 text-sm">CCMA Exam Structure</h3>
            <p className="text-xs text-[#64748B]">Scored vs. pretest questions, time limits, and the passing score.</p>
          </a>
          <a href="/study-checklist" className="p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <h3 className="font-semibold text-[#F8FAFC] mb-1 text-sm">30-Day Study Checklist</h3>
            <p className="text-xs text-[#64748B]">Printable day-by-day NHA CCMA exam prep plan.</p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-xs text-[#64748B]">
          <p className="mb-2">
            <a href="/" className="hover:text-[#94A3B8] transition-colors">Home</a>
            <span className="mx-2">·</span>
            <a href="/blog" className="hover:text-[#94A3B8] transition-colors">Blog</a>
            <span className="mx-2">·</span>
            <a href="/about" className="hover:text-[#94A3B8] transition-colors">About</a>
            <span className="mx-2">·</span>
            <a href="/pricing" className="hover:text-[#94A3B8] transition-colors">Pricing</a>
            <span className="mx-2">·</span>
            <a href="/privacy" className="hover:text-[#94A3B8] transition-colors">Privacy</a>
            <span className="mx-2">·</span>
            <a href="/terms" className="hover:text-[#94A3B8] transition-colors">Terms</a>
          </p>
          <p>&copy; {new Date().getFullYear()} CCMAPractice. All rights reserved. CCMAPractice is not affiliated with the National Healthcareer Association (NHA).</p>
        </div>
      </footer>
    </div>
  );
}
