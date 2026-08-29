'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqs: FaqItem[];
}

const weeks = [
  {
    week: 1,
    title: 'Assessment & Foundational Knowledge',
    subtitle: 'Review the NHA CCMA exam blueprint, take a diagnostic quiz, and build your medical terminology and anatomy foundation.',
    days: [
      {
        day: 1,
        title: 'Download & Review the NHA CCMA Exam Blueprint',
        tasks: [
          'Download the official NHA CCMA exam blueprint from the NHA website (nhanow.com).',
          'Review the 13 content areas, question count (150 scored + 30 pretest), time limit (3 hours), and passing score (390/500).',
          'Note which domains carry the most weight — clinical patient care is the largest.',
        ],
      },
      {
        day: 2,
        title: 'Take a Full Diagnostic Quiz',
        tasks: [
          'Log in to CCMAPractice and take one full diagnostic quiz spanning all chapters.',
          'Record your scores per chapter to identify weak areas.',
          'Review every wrong answer and read the provided explanations.',
        ],
      },
      {
        day: 3,
        title: 'Medical Terminology Bootcamp',
        tasks: [
          'Review common prefixes, suffixes, and root words (e.g., tachy-, hypo-, -ectomy, -itis).',
          'Make flashcards for 50 must-know terms: tachycardia, hypertension, dyspnea, bradycardia, and more.',
          'Take a 20-question medical terminology quiz.',
        ],
      },
      {
        day: 4,
        title: 'Anatomy & Physiology — Part 1',
        tasks: [
          'Review the cardiovascular, respiratory, and musculoskeletal systems.',
          'Focus on the structures you will touch clinically: heart, lungs, veins, and injection landmarks.',
          'Complete 20 anatomy practice questions.',
        ],
      },
      {
        day: 5,
        title: 'Anatomy & Physiology — Part 2',
        tasks: [
          'Review the digestive, urinary, reproductive, and integumentary systems.',
          'Connect anatomy to common exam scenarios (e.g., injection sites, specimen collection).',
          'Take a 15-question anatomy quiz.',
        ],
      },
      {
        day: 6,
        title: 'Foundational Knowledge & Basic Science',
        tasks: [
          'Study cell biology basics and the principles of body organization.',
          'Practice medical math: temperature conversion and basic dosage calculations.',
          'Take a mixed 25-question quiz covering this week\u2019s topics.',
        ],
      },
      {
        day: 7,
        title: 'Week 1 Review & Weak Area Deep Dive',
        tasks: [
          'Revisit your diagnostic scores from Day 2 — which chapters need the most work?',
          'Spend 2 hours on your weakest chapter from this week.',
          'Take a 30-question progress quiz and aim for 75%+.',
        ],
      },
    ],
  },
  {
    week: 2,
    title: 'Patient Intake & Vital Signs',
    subtitle: 'Master patient intake, documentation, and accurate vital sign measurement — the highest-frequency clinical skill on the exam.',
    days: [
      {
        day: 8,
        title: 'Patient Intake & History',
        tasks: [
          'Study the patient interview: chief complaint, medical history, medication list, and allergies.',
          'Review documentation formats (SOAP) and accurate charting.',
          'Complete 20 patient-intake practice questions.',
        ],
      },
      {
        day: 9,
        title: 'Temperature',
        tasks: [
          'Learn the routes (oral, rectal, axillary, tympanic, temporal), normal ranges, and when each is used.',
          'Know fever vs hypothermia thresholds and how to document.',
          'Take a 15-question vitals quiz on temperature.',
        ],
      },
      {
        day: 10,
        title: 'Pulse & Respiration',
        tasks: [
          'Study pulse sites (radial, carotid, apical), normal rates by age, and rhythm/quality descriptors.',
          'Review respiratory rate, depth, and normal ranges.',
          'Complete 15 pulse and respiration practice questions.',
        ],
      },
      {
        day: 11,
        title: 'Blood Pressure',
        tasks: [
          'Study auscultation technique, Korotkoff sounds, and proper cuff sizing.',
          'Know AHA blood pressure categories (normal, elevated, stage 1/2 hypertension).',
          'Complete 20 blood pressure practice questions.',
        ],
      },
      {
        day: 12,
        title: 'Height, Weight & BMI',
        tasks: [
          'Practice accurate height and weight measurement technique.',
          'Learn BMI calculation and categories (underweight, normal, overweight, obese).',
          'Complete 10 measurement practice questions.',
        ],
      },
      {
        day: 13,
        title: 'Vital Signs Practice Lab',
        tasks: [
          'Run timed vital signs scenarios on 5 mock patients (temperature, pulse, respirations, blood pressure).',
          'Document all four vitals accurately for each patient.',
          'Take a 25-question vital signs quiz.',
        ],
      },
      {
        day: 14,
        title: 'Week 2 Review & Mixed Quiz',
        tasks: [
          'Take a 50-question mixed exam covering intake and vital signs.',
          'Log every missed question and its explanation.',
          'Spend 1 hour on your weakest sub-topic from this week.',
        ],
      },
    ],
  },
  {
    week: 3,
    title: 'General Patient Care',
    subtitle: 'Patient positioning, wound care, injections, and assisting with exams — the General Patient Care blueprint domains.',
    days: [
      {
        day: 15,
        title: 'Patient Positioning & Mobility',
        tasks: [
          'Study positions: supine, prone, Fowler\u2019s, lithotomy, Sims, and Trendelenburg.',
          'Review transfer techniques, gait belts, and fall prevention.',
          'Complete 15 positioning practice questions.',
        ],
      },
      {
        day: 16,
        title: 'Assisting with Examinations',
        tasks: [
          'Learn exam room preparation, draping, and patient privacy.',
          'Review the provider\u2019s exam flow and common instruments.',
          'Take a 15-question assisting quiz.',
        ],
      },
      {
        day: 17,
        title: 'Wound Care & Dressings',
        tasks: [
          'Study wound types, cleaning with sterile technique, and dressing changes.',
          'Review bandage application and when to escalate to the provider.',
          'Complete 20 wound care practice questions.',
        ],
      },
      {
        day: 18,
        title: 'Injections — Part 1',
        tasks: [
          'Learn the injection types: intradermal (ID), subcutaneous (SC), and intramuscular (IM).',
          'Study the sites: deltoid, vastus lateralis, ventrogluteal — and needle gauge/length selection.',
          'Complete 20 injection practice questions.',
        ],
      },
      {
        day: 19,
        title: 'Injections — Part 2',
        tasks: [
          'Review drawing medication, aspiration, angle of insertion, and the Z-track technique.',
          'Study sharps safety and OSHA bloodborne pathogen precautions.',
          'Take a 25-question injection safety quiz.',
        ],
      },
      {
        day: 20,
        title: 'Patient Education & General Care',
        tasks: [
          'Study pre- and post-procedure patient teaching.',
          'Review assisting with specimen collection and patient comfort measures.',
          'Complete 15 general patient care questions.',
        ],
      },
      {
        day: 21,
        title: 'Week 3 Review & Skills Check',
        tasks: [
          'Take a 60-question mixed exam on general patient care.',
          'Review every wrong answer and its explanation.',
          'Practice injection site landmarks from memory.',
        ],
      },
    ],
  },
  {
    week: 4,
    title: 'Infection Control & Safety',
    subtitle: 'CDC Standard Precautions, OSHA Bloodborne Pathogens, hand hygiene, PPE, and medical asepsis — a high-yield domain.',
    days: [
      {
        day: 22,
        title: 'Medical Asepsis & Hand Hygiene',
        tasks: [
          'Study when and how to perform hand hygiene (soap vs alcohol-based sanitizer).',
          'Review CDC Standard Precautions and transmission-based precautions.',
          'Complete 20 infection control practice questions.',
        ],
      },
      {
        day: 23,
        title: 'PPE & Sterile Technique',
        tasks: [
          'Learn the PPE donning and doffing order.',
          'Review sterile field setup, sterile gloves, and surgical asepsis.',
          'Take a 15-question PPE quiz.',
        ],
      },
      {
        day: 24,
        title: 'OSHA Bloodborne Pathogens Standard',
        tasks: [
          'Study the exposure control plan and universal/standard precautions.',
          'Review the post-exposure protocol for needle sticks and blood splashes.',
          'Complete 15 OSHA practice questions.',
        ],
      },
      {
        day: 25,
        title: 'Disinfection & Sterilization',
        tasks: [
          'Learn the levels: cleaning, disinfection, and sterilization.',
          'Review EPA-registered disinfectants and instrument processing (autoclave basics).',
          'Complete 15 practice questions on disinfection.',
        ],
      },
      {
        day: 26,
        title: 'Sharps Safety & Waste Disposal',
        tasks: [
          'Study safe sharps handling and the no-recapping rule.',
          'Review biohazard waste segregation and spill cleanup (OSHA).',
          'Take a 20-question safety quiz.',
        ],
      },
      {
        day: 27,
        title: 'Safety & Emergency Preparedness',
        tasks: [
          'Review fire safety (RACE/PASS) and office emergencies (syncope, anaphylaxis).',
          'Study SDS (Safety Data Sheets) and chemical safety.',
          'Complete 15 safety practice questions.',
        ],
      },
      {
        day: 28,
        title: 'Week 4 Review & Infection Control Drill',
        tasks: [
          'Take a 50-question mixed quiz on infection control and safety.',
          'Review every missed CDC/OSHA detail.',
          'Spend 1 hour on your weakest area from this week.',
        ],
      },
    ],
  },
  {
    week: 5,
    title: 'Phlebotomy & Laboratory Procedures',
    subtitle: 'Venipuncture, order of draw, specimen handling, and CLIA-waived point of care testing — a major clinical domain.',
    days: [
      {
        day: 29,
        title: 'Venipuncture — Preparation',
        tasks: [
          'Study equipment: needles, collection tubes, tourniquet, and antiseptics.',
          'Review vein selection (antecubital fossa: median cubital, cephalic, basilic).',
          'Complete 20 phlebotomy preparation questions.',
        ],
      },
      {
        day: 30,
        title: 'Venipuncture — Technique',
        tasks: [
          'Learn the steps of the draw: position, tourniquet, palpate, cleanse, insert, fill tubes, release, withdraw.',
          'Study complications: hematoma, hemolysis, and how to avoid them.',
          'Complete 20 technique practice questions.',
        ],
      },
      {
        day: 31,
        title: 'Order of Draw & Tube Additives',
        tasks: [
          'Memorize the order of draw: blood culture, light blue, red, gold/SST, green, lavender, gray.',
          'Learn each tube\u2019s additive and what it is used for.',
          'Run a timed order-of-draw drill until it is automatic.',
        ],
      },
      {
        day: 32,
        title: 'Capillary Puncture',
        tasks: [
          'Study fingerstick and heelstick technique and collection site selection.',
          'Review microcollection tubes and newborn screening basics.',
          'Complete 15 capillary puncture questions.',
        ],
      },
      {
        day: 33,
        title: 'Specimen Handling & Processing',
        tasks: [
          'Learn labeling, transport, centrifugation, and storage requirements.',
          'Review chain of custody for forensic specimens.',
          'Complete 15 handling practice questions.',
        ],
      },
      {
        day: 34,
        title: 'Point of Care Testing (CLIA-Waived)',
        tasks: [
          'Study glucose monitoring, urinalysis (dipstick), and pregnancy tests.',
          'Review fecal occult blood and rapid tests (strep, flu).',
          'Complete 20 POCT practice questions.',
        ],
      },
      {
        day: 35,
        title: 'Week 5 Review & Lab Practical',
        tasks: [
          'Take a 60-question mixed lab exam.',
          'Run a timed order-of-draw drill again — aim for zero errors.',
          'Review every miss and its explanation.',
        ],
      },
    ],
  },
  {
    week: 6,
    title: 'EKG & Cardiovascular Testing',
    subtitle: 'EKG lead placement, tracing quality, and rhythm basics — plus patient care coordination and education.',
    days: [
      {
        day: 36,
        title: 'Cardiovascular Basics & EKG Waves',
        tasks: [
          'Study cardiac conduction and what the P, QRS, and T waves represent.',
          'Learn normal intervals and rates.',
          'Complete 20 EKG theory questions.',
        ],
      },
      {
        day: 37,
        title: '12-Lead EKG — Lead Placement',
        tasks: [
          'Learn precordial leads V1\u2013V6 and limb lead placement.',
          'Practice correct landmarks: 4th intercostal space, 5th intercostal space, midclavicular and midaxillary lines.',
          'Run a timed lead-placement drill.',
        ],
      },
      {
        day: 38,
        title: 'Performing an EKG',
        tasks: [
          'Study patient preparation and skin prep.',
          'Learn artifact troubleshooting: muscle tremor, wandering baseline, AC interference.',
          'Complete 20 EKG performance questions.',
        ],
      },
      {
        day: 39,
        title: 'Rhythm Recognition Basics',
        tasks: [
          'Review normal sinus rhythm and common arrhythmias (bradycardia, tachycardia, atrial fibrillation).',
          'Know when to notify the provider of an abnormal tracing.',
          'Take a 15-question rhythm quiz.',
        ],
      },
      {
        day: 40,
        title: 'Other Cardiovascular Testing',
        tasks: [
          'Study Holter monitor and stress test assistance.',
          'Review pulse oximetry and patient education for each test.',
          'Complete 15 cardiovascular testing questions.',
        ],
      },
      {
        day: 41,
        title: 'Patient Care Coordination & Education',
        tasks: [
          'Study care plans, referrals, and discharge instructions.',
          'Review patient teaching techniques and the teach-back method.',
          'Complete 25 coordination questions.',
        ],
      },
      {
        day: 42,
        title: 'Week 6 Review & EKG Drill',
        tasks: [
          'Take a 50-question mixed quiz on EKG and coordination.',
          'Run a timed lead-placement drill again.',
          'Log every mistake and review the explanation.',
        ],
      },
    ],
  },
  {
    week: 7,
    title: 'Administrative Assisting, Communication & Law/Ethics',
    subtitle: 'Scheduling, medical billing, HIPAA compliance, therapeutic communication, and legal responsibilities.',
    days: [
      {
        day: 43,
        title: 'Scheduling & Patient Records',
        tasks: [
          'Study appointment types, scheduling guidelines, and cancellation procedures.',
          'Review EMR/EHR basics and chart organization.',
          'Complete 20 scheduling practice questions.',
        ],
      },
      {
        day: 44,
        title: 'Medical Billing & Coding Basics',
        tasks: [
          'Learn ICD-10, CPT, and HCPCS coding basics.',
          'Review the CMS-1500 claim form and insurance verification.',
          'Complete 20 billing practice questions.',
        ],
      },
      {
        day: 45,
        title: 'HIPAA Privacy & Security',
        tasks: [
          'Study protected health information (PHI) and permitted disclosures.',
          'Review the minimum necessary rule and patient rights under the HIPAA Privacy Rule.',
          'Complete 25 HIPAA practice questions.',
        ],
      },
      {
        day: 46,
        title: 'Communication & Customer Service',
        tasks: [
          'Study therapeutic communication techniques: active listening, open-ended questions, reflection.',
          'Review barriers to communication and telephone etiquette.',
          'Complete 20 communication questions.',
        ],
      },
      {
        day: 47,
        title: 'Medical Law & Ethics',
        tasks: [
          'Study scope of practice, informed vs implied consent, and negligence.',
          'Review mandated reporting and advance directives.',
          'Complete 25 law and ethics questions.',
        ],
      },
      {
        day: 48,
        title: 'Patient Education & Cultural Competence',
        tasks: [
          'Practice the teach-back method and health-literacy-friendly explanations.',
          'Study cultural sensitivity and working with interpreters.',
          'Complete 15 patient education questions.',
        ],
      },
      {
        day: 49,
        title: 'Week 7 Review & Administrative Drill',
        tasks: [
          'Take a 60-question mixed quiz on administrative assisting, communication, and law/ethics.',
          'Review every HIPAA scenario you missed.',
          'Spend 1 hour on your weakest area from this week.',
        ],
      },
    ],
  },
  {
    week: 8,
    title: 'Exam Simulation & Final Review',
    subtitle: 'Full-length, timed, 150-question simulations under exam conditions — then target your remaining weak areas.',
    days: [
      {
        day: 50,
        title: 'Simulation 1 — Full Length',
        tasks: [
          'Take a full-length simulation: 150 scored questions, 3 hours, no interruptions.',
          'Mark the questions you guessed on.',
          'Afterwards, review every miss and its explanation.',
        ],
      },
      {
        day: 51,
        title: 'Weak-Chapter Focus',
        tasks: [
          'Re-drill your bottom two chapters from Simulation 1.',
          'Complete 30 targeted questions with explanations open.',
          'Re-read the explanations for your most-missed topics.',
        ],
      },
      {
        day: 52,
        title: 'Simulation 2 — Full Length',
        tasks: [
          'Take a second full-length simulation under exam conditions.',
          'Focus on pacing — about 72 seconds per question.',
          'Review every miss; note whether the cause was knowledge gaps or timing.',
        ],
      },
      {
        day: 53,
        title: 'Speed & Accuracy Day',
        tasks: [
          'Take three 30-question timed drills (36 minutes each).',
          'Target 85%+ accuracy.',
          'Review every wrong answer the same day.',
        ],
      },
      {
        day: 54,
        title: 'Simulation 3 — Full Length',
        tasks: [
          'Take a third full-length simulation. Score target: 390/500 or higher.',
          'Identify any remaining weak chapters and drill them for 1 hour.',
          'Update your mistake log with the topics you keep missing.',
        ],
      },
      {
        day: 55,
        title: 'Rest & Light Review',
        tasks: [
          'NO new content. Light review only — skim notes and flashcards.',
          'Prepare your exam materials: ID, exam confirmation, and a quiet testing space if testing online.',
          'Go to bed early. Aim for 8 hours of sleep.',
        ],
      },
      {
        day: 56,
        title: 'Exam Day!',
        tasks: [
          'Eat a good breakfast. Arrive early (or log in early for online proctoring).',
          'Trust your preparation — you have put in the work.',
          'Read each question twice, watch for qualifiers ("except," "not," "best"), and manage your time.',
        ],
      },
    ],
  },
];

