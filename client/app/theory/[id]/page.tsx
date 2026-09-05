import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { BookOpen, ChevronRight, ArrowLeft, Home } from 'lucide-react';
import theoryData from '@/src/data/theory-data.json';
import { TheoryContent } from '@/lib/theory-markdown';
import {
  ArticleJsonLd,
  BreadcrumbListJsonLd,
  LearningResourceJsonLd,
} from '@/components/seo/JsonLd';

// Freshness dates derived from the actual content file (stable at build time).
const THEORY_DATA_MTIME = new Date(
  fs.statSync(path.join(process.cwd(), 'src/data/theory-data.json')).mtimeMs
).toISOString().slice(0, 10);

type TheoryChapter = {
  number: number;
  name: string;
  id: string;
  content: string;
};

const chapters = theoryData as TheoryChapter[];
const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV','XXV'];

function excerpt(content: string): string {
  const plain = content
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/[#*`>|_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > 155 ? `${plain.slice(0, 152).trimEnd()}...` : plain;
}

export function generateStaticParams() {
  return chapters.map((ch) => ({ id: ch.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const chapter = chapters.find((ch) => ch.id === id);
  if (!chapter) return {};
  const title = `${chapter.name} — NHA CCMA Study Guide | ccmapractice`;
  const description = excerpt(chapter.content);
  return {
    title,
    description,
    alternates: {
      canonical: `https://ccmapractice.com/theory/${chapter.id}`,
      languages: { en: `https://ccmapractice.com/theory/${chapter.id}` },
    },
    openGraph: {
      title,
      description,
      url: `https://ccmapractice.com/theory/${chapter.id}`,
      type: 'article',
      locale: 'en',
      siteName: 'ccmapractice',
      images: [
        {
          url: 'https://ccmapractice.com/images/og/theory.jpg',
          width: 1200,
          height: 630,
          alt: `${chapter.name} — NHA CCMA Study Guide`,
        },
      ],
    },
    other: {
      'article:published_time': THEORY_DATA_MTIME,
      'article:modified_time': THEORY_DATA_MTIME,
    },
  };
}

export default async function TheoryChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chapter = chapters.find((ch) => ch.id === id);
  if (!chapter) notFound();

  const prev = chapters.find((ch) => ch.number === chapter.number - 1);
  const next = chapters.find((ch) => ch.number === chapter.number + 1);

  return (
    <>
      <ArticleJsonLd
        headline={`${chapter.name} — NHA CCMA Study Guide`}
        description={excerpt(chapter.content)}
        datePublished={THEORY_DATA_MTIME}
        dateModified={THEORY_DATA_MTIME}
        image={['https://ccmapractice.com/images/og/theory.jpg']}
      />
      <LearningResourceJsonLd
        name={`${chapter.name} — NHA CCMA Study Guide`}
        description={excerpt(chapter.content)}
        educationalLevel="Professional"
        teaches={['NHA CCMA Exam', 'Clinical Medical Assisting', 'Patient Care', chapter.name]}
        resourceType="StudyGuide"
      />
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', url: 'https://ccmapractice.com' },
          { name: 'Theory', url: 'https://ccmapractice.com/theory' },
          { name: `Chapter ${chapter.number}: ${chapter.name}`, url: `https://ccmapractice.com/theory/${chapter.id}` },
        ]}
      />
      <div className="min-h-screen bg-[#061C33] text-[#F6FBFF]">
      <header className="border-b border-white/5 bg-[#061C33]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="ccmapractice home">
            <img src="/logo/logo-main.png?v=6" alt="ccmapractice" className="h-7 w-auto" />
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/theory" className="text-[#D6EAF7] hover:text-[#F6FBFF] transition-colors">All Chapters</Link>
            <Link href="/exams" className="text-[#D6EAF7] hover:text-[#F6FBFF] transition-colors">Practice Exams</Link>
            <Link href="/pricing" className="px-4 py-2 rounded-lg bg-[#1688B8] text-[#061C33] font-medium transition-colors">Pricing</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <nav className="flex items-center gap-2 text-xs text-[#53697D] mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#F6FBFF] flex items-center gap-1"><Home size={13} /> Home</Link>
          <ChevronRight size={14} />
          <Link href="/theory" className="hover:text-[#F6FBFF]">Theory</Link>
          <ChevronRight size={14} />
          <span className="text-[#D6EAF7]">Chapter {chapter.number}</span>
        </nav>

        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#1688B8]/10 border border-[#1688B8]/20 flex items-center justify-center shrink-0">
            <BookOpen size={22} className="text-[#1688B8]" />
          </div>
          <div>
            <div className="text-xs font-medium text-[#1688B8] uppercase tracking-wide mb-1">Chapter {ROMAN[chapter.number - 1] || chapter.number}</div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#F6FBFF] leading-tight">{chapter.name}</h1>
            <p className="text-sm text-[#53697D] mt-2 max-w-2xl">ccmapractice study guide with diagrams.</p>
          </div>
        </div>

        <div className="bg-[#12294D] border border-white/10 rounded-2xl p-6 md:p-8">
          <TheoryContent content={chapter.content} color="blue" onDark />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {prev ? (
            <Link href={`/theory/${prev.id}`} className="group flex items-center gap-2 text-sm text-[#53697D] hover:text-[#F6FBFF] border border-white/10 rounded-xl p-4">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="truncate"><span className="block text-xs opacity-60">Chapter {prev.number}</span>{prev.name}</span>
            </Link>
          ) : (<span />)}
          {next ? (
            <Link href={`/theory/${next.id}`} className="group flex items-center justify-end gap-2 text-sm text-[#53697D] hover:text-[#F6FBFF] border border-white/10 rounded-xl p-4 text-right">
              <span className="truncate"><span className="block text-xs opacity-60">Chapter {next.number}</span>{next.name}</span>
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : null}
        </div>

        <div className="mt-8 bg-gradient-to-r from-[#1688B8]/10 to-[#1688B8]/5 border border-[#1688B8]/20 rounded-2xl p-6 text-center">
          <h2 className="text-lg font-bold text-[#F6FBFF] mb-2">Ready to test this chapter?</h2>
          <p className="text-sm text-[#53697D] mb-4">Practice with exam-aligned questions and timed simulations.</p>
          <Link href="/exams" className="inline-block px-6 py-3 rounded-lg bg-[#1688B8] text-white text-sm font-medium transition-colors">Start Practicing Free</Link>
        </div>
      </main>
      </div>
    </>
  );
}
