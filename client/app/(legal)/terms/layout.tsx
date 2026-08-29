import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Inspect Practice',
  description:
    'Inspect Practice terms of service. Review the terms and conditions governing your use of our ICC exam preparation platform.',
  alternates: {
    canonical: 'https://ccmapractice.com/terms',
    languages: {
      en: 'https://ccmapractice.com/terms',
    },
  },
  openGraph: {
    title: 'Terms of Service — Inspect Practice',
    description:
      'Inspect Practice terms of service. Review the terms and conditions governing your use of our ICC exam preparation platform.',
    url: 'https://ccmapractice.com/terms',
    type: 'website',
  },
  twitter: {
    title: 'Terms of Service — Inspect Practice',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
