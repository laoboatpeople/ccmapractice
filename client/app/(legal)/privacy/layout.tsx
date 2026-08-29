import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — CCMAPractice',
  description:
    'CCMAPractice privacy policy. Learn how we collect, use, and protect your personal information when you use our CCMA exam preparation platform.',
  alternates: {
    canonical: 'https://ccmapractice.com/privacy',
    languages: {
      en: 'https://ccmapractice.com/privacy',
    },
  },
  openGraph: {
    title: 'Privacy Policy — CCMAPractice',
    description:
      'CCMAPractice privacy policy. Learn how we collect, use, and protect your personal information when you use our CCMA exam preparation platform.',
    url: 'https://ccmapractice.com/privacy',
    type: 'website',
  },
  twitter: {
    title: 'Privacy Policy — CCMAPractice',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
