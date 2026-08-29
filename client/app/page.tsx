import type { Metadata } from 'next';
import MarketingLandingPage from "@/components/marketing/LandingPage";
import { VideoObjectJsonLd, BreadcrumbListJsonLd, FAQPageJsonLd, LearningResourceJsonLd, HowToJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'CCMAPractice — Pass Your NHA CCMA Exam',
  description: 'AI-powered NHA CCMA exam prep for Certified Clinical Medical Assistants — 1,200+ practice questions, complete theory guides for the 13-chapter blueprint, and an AI tutor. Master phlebotomy, EKG, vitals, infection control, and more.',
  alternates: {
    canonical: 'https://ccmapractice.com',
    languages: {
      en: 'https://ccmapractice.com',
    },
  },
  openGraph: {
    title: 'CCMAPractice — Pass Your NHA CCMA Exam',
    description:
      'AI-powered NHA CCMA exam prep platform with 1,200+ practice questions, complete theory guides, and an AI tutor. Master all 13 chapters of the CCMA blueprint and pass with confidence.',
    url: 'https://ccmapractice.com',
    type: 'website',
    locale: 'en_US',
    siteName: 'CCMAPractice',
    images: [
      {
        url: 'https://ccmapractice.com/images/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'CCMAPractice NHA CCMA Exam Prep Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CCMAPractice — Pass Your NHA CCMA Exam',
    description:
      'AI-powered NHA CCMA exam prep platform with 1,200+ practice questions, theory guides, and an AI tutor. Questions matched to your weak areas for smarter studying.',
    images: ['https://ccmapractice.com/images/og/home.jpg'],
  },
};

export default function RootPage() {
  return (
    <>
      <VideoObjectJsonLd
        name="CCMAPractice NHA CCMA Exam Platform Demo"
        description="See how CCMAPractice uses AI-powered adaptive learning to help medical assistants pass the NHA CCMA exam."
        thumbnailUrl="https://ccmapractice.com/images/og/home.jpg"
        contentUrl="https://ccmapractice.com/videos/ccma-demo-en.mp4"
        embedUrl="https://ccmapractice.com/"
        uploadDate="2026-05-01T00:00:00Z"
        duration="PT30S"
      />
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', url: 'https://ccmapractice.com' },
        ]}
      />
      <FAQPageJsonLd
        questions={[
          {
            question: 'How do I get the NHA CCMA certification?',
            answer: 'To earn the Certified Clinical Medical Assistant (CCMA) credential from the National Healthcareer Association (NHA), complete a medical assistant training program, then register for and pass the NHA CCMA exam. The computer-based exam follows a 13-chapter blueprint and requires a passing score of 390 out of 500. CCMAPractice prepares you with 1,200+ practice questions, complete theory guides, and an AI tutor.',
          },
          {
            question: 'What is the format of the NHA CCMA exam?',
            answer: 'The NHA CCMA exam is computer-based and lasts 3 hours. It contains 180 questions total: 150 scored questions plus 30 unscored pretest questions. You take it at a PSI test center or through online proctoring, and you need a score of 390 out of 500 (~78%) to pass.',
          },
          {
            question: 'What is the passing score for the NHA CCMA exam?',
            answer: 'The passing score for the NHA CCMA exam is 390 out of 500 (~78%). The exam fee is $155–165. CCMAPractice helps you build toward that target with 1,200+ exam-style practice questions and full-length timed simulations.',
          },
          {
            question: 'How much do medical assistants earn?',
            answer: 'Medical assistants earn a median of $43,000+ per year (U.S. Bureau of Labor Statistics), and earning the CCMA certification increases job prospects in clinics, hospitals, and physician offices.',
          },
          {
            question: 'Can I study for the CCMA exam online?',
            answer: 'Yes. CCMAPractice is fully online and works on desktop and mobile browsers. You get 1,200+ CCMA practice questions with explanations that cite the relevant guidelines (OSHA, HIPAA, CDC, AHA), complete theory guides for all 13 blueprint chapters, and an AI tutor that explains every question.',
          },
          {
            question: 'What are the pass rates for the NHA CCMA exam?',
            answer: 'The NHA CCMA exam pass rate was 81.4% in 2024. Structured preparation with 1,200+ practice questions, concept-by-concept theory review, and adaptive practice gives you the best chance of joining the 81.4% of candidates who pass.',
          },
          {
            question: 'What topics are covered on the NHA CCMA exam?',
            answer: 'The NHA CCMA exam follows the official 13-chapter blueprint: Foundational Knowledge and Basic Science; Anatomy and Physiology; Patient Intake and Vitals; General Patient Care (Parts 1 and 2); Infection Control and Safety; Point of Care Testing and Laboratory Procedures; Phlebotomy; EKG and Cardiovascular Testing; Patient Care Coordination and Education; Administrative Assisting; Communication and Customer Service; and Medical Law and Ethics. Expect questions on vital signs, medical terminology, phlebotomy (order of draw and tubes), EKG, injections, wound care, infection control (OSHA and CDC standard precautions), HIPAA, medical billing, and therapeutic communication.',
          },
          {
            question: 'How often do I need to renew my CCMA certification?',
            answer: 'The CCMA credential must be renewed every 2 years by completing 10 continuing education (CE) credits. The renewal fee is $179.',
          },
        ]}
      />
      <HowToJsonLd
        name="How to Get Your NHA CCMA Certification"
        description="Step-by-step guide to becoming NHA-certified as a Clinical Medical Assistant (CCMA) in the United States."
        totalTime="P2M"
        steps={[
          { name: 'Complete a Medical Assistant Training Program', text: 'Finish a medical assistant training program covering clinical procedures, phlebotomy, EKG, and medical office administration — the foundations tested on the NHA CCMA exam.' },
          { name: 'Review the CCMA Exam Blueprint', text: 'Study the official 13-chapter blueprint, from Foundational Knowledge and Basic Science to Medical Law and Ethics, so you know exactly what the exam covers.' },
          { name: 'Study the Theory', text: 'Master the core content: vital signs, anatomy and physiology, phlebotomy (order of draw and tubes), EKG, injections, wound care, infection control, HIPAA, and medical billing.' },
          { name: 'Practice with Exam-Style Questions', text: 'Drill 1,200+ CCMA practice questions with detailed explanations that cite OSHA, HIPAA, CDC, and AHA guidelines, and use the AI tutor to clarify anything you miss.' },
          { name: 'Register for the NHA CCMA Exam', text: 'Register for the computer-based exam ($155–165) and schedule it at a PSI test center or via online proctoring.' },
          { name: 'Pass and Maintain Your Certification', text: 'Score 390 out of 500 (~78%) to pass, then renew your credential every 2 years with 10 continuing education credits ($179).' },
        ]}
      />
      <LearningResourceJsonLd
        name="NHA CCMA Certification Guide"
        description="Complete guide to the NHA Certified Clinical Medical Assistant (CCMA) exam. Covers the 13-chapter exam blueprint, exam format, passing score, career outlook for medical assistants, and study strategies."
        educationalLevel="Professional"
        teaches={['Clinical Medical Assisting', 'Phlebotomy', 'EKG and Cardiovascular Testing', 'Anatomy and Physiology', 'Infection Control and Safety', 'Medical Law and Ethics', 'Patient Intake and Vitals']}
        resourceType="Guide"
      />
      <MarketingLandingPage />
    </>
  );
}
