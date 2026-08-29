import { BlogPostingJsonLd, BreadcrumbListJsonLd, LearningResourceJsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import type { Metadata } from 'next';
import RelatedStudyPlatforms from '@/components/marketing/RelatedStudyPlatforms';

export const metadata: Metadata = {
  title: 'CCMA Study Guide: Master the 13 Blueprint Chapters — CCMAPractice',
  description:
    'Master the NHA CCMA exam content with this complete study guide. The 13 blueprint chapters, clinical essentials (vital signs, phlebotomy, EKG, injections), HIPAA, and infection control — all in one guide.',
  alternates: {
    canonical: 'https://ccmapractice.com/blog/ccma-study-guide',
    languages: {
      en: 'https://ccmapractice.com/blog/ccma-study-guide',
    },
  },
  openGraph: {
    title: 'CCMA Study Guide: Master the 13 Blueprint Chapters — CCMAPractice',
    description:
      'Master the NHA CCMA exam content with this complete study guide. The 13 blueprint chapters, clinical essentials, HIPAA, and infection control — all in one guide.',
    url: 'https://ccmapractice.com/blog/ccma-study-guide',
    type: 'article',
    images: [
      {
        url: 'https://ccmapractice.com/images/blog/ame-license-canada.jpg',
        width: 1200,
        height: 630,
        alt: 'CCMA Study Guide',
      },
    ],
  },
  twitter: {
    title: 'CCMA Study Guide: Master the 13 Blueprint Chapters — CCMAPractice',
  },
  other: {
    'article:published_time': '2025-04-02',
    'article:modified_time': '2026-08-18',
  },
};

export default function CcmaStudyGuidePage() {
  return (
    <>
      <BlogPostingJsonLd
        headline="CCMA Study Guide: Master the 13 Blueprint Chapters"
        description="Master the NHA CCMA exam content with this complete study guide. The 13 blueprint chapters, clinical essentials like vital signs, phlebotomy, EKG, and injections, plus HIPAA and infection control."
        datePublished="2025-04-02"
        dateModified="2026-08-18"
        image={["https://ccmapractice.com/images/blog/ame-license-canada.jpg"]}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', url: 'https://ccmapractice.com' },
          { name: 'Blog', url: 'https://ccmapractice.com/blog' },
          { name: 'CCMA Study Guide', url: 'https://ccmapractice.com/blog/ccma-study-guide' },
        ]}
      />
      <div className="min-h-screen bg-[#150A12] text-[#F8FAFC]">
        <nav className="border-b border-white/5 bg-[#150A12]/80 backdrop-blur-md">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo/logo-main.png?v=5" alt="CCMAPractice" className="h-7 w-auto" />
            </a>
            <div className="flex items-center gap-4">
              <a href="/blog" className="text-sm text-[#94A3B8] hover:text-white transition-colors">← Blog</a>
            </div>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-6 pt-16 pb-24">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-medium text-[#DB2777] bg-[#DB2777]/10 px-2 py-1 rounded">Study Guide</span>
              <span className="text-xs text-[#64748B]">April 2, 2025 *updated August 18, 2026</span>
              <span className="text-xs text-[#64748B]">· 10 min read</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">CCMA Study Guide: Master the 13 Blueprint Chapters</h1>
            <p className="text-lg text-[#94A3B8]">
              The NHA CCMA exam is scenario-based — which means the winning skill is applying clinical
              knowledge the way you would in a real office. This guide maps the entire 13-chapter blueprint so
              you know exactly what to study and what the exam rewards.
            </p>
          </header>

          {/* Author byline */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DB2777] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
              CP
            </div>
            <div>
              <p className="text-sm font-medium text-[#F8FAFC]">CCMAPractice Team</p>
              <p className="text-xs text-[#64748B]">NHA CCMA exam preparation specialists — clinical drills for the Certified Clinical Medical Assistant exam</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-[#CBD5E1] leading-relaxed space-y-6">
            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">Why Application Beats Memorization</h2>
            <p>
              The CCMA exam does not reward rote recall — it rewards <em>clinical judgment</em>. Instead of
              memorizing hundreds of isolated facts, you need to know which fact applies in which patient
              scenario, and what the safest next action is. Candidates who study with scenarios — not just
              flashcards — consistently outperform those who cram.
            </p>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">The 13 Blueprint Chapters at a Glance</h2>
            <p>The NHA organizes the exam into 13 chapters. Here is the mental map you need:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>1. Foundational Knowledge and Basic Science:</strong> medical terminology, abbreviations, and basic science. The vocabulary of the exam — know common prefixes, suffixes, and abbreviations cold.</li>
              <li><strong>2. Anatomy and Physiology:</strong> body systems, organs, and their functions. Focus on the systems you touch clinically — cardiovascular, respiratory, musculoskeletal, and integumentary.</li>
              <li><strong>3. Patient Intake and Vitals:</strong> patient interviews, vital signs, and intake documentation. The most tested clinical territory — know normal ranges and measurement technique.</li>
              <li><strong>4. General Patient Care Part 1:</strong> medication administration, injections, and basic patient care. The five rights, injection angles, and sites.</li>
              <li><strong>5. General Patient Care Part 2:</strong> wound care, specimen collection, and advanced patient care.</li>
              <li><strong>6. Infection Control and Safety:</strong> OSHA bloodborne pathogens, CDC standard precautions, hand hygiene, and PPE. Heavy legal-safety territory.</li>
              <li><strong>7. Point of Care Testing and Laboratory Procedures:</strong> CLIA-waived tests, specimen handling, and lab safety.</li>
              <li><strong>8. Phlebotomy:</strong> venipuncture, order of draw, tube types and additives, and complications.</li>
              <li><strong>9. EKG and Cardiovascular Testing:</strong> 12-lead EKG, lead placement, and cardiac monitoring.</li>
              <li><strong>10. Patient Care Coordination and Education:</strong> patient teaching, referrals, and care coordination.</li>
              <li><strong>11. Administrative Assisting:</strong> scheduling, medical billing, insurance, and office procedures.</li>
              <li><strong>12. Communication and Customer Service:</strong> therapeutic communication, cultural competence, and professionalism.</li>
              <li><strong>13. Medical Law and Ethics:</strong> HIPAA, informed consent, scope of practice, and legal responsibilities.</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">Clinical Essentials to Know Cold</h2>
            <p>While all 13 chapters are fair game, these clinical essentials appear disproportionately often:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Vital signs:</strong> BP {'<'} 120/80, pulse 60–100 bpm, respirations 12–20/min, oral temp ~98.6°F (37°C). Know how to measure each and when to report abnormal values.</li>
              <li><strong>Order of draw:</strong> blood cultures → light blue (sodium citrate) → red/SST (serum) → green (heparin) → lavender (EDTA) → gray (fluoride).</li>
              <li><strong>Five rights of medication administration:</strong> right patient, right medication, right dose, right route, right time.</li>
              <li><strong>Injection angles:</strong> intradermal 15°, subcutaneous 45°, intramuscular 90° — and the correct sites for each (deltoid, vastus lateralis, ventrogluteal, abdomen).</li>
              <li><strong>EKG leads:</strong> V1 at the 4th intercostal space right sternal border, V2 left sternal border, V4 5th intercostal space midclavicular line.</li>
              <li><strong>Standard precautions:</strong> treat all blood and body fluids as potentially infectious (CDC).</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">HIPAA and OSHA: The Rules Behind the Scenarios</h2>
            <p>
              HIPAA and OSHA content spans both clinical and administrative questions. The high-yield rules:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>HIPAA Privacy Rule:</strong> PHI may be disclosed with patient authorization, or without it for treatment, payment, and healthcare operations. Never share PHI with unauthorized family or friends without the patient's consent.</li>
              <li><strong>OSHA Bloodborne Pathogens:</strong> use PPE, follow standard precautions, dispose of sharps in puncture-resistant containers, and follow the exposure control plan after any exposure.</li>
              <li><strong>CLIA:</strong> waived tests (urine dipsticks, glucose meters, pregnancy tests) are the category you will perform in most ambulatory settings.</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">How to Study This Content</h2>
            <p>
              Reading about clinical skills is not enough — you need reps. CCMAPractice's question bank covers
              all 13 chapters with scenario-based questions and guideline references, and timed simulations
              replicate the real exam. Start with{' '}
              <a href="/free-ccma-practice-questions" className="text-[#DB2777] hover:text-[#60A5FA] transition-colors">
                free CCMA practice questions
              </a>{' '}
              to practice your clinical reasoning today.
            </p>
            <p>
              For the full certification roadmap, see our{' '}
              <a href="/blog/ccma-b1-certification-guide" className="text-[#DB2777] hover:text-[#60A5FA] transition-colors">
                step-by-step CCMA certification guide
              </a>.
            </p>
          </div>

          <RelatedStudyPlatforms />
        </article>
      </div>

      <LearningResourceJsonLd
        name="CCMA Study Guide — Master the 13 Blueprint Chapters"
        description="Complete study guide for the NHA CCMA exam covering the 13 blueprint chapters, clinical essentials, HIPAA, OSHA, and infection control."
        educationalLevel="Professional"
        teaches={['NHA CCMA Blueprint', 'Clinical Procedures', 'Vital Signs', 'Phlebotomy & EKG', 'Medical Law and Ethics']}
        resourceType="Guide"
      />
    </>
  );
}
