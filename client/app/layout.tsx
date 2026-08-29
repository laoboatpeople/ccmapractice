import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import Providers from './providers';
import { OrganizationJsonLd, WebSiteJsonLd, ProductJsonLd, CourseJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Inspect Practice',
  metadataBase: new URL('https://ccmapractice.com'),
  alternates: {
    canonical: 'https://ccmapractice.com',
    languages: {
      en: 'https://ccmapractice.com',
    },
  },
  other: {
    'google': 'nositelinkssearchbox',
    'googlebot-news': 'index, follow, max-snippet:-1, max-image-preview:large',
    'classification': 'educational',
    'perplexity': 'index, follow',
    'bingbot': 'index, follow',
    'GPTBot': 'index, follow',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Read the locale set by middleware (x-locale) so <html lang> is correct
  // server-side for FR pages — Google must not see lang="en" on /fr/* pages.
  let locale = 'en';
  try {
    const headersList = headers();
    locale = headersList.get('x-locale') || 'en';
  } catch {
    // headers() may throw during static fallback — default to en
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="alternate" hrefLang="en" href="https://ccmapractice.com" />
        <link rel="alternate" hrefLang="x-default" href="https://ccmapractice.com" />
      </head>
      <body>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <ProductJsonLd />
        <CourseJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
