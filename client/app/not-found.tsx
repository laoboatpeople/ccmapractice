import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found — CCMAPractice',
  description: 'The page you are looking for does not exist. Browse our NHA CCMA exam resources, practice questions, and study guides.',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-[#F8FAFC] flex flex-col">
      {/* Nav */}
      <nav className="border-b border-white/5 bg-[#0A0E1A]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo/logo-main.png?v=3" alt="CCMAPractice" className="h-7 w-auto" />
          </Link>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="text-8xl font-bold bg-gradient-to-r from-[#C8102E] to-[#4C7FBF] bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
          <p className="text-[#94A3B8] mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <Link href="/" className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
              <h3 className="font-semibold text-sm mb-1">🏠 Home</h3>
              <p className="text-xs text-[#64748B]">Back to the CCMAPractice homepage</p>
            </Link>
            <Link href="/free-ccma-practice-questions" className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
              <h3 className="font-semibold text-sm mb-1">📝 Practice Questions</h3>
              <p className="text-xs text-[#64748B]">Free NHA CCMA-style practice questions</p>
            </Link>
            <Link href="/ccma-certification-guide" className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
              <h3 className="font-semibold text-sm mb-1">📚 Certification Guide</h3>
              <p className="text-xs text-[#64748B]">How to earn your CCMA certification</p>
            </Link>
            <Link href="/theory" className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
              <h3 className="font-semibold text-sm mb-1">📋 Theory Guides</h3>
              <p className="text-xs text-[#64748B]">All 13 CCMA blueprint chapters</p>
            </Link>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/auth/login" className="px-6 py-3 rounded-lg bg-[#C8102E] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors">
              Get Started Free
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/[0.05] text-[#F8FAFC] text-sm font-medium transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
