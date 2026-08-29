"use client";

import { useState } from "react";
import { 
  Sparkles, FileText, BarChart3, Brain, 
  TrendingUp, MessageCircle, BookOpen, Monitor, 
  Clock, Target, Zap, ChevronRight, Play, Shield,
  Linkedin, Instagram, Check, Briefcase, LogIn, Award,
  Mail, Loader2, Menu, X
} from "lucide-react";
import AppMockup from "@/components/marketing/AppMockup";
import RelatedStudyPlatforms from "@/components/marketing/RelatedStudyPlatforms";
import ScrollReveal from "@/components/ScrollReveal";
import FeatureCard from "@/components/marketing/FeatureCard";
import TestimonialCard from "@/components/marketing/TestimonialCard";
import PricingCard from "@/components/marketing/PricingCard";

const CCMA_CHAPTERS = [
  { num: "01", title: "Foundational Knowledge and Basic Science" },
  { num: "02", title: "Anatomy and Physiology" },
  { num: "03", title: "Patient Intake and Vitals" },
  { num: "04", title: "General Patient Care Part 1" },
  { num: "05", title: "General Patient Care Part 2" },
  { num: "06", title: "Infection Control and Safety" },
  { num: "07", title: "Point of Care Testing and Laboratory Procedures" },
  { num: "08", title: "Phlebotomy" },
  { num: "09", title: "EKG and Cardiovascular Testing" },
  { num: "10", title: "Patient Care Coordination and Education" },
  { num: "11", title: "Administrative Assisting" },
  { num: "12", title: "Communication and Customer Service" },
  { num: "13", title: "Medical Law and Ethics" },
];

function CcmaNewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), locale: "en" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setMessage("You have been subscribed! Check your inbox for free CCMA practice questions.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#DB2777]/5 to-transparent" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#DB2777] to-[#A855F7] bg-clip-text text-transparent">
              Get Free CCMA Practice Questions
            </span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto mb-8">
            Subscribe and get free NHA CCMA practice questions, exam tips, and study resources delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#DB2777]/50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DB2777] to-[#A855F7] font-semibold text-white hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              Subscribe
            </button>
          </form>
          {message && (
            <p className={`mt-4 text-sm ${status === "success" ? "text-[#10B981]" : "text-[#EF4444]"}`}>
              {message}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function MarketingLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#150A12] text-[#F8FAFC] font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#150A12]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo/logo-main.png?v=5" alt="CCMAPractice" className="h-9 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-[#94A3B8] hover:text-white transition-colors">How It Works</a>
            <a href="#chapters" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Chapters</a>
            <a href="#pricing" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Pricing</a>
            <a href="/blog" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Blog</a>
            <a href="/faq" className="text-sm text-[#94A3B8] hover:text-white transition-colors">FAQ</a>
            <a href="/contact" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Contact</a>
            <a href="#testimonials" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="/auth/login" className="hidden sm:inline-block px-4 py-2 bg-[#DB2777] hover:bg-[#BE185D] rounded-lg text-sm font-medium transition-colors">
              Sign In
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg border border-white/10 text-[#F8FAFC] hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#150A12]/95 backdrop-blur-md">
            <div className="px-6 py-4 flex flex-col gap-4">
              <a href="#features" onClick={() => setMenuOpen(false)} className="text-sm text-[#94A3B8] hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-sm text-[#94A3B8] hover:text-white transition-colors">How It Works</a>
              <a href="#chapters" onClick={() => setMenuOpen(false)} className="text-sm text-[#94A3B8] hover:text-white transition-colors">Chapters</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-sm text-[#94A3B8] hover:text-white transition-colors">Pricing</a>
              <a href="/blog" onClick={() => setMenuOpen(false)} className="text-sm text-[#94A3B8] hover:text-white transition-colors">Blog</a>
              <a href="/faq" onClick={() => setMenuOpen(false)} className="text-sm text-[#94A3B8] hover:text-white transition-colors">FAQ</a>
              <a href="/contact" onClick={() => setMenuOpen(false)} className="text-sm text-[#94A3B8] hover:text-white transition-colors">Contact</a>
              <a href="#testimonials" onClick={() => setMenuOpen(false)} className="text-sm text-[#94A3B8] hover:text-white transition-colors">Testimonials</a>
              <a href="/auth/login" onClick={() => setMenuOpen(false)} className="sm:hidden px-4 py-2 bg-[#DB2777] hover:bg-[#BE185D] rounded-lg text-sm font-medium text-center transition-colors">
                Sign In
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background gradient and glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#DB2777]/10 via-[#150A12] to-[#150A12]" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#DB2777]/20 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-20 w-[400px] h-[400px] bg-[#A855F7]/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Hero left content */}
            <div 
              className="animate-fade-in-up flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-sm text-[#94A3B8]">NHA CCMA Exam Prep</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#DB2777] to-[#A855F7] bg-clip-text text-transparent">
                  Pass Your NHA CCMA
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#A855F7] to-[#DB2777] bg-clip-text text-transparent">
                  Exam with Confidence
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#94A3B8] mb-8 max-w-xl mx-auto lg:mx-0">
                Master the 13-chapter NHA CCMA blueprint with 1,200+ practice questions, complete theory guides, and an AI tutor that explains every answer.
              </p>
              
              {/* Feature bullets */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                {[
                  { icon: Sparkles, text: "1,200+ practice questions" },
                  { icon: Monitor, text: "Study anywhere" },
                  { icon: Shield, text: "390/500 passing score" },
                  { icon: Brain, text: "AI tutor included" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <item.icon className="w-4 h-4 text-[#DB2777]" />
                    <span className="text-sm text-[#94A3B8]">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/auth/login"
                  className="group px-8 py-4 bg-gradient-to-r from-[#DB2777] to-[#A855F7] rounded-xl font-semibold text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Start Practicing Free
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#how-it-works"
                  className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  See How It Works
                </a>
              </div>
            </div>

            {/* Right - App mockup */}
            <div
              className="animate-fade-in-right flex-1 flex justify-center lg:justify-end"
            >
              <AppMockup title="Phlebotomy — Chapter 8">
                <div className="space-y-3">
                  <div className="text-xs text-[#DB2777] font-medium">Question 12 of 50</div>
                  <div className="text-sm text-[#F8FAFC] font-medium leading-relaxed">
                    Which of the following is the correct order of draw for venipuncture using a standard evacuated tube system?
                  </div>
                  <div className="space-y-2 mt-3">
                    {[
                      { text: "Light blue, red, green, lavender", correct: true },
                      { text: "Red, lavender, light blue, green", correct: false },
                      { text: "Green, red, lavender, light blue", correct: false },
                      { text: "Lavender, green, red, light blue", correct: false },
                    ].map((opt, i) => (
                      <div key={i} className={`p-2 rounded-lg text-xs ${opt.correct ? 'bg-[#DB2777]/20 border border-[#DB2777]/50 text-white' : 'bg-white/5 text-[#94A3B8]'}`}>
                        {opt.text}
                      </div>
                    ))}
                  </div>
                </div>
              </AppMockup>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUILT FOR BUSY MEDICAL ASSISTANTS */}
      <section id="why-mobile" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#DB2777]/5 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#DB2777] to-[#A855F7] bg-clip-text text-transparent">
                Built for Busy Medical Assistants
              </span>
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              Study in short sessions between patients, on your commute, or at home — every session syncs to your progress.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Monitor, title: "Study Anywhere", desc: "Practice on your phone, tablet, or laptop — your progress syncs across every device." },
              { icon: Clock, title: "Short Sessions", desc: "Fit a 10-minute practice session between shifts and stay consistent without burning out." },
              { icon: Brain, title: "AI Tutor", desc: "Ask the AI tutor to explain any question, guideline, or concept in plain language." },
              { icon: Target, title: "Adaptive Practice", desc: "Questions adapt to your weak areas so every session targets exactly what you need." },
              { icon: Briefcase, title: "Career-Ready Skills", desc: "Clinical procedures, medical terminology, and guidelines — knowledge you use on the job." },
              { icon: TrendingUp, title: "Better Retention", desc: "Concept-by-concept theory review and repeated practice lock in what you learn." },
            ].map((item, i) => (
              <FeatureCard 
                key={i} 
                icon={item.icon} 
                title={item.title} 
                description={item.desc} 
                index={i} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#DB2777] to-[#A855F7] bg-clip-text text-transparent">
                Everything You Need to Pass the NHA CCMA Exam
              </span>
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              A complete CCMA study system — theory, practice, and AI support in one place.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "1,200+ Practice Questions", desc: "Exam-style questions covering all 13 blueprint chapters, each with a detailed explanation that cites OSHA, HIPAA, CDC, and AHA guidelines." },
              { icon: BookOpen, title: "Complete Theory Guides", desc: "Structured study guides for all 13 chapters — anatomy, phlebotomy, EKG, infection control, medical law and ethics, and more." },
              { icon: Brain, title: "AI Tutor", desc: "Stuck on a question? The AI tutor explains every answer and every concept in plain, easy-to-understand language." },
              { icon: Target, title: "Adaptive Practice", desc: "The platform focuses your practice on your weak areas so you study smarter, not longer." },
              { icon: MessageCircle, title: "Guideline-Backed Explanations", desc: "Every question includes an explanation grounded in the real guidelines — OSHA Bloodborne Pathogens, HIPAA, CDC Standard Precautions, and AHA CPR." },
              { icon: BarChart3, title: "Progress Analytics", desc: "Track accuracy, speed, and coverage of the 13-chapter blueprint to know exactly when you are exam-ready." },
            ].map((item, i) => (
              <FeatureCard 
                key={i} 
                icon={item.icon} 
                title={item.title} 
                description={item.desc} 
                index={i} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#A855F7]/5 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#DB2777] to-[#A855F7] bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              Three steps from your first practice session to your passing score.
            </p>
          </ScrollReveal>

          <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#DB2777] via-[#A855F7] to-[#8B5CF6]" />
            
            {[
              { num: "1", title: "Create Your Free Account", desc: "Sign up and get instant access to CCMA practice questions and your first theory chapter." },
              { num: "2", title: "Practice and Review", desc: "Work through exam-style questions, read guideline-backed explanations, and let the AI tutor fill the gaps." },
              { num: "3", title: "Pass Your CCMA Exam", desc: "Take full-length timed simulations and walk into the NHA CCMA exam ready to score 390+." },
            ].map((item, i) => (
              <ScrollReveal key={i} className="relative flex-1 max-w-sm text-center">
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#DB2777] to-[#A855F7] flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_40px-rgba(59,130,246,0.3)]">
                    {item.num}
                  </div>
                  <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CHAPTERS SECTION — the 13-chapter NHA CCMA blueprint */}
      <section id="chapters" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#DB2777] to-[#A855F7] bg-clip-text text-transparent">
                The 13 Chapters of the NHA CCMA Blueprint
              </span>
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              Every topic on the official NHA CCMA exam, covered in depth by our theory guides and practice questions.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CCMA_CHAPTERS.map((chapter, i) => (
              <ScrollReveal
                key={chapter.num}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#DB2777]/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DB2777] to-[#A855F7] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {chapter.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#F8FAFC] mb-1 group-hover:text-[#DB2777] transition-colors">
                      {chapter.title}
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      {i === 0 ? "Medical terminology and basic science foundations" :
                       i === 1 ? "Body systems and how they work together" :
                       i === 2 ? "Patient intake, history, and vital signs" :
                       i === 3 ? "Assisting with exams, procedures, and patient care" :
                       i === 4 ? "Injections, wound care, and continued patient support" :
                       i === 5 ? "OSHA and CDC standard precautions, safety" :
                       i === 6 ? "CLIA-waived testing and lab procedures" :
                       i === 7 ? "Order of draw, tubes, and venipuncture technique" :
                       i === 8 ? "EKG lead placement and cardiovascular testing" :
                       i === 9 ? "Patient education and care coordination" :
                       i === 10 ? "Scheduling, billing, and medical records" :
                       i === 11 ? "Therapeutic communication and customer service" :
                       "HIPAA, consent, and professional ethics"}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/ccma-certification-guide"
              className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white transition-colors group"
            >
              Read the full CCMA certification guide
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. STATS SECTION */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#DB2777]/10 via-[#150A12] to-[#8B5CF6]/10" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#DB2777] to-[#A855F7] bg-clip-text text-transparent">
                Know Exactly What You Are Preparing For
              </span>
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              The NHA CCMA exam, by the numbers — so there are no surprises on exam day.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, value: "150", label: "Scored questions on the CCMA exam" },
              { icon: Clock, value: "3 hours", label: "Exam duration" },
              { icon: Target, value: "390/500", label: "NHA passing score (~78%)" },
              { icon: Award, value: "81.4%", label: "NHA CCMA pass rate (2024)" },
            ].map((item, i) => (
              <ScrollReveal
                key={i}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#DB2777]/30 transition-all duration-300"
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-[#DB2777]" />
                <div className="text-4xl font-bold text-[#F8FAFC] mb-2">{item.value}</div>
                <p className="text-sm text-[#94A3B8]">{item.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AI SECTION */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#DB2777]/20 via-[#8B5CF6]/20 to-[#150A12]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#DB2777]/20 rounded-full blur-[150px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <ScrollReveal className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Zap className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-sm text-[#94A3B8]">AI-Powered Study</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#DB2777] to-[#8B5CF6] bg-clip-text text-transparent">
                  Your Personal CCMA Study Partner
                </span>
              </h2>
              <p className="text-[#94A3B8] mb-8 text-lg">
                The AI tutor works alongside you through every chapter of the CCMA blueprint — explaining, adapting, and keeping you on track.
              </p>
              
              <div className="space-y-4">
                {[
                  "Explain any question in plain language, step by step",
                  "Adapt your practice to focus on your weak areas",
                  "Break down guidelines — OSHA, HIPAA, CDC, AHA — into clear takeaways",
                  "Build a personalized study plan across all 13 chapters",
                  "Review your performance to keep you consistent",
                ].map((item, i) => (
                  <ScrollReveal key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <h4 className="text-[#F8FAFC] font-medium">{item}</h4>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal className="flex-1 flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-[#DB2777] to-[#8B5CF6] rounded-3xl rotate-6 opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7] to-[#DB2777] rounded-3xl -rotate-3 opacity-30" />
                <div className="relative w-full h-full bg-[#1A2035] rounded-3xl border border-[#2D3A52] flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#DB2777] to-[#8B5CF6] flex items-center justify-center">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">AI Tutor</h3>
                    <p className="text-sm text-[#94A3B8]">Your personal CCMA study partner</p>
                    <div className="mt-4 flex justify-center gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#DB2777] animate-pulse"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 8. BUILT FOR CCMA CANDIDATES */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#DB2777] to-[#A855F7] bg-clip-text text-transparent">
                Built for Every CCMA Candidate
              </span>
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              Whether you are finishing your training or already working in a clinic, CCMAPractice fits your study routine.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Students", desc: "Finish your medical assistant program with exam-ready knowledge of every blueprint chapter.", icon: "🎓" },
              { title: "Working Assistants", desc: "Refresh clinical procedures, phlebotomy, EKG, and guidelines in short daily sessions.", icon: "🩺" },
              { title: "Training Programs", desc: "A structured curriculum of theory and practice for schools preparing CCMA candidates.", icon: "🏫" },
              { title: "Career Changers", desc: "A clear path from zero to a passing score — no prior healthcare experience required.", icon: "📈" },
            ].map((item, i) => (
              <ScrollReveal
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#DB2777]/30 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2 group-hover:text-[#DB2777] transition-colors">{item.title}</h3>
                <p className="text-sm text-[#94A3B8]">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section id="testimonials" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#DB2777]/5 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#DB2777] to-[#A855F7] bg-clip-text text-transparent">
                What CCMA Candidates Say
              </span>
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              Candidates preparing for the NHA CCMA exam use CCMAPractice to study smarter.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Alexis M."
              role="CCMA Candidate"
              school=""
              quote="The practice questions felt just like the real exam. The explanations referencing OSHA and HIPAA guidelines made everything click."
              index={0}
              color="#DB2777"
            />
            <TestimonialCard
              name="Jasmine R."
              role="Passed the NHA CCMA"
              school=""
              quote="I studied in 15-minute sessions between shifts. The AI tutor explained every question I missed, and I walked into the exam confident."
              index={1}
              color="#10B981"
            />
            <TestimonialCard
              name="Danielle K."
              role="Medical Assistant Student"
              school=""
              quote="The theory guides and 13-chapter structure gave me a clear study plan. I knew exactly what to review each week."
              index={2}
              color="#8B5CF6"
            />
          </div>
        </div>
      </section>

      {/* 10. PRICING */}
      <section id="pricing" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#DB2777] to-[#A855F7] bg-clip-text text-transparent">
                Simple, Affordable Pricing
              </span>
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              Start free. Upgrade when you are ready to go all-in on passing the NHA CCMA exam.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <PricingCard
              name="Free"
              price="$0"
              period=""
              description="Try CCMA practice questions and one theory chapter."
              features={["25 practice questions", "1 theory chapter", "Basic progress tracking", "Community support"]}
              buttonLabel="Get Started"
              buttonHref="/auth/login"
              index={0}
            />
            <PricingCard
              name="Monthly"
              price="$19"
              period="/month"
              description="Full access, month by month. Cancel anytime."
              features={["1,200+ practice questions", "All 13 theory guides", "AI tutor", "Full-length exam simulations"]}
              buttonLabel="Get Started"
              buttonHref="/auth/login"
              isFeatured={false}
              index={1}
            />
            <PricingCard
              name="Yearly"
              price="$69"
              period="/year"
              description="Two months free versus monthly. For serious candidates."
              features={["Everything in Monthly", "Adaptive practice", "Priority support", "Best value for exam prep"]}
              buttonLabel="Get Started"
              buttonHref="/auth/login"
              isFeatured={true}
              index={2}
            />
            <PricingCard
              name="Lifetime"
              price="$149"
              period="one-time"
              description="Pay once, keep access for life — including future updates."
              features={["Everything in Yearly", "All future questions & guides", "Lifetime access"]}
              buttonLabel="Get Started"
              buttonHref="/auth/login"
              isFeatured={false}
              index={3}
            />
          </div>

          {/* Link to full pricing page */}
          <div className="text-center mt-10">
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white transition-colors group"
            >
              View detailed plan comparison
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section id="final-cta" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#DB2777]/20 via-[#A855F7]/20 to-[#8B5CF6]/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DB2777]/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#DB2777] to-[#A855F7] bg-clip-text text-transparent">
                Ready to Pass Your NHA CCMA Exam?
              </span>
            </h2>
            <p className="text-lg md:text-xl text-[#94A3B8] mb-10 max-w-2xl mx-auto">
              Join medical assistant candidates preparing with 1,200+ practice questions, complete theory guides, and an AI tutor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/login"
                className="group px-8 py-4 bg-white text-[#150A12] rounded-xl font-semibold hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300 flex items-center justify-center gap-3"
              >
                <LogIn className="w-6 h-6" />
                Start Practicing Free
              </a>
              <a
                href="/pricing"
                className="group px-8 py-4 bg-white/10 text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <ChevronRight className="w-6 h-6" />
                View Plans
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CcmaNewsletterSection />

      <RelatedStudyPlatforms />

      {/* 12. FOOTER */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo/logo-main.png?v=5" alt="CCMAPractice" className="h-8 w-auto" />
              </div>
              <p className="text-sm text-[#94A3B8]">
                AI-powered NHA CCMA exam prep — practice questions, theory guides, and an AI tutor to help you pass with confidence.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#F8FAFC] mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Features</a></li>
                <li><a href="/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Home</a></li>
                <li><a href="/pricing" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#F8FAFC] mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/blog" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Blog</a></li>
                <li><a href="/ccma-certification-guide" className="text-sm text-[#94A3B8] hover:text-white transition-colors">CCMA Certification Guide</a></li>
                <li><a href="/free-ccma-practice-questions" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Free CCMA Practice Questions</a></li>
                <li><a href="/blog/ccma-exam-structure" className="text-sm text-[#94A3B8] hover:text-white transition-colors">CCMA Exam Structure</a></li>
                <li><a href="/blog/ccma-study-plan" className="text-sm text-[#94A3B8] hover:text-white transition-colors">CCMA Study Plan</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#F8FAFC] mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/faq" className="text-sm text-[#94A3B8] hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/contact" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Contact</a></li>
                <li><a href="/privacy" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[#94A3B8]">
              © 2026 CCMAPractice. All rights reserved.
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://x.com/ccmapractice" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-[#94A3B8]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com/company/ccmapractice" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5 text-[#94A3B8]" />
              </a>
              <a href="https://instagram.com/ccmapractice" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Instagram className="w-5 h-5 text-[#94A3B8]" />
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <a
                href="/auth/login"
                className="px-3 py-1.5 bg-blue/10 rounded-lg flex items-center gap-2 hover:bg-blue/20 transition-colors"
              >
                <LogIn className="w-4 h-4 text-blue" />
                <span className="text-xs text-blue font-medium">Start Free</span>
              </a>
              <a
                href="#pricing"
                className="px-3 py-1.5 bg-white/5 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                <span className="text-xs text-[#94A3B8]">View Pricing</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
