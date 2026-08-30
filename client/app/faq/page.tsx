import { FAQPageJsonLd, BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import RelatedStudyPlatforms from '@/components/marketing/RelatedStudyPlatforms';

export const metadata = {
  title: 'FAQ — CCMAPractice NHA CCMA Exam Preparation',
  description:
    'Frequently asked questions about the NHA CCMA certification exam, the CCMAPractice platform, pricing, and how AI-powered exam preparation works.',
  alternates: {
    canonical: 'https://ccmapractice.com/faq',
    languages: {
      en: 'https://ccmapractice.com/faq',
    },
  },
  openGraph: {
    title: 'CCMAPractice FAQ — NHA CCMA Exam Preparation',
    description:
      'Find answers to common questions about the NHA CCMA certification exam, the exam blueprint, and our AI-powered study platform.',
    url: 'https://ccmapractice.com/faq',
    type: 'website',
    images: [
      {
        url: 'https://ccmapractice.com/images/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'CCMAPractice FAQ - NHA CCMA Exam Preparation',
      },
    ],
  },
  twitter: {
    title: 'FAQ — CCMAPractice NHA CCMA Exam Preparation',
  },
};

function FaqAnswer({ text }: { text: string }) {
  const blocks = text.split('\n\n');
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        const isList = lines.every((l) => l.trim().startsWith('•') || l.trim().startsWith('-'));
        if (isList) {
          const items = lines.map((l) => l.trim().replace(/^[•-]\s*/, '')).filter(Boolean);
          return (
            <ul key={i} className="space-y-1.5 pl-1">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#20C7C9] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{block}</p>;
      })}
    </div>
  );
}

const faqs = [
  {
    question: 'What is CCMAPractice?',
    answer:
      'CCMAPractice is an AI-powered web application designed to help candidates prepare for the NHA CCMA (Certified Clinical Medical Assistant) certification exam. It combines 1,200+ practice questions with detailed, guideline-referenced explanations, complete theory guides for all 13 chapters of the official exam blueprint, an AI tutor that explains any question, and realistic 150-question exam simulations.',
  },
  {
    question: 'What is the NHA CCMA exam?',
    answer:
      'The NHA CCMA exam is the Certified Clinical Medical Assistant certification exam from the National Healthcareer Association (NHA). It consists of 180 multiple-choice questions — 150 scored questions and 30 unscored pretest questions — and you have 3 hours to complete it. The exam is taken on a computer at a PSI testing center or via online proctoring. You need a score of 390 out of 500 (~78%) to pass, and the exam fee is $155–165. In 2024, 81.4% of candidates passed on their first attempt — solid preparation makes the difference.',
  },
  {
    question: 'What topics are covered on the NHA CCMA exam?',
    answer:
      'The NHA CCMA exam follows an official blueprint organized into 13 chapters:\n\n• Foundational Knowledge and Basic Science\n• Anatomy and Physiology\n• Patient Intake and Vitals\n• General Patient Care (Parts 1 and 2)\n• Infection Control and Safety\n• Point of Care Testing and Laboratory Procedures\n• Phlebotomy\n• EKG and Cardiovascular Testing\n• Patient Care Coordination and Education\n• Administrative Assisting\n• Communication and Customer Service\n• Medical Law and Ethics\n\nYou can also expect questions on vital signs, medical terminology, phlebotomy (order of draw and tube selection), EKG, injections, wound care, infection control (OSHA and CDC Standard Precautions), HIPAA, medical billing, and therapeutic communication.',
  },
  {
    question: 'How many practice questions does CCMAPractice include?',
    answer:
      'CCMAPractice includes a question bank of over 1,200 practice questions. Every question comes with a detailed explanation that cites the actual guidelines and standards behind the correct answer — including OSHA Bloodborne Pathogens, the HIPAA Privacy Rule, CDC Standard Precautions, AHA guidelines, and CLIA-waived testing requirements. New questions are added regularly to stay aligned with the current NHA CCMA blueprint.',
  },
  {
    question: 'What are the 13 theory chapters?',
    answer:
      'Our theory guides cover all 13 chapters of the official NHA CCMA exam blueprint:\n\n• Foundational Knowledge and Basic Science\n• Anatomy and Physiology\n• Patient Intake and Vitals\n• General Patient Care (Parts 1 and 2)\n• Infection Control and Safety\n• Point of Care Testing and Laboratory Procedures\n• Phlebotomy\n• EKG and Cardiovascular Testing\n• Patient Care Coordination and Education\n• Administrative Assisting\n• Communication and Customer Service\n• Medical Law and Ethics\n\nEach chapter provides structured, exam-focused study material.',
  },
  {
    question: 'How do the exam simulations work?',
    answer:
      'Our exam simulations replicate the real NHA CCMA testing experience: 150 scored-style questions to answer in a timed session, mirroring the actual exam format. You build speed, stamina, and confidence before exam day, then review your performance question by question with detailed explanations of every answer.',
  },
  {
    question: 'What is the AI Tutor and how does it work?',
    answer:
      'The AI Tutor is an interactive chat feature that helps you understand difficult concepts. When you encounter a question you do not understand, you can ask the AI Tutor for a simplified explanation. It breaks down complex clinical procedures, medical terminology, and guideline requirements into clear, digestible answers, citing the relevant standards.',
  },
  {
    question: 'How does the AI adaptive difficulty work?',
    answer:
      'CCMAPractice adjusts question difficulty based on your performance. Score 80% or higher on a set of questions, and the system increases difficulty (EASY → MEDIUM → HARD). Score below 50%, and the difficulty decreases. This ensures you are always studying at the right level to maximize learning efficiency.',
  },
  {
    question: 'What plans are available?',
    answer:
      'CCMAPractice offers four plans: FREE (limited access to one practice category), MONTHLY ($19 per month with full access to everything), YEARLY ($69 per year — 2 months free vs Monthly), and LIFETIME ($149 one-time payment for permanent access to all current and future content).',
  },
  {
    question: 'Is CCMAPractice available on mobile?',
    answer:
      'CCMAPractice is a web application optimized for desktop and mobile browsers. You can study anywhere, anytime from your phone, tablet, or computer — no app download required. The responsive design adapts to any screen size.',
  },
  {
    question: 'How does CCMAPractice compare to free resources?',
    answer:
      'Free resources like open-exam-prep offer a limited set of NHA CCMA practice questions (roughly 114 questions) with minimal explanations. CCMAPractice gives you 1,200+ questions, complete theory guides for all 13 blueprint chapters, an AI tutor, and realistic exam simulations — every explanation citing the actual guidelines behind the answer. Compared to the official NHA study guide and practice tests (~$99) or Mometrix (~$50–60), CCMAPractice offers deeper content and adaptive study tools starting at $19 per month.',
  },
  {
    question: 'Is CCMAPractice affiliated with the NHA?',
    answer:
      'No. CCMAPractice is an independent exam preparation platform and is not affiliated with, endorsed by, or sponsored by the National Healthcareer Association (NHA). The NHA CCMA exam, its blueprint, and its passing standards are the property of the NHA; CCMAPractice simply builds study tools aligned to the publicly available exam blueprint.',
  },
  {
    question: 'Do I need to renew my CCMA certification?',
    answer:
      'Yes. The NHA CCMA certification must be renewed every 2 years. Renewal requires completing 10 continuing education (CE) credits and paying the renewal fee, which is $179. CCMAPractice is a great way to refresh your clinical knowledge and stay sharp between renewals.',
  },
  {
    question: 'Can I track my progress across topics?',
    answer:
      'Yes, CCMAPractice provides detailed analytics including accuracy by chapter, difficulty progression, exam history, and performance trends. This helps you identify weak areas — whether it is phlebotomy, EKG, or medical law and ethics — and focus your study time effectively.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Visit ccmapractice.com to get started. Create a free account, choose the FREE plan to try it out, and upgrade to MONTHLY, YEARLY, or LIFETIME when you are ready for full access.',
  },
];

