'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Layers,
  HelpCircle,
  AlertCircle,
  RefreshCw,
  Clock,
  Target,
  Lock,
} from 'lucide-react';
import { getStudentExamCategories } from '@/lib/student-api';
import type { StudentExamCategory } from '@/types/student';
import { useLocale } from '@/src/contexts/LocaleContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
} as const;

type SectionColor = 'blue' | 'amber' | 'cyan' | 'purple';

const SECTION_STYLES: Record<SectionColor, { bg: string; border: string; text: string; bar: string }> = {
  blue: {
    bg: 'bg-blue/10',
    border: 'border-blue/20',
    text: 'text-blue',
    bar: 'bg-blue',
  },
  amber: {
    bg: 'bg-amber/10',
    border: 'border-amber/20',
    text: 'text-amber',
    bar: 'bg-amber',
  },
  cyan: {
    bg: 'bg-cyan/10',
    border: 'border-cyan/20',
    text: 'text-cyan',
    bar: 'bg-cyan',
  },
  purple: {
    bg: 'bg-purple/10',
    border: 'border-purple/20',
    text: 'text-purple',
    bar: 'bg-purple',
  },
};

function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-card p-5 animate-pulse">
      <div className="skeleton h-5 w-16 rounded mb-3" />
      <div className="skeleton h-5 w-3/4 rounded mb-2" />
      <div className="skeleton h-3 w-full rounded mb-1" />
      <div className="skeleton h-3 w-2/3 rounded mb-4" />
      <div className="flex items-center gap-4">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
  );
}

