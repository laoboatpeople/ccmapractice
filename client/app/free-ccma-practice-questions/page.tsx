import { ArticleJsonLd, BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import FreePracticeQuestionsClient from './FreePracticeQuestionsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free CCMA Practice Questions — NHA CCMA Exam Prep — CCMAPractice',
  description:
    '10 free NHA CCMA-style clinical practice questions covering vital signs, the order of draw, the five rights of medication administration, and HIPAA — with guideline references. Start practicing today — no signup needed.',
  alternates: {
    canonical: 'https://ccmapractice.com/free-ccma-practice-questions',
    languages: {
      en: 'https://ccmapractice.com/free-ccma-practice-questions',
    },
  },
  openGraph: {
    title: 'Free CCMA Practice Questions — NHA CCMA Exam Prep — CCMAPractice',
    description:
      '10 free NHA-style clinical practice questions covering vital signs, phlebotomy, medication administration, and HIPAA. Test your clinical knowledge with realistic CCMA questions.',
    url: 'https://ccmapractice.com/free-ccma-practice-questions',
    type: 'website',
    images: [
      {
        url: 'https://ccmapractice.com/images/og/free-practice-questions.jpg',
        width: 1200,
        height: 630,
        alt: 'Free CCMA Practice Questions - CCMAPractice',
      },
    ],
  },
  twitter: {
    title: 'Free CCMA Practice Questions — NHA CCMA Exam Prep — CCMAPractice',
  },
  other: {
    'article:published_time': '2026-05-20',
    'article:modified_time': '2026-08-18',
  },
};

export default function FreeCcmaPracticeQuestionsPage() {
  return (
    <>
      <ArticleJsonLd
        headline="Free CCMA Practice Questions — NHA Clinical Questions"
        description="10 free NHA CCMA-style clinical practice questions covering vital signs, the order of draw, the five rights of medication administration, and HIPAA with guideline references."
        datePublished="2026-05-20"
        dateModified="2026-08-18"
        image={['https://ccmapractice.com/images/og/free-practice-questions.jpg']}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', url: 'https://ccmapractice.com' },
          { name: 'Free CCMA Practice Questions', url: 'https://ccmapractice.com/free-ccma-practice-questions' },
        ]}
      />
      <FreePracticeQuestionsClient />
    </>
  );
}