export default function FAQPage() {
  return (
    <>
      <FAQPageJsonLd questions={faqs} />
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', url: 'https://ccmapractice.com' },
          { name: 'FAQ', url: 'https://ccmapractice.com/faq' },
        ]}
      />
      <div className="min-h-screen bg-[#031428] text-[#F5F8FA]">
        {/* Nav */}
        <nav className="border-b border-white/5 bg-[#031428]/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo/logo-main.png?v=6" alt="CCMAPractice" className="h-7 w-auto" />
            </a>
            <a
              href="/"
              className="text-sm text-[#A8B7C9] hover:text-white transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </nav>

        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[#A8B7C9] max-w-2xl">
            Everything you need to know about CCMAPractice, NHA CCMA certification,
            and how our AI-powered platform works.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto px-6 pb-24 space-y-0 divide-y divide-white/5">
          {faqs.map((faq, i) => (
            <details key={i} className="group py-6 cursor-pointer">
              <summary className="flex items-start justify-between gap-4 list-none">
                <h2 className="text-lg font-medium text-[#F5F8FA] group-hover:text-[#20C7C9] transition-colors">
                  {faq.question}
                </h2>
                <span className="text-[#20C7C9] text-xl group-open:rotate-180 transition-transform flex-shrink-0">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-sm text-[#A8B7C9] leading-relaxed">
                <FaqAnswer text={faq.answer} />
              </p>
            </details>
          ))}
        </div>

        <RelatedStudyPlatforms />

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto px-6 pb-24">
          <div className="border-t border-white/5 pt-16 text-center">
            <h2 className="text-2xl font-bold text-[#F5F8FA] mb-2">
              Still have questions?
            </h2>
            <p className="text-[#A8B7C9] mb-6">
              Our team is here to help you on your certification journey.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#20C7C9] hover:bg-[#1688B8] rounded-lg text-sm font-medium transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
