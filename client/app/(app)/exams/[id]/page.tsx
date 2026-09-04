'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Play,
  HelpCircle,
  Loader2,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Timer,
  Clock,
  Target,
  Lock,
  BadgeCheck,
} from 'lucide-react';
import { getStudentExamChapters, getStudentExamCategories } from '@/lib/student-api';
import type { StudentExamCategory, StudentChapter } from '@/types/student';
import { useLocale } from '@/src/contexts/LocaleContext';

const DIFFICULTY_OPTIONS = [
  { value: 'ALL', label: 'app.examDetail.allDifficulties', description: 'app.examDetail.allDesc' },
  { value: 'EASY', label: 'app.examDetail.easy', description: 'app.examDetail.easyDesc' },
  { value: 'MEDIUM', label: 'app.examDetail.medium', description: 'app.examDetail.mediumDesc' },
  { value: 'HARD', label: 'app.examDetail.hard', description: 'app.examDetail.hardDesc' },
] as const;

type Difficulty = (typeof DIFFICULTY_OPTIONS)[number]['value'];

const QUESTION_COUNT_OPTIONS = [10, 20, 30, 50, 100, 150] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
} as const;

/** Parses structured exam descriptions into format details.
 *  Mode A (blueprint): header stats line "**...150 scored + 30 pretest | 3 hours | pass 390/500 (78%)**"
 *  followed by "• Label — N (P%)" bullets (NHA CCMA style).
 *  Mode B (topics list): "Topics: Label N, ..." (compact style).
 */
type ParsedExamFormat = {
  scored?: number;
  pretest?: number;
  hours?: number;
  passScaled?: string;
  passPct?: number;
  passCorrect?: number;
  openBook?: string;
  provider?: string;
  topics?: { label: string; count: number; pct?: number }[];
};

function parseExamFormat(desc: string): ParsedExamFormat | null {
  const fmt: ParsedExamFormat = {};

  // Mode A: blueprint bullets
  const bulletLines = desc
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('•'));
  if (bulletLines.length > 0) {
    fmt.topics = bulletLines
      .map((l) => l.replace(/^•\s*/, ''))
      .map((s) => {
        const m = s.match(/^(.*?)\s+—\s+(\d+)\s*(?:\((\d+)%\))?$/);
        if (m) return { label: m[1].trim(), count: parseInt(m[2], 10), pct: m[3] ? parseInt(m[3], 10) : undefined };
        const m2 = s.match(/^(.*?)\s+(\d+)\s*(?:\((\d+)%\))?$/);
        if (m2) return { label: m2[1].trim(), count: parseInt(m2[2], 10), pct: m2[3] ? parseInt(m2[3], 10) : undefined };
        return { label: s, count: 0 };
      });

    const head = desc.split('\n')[0];
    const sc = head.match(/(\d+)\s+scored/i);
    if (sc) fmt.scored = parseInt(sc[1], 10);
    const pre = head.match(/(\d+)\s+pretest/i);
    if (pre) fmt.pretest = parseInt(pre[1], 10);
    const hr = head.match(/(\d+)\s+hours?/i);
    if (hr) fmt.hours = parseInt(hr[1], 10);
    const scaled = head.match(/pass\s+(\d+\/\d+)/i);
    if (scaled) fmt.passScaled = scaled[1];
    const pct = head.match(/\((\d+)%\)/i);
    if (pct) fmt.passPct = parseInt(pct[1], 10);
    const prov = head.match(/(NHA[^—|]*)/i);
    if (prov) fmt.provider = prov[1].trim();
    return fmt;
  }

  // Mode B: compact "Topics: ..." style
  if (!/Topics:/i.test(desc)) return null;
  const partM = desc.match(/Part\s+(\w+):/i);
  if (partM) fmt.provider = `Part ${partM[1]}`;
  const qM = desc.match(/(\d+)\s+questions/i);
  if (qM) fmt.scored = parseInt(qM[1], 10);
  const minM = desc.match(/(\d+)\s+minutes/i);
  if (minM) fmt.hours = Math.round(parseInt(minM[1], 10) / 60);
  const pctM = desc.match(/(\d+)%\s*to pass/i);
  if (pctM) fmt.passPct = parseInt(pctM[1], 10);
  const corrM = desc.match(/\((\d+)\s+correct\)/i);
  if (corrM) fmt.passCorrect = parseInt(corrM[1], 10);
  const obM = desc.match(/Open-book\s+(.*?)\.\s*Topics:/i);
  if (obM) fmt.openBook = obM[1].trim();
  const topM = desc.match(/Topics:\s*([^.]+)/i);
  if (topM) {
    fmt.topics = topM[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const m = s.match(/^(.*?)\s+(\d+)$/);
        if (m) return { label: m[1].trim(), count: parseInt(m[2], 10) };
        return { label: s, count: 0 };
      });
  }
  const provM = desc.match(/(PSI[^.]*)/i);
  if (provM) fmt.provider = provM[1].trim();
  return fmt;
}

