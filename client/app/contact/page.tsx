import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Us — CCMAPractice',
  description:
    'Get in touch with the CCMAPractice team. We are here to help with any questions about NHA CCMA exam preparation, pricing, or the platform.',
  alternates: {
    canonical: 'https://ccmapractice.com/contact',
    languages: {
      en: 'https://ccmapractice.com/contact',
    },
  },
  openGraph: {
    title: 'Contact Us — CCMAPractice',
    description:
      'Get in touch with the CCMAPractice team. We are here to help with any questions about NHA CCMA exam preparation, pricing, or the platform.',
    url: 'https://ccmapractice.com/contact',
    type: 'website',
  },
  twitter: {
    title: 'Contact Us — CCMAPractice',
  },
  other: {
    'article:published_time': '2025-03-01',
    'article:modified_time': '2026-05-12',
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', url: 'https://ccmapractice.com' },
          { name: 'Contact', url: 'https://ccmapractice.com/contact' },
        ]}
      />
      <div className="min-h-screen bg-[#031428] text-[#F5F8FA]">
      {/* Nav */}
      <nav className="border-b border-white/5 bg-[#031428]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo/logo-main.png?v=6" alt="CCMAPractice" className="h-7 w-auto" />
          </a>
          <a
            href="/"
            className="text-sm text-[#A8B7C9] hover:text-white transition-colors"
          >
            ← Home
          </a>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-lg mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-[#A8B7C9]">
            Have a question about NHA CCMA exam prep, your account, or the platform? Send us a message and we&apos;ll get back to you.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
    </>
  );
}
