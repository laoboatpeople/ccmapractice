/**
 * Centralized LearningResource component for blog pages.
 * Import and render at the end of any page that needs it.
 */
import { LearningResourceJsonLd } from '@/components/seo/JsonLd';

interface Props {
  category?: string;
  en?: boolean;
}

export function BlogLearningResource({ category = 'CCMA (NHA) Certification', en = true }: Props) {
  const label = en ? 'Guide' : 'Guide';
  const name = en
    ? 'CCMA (NHA) Certification Guide'
    : 'Guide de la certification CCMA (NHA)';
  const desc = en
    ? `Complete guide to the NHA CCMA certification covering ${category}. Clinical procedures, guidelines (OSHA, HIPAA, CDC), exam strategy, and preparation.`
    : `Guide complet de la certification CCMA (NHA) couvrant ${category}. Procédures cliniques, directives (OSHA, HIPAA, CDC), stratégie d'examen et préparation.`;
  const teaches = en
    ? ['CCMA Certification', 'Clinical Procedures', 'Vital Signs & Phlebotomy', 'EKG & Patient Care', 'Medical Law & Ethics', category]
    : ['Certification CCMA', 'Procédures cliniques', 'Signes vitaux et phlébotomie', 'EKG et soins aux patients', 'Droit et éthique médicale', category];

  return (
    <LearningResourceJsonLd
      name={name}
      description={desc}
      educationalLevel="Professional"
      teaches={teaches}
      resourceType="Guide"
    />
  );
}
