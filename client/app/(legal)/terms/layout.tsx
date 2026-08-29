import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — CCMAPractice',
  description:
    'CCMAPractice terms of service. Review the terms and conditions governing your use of our CCMA exam preparation platform.',
  alternates: {
    canonical: 'https://ccmapractice.com/terms',
    languages: {
      en: 'https://ccmapractice.com/terms',
    },
  },
  openGraph: {
    title: 'Terms of Service — CCMAPractice',
    description:
      'CCMAPractice terms of service. Review the terms and conditions governing your use of our CCMA exam preparation platform.',
    url: 'https://ccmapractice.com/terms',
    type: 'website',
  },
  twitter: {
    title: 'Terms of Service — CCMAPractice',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