/** Removes the blueprint section (header stats + bullets) from the header description,
 *  leaving the explanatory sections (What is / Why it matters / How scoring works). */
function stripBlueprint(desc: string): string {
  const lines = desc.split('\n');
  const out: string[] = [];
  let skipping = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (!skipping && /^•/.test(line)) continue; // stray bullet outside blueprint? drop
    if (!skipping && /^\*\*.*\b(\d+\s+scored|scored\s+\+)\b/i.test(line)) continue; // header stats
    if (/Exam blueprint/i.test(line)) {
      skipping = true;
      continue;
    }
    if (skipping) {
      if (/^•/.test(line)) continue;
      if (line === '') continue;
      skipping = false;
    }
    out.push(raw);
  }
  return out.join('\n');
}

function ExamFormatDetails({ description }: { description: string }) {
  const fmt = parseExamFormat(description);
  if (!fmt || !fmt.topics || fmt.topics.length === 0) return null;
  return (
    <div className="mt-4 pt-4 border-t border-purple/20">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {fmt.provider && (
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-purple bg-purple/10 border border-purple/25 px-1.5 py-0.5 rounded">
            {fmt.provider}
          </span>
        )}
        {fmt.scored && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple/10 border border-purple/20 text-xs text-text-primary">
            <HelpCircle size={12} className="text-purple" />
            <span className="font-semibold">{fmt.scored}</span> scored
            {fmt.pretest ? (
              <span className="text-text-tertiary">+ {fmt.pretest} pretest</span>
            ) : null}
          </span>
        )}
        {fmt.hours && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple/10 border border-purple/20 text-xs text-text-primary">
            <Clock size={12} className="text-purple" />
            <span className="font-semibold">{fmt.hours}</span> hours
          </span>
        )}
        {(fmt.passScaled || fmt.passPct) && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple/10 border border-purple/20 text-xs text-text-primary">
            <Target size={12} className="text-purple" />
            <span className="font-semibold">{fmt.passScaled ?? `${fmt.passPct}%`}</span> to pass
            {fmt.passPct ? <span className="text-text-tertiary">({fmt.passPct}%)</span> : null}
          </span>
        )}
        {fmt.openBook && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple/10 border border-purple/20 text-xs text-text-primary">
            <BookOpen size={12} className="text-purple" />
            Open book: <span className="font-semibold">{fmt.openBook}</span>
          </span>
        )}
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">Blueprint — scored questions</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
        {fmt.topics.map((topic) => (
          <div key={topic.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-text-secondary">{topic.label}</span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-flex items-center justify-center min-w-[2rem] px-1.5 py-0.5 rounded bg-purple/15 text-purple font-bold text-xs">
                {topic.count}
              </span>
              {topic.pct ? (
                <span className="text-[11px] text-text-tertiary">{topic.pct}%</span>
              ) : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Renders inline markdown-lite: **bold** segments. */
function renderInline(text: string, baseKey: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? (
      <strong key={`${baseKey}-b${i}`} className="font-semibold text-text-primary">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={`${baseKey}-${i}`}>{p}</span>
    )
  );
}

/** Structured exam description: **bold** titles, • bullets, paragraphs. */
function ExamDescription({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="text-sm text-text-secondary mt-2 max-w-2xl space-y-1.5">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith('•')) {
          return (
            <div key={i} className="flex gap-2 leading-relaxed">
              <span className="text-cyan shrink-0 mt-px">•</span>
              <span className="text-text-secondary">{renderInline(trimmed.slice(1).trim(), `l${i}`)}</span>
            </div>
          );
        }
        const isTitle = trimmed.startsWith('**') && trimmed.endsWith('**');
        return (
          <p
            key={i}
            className={isTitle ? 'text-[13px] font-semibold text-text-primary pt-1' : 'leading-relaxed'}
          >
            {renderInline(trimmed, `l${i}`)}
          </p>
        );
      })}
    </div>
  );
}

