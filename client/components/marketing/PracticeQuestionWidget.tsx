"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// ─── Practice Questions Data (EN) ────────────────────────

const questions = [
  {
    id: 1,
    topic: 'Vital Signs',
    stem: 'Which of the following is within the normal adult range for resting respiratory rate?',
    options: [
      '8–10 breaths per minute',
      '12–20 breaths per minute',
      '24–30 breaths per minute',
      '32–40 breaths per minute',
    ],
    correctIndex: 1,
    explanation:
      'The normal adult respiratory rate is 12–20 breaths per minute. Rates below 12 suggest bradypnea; rates above 20 suggest tachypnea and warrant reassessment.',
    ref: 'NHA CCMA Blueprint Ch. 3 (Patient Intake and Vitals)',
  },
  {
    id: 2,
    topic: 'Phlebotomy — Order of Draw',
    stem: 'When collecting blood with the evacuated tube system, which tube should be drawn FIRST?',
    options: [
      'Lavender-top (EDTA) tube',
      'Light blue-top (sodium citrate) tube',
      'Blood culture bottles',
      'Red-top (serum) tube',
    ],
    correctIndex: 2,
    explanation:
      'The order of draw begins with blood culture bottles to prevent contamination from additives in other tubes. The standard sequence is: blood cultures, light blue, red/SST, green, lavender, gray.',
    ref: 'NHA CCMA Blueprint Ch. 8 (Phlebotomy)',
  },
  {
    id: 3,
    topic: 'Medication Administration',
    stem: 'Which of the following is NOT one of the five rights of medication administration?',
    options: [
      'Right patient',
      'Right medication',
      'Right diagnosis',
      'Right dose',
    ],
    correctIndex: 2,
    explanation:
      'The five rights are right patient, right medication, right dose, right route, and right time. "Right diagnosis" is not one of the five rights.',
    ref: 'NHA CCMA Blueprint Ch. 4 (General Patient Care Part 1)',
  },
  {
    id: 4,
    topic: 'HIPAA',
    stem: 'A patient\u2019s friend calls and asks for the patient\u2019s lab results. The patient has not authorized this disclosure. What should the medical assistant do?',
    options: [
      'Provide the results since the caller is a close friend',
      'Politely explain that protected health information cannot be shared without the patient\u2019s authorization',
      'Provide the results if the caller identifies the patient by name',
      'Ask the caller to send a written request by email',
    ],
    correctIndex: 1,
    explanation:
      'Under the HIPAA Privacy Rule, protected health information may only be disclosed with the patient\u2019s written authorization (or another permitted exception). Family and friends are not automatically entitled to PHI.',
    ref: 'HIPAA Privacy Rule; NHA CCMA Blueprint Ch. 13 (Medical Law and Ethics)',
  },
  {
    id: 5,
    topic: 'Infection Control',
    stem: 'According to CDC standard precautions, how should a medical assistant treat all blood and body fluids?',
    options: [
      'As non-infectious unless the patient has a known diagnosis',
      'As potentially infectious in every patient encounter',
      'As infectious only during procedures that draw blood',
      'As a hazard only when the patient reports symptoms',
    ],
    correctIndex: 1,
    explanation:
      'CDC standard precautions require treating ALL blood and body fluids as potentially infectious in every patient encounter, regardless of diagnosis. This is the foundation of infection control in ambulatory settings.',
    ref: 'CDC Standard Precautions; NHA CCMA Blueprint Ch. 6 (Infection Control and Safety)',
  },
];

// ─── Practice Question Widget Component ──────────────────

export default function PracticeQuestionWidget() {
  const [question] = useState(
    () => questions[Math.floor(Math.random() * questions.length)]
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelectedIndex(idx);
    setRevealed(true);
  };

  const isCorrect = selectedIndex === question.correctIndex;
  const answered = revealed;

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1688B8]/5 via-transparent to-[#20C7C9]/5" />
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            🔥{' '}
            <span className="bg-gradient-to-r from-[#20C7C9] to-[#1688B8] bg-clip-text text-transparent">
              Try a Real CCMA Question
            </span>
          </h2>
          <p className="text-[#A8B7C9] max-w-xl mx-auto">
            See how CCMAPractice prepares you for the NHA CCMA exam. Select your answer below to test your clinical knowledge.
          </p>
        </motion.div>

        {/* Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0B2038] to-[#031428] p-6 md:p-8 shadow-xl"
        >
          {/* Topic badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#20C7C9]/20 text-[#20C7C9] text-xs font-bold">
              ?
            </span>
            <span className="text-xs font-semibold text-[#20C7C9] uppercase tracking-wider">
              {question.topic}
            </span>
          </div>

          {/* Question stem */}
          <p className="text-sm md:text-base text-[#F5F8FA] font-medium leading-relaxed mb-6">
            {question.stem}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              let optionStyle =
                'border border-white/10 bg-white/[0.03] hover:border-[#20C7C9]/30 hover:bg-white/[0.06]';

              if (!answered) {
                optionStyle =
                  'border border-white/10 bg-white/[0.03] hover:border-[#20C7C9]/30 hover:bg-white/[0.06] cursor-pointer';
              } else if (idx === question.correctIndex) {
                optionStyle = 'border border-green bg-green/10';
              } else if (idx === selectedIndex && !isCorrect) {
                optionStyle = 'border border-red bg-red/10';
              } else {
                optionStyle = 'border border-white/5 bg-white/[0.02] opacity-50';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={answered}
                  className={`w-full text-left p-3 md:p-4 rounded-xl transition-all duration-200 ${optionStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0 mt-0.5 ${
                        answered && idx === question.correctIndex
                          ? 'bg-green text-white'
                          : answered && idx === selectedIndex && !isCorrect
                          ? 'bg-red text-white'
                          : 'bg-white/10 text-[#A8B7C9]'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm md:text-sm text-[#A8B7C9] leading-relaxed">
                      {opt}
                    </span>
                    {answered && idx === question.correctIndex && (
                      <span className="text-green text-sm flex-shrink-0 ml-auto font-bold">✓</span>
                    )}
                    {answered && idx === selectedIndex && !isCorrect && (
                      <span className="text-red text-sm flex-shrink-0 ml-auto font-bold">✗</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Result & Explanation */}
          {answered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              {/* Feedback banner */}
              <div
                className={`p-4 rounded-xl mb-4 ${
                  isCorrect
                    ? 'bg-green/10 border border-green/30'
                    : 'bg-red/10 border border-red/30'
                }`}
              >
                <p className={`font-semibold text-sm mb-1 ${isCorrect ? 'text-green' : 'text-red'}`}>
                  {isCorrect ? '✅ Correct!' : '❌ Not quite.'}
                </p>
                <p className="text-xs md:text-sm text-[#A8B7C9] leading-relaxed">
                  {question.explanation}
                </p>
                {question.ref && (
                  <p className="text-xs text-[#70849A] mt-2 italic">
                    Reference: {question.ref}
                  </p>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/auth/register"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#20C7C9] to-[#1688B8] text-white text-sm font-semibold hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all duration-300"
                >
                  Want to see more? → Start Free
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://ccmapractice.com/free-ccma-practice-questions"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-[#A8B7C9] hover:text-white text-sm font-medium transition-all duration-300"
                >
                  📄 Download Free CCMA questions
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
