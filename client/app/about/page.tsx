import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About CCMAPractice — NHA CCMA Exam Prep Platform',
  description:
    'AI-powered exam prep for the NHA CCMA certification. 1,200+ guideline-referenced practice questions to help you pass the Certified Clinical Medical Assistant exam.',
  alternates: {
    canonical: 'https://ccmapractice.com/about',
    languages: {
      en: 'https://ccmapractice.com/about',
    },
  },
  openGraph: {
    title: 'About CCMAPractice — NHA CCMA Exam Prep Platform',
    description:
      'Learn about CCMAPractice: our mission to help medical assistant students pass the NHA CCMA certification exam with our AI-powered platform and 1,200+ questions.',
    url: 'https://ccmapractice.com/about',
    type: 'website',
    images: [
      {
        url: 'https://ccmapractice.com/images/og/about.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'CCMAPractice NHA CCMA Exam Preparation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CCMAPractice — NHA CCMA Exam Prep Platform',
  },
  other: {
    'article:published_time': '2025-01-15',
    'article:modified_time': '2026-08-18',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#031428] text-[#F5F8FA]">
      {/* Nav */}
      <nav className="border-b border-white/5 bg-[#031428]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo/logo-main.png?v=6" alt="CCMAPractice" className="h-7 w-auto" />
          </a>
          <a href="/" className="text-sm text-[#A8B7C9] hover:text-white transition-colors">
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-16">
          <span className="text-[11px] font-medium text-[#20C7C9] bg-[#20C7C9]/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
            About
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-6">
            About CCMAPractice
          </h1>
          <p className="text-lg md:text-xl text-[#A8B7C9] max-w-3xl mx-auto leading-relaxed">
            We are building the most effective study platform for the NHA CCMA
            certification exam — combining AI technology with real clinical
            expertise to help candidates pass with confidence.
          </p>
        </div>

        {/* Our Mission */}
        <section className="mb-16">
          <div className="bg-white/5 rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#20C7C9]/20 flex items-center justify-center text-[#20C7C9]">★</span>
              Our Mission
            </h2>
            <p className="text-[#CBD5E1] leading-relaxed mb-4">
              Our mission is simple: help every medical assistant student pass their
              NHA CCMA certification exam on the first try. We believe preparing for
              CCMA certification should not be a guessing game. Too many candidates
              walk into the exam unprepared — not because they lack ability, but
              because they lack access to study tools that reflect the true exam
              experience.
            </p>
            <p className="text-[#CBD5E1] leading-relaxed mb-4">
              Traditional study materials for the CCMA exam are outdated, difficult
              to navigate, and rarely offer the depth of practice needed to build
              real confidence. The clinical content is dense — phlebotomy, EKGs,
              medical terminology, infection control, HIPAA, and medical law all in
              one exam — and quality practice questions are scarce without a
              structured approach. We set out to change that by building a platform
              that adapts to each candidate&apos;s learning pace, identifies weak
              points, and offers targeted practice where it matters most.
            </p>
            <p className="text-[#CBD5E1] leading-relaxed">
              At the heart of our mission is a commitment to patient care. Every
              certified medical assistant plays a direct role in the safety and
              well-being of patients — taking accurate vitals, drawing blood safely,
              running point-of-care tests, and protecting patient privacy under
              HIPAA. By ensuring that certification candidates are thoroughly
              prepared, we are contributing to safer, higher-quality care across
              clinics, hospitals, and private practices in the United States.
            </p>
          </div>
        </section>

        {/* Our Platform */}
        <section className="mb-16">
          <div className="bg-white/5 rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#1688B8]/20 flex items-center justify-center text-[#1688B8]">◆</span>
              Our Platform
            </h2>
            <p className="text-[#CBD5E1] leading-relaxed mb-4">
              CCMAPractice is not a simple flashcard app. It is a specialized,
              AI-powered study platform engineered from the ground up around the
              NHA CCMA exam blueprint: 13 chapters covering foundational science,
              anatomy and physiology, patient intake and vitals, general patient
              care, infection control, point-of-care testing, phlebotomy, EKG,
              patient care coordination, administrative assisting, communication,
              and medical law and ethics. Every question, every explanation, and
              every algorithm is designed to reflect the true exam experience.
            </p>
            <p className="text-[#CBD5E1] leading-relaxed mb-4">
              Our question bank contains over 1,200 AI-generated, expert-reviewed
              questions covering all 13 blueprint chapters. Every question is tagged
              by chapter, topic, and difficulty level — and every explanation cites
              the actual guidelines behind the correct answer: OSHA Bloodborne
              Pathogens, the HIPAA Privacy Rule, CDC Standard Precautions, AHA
              guidelines, and CLIA-waived testing requirements. That makes it easy
              for candidates to target their weak areas and understand the why
              behind each answer.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="bg-white/5 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#20C7C9]/20 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#20C7C9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">AI Adaptive Difficulty</h3>
                <p className="text-sm text-[#A8B7C9] leading-relaxed">
                  The AI adjusts question difficulty in real time based on your
                  performance. Master a topic and the system challenges you further;
                  struggle and it offers more foundational exercises. This ensures
                  efficient, targeted study sessions.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#1688B8]/20 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#1688B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Realistic Exam Simulations</h3>
                <p className="text-sm text-[#A8B7C9] leading-relaxed">
                  Timed 150-question practice exams replicate the actual NHA CCMA
                  testing environment. Build speed and confidence before the real
                  exam with question formats, durations, and difficulty levels
                  aligned to official standards.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#22B8E6]/20 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#22B8E6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">AI Tutor</h3>
                <p className="text-sm text-[#A8B7C9] leading-relaxed">
                  Get instant, plain-language explanations of complex clinical
                  concepts. Ask questions naturally and receive exam-focused
                  answers that reference the exact guidelines and procedures.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Progress Analytics</h3>
                <p className="text-sm text-[#A8B7C9] leading-relaxed">
                  Detailed analytics show your performance in every chapter of the
                  blueprint. Track accuracy by chapter, monitor difficulty
                  progression, and review your exam history — always know exactly
                  where you stand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Founder */}
        <section className="mb-16">
          <div className="bg-white/5 rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">👤</span>
              Our Founder
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#20C7C9] to-[#1688B8] flex items-center justify-center text-white text-4xl font-bold shrink-0">
                CO
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Chuck Onekeo</h3>
                <p className="text-sm text-[#20C7C9] font-medium mb-4">
                  Programmer &amp; AI Specialist — Founder of CCMAPractice
                </p>
                <p className="text-[#CBD5E1] leading-relaxed mb-4">
                  Chuck Onekeo is a programmer and AI specialist with extensive
                  experience building intelligent systems for technical education.
                  Frustrated by the lack of modern, adaptive study tools available
                  to certification candidates, Chuck decided to build the platform
                  he wished he had when studying for his own technical
                  certifications.
                </p>
                <p className="text-[#CBD5E1] leading-relaxed mb-4">
                  Combining his expertise in artificial intelligence, machine
                  learning, and full-stack development, Chuck designed CCMAPractice
                  from the ground up as an adaptive learning system tailored
                  specifically to the NHA CCMA certification exam. The platform&apos;s
                  AI engine dynamically adjusts question difficulty, generates
                  contextual explanations, and provides personalized study
                  recommendations based on individual performance.
                </p>
                <p className="text-[#CBD5E1] leading-relaxed">
                  Chuck&apos;s vision for CCMAPractice goes beyond helping candidates
                  pass their exams. He believes that well-prepared medical
                  assistants deliver better, safer patient care — and that
                  technology — especially AI — has the power to dramatically
                  improve how healthcare professionals prepare for high-stakes
                  certification exams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Built This */}
        <section className="mb-16">
          <div className="bg-white/5 rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#22B8E6]/20 flex items-center justify-center text-[#22B8E6]">⚡</span>
              Why We Built This
            </h2>
            <p className="text-[#CBD5E1] leading-relaxed mb-4">
              The path to NHA CCMA certification is demanding. Candidates must
              master 13 chapters of clinical and administrative content — anatomy,
              vital signs, phlebotomy, EKGs, infection control, HIPAA, medical
              billing, and therapeutic communication — then sit a 3-hour,
              180-question exam with a passing score of 390/500. Despite the high
              stakes, most candidates rely on dense textbooks, scattered PDFs, and
              word-of-mouth advice to prepare.
            </p>
            <p className="text-[#CBD5E1] leading-relaxed mb-4">
              We saw a gap that technology could fill. The same AI techniques that
              power recommendation systems, language models, and adaptive tutoring
              platforms could be applied to medical assistant exam preparation —
              and the result is a study experience that is more effective, more
              engaging, and more performant than anything currently available to
              CCMA candidates.
            </p>
            <p className="text-[#CBD5E1] leading-relaxed mb-4">
              Key problems we set out to solve:
            </p>
            <ul className="space-y-3 text-[#CBD5E1]">
              <li className="flex items-start gap-3">
                <span className="text-[#20C7C9] mt-1.5">▸</span>
                <span><strong className="text-[#F5F8FA]">Scarcity of practice questions</strong> — Most candidates report that finding enough realistic practice questions is their biggest challenge. Free resources are thin (open-exam-prep offers roughly 114 questions), while official and commercial packages are expensive. We built a bank of 1,200+ questions covering all 13 blueprint chapters.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#20C7C9] mt-1.5">▸</span>
                <span><strong className="text-[#F5F8FA]">Explanations without the why</strong> — Most question banks tell you the right answer but not why it is right. Every CCMAPractice explanation cites the actual guideline behind the answer — OSHA Bloodborne Pathogens, the HIPAA Privacy Rule, CDC Standard Precautions, AHA guidelines, CLIA-waived testing.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#20C7C9] mt-1.5">▸</span>
                <span><strong className="text-[#F5F8FA]">One-size-fits-all study materials</strong> — Every candidate learns differently. Our adaptive AI tailors the difficulty and focus of every study session to the individual&apos;s performance.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#20C7C9] mt-1.5">▸</span>
                <span><strong className="text-[#F5F8FA]">Lack of exam simulation tools</strong> — Candidates need timed, realistic practice to build confidence. Our exam mode replicates the actual NHA CCMA testing environment with 150-question timed simulations.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#20C7C9] mt-1.5">▸</span>
                <span><strong className="text-[#F5F8FA]">No visibility into progress</strong> — Without analytics, candidates don&apos;t know what to focus on. Our platform provides detailed performance metrics for every chapter and topic.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#20C7C9] mt-1.5">▸</span>
                <span><strong className="text-[#F5F8FA]">A certification that pays off</strong> — Medical assistants earn a median of $43,000+ per year (BLS), and CCMA certification improves job prospects and earning potential. Passing on the first try means starting your career sooner.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="mb-16">
          <div className="bg-white/5 rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#1688B8]/20 flex items-center justify-center text-[#1688B8]">♥</span>
              Our Commitment
            </h2>
            <p className="text-[#CBD5E1] leading-relaxed mb-4">
              We are committed to building a platform that genuinely helps CCMA
              candidates succeed. That means:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/5 rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#20C7C9]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#20C7C9] text-2xl font-bold">Q</span>
                </div>
                <h3 className="font-semibold mb-2">Quality Content</h3>
                <p className="text-sm text-[#A8B7C9] leading-relaxed">
                  Every question is reviewed against current clinical guidelines.
                  We regularly update our question bank to stay aligned with the
                  NHA CCMA exam blueprint and evolving standards of care.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#1688B8]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#1688B8] text-2xl font-bold">$</span>
                </div>
                <h3 className="font-semibold mb-2">Fair Pricing</h3>
                <p className="text-sm text-[#A8B7C9] leading-relaxed">
                  We offer a free tier so every candidate can try the platform,
                  plus affordable plans from $19/month. No hidden fees, no
                  surprises.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#22B8E6]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#22B8E6] text-2xl font-bold">S</span>
                </div>
                <h3 className="font-semibold mb-2">Student Success</h3>
                <p className="text-sm text-[#A8B7C9] leading-relaxed">
                  Our success is measured by your success. We continuously improve
                  the platform based on candidate feedback and performance data to
                  maximize pass rates.
                </p>
              </div>
            </div>
            <p className="text-[#CBD5E1] leading-relaxed mt-8">
              We are just getting started. The platform evolves constantly with new
              features, more questions, and improved AI capabilities. Our long-term
              vision is to become the go-to study resource for every CCMA candidate
              in the United States — and eventually extend our support to related
              allied health certifications. Whether you are just beginning your
              medical assistant journey or renewing your certification, CCMAPractice
              is built for you.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pb-20">
          <div className="bg-gradient-to-r from-[#20C7C9]/10 to-[#1688B8]/10 rounded-2xl p-10">
            <h2 className="text-2xl font-bold mb-3">Ready to Pass Your NHA CCMA Exam?</h2>
            <p className="text-[#A8B7C9] mb-6 max-w-xl mx-auto">
              Join thousands of medical assistant candidates preparing with
              CCMAPractice. Start free, upgrade when you are ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/login"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#20C7C9] hover:bg-[#1688B8] rounded-lg text-sm font-medium transition-colors"
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
    </div>
  );
}