function EmailCapture({ variant }: { variant: 'top' | 'bottom' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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
    <div className={`rounded-xl border border-white/10 bg-white/[0.03] p-6 ${variant === 'top' ? 'no-print' : ''}`}>
      <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">
        📥 {variant === 'top' ? 'Subscribe to Our Newsletter' : 'Subscribe for the Free PDF'}
      </h3>
      <p className="text-sm text-[#94A3B8] mb-4">
        Subscribe to the CCMAPractice newsletter and we&apos;ll send you the printable PDF version of this 8-week checklist.
      </p>
      {status === 'success' ? (
        <p className="text-green-400 text-sm font-medium">✅ You&apos;re subscribed! Check your email for the PDF.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-lg bg-[#1A2035] border border-white/10 text-[#F8FAFC] text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#DB2777]"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2.5 rounded-lg bg-[#DB2777] hover:bg-[#BE185D] text-white text-sm font-medium disabled:opacity-50 transition-colors"
          >
            {status === 'loading' ? 'Sending...' : 'Get PDF'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2">Something went wrong. Try again or email us directly.</p>
      )}
    </div>
  );
}

function WeekSection({
  week,
  title,
  subtitle,
  days,
}: {
  week: number;
  title: string;
  subtitle: string;
  days: { day: number; title: string; tasks: string[] }[];
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#DB2777] text-white text-sm font-bold">
          {week}
        </span>
        <h2 className="text-2xl font-bold text-[#F8FAFC]">
          Week {week}: {title}
        </h2>
      </div>
      <p className="text-sm text-[#94A3B8] mb-6 ml-11">{subtitle}</p>
      <div className="space-y-3">
        {days.map((d) => (
          <div
            key={d.day}
            className="flex items-start gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold text-[#DB2777]">
              {d.day}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#F8FAFC] text-sm mb-2">{d.title}</h3>
              <ul className="space-y-1">
                {d.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                    <span className="text-[#DB2777] mt-1">☐</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StudyChecklistClient({ faqs }: Props) {
  return (
    <div className="min-h-screen bg-[#150A12] text-[#F8FAFC]">
      {/* Nav */}
      <nav className="border-b border-white/5 bg-[#150A12]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo/logo-main.png?v=5" alt="CCMAPractice" className="h-7 w-auto" />
          </a>
          <a href="/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">
          8-Week CCMA Exam Prep Checklist
        </h1>
        <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-6">
          A week-by-week study plan to prepare for the NHA CCMA (Certified Clinical Medical
          Assistant) exam. Print it, check it, pass it.
        </p>
      </header>

      {/* Email Capture (Top) */}
      <div className="max-w-4xl mx-auto px-6 mb-8 no-print">
        <EmailCapture variant="top" />
      </div>

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="prose prose-invert max-w-none text-sm text-[#94A3B8] leading-relaxed">
          <p>
            Passing your NHA CCMA exam requires more than just reading
            textbooks. You need a structured plan that covers every blueprint
            chapter, drills the clinical skills examiners test, and helps you
            identify weak areas before test day.
          </p>
          <p className="mt-4">
            This 8-week checklist is built around the NHA CCMA exam blueprint and
            covers medical terminology, anatomy, patient intake and vital signs,
            general patient care, infection control (OSHA, CDC), phlebotomy and
            point of care testing, EKG, administrative assisting, HIPAA, and
            full-length timed simulations. Use it alongside{' '}
            <Link href="/" className="text-[#DB2777] hover:text-[#60A5FA]">
              CCMAPractice
            </Link>{' '}
            for daily practice questions, AI Tutor explanations, and progress
            tracking.
          </p>
          <p className="mt-4">
            New to the exam? Read our{' '}
            <Link href="/faq" className="text-[#DB2777] hover:text-[#60A5FA]">
              CCMA exam FAQ
            </Link>{' '}
            to understand the format. Need the content itself? Start with the{' '}
            <Link href="/theory" className="text-[#DB2777] hover:text-[#60A5FA]">
              theory guides
            </Link>{' '}
            and{' '}
            <Link href="/exams" className="text-[#DB2777] hover:text-[#60A5FA]">
              practice exams
            </Link>
            .
          </p>

          <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">
            The Eight-Week Structure
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-[#F8FAFC]">Week 1: Assessment &amp; Foundational Knowledge</strong> — Review the
              exam blueprint, take a diagnostic quiz, and build your medical
              terminology and anatomy foundation.
            </li>
            <li>
              <strong className="text-[#F8FAFC]">Week 2: Patient Intake &amp; Vital Signs</strong> — Master patient intake,
              documentation, and accurate vital sign measurement (temperature, pulse,
              respirations, blood pressure).
            </li>
            <li>
              <strong className="text-[#F8FAFC]">Week 3: General Patient Care</strong> — Positioning, wound care,
              injections, and assisting with examinations.
            </li>
            <li>
              <strong className="text-[#F8FAFC]">Week 4: Infection Control &amp; Safety</strong> — OSHA Bloodborne
              Pathogens, CDC Standard Precautions, PPE, and sterilization.
            </li>
            <li>
              <strong className="text-[#F8FAFC]">Week 5: Phlebotomy &amp; Laboratory Procedures</strong> — Venipuncture,
              order of draw, specimen handling, and CLIA-waived point of care testing.
            </li>
            <li>
              <strong className="text-[#F8FAFC]">Week 6: EKG &amp; Cardiovascular Testing</strong> — Lead placement,
              tracing quality, rhythm basics, and patient care coordination.
            </li>
            <li>
              <strong className="text-[#F8FAFC]">Week 7: Administrative, Communication &amp; Law/Ethics</strong> —
              Scheduling, billing, HIPAA, therapeutic communication, and legal responsibilities.
            </li>
            <li>
              <strong className="text-[#F8FAFC]">Week 8: Exam Simulation</strong> — Take full-length, timed, 150-question
              simulations, review every wrong answer, target weak areas, and arrive on exam
              day fully prepared.
            </li>
          </ul>
        </div>
      </section>

      {/* The Checklist */}
      <div className="max-w-4xl mx-auto px-6">
        {weeks.map((w) => (
          <WeekSection
            key={w.week}
            week={w.week}
            title={w.title}
            subtitle={w.subtitle}
            days={w.days}
          />
        ))}
      </div>

      {/* Tips Section */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">
            💡 Tips for Maximizing This Checklist
          </h3>
          <ul className="space-y-3 text-sm text-[#94A3B8]">
            <li className="flex gap-3">
              <span className="text-[#DB2777] flex-shrink-0">1.</span>
              <span><strong className="text-[#CBD5E1]">Consistency over intensity:</strong> Studying 2 hours every day is vastly more effective than cramming 8 hours on weekends.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#DB2777] flex-shrink-0">2.</span>
              <span><strong className="text-[#CBD5E1]">Learn the clinical skills, not just the facts:</strong> Vital signs, phlebotomy tube order, and EKG lead placement are heavily tested — drill them until automatic.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#DB2777] flex-shrink-0">3.</span>
              <span><strong className="text-[#CBD5E1]">Track your weak areas:</strong> After every quiz, log the chapters you got wrong. Spend the next day reviewing them.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#DB2777] flex-shrink-0">4.</span>
              <span><strong className="text-[#CBD5E1]">Know the guidelines:</strong> OSHA Bloodborne Pathogens, HIPAA Privacy Rule, CDC Standard Precautions, and AHA vital sign ranges show up again and again.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#DB2777] flex-shrink-0">5.</span>
              <span><strong className="text-[#CBD5E1]">Simulate real exam conditions:</strong> In Week 8, take simulations in a quiet room with no phone and a strict 3-hour timer.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#DB2777] flex-shrink-0">6.</span>
              <span><strong className="text-[#CBD5E1]">Use the CCMAPractice AI Tutor:</strong> When a concept doesn&apos;t click, ask the AI Tutor to explain it in plain language.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer text-[#F8FAFC] font-medium text-sm hover:bg-white/[0.06] transition-colors">
                <span>{faq.question}</span>
                <span className="text-[#DB2777] text-lg group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-[#94A3B8] leading-relaxed border-t border-white/5 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Email Capture (Bottom) */}
      <div className="max-w-4xl mx-auto px-6 mb-16 no-print">
        <EmailCapture variant="bottom" />
      </div>

      {/* Related Resources */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">📚 Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/theory" className="p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <h3 className="font-semibold text-[#F8FAFC] mb-1 text-sm">NHA CCMA Theory Guides</h3>
            <p className="text-xs text-[#64748B]">Complete study guides for all 13 blueprint chapters — anatomy, vitals, phlebotomy, EKG, and more.</p>
          </a>
          <a href="/exams" className="p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <h3 className="font-semibold text-[#F8FAFC] mb-1 text-sm">NHA CCMA Practice Exams</h3>
            <p className="text-xs text-[#64748B]">1,200+ practice questions with detailed explanations and full-length simulations.</p>
          </a>
          <a href="/faq" className="p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <h3 className="font-semibold text-[#F8FAFC] mb-1 text-sm">CCMA Exam FAQ</h3>
            <p className="text-xs text-[#64748B]">Format, scoring, fees, renewal, and everything else about the NHA CCMA exam.</p>
          </a>
          <a href="/pricing" className="p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <h3 className="font-semibold text-[#F8FAFC] mb-1 text-sm">CCMAPractice Plans</h3>
            <p className="text-xs text-[#64748B]">Unlock unlimited practice questions, AI Tutor sessions, and full exam simulations.</p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 no-print">
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
