import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import NewsletterSection from '@/components/marketing/NewsletterSection';
import BlogFilter from './BlogFilter';

export const metadata: Metadata = {
  title: 'CCMA Exam Guide Blog — CCMAPractice',
  description:
    'Expert guides for NHA CCMA exam prep. Certification guides, clinical procedures, phlebotomy, EKG, study techniques, and exam structure breakdowns.',
  alternates: {
    canonical: 'https://ccmapractice.com/blog',
    languages: {
      en: 'https://ccmapractice.com/blog',
    },
  },
  openGraph: {
    title: 'CCMA Exam Guide Blog — CCMAPractice',
    description:
      'Expert guides and resources for NHA CCMA exam prep. Certification guides, clinical procedures, and study techniques.',
    url: 'https://ccmapractice.com/blog',
    type: 'website',
    images: [
      {
        url: 'https://ccmapractice.com/images/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'CCMAPractice Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CCMA Exam Guide Blog — CCMAPractice',
  },
  other: {
    'article:published_time': '2026-08-01',
    'article:modified_time': '2026-08-29',
  },
};

const posts = [
  {
    slug: 'ccma-b1-certification-guide',
    title: 'How to Get Your NHA CCMA Certification',
    description:
      'A complete step-by-step guide to earning your Certified Clinical Medical Assistant (CCMA) certification, including eligibility, the 150-question exam format, and study strategy.',
    date: 'August 1, 2026 *updated August 29, 2026',
    readTime: '10 min read',
    category: 'Certification',
  },
  {
    slug: 'ccma-study-guide',
    title: 'CCMA Study Guide: 13 Chapters of the NHA Exam Blueprint',
    description:
      'Master the NHA CCMA exam blueprint. Chapter-by-chapter map covering vital signs, phlebotomy, EKG, infection control, HIPAA, and clinical procedures.',
    date: 'August 3, 2026 *updated August 29, 2026',
    readTime: '8 min read',
    category: 'Study Guide',
  },
  {
    slug: 'ai-ccma-exam-preparation',
    title: 'How AI Is Changing CCMA Exam Preparation',
    description:
      'Discover how artificial intelligence is transforming CCMA exam preparation. Adaptive learning, personalized study paths, instant guideline-referenced explanations, and AI tutoring.',
    date: 'August 5, 2026 *updated August 29, 2026',
    readTime: '9 min read',
    category: 'Technology',
  },
  {
    slug: 'ccma-exam-structure',
    title: 'CCMA Exam Structure: Questions, Time & Passing Score',
    description:
      'Complete breakdown of the NHA CCMA exam: 150 scored questions + 30 pretest, 3 hours, passing score 390/500, and the 7 blueprint domains.',
    date: 'August 6, 2026 *updated August 29, 2026',
    readTime: '14 min read',
    category: 'Exams',
  },
  {
    slug: 'ccma-exam-study-resources',
    title: 'CCMA Exam Study Resources: Best Books, Practice Tests & Tools',
    description:
      'The definitive list of CCMA exam study resources: NHA official materials, practice tests, flashcards, and AI-powered study tools.',
    date: 'August 8, 2026 *updated August 29, 2026',
    readTime: '10 min read',
    category: 'Reference',
  },
  {
    slug: 'ccma-exam-study-plan',
    title: '8-Week CCMA Exam Study Plan: A Step-by-Step Schedule',
    description:
      'A proven 8-week study plan for the NHA CCMA exam. Week-by-week schedule covering vitals, phlebotomy, EKG, medications, and timed simulations.',
    date: 'August 10, 2026 *updated August 29, 2026',
    readTime: '11 min read',
    category: 'Study Plan',
  },
  {
    slug: 'ccma-study-mistakes',
    title: 'Top 10 Mistakes CCMA Exam Candidates Make (And How to Avoid Them)',
    description:
      'The most common mistakes CCMA exam candidates make — from memorizing without understanding to skipping the order of draw. Learn how to pass on your first try.',
    date: 'August 12, 2026 *updated August 29, 2026',
    readTime: '9 min read',
    category: 'Exam Strategy',
  },
  {
    slug: 'ccma-study-techniques',
    title: 'How to Study for the CCMA Exam: 10 Proven Techniques',
    description:
      'Discover 10 proven study techniques for the NHA CCMA exam. From clinical scenario drills and vital sign mastery to timed simulations — techniques that actually work.',
    date: 'August 14, 2026 *updated August 29, 2026',
    readTime: '12 min read',
    category: 'Study Skills',
  },
];

const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

export default function BlogIndexPage() {
  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', url: 'https://ccmapractice.com' },
          { name: 'Blog', url: 'https://ccmapractice.com/blog' },
        ]}
      />
      <div className="min-h-screen bg-[#150A12] text-[#F8FAFC]">
      {/* Nav */}
      <nav className="border-b border-white/5 bg-[#150A12]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo/logo-main.png?v=5" alt="CCMAPractice" className="h-7 w-auto" />
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">← Back to Home</a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-4xl font-bold mb-4">CCMA Exam Guide</h1>
        <p className="text-lg text-[#94A3B8] max-w-2xl">
          Expert resources to help you prepare for the NHA CCMA exam.
          Each guide covers the clinical procedures, guidelines, and study
          skills the exam rewards.
        </p>
      </div>

      <BlogFilter posts={posts} categories={categories} basePath="/blog" />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Footer */}
      <div className="border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <a
            href="/faq"
            className="text-sm text-[#94A3B8] hover:text-white transition-colors"
          >
            Visit our FAQ →
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
