import { BlogPostingJsonLd, BreadcrumbListJsonLd, LearningResourceJsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import type { Metadata } from 'next';
import RelatedStudyPlatforms from '@/components/marketing/RelatedStudyPlatforms';

export const metadata: Metadata = {
  title: 'CCMA Exam Structure: 150 Scored Questions, 3 Hours & What\u2019s on the Test — CCMAPractice',
  description:
    'Complete breakdown of the NHA CCMA exam structure: 150 scored questions plus 30 pretest questions, 3 hours, the 390/500 passing score, and how the 13 blueprint chapters map to the test.',
  alternates: {
    canonical: 'https://ccmapractice.com/blog/ccma-exam-structure',
    languages: {
      en: 'https://ccmapractice.com/blog/ccma-exam-structure',
    },
  },
  openGraph: {
    title: 'CCMA Exam Structure: 150 Scored Questions, 3 Hours & What\u2019s on the Test — CCMAPractice',
    description:
      'Complete breakdown of the NHA CCMA exam: question counts, time limits, passing score, and the 13 blueprint chapters.',
    url: 'https://ccmapractice.com/blog/ccma-exam-structure',
    type: 'article',
    images: [
      {
        url: 'https://ccmapractice.com/images/blog/ame-license-canada.jpg',
        width: 1200,
        height: 630,
        alt: 'CCMA Exam Structure',
      },
    ],
  },
  twitter: {
    title: 'CCMA Exam Structure: 150 Scored Questions, 3 Hours & What\u2019s on the Test — CCMAPractice',
  },
  other: {
    'article:published_time': '2026-05-20',
    'article:modified_time': '2026-08-18',
  },
};

export default function CcmaExamStructurePage() {
  return (
    <>
      <BlogPostingJsonLd
        headline="CCMA Exam Structure: 150 Scored Questions, 3 Hours & What's on the Test"
        description="Complete breakdown of the NHA CCMA exam: 150 scored questions plus 30 pretest questions, 3 hours, the 390/500 passing score, and how the 13 blueprint chapters map to the test."
        datePublished="2026-05-20"
        dateModified="2026-08-18"
        image={["https://ccmapractice.com/images/blog/ame-license-canada.jpg"]}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', url: 'https://ccmapractice.com' },
          { name: 'Blog', url: 'https://ccmapractice.com/blog' },
          { name: 'CCMA Exam Structure', url: 'https://ccmapractice.com/blog/ccma-exam-structure' },
        ]}
      />
      <div className="min-h-screen bg-[#0A0E1A] text-[#F8FAFC]">
        <nav className="border-b border-white/5 bg-[#0A0E1A]/80 backdrop-blur-md">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo/logo-main.png?v=4" alt="CCMAPractice" className="h-7 w-auto" />
            </a>
            <div className="flex items-center gap-4">
              <a href="/blog" className="text-sm text-[#94A3B8] hover:text-white transition-colors">← Blog</a>
            </div>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-6 pt-16 pb-24">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-medium text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-1 rounded">Exams</span>
              <span className="text-xs text-[#64748B]">May 20, 2026 *updated August 18, 2026</span>
              <span className="text-xs text-[#64748B]">· 14 min read</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">CCMA Exam Structure: 150 Scored Questions, 3 Hours & What\u2019s on the Test</h1>
            <p className="text-lg text-[#94A3B8]">
              The NHA CCMA exam is a computer-based, multiple-choice exam — but the details matter. This guide
              breaks down exactly what you are walking into, from the question mix to the 13 blueprint
              chapters behind every scored item.
            </p>
          </header>

          {/* Author byline */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
              CP
            </div>
            <div>
              <p className="text-sm font-medium text-[#F8FAFC]">CCMAPractice Team</p>
              <p className="text-xs text-[#64748B]">NHA CCMA exam preparation specialists — exam-structure data verified against the official NHA candidate handbook</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-[#CBD5E1] leading-relaxed space-y-6">
            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">The Exam at a Glance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse my-6">
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4 font-medium text-[#F8FAFC]">Total questions</td>
                    <td className="py-2 pr-4">180 (150 scored + 30 unscored pretest)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4 font-medium text-[#F8FAFC]">Time limit</td>
                    <td className="py-2 pr-4">3 hours (180 minutes)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4 font-medium text-[#F8FAFC]">Passing score</td>
                    <td className="py-2 pr-4">390 / 500 (~78%)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4 font-medium text-[#F8FAFC]">Format</td>
                    <td className="py-2 pr-4">Computer-based, multiple choice</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4 font-medium text-[#F8FAFC]">Delivery</td>
                    <td className="py-2 pr-4">PSI testing center or online proctoring</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4 font-medium text-[#F8FAFC]">Exam fee</td>
                    <td className="py-2 pr-4">$155–165</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-[#F8FAFC]">Pass rate (2024)</td>
                    <td className="py-2 pr-4">81.4%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <em>Note:</em> verify the exact numbers in the current official NHA CCMA candidate handbook for
              your exam window — NHA occasionally updates formats and fees.
            </p>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">Scored vs. Pretest Questions</h2>
            <p>
              Of the 180 questions you will answer, only <strong>150 count toward your score</strong>. The
              other <strong>30 are unscored pretest questions</strong> that NHA uses to validate new items for
              future exams. You will not know which questions are pretest — they are distributed randomly
              through the exam — so treat every question as scored. There is no penalty for guessing, so never
              leave a question blank.
            </p>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">The 13 Blueprint Chapters</h2>
            <p>The official NHA CCMA blueprint organizes the exam content into 13 chapters:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Foundational Knowledge and Basic Science</strong> — medical terminology, abbreviations, and basic science concepts.</li>
              <li><strong>Anatomy and Physiology</strong> — body systems, organs, and their functions.</li>
              <li><strong>Patient Intake and Vitals</strong> — patient interviews, vital signs, and intake documentation.</li>
              <li><strong>General Patient Care Part 1</strong> — medication administration, injections, and basic patient care.</li>
              <li><strong>General Patient Care Part 2</strong> — wound care, specimen collection, and advanced patient care.</li>
              <li><strong>Infection Control and Safety</strong> — OSHA bloodborne pathogens, CDC standard precautions, hand hygiene, and PPE.</li>
              <li><strong>Point of Care Testing and Laboratory Procedures</strong> — CLIA-waived tests, specimen handling, and lab safety.</li>
              <li><strong>Phlebotomy</strong> — venipuncture, order of draw, tube types and additives, and complications.</li>
              <li><strong>EKG and Cardiovascular Testing</strong> — 12-lead EKG, lead placement, and cardiac monitoring.</li>
              <li><strong>Patient Care Coordination and Education</strong> — patient teaching, referrals, and care coordination.</li>
              <li><strong>Administrative Assisting</strong> — scheduling, medical billing, insurance, and office procedures.</li>
              <li><strong>Communication and Customer Service</strong> — therapeutic communication, cultural competence, and professionalism.</li>
              <li><strong>Medical Law and Ethics</strong> — HIPAA, informed consent, scope of practice, and legal responsibilities.</li>
            </ol>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">Clinical Content You Will See Again and Again</h2>
            <p>Across the blueprint, these clinical topics appear disproportionately often:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Vital signs</strong> — normal ranges for blood pressure, pulse, respirations, and temperature, plus how to measure them correctly.</li>
              <li><strong>Order of draw</strong> — blood cultures first, then light blue, red/SST, green, lavender, and gray tubes, and which additive each contains.</li>
              <li><strong>Five rights of medication administration</strong> — right patient, right medication, right dose, right route, right time.</li>
              <li><strong>Injection sites and angles</strong> — intradermal (15°), subcutaneous (45°), and intramuscular (90°), with the correct sites for each.</li>
              <li><strong>HIPAA scenarios</strong> — what you may and may not disclose, and to whom.</li>
              <li><strong>Standard precautions</strong> — treating all blood and body fluids as potentially infectious, per CDC guidance.</li>
              <li><strong>EKG lead placement</strong> — the precordial leads (V1–V6) and limb leads.</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">How to Pace the 3 Hours</h2>
            <p>
              With 150 scored questions in 180 minutes, you have about <strong>1.2 minutes per question</strong>{' '}
              — comfortably more than the 1 minute per question many candidates fear. Use this rhythm:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>First pass:</strong> answer everything you know, flag the rest.</li>
              <li><strong>Second pass:</strong> return to flagged questions, eliminating wrong answers first.</li>
              <li><strong>Never leave blanks:</strong> there is no guessing penalty.</li>
            </ul>
            <p>
              Read our{' '}
              <a href="/blog/ccma-study-techniques" className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
                CCMA study techniques
              </a>{' '}
              to build that pacing skill before exam day.
            </p>
            <p>
              Ready to practice? Try{' '}
              <a href="/free-ccma-practice-questions" className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
                free CCMA practice questions
              </a>{' '}
              in the real exam format.
            </p>
          </div>

          <RelatedStudyPlatforms />
        </article>
      </div>

      <LearningResourceJsonLd
        name="CCMA Exam Structure: 150 Scored Questions, 3 Hours"
        description="Complete breakdown of the NHA CCMA exam — question counts, time limits, passing score, and the 13 blueprint chapters."
        educationalLevel="Professional"
        teaches={['NHA CCMA Exam', 'Exam Blueprint', 'Clinical Procedures', 'Phlebotomy & EKG', 'Medical Law and Ethics']}
        resourceType="Guide"
      />
    </>
  );
}
