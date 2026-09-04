import { ArticleJsonLd, BreadcrumbListJsonLd, FAQPageJsonLd } from '@/components/seo/JsonLd';
import StudyChecklistClient from './StudyChecklistClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '8-Week CCMA Exam Prep Checklist: Printable Study Plan — CCMAPractice',
  description:
    'Free 8-week printable CCMA exam prep checklist for the NHA Certified Clinical Medical Assistant exam. Weekly plan covering vital signs, phlebotomy, EKG, HIPAA, and timed simulations.',
  alternates: {
    canonical: 'https://ccmapractice.com/study-checklist',
    languages: {
      en: 'https://ccmapractice.com/study-checklist',
    },
  },
  openGraph: {
    title: '8-Week CCMA Exam Prep Checklist: Printable Study Plan — CCMAPractice',
    description:
      'Free 8-week printable CCMA exam prep checklist. Weekly study covering vital signs, phlebotomy, EKG, HIPAA, practice questions, and timed simulations.',
    url: 'https://ccmapractice.com/study-checklist',
    type: 'website',
    images: [
      {
        url: 'https://ccmapractice.com/images/og/study-checklist.jpg?v=2',
        width: 1200,
        height: 630,
        alt: '8-Week CCMA Exam Prep Checklist',
      },
    ],
  },
  twitter: {
    title: '8-Week CCMA Exam Prep Checklist: Printable Study Plan — CCMAPractice',
  },
  other: {
    'article:published_time': '2026-05-20',
    'article:modified_time': '2026-08-18',
  },
};

const faqs = [
  {
    question: 'Is the 8-week CCMA study plan really enough to pass?',
    answer:
      'The 8-week plan is designed for focused, structured preparation covering all 13 NHA CCMA blueprint chapters. It works best when you study 2–4 hours per day, 5–6 days per week. If you are starting from zero, combine this plan with the CCMAPractice adaptive platform to build baseline knowledge in anatomy, medical terminology, and clinical procedures before the final exam-simulation weeks.',
  },
  {
    question: 'What topics does this CCMA checklist cover?',
    answer:
      'The checklist follows the NHA CCMA exam blueprint: foundational knowledge and basic science, anatomy and physiology, patient intake and vital signs, general patient care, infection control and safety (OSHA, CDC), point of care testing, phlebotomy (tube order, specimen collection), EKG and cardiovascular testing, patient care coordination, administrative assisting, communication and customer service, and medical law and ethics (HIPAA).',
  },
  {
    question: 'How many hours per day should I study?',
    answer:
      'Most candidates should plan for 2–4 hours of focused study per day. Weeks 1–2 focus on theory, terminology, and anatomy; weeks 3–6 on clinical skills (vitals, injections, phlebotomy, EKG) and lab procedures; weeks 7–8 on administrative topics, HIPAA, and full-length simulations. Consistency matters more than cramming — study every day, even if only for 90 minutes.',
  },
  {
    question: 'Can I print the checklist?',
    answer:
      'Yes! The print view uses a clean white background with black text for easy reading and checkmark tracking. You can also download the free PDF by entering your email in the signup form at the top or bottom of this page.',
  },
  {
    question: 'What if I miss a week?',
    answer:
      "Don't panic. The 8-week plan is a guide, not a rigid requirement. If you fall behind, combine lighter days or extend the plan by a few days. The key is to maintain momentum — completing Weeks 7 and 8 (practice mode and full-length simulations) is critical for exam readiness. Use the CCMAPractice AI Tutor to catch up on missed topics quickly.",
  },
  {
    question: 'What is the NHA CCMA exam format?',
    answer:
      'The NHA CCMA exam is computer-based: 150 scored questions plus 30 unscored pretest questions (180 total), 3 hours, with a passing score of 390/500 (about 78%). It covers 13 blueprint chapters, with clinical patient care the largest domain, followed by administrative assisting, communication, and medical law and ethics.',
  },
];

export default function StudyChecklistPage() {
  return (
    <>
      <ArticleJsonLd
        headline="8-Week CCMA Exam Prep Checklist: Printable Study Plan"
        description="Free 8-week printable CCMA exam prep checklist covering vital signs, phlebotomy, EKG, HIPAA, and timed simulations for the NHA Certified Clinical Medical Assistant exam."
        datePublished="2026-05-20"
        dateModified="2026-08-18"
        image={['https://ccmapractice.com/images/og/study-checklist.jpg?v=2']}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', url: 'https://ccmapractice.com' },
          { name: '8-Week CCMA Exam Prep Checklist', url: 'https://ccmapractice.com/study-checklist' },
        ]}
      />
      <FAQPageJsonLd questions={faqs} />
      <StudyChecklistClient faqs={faqs} />
    </>
  );
}