export default function StudentExamsPage() {
  const { t, locale } = useLocale();
  const router = useRouter();

  const CATEGORY_TRANSLATIONS: Record<string, string> = {
    'bc172cd8-3cb9-46b4-ab5f-34a66a48902c': 'cat_B1Admin',
    '669718ac-2307-4804-9f97-b9fd1dfb6e32': 'cat_B1Walls',
    '7de3ed61-9242-4d6e-afa9-0173a925dd91': 'cat_B1Planning',
    'dc971218-05cd-488a-bfb3-a3f41f3d0268': 'cat_B1Foundations',
    '4e8f5360-33b7-4567-be14-878d63489d37': 'cat_E1Electrical',
    'bff23548-52a9-49f4-bccf-c7d7c7ec0e9a': 'cat_B1Egress',
    '5e52edd3-2698-4788-9eee-1427332d92c0': 'cat_B1PlanningPrac',
    '8116a886-bb07-4bca-9a5b-3728bb8b219f': 'cat_B1FoundationsPrac',
    'dad311a9-dad8-4d99-b7a5-839bbb8b1d28': 'cat_E1ElectricalPrac',
    'b2f6c1c0-2156-4a02-8025-0a0e4ded0533': 'cat_B2Commercial',
  };

  const LICENSE_SECTIONS: {
    key: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    iconBig: React.ReactNode;
    color: SectionColor;
    codeFilter: (code: string) => boolean;
  }[] = [
    {
      key: 'common',
      title: t('licenseCommon'),
      subtitle: t('licenseCommonSub'),
      icon: <BookOpen size={16} />,
      iconBig: <BookOpen size={22} />,
      color: 'blue',
      codeFilter: (code: string) => code.startsWith('CCMA'),
    },
  ] as const;

  useEffect(() => {
    document.title = `${t('examCategories')} | CCMAPractice`;
  }, [t]);

  const [categories, setCategories] = useState<StudentExamCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStudentExamCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('somethingWentWrong'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  function getExamIcon(code: string, size = 18) {
    return <BookOpen size={size} />;
  }

  function renderExamCard(category: StudentExamCategory, sectionColor: SectionColor) {
    const colors = SECTION_STYLES[sectionColor];
    const cardIcon = getExamIcon(category.code, 18);

    return (
      <motion.div
        key={category.id}
        variants={cardVariants}
        onClick={() => {
          if (category.locked) {
            router.push('/subscription');
          } else {
            router.push(`/exams/${category.id}`);
          }
        }}
        className={`bg-card border rounded-card p-5 cursor-pointer transition-all duration-200 group relative overflow-hidden ${
          category.locked
            ? 'border-red/30 opacity-60 hover:opacity-80'
            : 'border-border hover:border-blue/30 hover:bg-hover/50'
        }`}
      >
        {/* Lock overlay for locked exams */}
        {category.locked && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-card">
            <div className="flex flex-col items-center gap-1 text-white">
              <Lock size={28} />
              <span className="text-xs font-semibold uppercase tracking-wider">{t('locked')}</span>
            </div>
          </div>
        )}

        {/* Top row: icon + code badge */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`h-9 w-9 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
            <span className={colors.text}>{cardIcon}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono font-medium border rounded ${
              category.locked
                ? 'text-red bg-red/10 border-red/20'
                : `${colors.text} ${colors.bg} ${colors.border}`
            }`}>
              {category.locked && <Lock size={13} />}
              {category.code}
            </span>
            <span className="text-[10px] text-text-tertiary font-medium px-2 py-0.5 bg-hover rounded">
              {category.country}
            </span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-sm font-semibold text-text-primary group-hover:text-blue transition-colors mb-1">
          {t(CATEGORY_TRANSLATIONS[category.id] || '') || category.name}
        </h3>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-text-tertiary">
          <span className="flex items-center gap-1.5">
            <Layers size={13} className="text-cyan" />
            {category.chapterCount} {category.chapterCount !== 1 ? t('chapters') : t('chapter')}
          </span>
          <span className="flex items-center gap-1.5">
            <HelpCircle size={13} className="text-amber" />
            {category.questionCount} {category.questionCount !== 1 ? t('questions') : t('question')}
          </span>
        </div>

        {/* Extra info row */}
        <div className="flex items-center gap-3 mt-2 text-[10px] text-text-tertiary">
          {category.timeLimit && (
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {category.timeLimit} {t('min')}
            </span>
          )}
          {category.passingScore && (
            <span className="flex items-center gap-1">
              <Target size={11} />
              {category.passingScore}% {t('pass')}
            </span>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="animate-fade-in space-y-10">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-text-primary">NHA CCMA</h1>
        <p className="text-sm text-text-secondary mt-1">
          {locale.startsWith('fr')
            ? '150 questions notées + 30 prétest · 3 heures · note de passage 390/500.'
            : '150 scored questions + 30 pretest · 3 hours · passing score 390/500.'}
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-red/10 border border-red/20 rounded-card text-sm text-red">
          <AlertCircle size={16} />
          {error}
          <button
            onClick={fetchCategories}
            className="ml-auto underline hover:no-underline text-text-secondary hover:text-text-primary"
          >
            <RefreshCw size={14} className="inline mr-1" />
            {t('retry')}
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-8">
          <div>
            <div className="skeleton h-6 w-64 rounded mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && categories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4">
            <BookOpen size={24} className="text-text-tertiary" />
          </div>
          <h2 className="text-lg font-medium text-text-primary mb-1">{t('noExams')}</h2>
          <p className="text-sm text-text-secondary max-w-sm text-center">
            {t('noExamsDesc')}
          </p>
        </div>
      )}

      {/* Sections */}
      {!loading && categories.length > 0 && (
        LICENSE_SECTIONS.map((section) => {
          const colors = SECTION_STYLES[section.color];
          const filtered = section.codeFilter
            ? categories.filter(c => section.codeFilter(c.code))
            : categories;

          // Skip empty sections (no placeholder needed when all sections have data)
          if (filtered.length === 0) return null;

          return (
            <motion.div
              key={section.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Section header — prominent with left accent bar + colored icon */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-1 h-10 rounded-full ${colors.bar} shrink-0 mt-1`} />
                <div className={`h-10 w-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                  <span className={colors.text}>{section.iconBig}</span>
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-text-primary">{section.title}</h2>
                </div>
              </div>

              {/* Exam cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filtered.map(cat => renderExamCard(cat, section.color))}
              </motion.div>
            </motion.div>
          );
        })
      )}
    </div>
  );
}
