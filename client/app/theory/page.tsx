import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { BookOpen, ChevronRight, Home, ArrowRight } from 'lucide-react';
import theoryData from '@/src/data/theory-data.json';
import {
  BreadcrumbListJsonLd,
  LearningResourceJsonLd,
} from '@/components/seo/JsonLd';

type TheoryChapter = {
  number: number;
  name: string;
  id: string;
  content: string;
};

const chapters = theoryData as TheoryChapter[];

const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV','XXV'];

// Freshness dates derived from the actual content file (stable at build time).
const THEORY_DATA_MTIME = new Date(
  fs.statSync(path.join(process.cwd(), 'src/data/theory-data.json')).mtimeMs
).toISOString().slice(0, 10);

function excerpt(content: string, max = 160): string {
  const plain = content
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/[#*`>|_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > max ? `${plain.slice(0, max - 3).trimEnd()}...` : plain;
}

export const metadata: Metadata = {
  title: 'CCMA Theory — All 13 NHA Exam Chapters | CCMAPractice',
  description:
    'Free, complete NHA CCMA exam theory — all 13 chapters: foundational knowledge, anatomy and physiology, patient care, phlebotomy, EKG, medical law and ethics, and more.',
  alternates: {
    canonical: 'https://ccmapractice.com/theory',
    languages: {
      en: 'https://ccmapractice.com/theory',
    },
  },
  openGraph: {
    title: 'CCMA Theory — All 13 NHA Exam Chapters | CCMAPractice',
    description:
      'Free, complete NHA CCMA exam theory across all 13 chapters — clinical and administrative medical assisting.',
    url: 'https://ccmapractice.com/theory',
    type: 'website',
    locale: 'en',
    siteName: 'ccmapractice',
    images: [
      {
        url: 'https://ccmapractice.com/images/og/theory.jpg',
        width: 1200,
        height: 630,
        alt: 'CCMAPractice — NHA CCMA Theory Study Guides',
      },
    ],
  },
  twitter: {
    title: 'CCMA Theory — All 13 NHA Exam Chapters | CCMAPractice',
  },
  other: {
    'article:published_time': THEORY_DATA_MTIME,
    'article:modified_time': THEORY_DATA_MTIME,
  },
};

export default function TheoryIndexPage() {
  return (
    <>
      <LearningResourceJsonLd
        name="NHA CCMA Exam Theory — Complete 13-Chapter Study Guides"
        description="Free complete theory study guides for the NHA Certified Clinical Medical Assistant (CCMA) exam: foundational knowledge, anatomy and physiology, patient intake and vitals, general patient care, infection control, phlebotomy, EKG, patient care coordination, administrative assisting, communication, and medical law and ethics."
        educationalLevel="Professional"
        teaches={[
          'NHA CCMA Exam',
          'Anatomy and Physiology',
          'Patient Care',
          'Phlebotomy',
          'EKG',
          'Medical Law and Ethics',
          'Administrative Assisting',
        ]}
        resourceType="StudyGuide"
      />
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', url: 'https://ccmapractice.com' },
          { name: 'Theory', url: 'https://ccmapractice.com/theory' },
        ]}
      />
      <div className="min-h-screen bg-[#061C33] text-[#F6FBFF]">
        <header className="border-b border-white/5 bg-[#061C33]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" aria-label="ccmapractice home">
              <img src="/logo/logo-main.png?v=6" alt="ccmapractice" className="h-7 w-auto" />
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/theory" className="text-[#F6FBFF] font-medium transition-colors">All Chapters</Link>
              <Link href="/free-ccma-practice-questions" className="text-[#D6EAF7] hover:text-[#F6FBFF] transition-colors">Free Questions</Link>
              <Link href="/pricing" className="px-4 py-2 rounded-lg bg-[#1688B8] text-[#061C33] font-medium transition-colors">Pricing</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-10">
          <nav className="flex items-center gap-2 text-xs text-[#53697D] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#F6FBFF] flex items-center gap-1"><Home size={13} /> Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#D6EAF7]">Theory</span>
          </nav>

          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#1688B8]/10 border border-[#1688B8]/20 flex items-center justify-center shrink-0">
              <BookOpen size={22} className="text-[#20C7C9]" />
            </div>
            <div>
              <div className="text-xs font-medium text-[#20C7C9] uppercase tracking-wide mb-1">NHA CCMA</div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#F6FBFF] leading-tight">Complete Theory — All 13 Chapters</h1>
            </div>
          </div>
          <p className="text-sm text-[#53697D] max-w-2xl mb-10">
            Free, in-depth study guides mapped to the official NHA CCMA test content outline. The exam is scored out of
            500 (150 scored questions plus 30 pretest, 3 hours, passing score 390). Work through every chapter, then
            test yourself with the free practice questions.
          </p>

          <div className="space-y-3">
            {chapters.map((ch) => (
              <Link
                key={ch.id}
                href={`/theory/${ch.id}`}
                className="group flex items-center gap-4 bg-[#12294D] border border-white/10 rounded-2xl p-5 transition-colors hover:border-[#20C7C9]/50"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1688B8]/10 border border-[#1688B8]/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#20C7C9]">{ROMAN[ch.number - 1] || ch.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-[#53697D] uppercase tracking-wide mb-1">Chapter {ch.number}</div>
                  <h2 className="text-[15px] font-semibold text-[#F6FBFF] group-hover:text-[#2DDBD3] transition-colors leading-snug">{ch.name}</h2>
                  <p className="text-xs text-[#7A93A8] mt-1 line-clamp-2 hidden md:block">{excerpt(ch.content, 140)}</p>
                </div>
                <ArrowRight size={18} className="text-[#53697D] group-hover:text-[#20C7C9] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-[#20C7C9]/10 to-[#1688B8]/5 border border-[#20C7C9]/20 rounded-2xl p-6 text-center">
            <h2 className="text-lg font-bold text-[#F6FBFF] mb-2">Ready to test what you learned?</h2>
            <p className="text-sm text-[#53697D] mb-4">Try free NHA CCMA-style practice questions — no signup needed.</p>
            <Link href="/free-ccma-practice-questions" className="inline-block px-6 py-3 rounded-lg bg-[#1688B8] text-white text-sm font-medium transition-colors">
              Start Free Practice Questions
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
