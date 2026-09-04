import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import theoryData from '@/src/data/theory-data.json';

/** Read the real mtime of a page.tsx file and return its Date (or fallback). */
function fileMtime(relPath: string): Date {
  try {
    const full = path.join(process.cwd(), 'app', relPath, 'page.tsx');
    return new Date(fs.statSync(full).mtimeMs);
  } catch {
    return new Date('2026-08-29');
  }
}

const EN_SLUGS = [
  'ccma-b1-certification-guide', 'ccma-study-guide', 'ai-ccma-exam-preparation',
  'ccma-exam-structure', 'ccma-exam-study-resources', 'ccma-exam-study-plan',
  'ccma-study-mistakes', 'ccma-study-techniques',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://ccmapractice.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: fileMtime('.'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/theory`, lastModified: fileMtime('theory'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/about`, lastModified: fileMtime('about'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/pricing`, lastModified: fileMtime('pricing'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: fileMtime('contact'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/faq`, lastModified: fileMtime('faq'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/privacy`, lastModified: fileMtime('privacy'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/terms`, lastModified: fileMtime('terms'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/blog`, lastModified: fileMtime('blog'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/study-checklist`, lastModified: fileMtime('study-checklist'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/ccma-resources`, lastModified: fileMtime('ccma-resources'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/free-ccma-practice-questions`, lastModified: fileMtime('free-ccma-practice-questions'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/ccma-certification-guide`, lastModified: fileMtime('ccma-certification-guide'), changeFrequency: 'weekly', priority: 1.0 },
  ];

  const enBlog = EN_SLUGS.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: fileMtime(`blog/${slug}`),
    changeFrequency: 'monthly' as const,
    priority: (
      slug === 'ccma-b1-certification-guide' || slug === 'ccma-exam-structure' || slug === 'ccma-study-guide' ? 0.9 :
      slug === 'ccma-exam-study-resources' || slug === 'ccma-exam-study-plan' ? 0.8 :
      0.7
    ),
  }));

  const theoryChapters: MetadataRoute.Sitemap = theoryData.map((ch) => ({ url: `${base}/theory/${ch.id}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 }));

  return [...theoryChapters, ...staticPages, ...enBlog];
}