export default function StudentExamDetailPage() {
  const { t } = useLocale();
  const router = useRouter();
  const params = useParams();
  const examId = params.id as string;

  const [exam, setExam] = useState<StudentExamCategory | null>(null);
  const [chapters, setChapters] = useState<StudentChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('ALL');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [showFormat, setShowFormat] = useState(false);

  useEffect(() => {
    // Read adaptive difficulty from localStorage
    const saved = localStorage.getItem(`ccmapractice_adaptive_${examId}`);
    if (saved && ['ALL', 'EASY', 'MEDIUM', 'HARD'].includes(saved)) {
      setDifficulty(saved as Difficulty);
    }
  }, [examId]);

  useEffect(() => {
    document.title = `${t('app.exams.title')} | CCMAPractice`;
  }, [t]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch chapters and categories in parallel
      const [chaptersData, categoriesData] = await Promise.all([
        getStudentExamChapters(examId),
        getStudentExamCategories(),
      ]);

      setChapters(chaptersData);

      // Find the matching exam category
      const match = categoriesData.find((c) => c.id === examId);
      if (match) {
        setExam(match);
      } else {
        // Exam not found in categories — still show chapters, but no header info
        setExam(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('app.examDetail.failedToLoad'));
    } finally {
      setLoading(false);
    }
  }, [examId, t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStartQuiz = () => {
    // Clean up any previous quiz results stored for this exam (written at
    // submission for the tutor-return flow). Without this, re-mounting the
    // quiz page restores the old result screen from sessionStorage.
    sessionStorage.removeItem(`quiz_results_${examId}`);
    // Cap the requested count to the total questions available in this exam
    const effectiveCount = Math.min(questionCount, totalQuestions > 0 ? totalQuestions : questionCount);
    const params = new URLSearchParams({ count: String(effectiveCount), difficulty });
    // Unique timestamp param: guarantees a full page load every time.
    // Without it, navigating to a URL already in history (right after Back)
    // makes the browser restore the previous page from bfcache — including
    // the completed quiz result state.
    params.set('t', String(Date.now()));
    window.location.href = `/quiz/${examId}?${params}`;
  };

  const handleStartExamSimulation = () => {
    if (!exam || exam.locked || exam.simulationLocked) {
      router.push('/subscription');
      return;
    }
    sessionStorage.removeItem(`quiz_results_${examId}`);
    // Official format: 150 scored questions + 30 pretest (180 total), mode=exam
    // -> quiz page applies the official timer (exam.timeLimit x 60) automatically.
    const params = new URLSearchParams({
      count: String(exam.questionsPerSimulation ?? 150),
      mode: 'exam',
      difficulty: 'ALL',
    });
    params.set('t', String(Date.now()));
    window.location.href = `/quiz/${examId}?${params}`;
  };

  const handleSelectChapter = (chapterId: string, chapterCount: number) => {
    // Clean up any previous quiz results stored for this exam — see
    // handleStartQuiz comment.
    sessionStorage.removeItem(`quiz_results_${examId}`);
    // Launch the quiz directly, scoped to this chapter, all difficulties.
    const params = new URLSearchParams({
      count: String(chapterCount),
      chapterId,
      difficulty: 'ALL',
    });
    // Unique timestamp param — see handleStartQuiz comment.
    params.set('t', String(Date.now()));
    window.location.href = `/quiz/${examId}?${params}`;
  };

  if (loading) {
    return (
      <div className="animate-fade-in space-y-6">
        {/* Breadcrumb skeleton */}
        <div className="skeleton h-4 w-32 rounded mb-6" />

        {/* Header skeleton */}
        <div className="skeleton h-8 w-48 rounded mb-2" />
        <div className="skeleton h-4 w-72 rounded mb-6" />

        {/* Stats skeleton */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="skeleton h-16 w-36 rounded-card" />
          <div className="skeleton h-16 w-36 rounded-card" />
        </div>

        {/* Chapters skeleton */}
        <div className="skeleton h-6 w-28 rounded mb-4" />
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-14 rounded-card" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <button
          onClick={() => router.push('/exams')}
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={14} />
          {t('app.examDetail.backToExams')}
        </button>
        <div className="flex items-center gap-3 px-4 py-3 bg-red/10 border border-red/20 rounded-card text-sm text-red">
          <AlertCircle size={16} />
          {error}
          <button
            onClick={fetchData}
            className="ml-auto underline hover:no-underline text-text-secondary hover:text-text-primary"
          >
            <RefreshCw size={14} className="inline mr-1" />
            {t('app.exams.retry')}
          </button>
        </div>
      </div>
    );
  }

  // If exam is null but chapters were returned, show partial info
  const displayName = exam?.name ?? t('app.examDetail.unknownExam');
  const displayCode = exam?.code ?? '—';
  const totalQuestions = chapters.reduce((sum, ch) => sum + ch.questionCount, 0);

  return (
    <div className="animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => router.push('/exams')}
        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        {t('app.examDetail.backToExams')}
      </button>

      {/* Exam header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-text-tertiary mb-2">
          <span>{t('app.exams.title')}</span>
          <ChevronRight size={12} />
          <span className="font-mono text-blue">{displayCode}</span>
        </div>
        <h1 className="text-2xl font-semibold text-text-primary">{displayName}</h1>
        {exam?.description &&
          (parseExamFormat(exam.description)
            ? <ExamDescription text={stripBlueprint(exam.description)} />
            : <ExamDescription text={exam.description} />)
        }

        {/* Info chips */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          {/* Country badge */}
          {exam?.country && (
            <span className="text-[10px] font-medium text-text-tertiary px-2 py-1 bg-hover rounded">
              {exam.country}
            </span>
          )}

          {/* License type */}
          {exam?.licenseType && (
            <span className="text-[10px] font-medium text-text-tertiary px-2 py-1 bg-hover rounded">
              {exam.licenseType}
            </span>
          )}
        </div>
      </div>

      {/* Official Exam Simulation — distinct hero design */}
      {exam && (
        <div className="relative overflow-hidden p-6 rounded-card border border-purple/30 bg-gradient-to-br from-purple/15 via-purple/[0.07] to-card shadow-lg shadow-purple/10 mb-4">
          {/* subtle glow blob */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-purple/10 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple/15 border border-purple/30 flex items-center justify-center shrink-0">
                  <Timer size={20} className="text-purple" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-text-primary leading-tight">
                    {t('app.examDetail.examSimulation')}
                  </h2>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-purple bg-purple/10 border border-purple/25 px-1.5 py-0.5 rounded">
                    <BadgeCheck size={11} />
                    {t('app.examDetail.officialBadge')}
                  </span>
                </div>
              </div>
              <p className="text-xs text-text-secondary">{t('app.examDetail.examSimDesc')}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple/10 border border-purple/20 text-xs text-text-primary">
                  <HelpCircle size={12} className="text-purple" />
                  <span className="font-semibold">{exam.questionsPerSimulation ?? 90}</span>
                  {t('app.examDetail.questionsCount')}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple/10 border border-purple/20 text-xs text-text-primary">
                  <Clock size={12} className="text-purple" />
                  <span className="font-semibold">{exam.timeLimit ?? 180}</span>
                  {t('app.examDetail.minLabel')}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple/10 border border-purple/20 text-xs text-text-primary">
                  <Target size={12} className="text-purple" />
                  <span className="font-semibold">{exam.passingScore ?? 70}%</span>
                  {t('app.examDetail.passLabel')}
                </span>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={handleStartExamSimulation}
                className={`relative flex items-center justify-center gap-2 px-6 py-3 rounded-btn text-sm font-semibold transition-all active:scale-[0.98] whitespace-nowrap w-full sm:w-auto shrink-0 ${
                  exam.locked || exam.simulationLocked
                    ? 'bg-blue text-white hover:bg-blue/90'
                    : 'bg-gradient-to-r from-purple to-blue text-white shadow-md shadow-purple/25 hover:shadow-purple/40 hover:brightness-110'
                }`}
              >
                <Play size={16} className="fill-current" />
                {t('app.examDetail.examSimStart')}
              </button>
              {(exam.locked || exam.simulationLocked) && (
                <span
                  className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red text-white border-2 border-card shadow-sm"
                  title={t('app.examDetail.examSimLocked')}
                >
                  <Lock size={10} />
                </span>
              )}
            </div>
          </div>

          {exam.description && parseExamFormat(exam.description) && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFormat((v) => !v)}
                className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary hover:text-purple transition-colors"
                aria-expanded={showFormat}
              >
                {showFormat ? 'Less details' : 'More details'}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${showFormat ? 'rotate-180' : ''}`}
                />
              </button>
              {showFormat && <ExamFormatDetails description={exam.description} />}
            </div>
          )}
        </div>
      )}

      {/* Start Practice Quiz section */}
      <div className="bg-card border border-border rounded-card p-5 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-text-primary mb-1">{t('app.examDetail.practiceQuiz')}</h2>
            <p className="text-xs text-text-secondary">
              {t('app.examDetail.practiceDesc', { count: chapters.length })}
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full sm:w-auto">
            {/* Question count selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-text-tertiary whitespace-nowrap">{t('app.examDetail.questionCountLabel')}</span>
              <div className="flex flex-wrap bg-hover border border-border rounded-btn">
                {QUESTION_COUNT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setQuestionCount(opt)}
                    className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      questionCount === opt
                        ? 'bg-blue text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-hover'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Capped notice when selection exceeds available questions */}
            {totalQuestions > 0 && questionCount > totalQuestions && (
              <p className="text-xs text-amber flex items-center gap-1.5">
                <AlertCircle size={12} className="shrink-0" />
                {t('app.examDetail.questionCountCapped', {
                  requested: questionCount,
                  available: totalQuestions,
                })}
              </p>
            )}

            {/* Difficulty selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-text-tertiary whitespace-nowrap">{t('app.examDetail.difficulty')}</span>
              <div className="flex flex-wrap bg-hover border border-border rounded-btn">
                {DIFFICULTY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setDifficulty(opt.value)}
                    className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      difficulty === opt.value
                        ? 'bg-blue text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-hover'
                    }`}
                    title={t(opt.description)}
                  >
                    {t(opt.label)}
                  </button>
                ))}
              </div>
            </div>

            {/* Start button */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleStartQuiz}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-btn text-sm font-medium transition-colors active:scale-[0.98] whitespace-nowrap w-full sm:w-auto bg-blue text-white hover:bg-blue/90`}
                title={t('app.examDetail.practiceDesc', { count: chapters.length })}
              >
                <Play size={15} />
                {t('app.examDetail.startPractice')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
            <BookOpen size={16} className="text-cyan" />
            {t('app.examDetail.chapters')}
            <span className="text-xs font-normal text-text-tertiary ml-1">
              {t('app.examDetail.totalLabel', { count: chapters.length })}
            </span>
          </h2>
          <span className="text-xs text-text-tertiary flex items-center gap-1">
            <HelpCircle size={12} />
            {totalQuestions} {totalQuestions !== 1 ? t('app.examDetail.questionsCount') : t('app.examDetail.questionSingular')}
          </span>
        </div>

        {/* Chapter-by-chapter hint */}
        <p className="text-xs text-text-secondary mb-4 flex items-start gap-1.5">
          <BookOpen size={12} className="text-cyan shrink-0 mt-0.5" />
          <span>{t('app.examDetail.chaptersHint')}</span>
        </p>

        {chapters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-card border border-border rounded-card">
            <BookOpen size={24} className="text-text-tertiary mb-3" />
            <p className="text-sm text-text-secondary">{t('app.examDetail.noChapters')}</p>
            <p className="text-xs text-text-tertiary mt-1">
              {t('app.examDetail.noChaptersDesc')}
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                variants={itemVariants}
                className="relative bg-card border border-border rounded-card px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 hover:bg-hover/30 transition-colors"
              >
                {chapter.locked && (
                  <button
                    onClick={(e) => { e.stopPropagation(); router.push('/subscription'); }}
                    className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red text-white border-2 border-card shadow-sm cursor-pointer hover:bg-red/80 transition-colors"
                    title={t('app.examDetail.testChapterLocked')}
                    aria-label={t('app.examDetail.testChapterLocked')}
                  >
                    <Lock size={10} />
                  </button>
                )}
                <div className="flex items-center gap-3 min-w-0 flex-1 w-full">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue/10 border border-blue/20 text-blue flex-shrink-0">
                    <span className="text-xs font-mono font-bold">{chapter.number}</span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium leading-snug ${
                      chapter.locked ? 'text-text-tertiary' : 'text-text-primary'
                    }`}>
                      {chapter.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <p className="text-[11px] text-text-tertiary">
                        {t('app.examDetail.chapterNum', { number: chapter.number })}
                      </p>
                      {chapter.syllabusRef && (
                        <span className="text-[9px] font-mono text-cyan/70 bg-cyan/5 px-1.5 py-0.5 rounded border border-cyan/10">
                          {chapter.syllabusRef}
                        </span>
                      )}
                      {chapter.licenseScope && chapter.licenseScope !== 'SHARED' && (
                        <span className="text-[9px] font-medium text-amber/80 bg-amber/5 px-1.5 py-0.5 rounded border border-amber/10">
                          {chapter.licenseScope}
                        </span>
                      )}
                      <a
                        href={`/theory?chapterId=${chapter.id}`}
                        className="flex items-center justify-center gap-1 px-2.5 py-1 bg-blue/10 border border-blue/20 text-blue rounded-btn text-[10px] font-medium hover:bg-blue/20 transition-colors whitespace-nowrap"
                        title={t('app.examDetail.studyChapterDesc')}
                      >
                        <BookOpen size={11} />
                        {t('app.examDetail.studyChapter')}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto sm:justify-end justify-between">
                  <span className="text-xs text-text-secondary flex items-center gap-1.5 px-2 py-1 bg-hover border border-border rounded whitespace-nowrap">
                    <HelpCircle size={11} className="text-amber" />
                    {chapter.questionCount} {chapter.questionCount !== 1 ? t('app.examDetail.questionsCount') : t('app.examDetail.questionSingular')}
                  </span>
                  {chapter.questionCount > 0 && (
                    <button
                      onClick={chapter.locked ? () => router.push('/subscription') : () => handleSelectChapter(chapter.id, chapter.questionCount)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-btn text-xs font-medium transition-colors whitespace-nowrap ${
                        chapter.locked
                          ? 'bg-red/10 text-red hover:bg-red/20 border border-red/30'
                          : 'bg-cyan/10 border border-cyan/20 text-cyan hover:bg-cyan/20'
                      }`}
                      title={chapter.locked ? t('app.examDetail.testChapterLocked') : t('app.examDetail.testChapterDesc')}
                    >
                      {chapter.locked ? (
                        <>
                          <Lock size={12} />
                          {t('app.examDetail.upgradeForAll')}
                        </>
                      ) : (
                        <>
                          <Play size={12} />
                          {t('app.examDetail.testChapter')}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

    </div>
  );
}
