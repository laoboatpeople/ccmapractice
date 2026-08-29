import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Inspect Practice',
  description:
    'Inspect Practice privacy policy. Learn how we collect, use, and protect your personal information when you use our ICC exam preparation platform.',
  alternates: {
    canonical: 'https://ccmapractice.com/privacy',
    languages: {
      en: 'https://ccmapractice.com/privacy',
    },
  },
  openGraph: {
    title: 'Privacy Policy — Inspect Practice',
    description:
      'Inspect Practice privacy policy. Learn how we collect, use, and protect your personal information when you use our ICC exam preparation platform.',
    url: 'https://ccmapractice.com/privacy',
    type: 'website',
  },
  twitter: {
    title: 'Privacy Policy — Inspect Practice',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
