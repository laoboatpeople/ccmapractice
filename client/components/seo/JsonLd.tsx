/**
 * JSON-LD structured data components for AI-friendly pages.
 * These help AI systems (LLMs, RAG, Perplexity, AI Overviews)
 * discover, parse, extract, and cite content accurately.
 */

/** Organization schema — placed on every page via root layout */
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CCMAPractice',
    url: 'https://ccmapractice.com',
    description:
      'AI-powered exam preparation platform for the NHA CCMA (Certified Clinical Medical Assistant) exam — 1,200+ practice questions, complete theory guides, and an AI tutor covering vitals, phlebotomy, EKG, HIPAA, and infection control.',
    areaServed: 'US',
    knowsAbout: [
      'NHA CCMA Exam',
      'CCMA Exam Prep',
      'Medical Assistant Certification',
      'Vital Signs',
      'Phlebotomy',
      'EKG',
      'HIPAA',
      'Anatomy and Physiology',
      'Infection Control',
      'Medical Terminology',
      'Patient Care',
    ],
    sameAs: [
      'https://twitter.com/ccmapractice',
      'https://linkedin.com/company/ccmapractice',
      'https://www.nhanow.com',
      'https://en.wikipedia.org/wiki/Certified_clinical_medical_assistant',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** WebSite schema — helps AI understand the site's search and purpose */
export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CCMAPractice',
    url: 'https://ccmapractice.com',
    description:
      'AI-powered exam preparation for the NHA CCMA exam — Certified Clinical Medical Assistant. 1,200+ practice questions, theory guides, and an AI tutor.',
    inLanguage: ['en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ccmapractice.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Article schema — for guides and non-blog content */
export function ArticleJsonLd({
  headline,
  description,
  datePublished,
  dateModified,
  authorName = 'CCMAPractice Team',
  image,
}: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string[];
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': 'Organization',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CCMAPractice',
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://ccmapractice.com',
    },
  };

  if (image) {
    schema.image = image;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** BlogPosting schema — for blog posts (more specific than Article) */
export function BlogPostingJsonLd({
  headline,
  description,
  datePublished,
  dateModified,
  authorName = 'CCMAPractice Team',
  image,
  url,
}: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string[];
  url?: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    author: {
      '@type': 'Organization',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CCMAPractice',
    },
    datePublished,
    dateModified: dateModified || datePublished,
    ...(url ? { mainEntityOfPage: { '@type': 'WebPage', '@id': url } } : {}),
  };

  if (image) {
    schema.image = image;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** FAQPage schema — makes Q&A pairs directly extractable by AI */
export function FAQPageJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Product schema — for subscription plans (FREE / MONTHLY / YEARLY / LIFETIME) */
export function ProductJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'CCMAPractice NHA CCMA Exam Prep',
    description: 'AI-powered exam preparation for the NHA CCMA exam — Certified Clinical Medical Assistant. 150 scored questions + 30 pretest, 3 hours, passing score 390/500.',
    url: 'https://ccmapractice.com',
    image: 'https://ccmapractice.com/images/og/home.jpg',
    brand: {
      '@type': 'Brand',
      name: 'CCMAPractice',
    },
    sku: 'CCMAPRACTICE-CCMA',
    mpn: 'CCMAPRACTICE01',
    category: 'Education/Exam Preparation',
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Plan',
        price: '0.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31T23:59:59Z',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: 'https://ccmapractice.com/#pricing',
        sku: 'CCMAPRACTICE-FREE',
      },
      {
        '@type': 'Offer',
        name: 'Monthly Plan',
        price: '19.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31T23:59:59Z',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: 'https://ccmapractice.com/#pricing',
        sku: 'CCMAPRACTICE-MONTHLY',
      },
      {
        '@type': 'Offer',
        name: 'Yearly Plan',
        price: '69.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31T23:59:59Z',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: 'https://ccmapractice.com/#pricing',
        sku: 'CCMAPRACTICE-YEARLY',
      },
      {
        '@type': 'Offer',
        name: 'Lifetime Plan',
        price: '149.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31T23:59:59Z',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: 'https://ccmapractice.com/#pricing',
        sku: 'CCMAPRACTICE-LIFETIME',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '3',
      reviewCount: '3',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Marc Tremblay' },
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: "I was lost in my CCMA exam prep until I found CCMAPractice. The AI explanations made phlebotomy and EKG concepts finally click. Passed on the first try!",
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Sophie Martin' },
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: "Between my job and school, I never had time to sit down and review. Now I answer practice questions on my phone during breaks — the HIPAA and vitals drills were exactly what the exam asked.",
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Jean-François Côté' },
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: "The analytics showed I was weak on phlebotomy tube order and EKG lead placement. I focused my review there and started seeing real improvement in my simulation scores.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Course schema — for the NHA CCMA certification study program */
export function CourseJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NHA CCMA (Certified Clinical Medical Assistant) Exam Preparation Course',
    description:
      'Comprehensive exam preparation for the NHA CCMA exam — Certified Clinical Medical Assistant. Covers all 13 blueprint chapters: foundational knowledge and basic science, anatomy and physiology, patient intake and vitals, general patient care, infection control and safety, point of care testing and laboratory procedures, phlebotomy, EKG and cardiovascular testing, patient care coordination, administrative assisting, communication, and medical law and ethics.',
    provider: {
      '@type': 'Organization',
      name: 'CCMAPractice',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Review schema — for testimonials and ratings */
export function ReviewJsonLd({
  reviewRating,
  reviewBody,
  authorName = 'CCMAPractice Student',
}: {
  reviewRating: number;
  reviewBody: string;
  authorName?: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: 'CCMAPractice NHA CCMA Exam Prep',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: reviewRating,
    },
    reviewBody,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CCMAPractice',
    },
    award: 'Ratings',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** BreadcrumbList schema — for navigation */
export function BreadcrumbListJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** VideoObject schema — for the Watch Demo section */
export function VideoObjectJsonLd({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  embedUrl,
  uploadDate,
  duration,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl?: string;
  embedUrl?: string;
  uploadDate?: string;
  duration?: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    contentUrl: contentUrl || undefined,
    embedUrl: embedUrl || undefined,
    uploadDate: uploadDate || undefined,
    duration: duration || undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * QAPage schema — for exam practice questions.
 * Makes individual Q&A pairs directly extractable by AI search engines.
 * Place on pages that contain exam questions with answers.
 */
export function QAPageJsonLd({
  questions,
}: {
  questions: {
    question: string;
    answer: string;
    answerExplanation?: string;
    difficulty?: string;
    examCategory?: string;
  }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      text: q.question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answerExplanation
          ? `${q.answer}\n\nExplanation: ${q.answerExplanation}`
          : q.answer,
      },
      ...(q.difficulty ? { eduQuestionType: q.difficulty } : {}),
      ...(q.examCategory ? { about: q.examCategory } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * HowTo schema — for study guides and exam preparation steps.
 * Helps AI systems extract step-by-step instructions for exam prep.
 */
export function HowToJsonLd({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string; image?: string }[];
  totalTime?: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.image ? { image: step.image } : {}),
    })),
    ...(totalTime ? { totalTime } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * LearningResource schema — for theory/educational content.
 * Helps AI systems identify this as authoritative educational material.
 */
export function LearningResourceJsonLd({
  name,
  description,
  educationalLevel,
  teaches,
  resourceType = 'StudyGuide',
}: {
  name: string;
  description: string;
  educationalLevel?: string;
  teaches?: string[];
  resourceType?: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name,
    description,
    educationalResourceType: resourceType,
    ...(educationalLevel ? { educationalLevel } : {}),
    ...(teaches ? { teaches } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
