import { BlogPostingJsonLd, BreadcrumbListJsonLd, LearningResourceJsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import type { Metadata } from 'next';
import RelatedStudyPlatforms from '@/components/marketing/RelatedStudyPlatforms';

export const metadata: Metadata = {
  title: '12-Week CCMA Exam Study Plan: A Step-by-Step Schedule — CCMAPractice',
  description:
    'A proven 12-week study plan for the NHA CCMA exam. Week-by-week schedule covering the 13 blueprint chapters, clinical drills, and timed simulations for the Certified Clinical Medical Assistant exam.',
  alternates: {
    canonical: 'https://ccmapractice.com/blog/ccma-exam-study-plan',
    languages: {
      en: 'https://ccmapractice.com/blog/ccma-exam-study-plan',
    },
  },
  openGraph: {
    title: '12-Week CCMA Exam Study Plan: A Step-by-Step Schedule — CCMAPractice',
    description:
      'A proven 12-week study plan for the NHA CCMA exam. Week-by-week schedule covering the blueprint chapters, clinical drills, and timed simulations.',
    url: 'https://ccmapractice.com/blog/ccma-exam-study-plan',
    type: 'article',
    images: [
      {
        url: 'https://ccmapractice.com/images/blog/ame-license-canada.jpg',
        width: 1200,
        height: 630,
        alt: '12-Week CCMA Exam Study Plan',
      },
    ],
  },
  twitter: {
    title: '12-Week CCMA Exam Study Plan: A Step-by-Step Schedule — CCMAPractice',
  },
  other: {
    'article:published_time': '2026-05-22',
    'article:modified_time': '2026-08-18',
  },
};

export default function CcmaExamStudyPlanPage() {
  return (
    <>
      <BlogPostingJsonLd
        headline="12-Week CCMA Exam Study Plan: A Step-by-Step Schedule"
        description="A proven 12-week study plan for the NHA CCMA exam. Week-by-week schedule covering the blueprint map, clinical drills, and timed simulations for the Certified Clinical Medical Assistant certification."
        datePublished="2026-05-22"
        dateModified="2026-08-18"
        image={["https://ccmapractice.com/images/blog/ame-license-canada.jpg"]}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', url: 'https://ccmapractice.com' },
          { name: 'Blog', url: 'https://ccmapractice.com/blog' },
          { name: '12-Week CCMA Exam Study Plan', url: 'https://ccmapractice.com/blog/ccma-exam-study-plan' },
        ]}
      />
      <div className="min-h-screen bg-[#0A0E1A] text-[#F8FAFC]">
        <nav className="border-b border-white/5 bg-[#0A0E1A]/80 backdrop-blur-md">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo/logo-main.png?v=3" alt="CCMAPractice" className="h-7 w-auto" />
            </a>
            <div className="flex items-center gap-4">
              <a href="/blog" className="text-sm text-[#94A3B8] hover:text-white transition-colors">← Blog</a>
            </div>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-6 pt-16 pb-24">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-medium text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-1 rounded">Study Plan</span>
              <span className="text-xs text-[#64748B]">May 22, 2026 *updated August 18, 2026</span>
              <span className="text-xs text-[#64748B]">· 11 min read</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">12-Week CCMA Exam Study Plan: A Step-by-Step Schedule</h1>
            <p className="text-lg text-[#94A3B8]">
              Twelve weeks is the sweet spot for NHA CCMA prep: enough time to learn the 13 blueprint chapters
              deeply, short enough to keep you focused. This plan works whether you are a recent graduate or a
              working medical assistant — adjust the daily time to your schedule.
            </p>
          </header>

          {/* Author byline */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
              CP
            </div>
            <div>
              <p className="text-sm font-medium text-[#F8FAFC]">CCMAPractice Team</p>
              <p className="text-xs text-[#64748B]">NHA CCMA exam preparation specialists — structured plans for busy medical assistants</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-[#CBD5E1] leading-relaxed space-y-6">
            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">How This Plan Works</h2>
            <p>
              The plan has three phases: <strong>Map (Weeks 1–2)</strong> to learn the blueprint's structure,{' '}
              <strong>Drill (Weeks 3–8)</strong> to build clinical knowledge chapter by chapter, and{' '}
              <strong>Simulate (Weeks 9–12)</strong> to lock in exam-day performance. Plan on 45–60 minutes per
              day, 5–6 days per week.
            </p>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">Phase 1: Map the Blueprint (Weeks 1–2)</h2>
            <p>Your goal in these two weeks is a mental map of the CCMA blueprint, not mastery:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Week 1:</strong> Download the official NHA CCMA candidate handbook and read the content areas. Skim the 13 blueprint chapters — writing one line per chapter about what it covers. Read the foundational chapters (medical terminology, anatomy and physiology).</li>
              <li><strong>Week 2:</strong> Take a diagnostic practice quiz (30–40 questions, untimed). Record your accuracy per chapter. This is your baseline — your weak chapters are your priority list for Phase 2.</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">Phase 2: Drill Chapter by Chapter (Weeks 3–8)</h2>
            <p>Each week covers one or two chapters with the same rhythm: read the chapter's key concepts, then drill practice questions, reviewing every explanation and its guideline reference.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Week 3:</strong> Patient Intake and Vitals + Foundational Knowledge — vital sign ranges, measurement technique, and intake documentation (highest-yield territory on the exam).</li>
              <li><strong>Week 4:</strong> General Patient Care Parts 1 and 2 — medication administration, injections, wound care, and specimen collection.</li>
              <li><strong>Week 5:</strong> Infection Control and Safety — OSHA bloodborne pathogens, CDC standard precautions, hand hygiene, and PPE.</li>
              <li><strong>Week 6:</strong> Phlebotomy — order of draw, tube types and additives, venipuncture technique, and complications.</li>
              <li><strong>Week 7:</strong> Point of Care Testing + EKG — CLIA-waived tests, specimen handling, 12-lead EKG, and lead placement.</li>
              <li><strong>Week 8:</strong> Administrative chapters — care coordination, administrative assisting, communication, and medical law and ethics (HIPAA). Revisit your bottom three chapters from the diagnostic.</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">Phase 3: Simulate and Harden (Weeks 9–12)</h2>
            <p>This phase is all about exam conditions:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Week 9:</strong> First full-length timed simulation (150 scored questions, 3 hours). Review every miss.</li>
              <li><strong>Week 10:</strong> Second simulation. Focus on pacing — about 1.2 minutes per question — and target the chapters that cost you the most points.</li>
              <li><strong>Week 11:</strong> Third simulation plus targeted drills on remaining weak chapters. Start daily 5-minute clinical recall warmups (normal ranges, order of draw, five rights).</li>
              <li><strong>Week 12:</strong> One final simulation mid-week. After that, light review only — vital sign ranges, high-yield topics, and your mistake log. Rest the day before the exam.</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">Daily Rhythm (45–60 Minutes)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>5 min:</strong> Recall warmup — normal vital signs, order of draw, five rights, injection angles.</li>
              <li><strong>30–40 min:</strong> Chapter drill — 20–30 practice questions on the current chapter.</li>
              <li><strong>10 min:</strong> Review misses and log the guideline references.</li>
              <li><strong>5 min:</strong> Quiz yourself on the topics from memory (active recall).</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mt-10">Tools to Run This Plan</h2>
            <p>
              CCMAPractice gives you everything this plan needs in one place: chapter-organized questions
              with guideline references, adaptive difficulty, analytics that track your chapter-level accuracy,
              and full-length timed simulations in the real exam format. Start with{' '}
              <a href="/free-ccma-practice-questions" className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
                free CCMA practice questions
              </a>{' '}
              to build your baseline this week.
            </p>
          </div>

          <RelatedStudyPlatforms />
        </article>
      </div>

      <LearningResourceJsonLd
        name="12-Week CCMA Exam Study Plan"
        description="Step-by-step 12-week study schedule for the NHA CCMA exam — blueprint mapping, clinical drills, and timed simulations."
        educationalLevel="Professional"
        teaches={['NHA CCMA Study Schedule', 'Clinical Drills', 'Timed Simulations', 'Chapter-Level Analytics']}
        resourceType="Guide"
      />
    </>
  );
}
