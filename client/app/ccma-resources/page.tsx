import { BreadcrumbListJsonLd, LearningResourceJsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';
import RelatedStudyPlatforms from '@/components/marketing/RelatedStudyPlatforms';

export const metadata: Metadata = {
  title: 'CCMA Resources Hub — CCMAPractice Exam Prep',
  description:
    'The best resources for NHA CCMA exam prep: official NHA links, the 13-chapter exam blueprint, OSHA/HIPAA/CDC/AHA guidelines, study checklists, and free CCMA practice questions.',
  alternates: {
    canonical: 'https://ccmapractice.com/ccma-resources',
    languages: {
      en: 'https://ccmapractice.com/ccma-resources',
    },
  },
  openGraph: {
    title: 'CCMA Resources Hub — CCMAPractice Exam Prep',
    description:
      'The best resources for NHA CCMA exam prep: official NHA links, the exam blueprint, OSHA/HIPAA/CDC guidelines, study checklists, and free practice questions.',
    url: 'https://ccmapractice.com/ccma-resources',
    type: 'website',
    images: [
      {
        url: 'https://ccmapractice.com/images/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'CCMA Resources Hub — CCMAPractice',
      },
    ],
  },
  twitter: {
    title: 'CCMA Resources Hub — CCMAPractice Exam Prep',
  },
  other: {
    'article:published_time': '2026-05-20',
    'article:modified_time': '2026-08-18',
  },
};

interface ResourceLink {
  title: string;
  href: string;
  description: string;
}

const sections: {
  id: string;
  title: string;
  description: string;
  resources: ResourceLink[];
}[] = [
  {
    id: 'new-students',
    title: 'For New Students',
    description:
      'Starting your journey to becoming a Certified Clinical Medical Assistant? These guides walk you through the certification process, explain the exam, and help you choose the right study path.',
    resources: [
      {
        title: 'How to Get Your CCMA Certification',
        href: '/blog/ccma-b1-certification-guide',
        description:
          'A complete step-by-step guide covering NHA eligibility, the computer-based exam format, the 390/500 passing score, and study tips to help you go from candidate to certified CCMA.',
      },
      {
        title: 'CCMA Exam Structure: 150 Questions, 3 Hours',
        href: '/blog/ccma-exam-structure',
        description:
          'Everything about the NHA CCMA exam format — scored vs. pretest questions, time limits, the passing score, and how the 13 blueprint chapters map to the test.',
      },
      {
        title: 'CCMA Study Guide: Master the 13 Chapters',
        href: '/blog/ccma-study-guide',
        description:
          'Master the clinical and administrative content the CCMA exam rewards — vital signs, phlebotomy, EKG, injections, HIPAA, and infection control. The single most important guide for CCMA success.',
      },
      {
        title: 'About CCMAPractice',
        href: '/about',
        description:
          'Learn about our mission to help every medical assistant pass their NHA CCMA exam. Discover how our AI-powered platform combines clinical depth with modern technology to transform exam preparation.',
      },
    ],
  },
  {
    id: 'official-resources',
    title: 'Official NHA & Guideline Resources',
    description:
      'The official sources the exam is built from. These are the authoritative references behind every question on the CCMA blueprint.',
    resources: [
      {
        title: 'NHA — National Healthcareer Association',
        href: 'https://www.nhanow.com/',
        description:
          'The certifying body for the CCMA credential. Register for the exam, download the candidate handbook, and access official exam bulletins and study materials.',
      },
      {
        title: 'Official CCMA Exam Blueprint',
        href: 'https://www.nhanow.com/certifications/clinical-medical-assistant',
        description:
          'The 13-chapter blueprint that defines exactly what the CCMA exam tests — from Foundational Knowledge and Basic Science to Medical Law and Ethics.',
      },
      {
        title: 'OSHA Bloodborne Pathogens Standard',
        href: 'https://www.osha.gov/bloodborne-pathogens',
        description:
          'The federal standard covering exposure control, universal precautions, PPE, and post-exposure follow-up. Directly tested in the Infection Control and Safety chapter.',
      },
      {
        title: 'HIPAA Privacy Rule',
        href: 'https://www.hhs.gov/hipaa/for-professionals/privacy/index.html',
        description:
          'The federal rule protecting patients\u2019 protected health information (PHI). Core content for the Medical Law and Ethics and Communication chapters.',
      },
      {
        title: 'CDC Standard Precautions',
        href: 'https://www.cdc.gov/infection-control/hcp/basics/standard-precautions.html',
        description:
          'The CDC guidelines for preventing infection transmission in healthcare settings — hand hygiene, PPE, safe injection practices, and environmental cleaning.',
      },
      {
        title: 'AHA CPR & First Aid Guidelines',
        href: 'https://cpr.heart.org/',
        description:
          'American Heart Association guidelines for CPR, AED use, and emergency response. Tested in patient care and emergency scenarios.',
      },
      {
        title: 'CLIA Waived Testing',
        href: 'https://www.cdc.gov/lab-quality/php/waived-tests/index.html',
        description:
          'CLIA-waived tests are simple, low-risk laboratory tests you can perform in a physician office — urine dipsticks, glucose meters, and pregnancy tests.',
      },
    ],
  },
  {
    id: 'study-tools',
    title: 'Study Tools & Reference',
    description:
      'Build your knowledge with structured study guides, interactive checklists, and comprehensive reference materials. These resources are designed to help you study efficiently and track your progress.',
    resources: [
      {
        title: 'CCMA Exam Study Resources: Best Books & Tools',
        href: '/blog/ccma-exam-study-resources',
        description:
          'The definitive list of CCMA exam study resources — official NHA materials, guideline references, medical assisting textbooks, and AI-powered practice tools.',
      },
      {
        title: '30-Day CCMA Exam Prep Checklist',
        href: '/study-checklist',
        description:
          'A free, printable 30-day study plan designed for focused exam preparation. Features daily tasks covering the blueprint chapters, clinical drills, and full-length timed simulations. Perfect for candidates with foundational knowledge who want a structured sprint to exam day.',
      },
      {
        title: 'How to Study for the CCMA Exam: 10 Proven Techniques',
        href: '/blog/ccma-study-techniques',
        description:
          'Ten proven techniques for the CCMA exam — blueprint mapping, active recall, clinical mnemonics, and weak-chapter targeting. Techniques that actually move your score.',
      },
      {
        title: 'Frequently Asked Questions',
        href: '/faq',
        description:
          'Answers to common questions about CCMA certification, exam strategy, CCMAPractice features, pricing, and how our AI-powered adaptive learning platform works.',
      },
    ],
  },
  {
    id: 'clinical-content',
    title: 'Clinical Content Deep Dives',
    description:
      'Deep-dive resources on the clinical skills the CCMA exam tests. Whether you need phlebotomy, EKG, or medical law review, these guides break down the content and exam strategy for each area.',
    resources: [
      {
        title: 'CCMA Study Guide: Clinical Fundamentals',
        href: '/blog/ccma-study-guide',
        description:
          'A comprehensive guide to the clinical content on the CCMA exam — vital sign ranges, the order of draw, injection sites, EKG basics, and infection control.',
      },
      {
        title: 'How AI Is Changing CCMA Exam Preparation',
        href: '/blog/ai-ccma-exam-preparation',
        description:
          'How AI-powered platforms are transforming CCMA exam prep — adaptive question curation, guideline-referenced explanations, and AI tutoring for all 13 blueprint chapters.',
      },
      {
        title: 'Top 10 Mistakes CCMA Exam Candidates Make',
        href: '/blog/ccma-study-mistakes',
        description:
          'The most common mistakes CCMA exam candidates make — from memorizing vital signs without context to skipping the pretest questions. Learn how to pass on your first try.',
      },
      {
        title: '12-Week CCMA Exam Study Plan',
        href: '/blog/ccma-exam-study-plan',
        description:
          'A step-by-step 12-week schedule: blueprint mapping, chapter drills, and timed simulations. The sweet spot between thorough preparation and staying focused.',
      },
    ],
  },
  {
    id: 'exam-preparation',
    title: 'Exam Preparation & Practice',
    description: 'Practice makes permanent. These resources help you drill exam-style clinical questions, build speed, and simulate the real exam before test day.',
    resources: [
      {
        title: 'Free CCMA Practice Questions',
        href: '/free-ccma-practice-questions',
        description:
          '10 free NHA-style clinical questions covering vital signs, the order of draw, the five rights of medication administration, and HIPAA — with the guideline reference for every answer. No signup needed.',
      },
      {
        title: 'CCMA Exam Structure — Full Breakdown',
        href: '/blog/ccma-exam-structure',
        description:
          'Scored vs. pretest questions, time limits, and the 390/500 passing score — verify the details in the official NHA candidate handbook for your exam window.',
      },
      {
        title: 'Pricing Plans',
        href: '/pricing',
        description:
          'Compare CCMAPractice plans and choose the one that fits your study needs. Start free and upgrade when you are ready to go all in.',
      },
    ],
  },
];

export default function CcmaResourcesPage() {
  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', url: 'https://ccmapractice.com' },
          { name: 'CCMA Resources', url: 'https://ccmapractice.com/ccma-resources' },
        ]}
      />
      <div className="min-h-screen bg-[#150A12] text-[#F8FAFC]">
        <nav className="border-b border-white/5 bg-[#150A12]/80 backdrop-blur-md">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo/logo-main.png?v=5" alt="CCMAPractice" className="h-7 w-auto" />
            </a>
            <div className="flex items-center gap-4">
              <a href="/faq" className="text-sm text-[#94A3B8] hover:text-white transition-colors">← FAQ</a>
            </div>
          </div>
        </nav>

        {/* Header */}
        <header className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">CCMA Resources Hub</h1>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            Everything you need to prepare for the NHA CCMA certification
            exam — official links, guidelines, study tools, and practice — in one place.
          </p>
        </header>

        {/* Sections */}
        <div className="max-w-4xl mx-auto px-6 space-y-14 pb-16">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">{section.title}</h2>
              <p className="text-sm text-[#94A3B8] mb-6">{section.description}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {section.resources.map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    className="group p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#3B82F6]/30 transition-all"
                  >
                    <h3 className="font-semibold text-[#F8FAFC] mb-2 group-hover:text-[#3B82F6] transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{r.description}</p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* About the CCMA Exam */}
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4">
              The NHA CCMA Certification
            </h2>
            <div className="space-y-4 text-[#CBD5E1] leading-relaxed">
              <p>
                The National Healthcareer Association (NHA) issues the CCMA credential to medical assistants
                who pass the computer-based certification exam. The exam contains 150 scored questions plus
                30 unscored pretest questions, lasts 3 hours, and requires a scaled score of 390 out of 500
                (~78%) to pass. The exam fee is $155–165, and the credential is renewed every 2 years with
                10 continuing education units (CEUs).
              </p>
              <p>
                The exam is built on the official 13-chapter blueprint: Foundational Knowledge and Basic
                Science, Anatomy and Physiology, Patient Intake and Vitals, General Patient Care (Parts 1 and
                2), Infection Control and Safety, Point of Care Testing and Laboratory Procedures,
                Phlebotomy, EKG and Cardiovascular Testing, Patient Care Coordination and Education,
                Administrative Assisting, Communication and Customer Service, and Medical Law and Ethics.
              </p>
              <p>
                CCMAPractice is designed to complement your preparation by providing guideline-referenced
                practice questions, adaptive difficulty that adjusts to your knowledge level, and an AI Tutor
                that explains clinical concepts in plain language. Whether you are a new graduate of a
                medical assisting program, a working medical assistant adding credentials, or studying
                independently — our platform helps you target your weak areas and build exam confidence
                through deliberate practice.
              </p>
            </div>
          </div>
        </div>

        {/* Related Study Platforms */}
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <RelatedStudyPlatforms />
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto px-6 pb-24">
          <div className="text-center bg-gradient-to-r from-[#DB2777]/10 to-[#A855F7]/10 rounded-2xl p-10">
            <h2 className="text-2xl font-bold mb-3">
              Ready to Start Studying?
            </h2>
            <p className="text-[#94A3B8] mb-6 max-w-xl mx-auto">
              Create your free account and start practicing with AI-powered clinical
              questions tailored to the NHA CCMA exam. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/register"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#DB2777] hover:bg-[#BE185D] rounded-lg text-sm font-medium transition-colors"
              >
                Get Started Free
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-3 border border-white/10 hover:border-white/20 rounded-lg text-sm font-medium transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>

      <LearningResourceJsonLd
        name="CCMA Resources Hub"
        description="Curated resources for NHA CCMA exam preparation — official NHA links, the 13-chapter blueprint, OSHA/HIPAA/CDC guidelines, and study tools."
        educationalLevel="Professional"
        teaches={['NHA CCMA Exam Prep', 'Clinical Procedures', 'Phlebotomy & EKG', 'Medical Law and Ethics', 'Infection Control']}
        resourceType="Collection"
      />
    </>
  );
}
