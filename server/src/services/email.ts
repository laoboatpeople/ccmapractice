import { env } from '../config/env';
import { settings } from '../routes/settings';

const ADMIN_NOTIFICATION_EMAIL = () => settings.notifications?.adminNotificationEmail || 'chuck.onekeo@gmail.com';

const FROM_EMAIL = 'ccmapractice <info@ccmapractice.com>';

function getSubject(lang: string): string {
  switch (lang) {
    case 'en':
      return 'Welcome to ccmapractice — Your account is ready!';
    case 'es':
      return '¡Bienvenido a ccmapractice — Tu cuenta está lista!';
    default:
      return 'Bienvenue sur ccmapractice — Votre compte est prêt !';
  }
}

function getBody(userName: string, lang: string): string {
  const fr = [
    `Bonjour ${userName},`,
    '',
    'Merci de vous être inscrit sur ccmapractice !',
    "Vous avez désormais accès à votre compte et pouvez commencer à vous entraîner pour l'examen de certification CCMA.",
    '',
    '── Votre abonnement actuel ──',
    'Forfait : Gratuit',
    'Examen inclus : NHA CCMA (Certified Clinical Medical Assistant)',
    '',
    '── Prochaines étapes ──',
    "• Téléchargez l'application pour étudier où que vous soyez",
    '• Commencez par l\'examen NHA CCMA',
    "• Passez à Pro pour débloquer tous les chapitres et la simulation d'examen",
    "• Activez les simulations chronométrées pour vous préparer en conditions réelles",
    '',
    '── Contact et assistance ──',
    'Site web : https://ccmapractice.com',
    'Courriel : info@ccmapractice.com',
    '',
    'À très bientôt sur ccmapractice.',
    '',
    "L'équipe ccmapractice",
  ].join('\n');

  const en = [
    `Hello ${userName},`,
    '',
    'Thank you for signing up for ccmapractice!',
    'Your account is now active and you can start preparing for your CCMA certification exam.',
    '',
    '── Your Current Plan ──',
    'Plan: Free',
    'Included exam: NHA CCMA (Certified Clinical Medical Assistant)',
    '',
    '── Next Steps ──',
    '• Download the app to study anywhere',
    '• Start with the NHA CCMA exam',
    '• Upgrade to Pro to unlock all chapters and the full exam simulation',
    '• Enable timed simulations to prepare under real exam conditions',
    '',
    '── Contact & Support ──',
    'Website: https://ccmapractice.com',
    'Email: info@ccmapractice.com',
    '',
    'See you soon on ccmapractice.',
    '',
    'The ccmapractice Team',
  ].join('\n');

  const es = [
    `Hola ${userName},`,
    '',
    '¡Gracias por registrarte en ccmapractice!',
    'Tu cuenta ya está activa y puedes empezar a prepararte para el examen de certificación CCMA.',
    '',
    '── Tu Plan Actual ──',
    'Plan: Gratuito',
    'Examen incluido: NHA CCMA (Certified Clinical Medical Assistant)',
    '',
    '── Próximos Pasos ──',
    '• Descarga la app para estudiar desde cualquier lugar',
    '• Empieza con los exámenes CCMA',
    '• Actualiza a Pro para desbloquear todos los capítulos y la simulación completa del examen',
    '• Activa las simulaciones cronometradas para prepararte en condiciones reales',
    '',
    '── Contacto y Soporte ──',
    'Sitio web: https://ccmapractice.com',
    'Correo: info@ccmapractice.com',
    '',
    '¡Hasta pronto en ccmapractice!',
    '',
    'El equipo de ccmapractice',
  ].join('\n');

  switch (lang) {
    case 'en': return en;
    case 'es': return es;
    default: return fr;
  }
}

function getHtmlBody(userName: string, lang: string): string {
  const ctas: Record<string, { btn: string; hero: string; sub: string; steps: string[]; upsell: string; footer: string }> = {
    fr: {
      btn: 'Commencer mon premier quiz',
      hero: 'Bienvenue sur ccmapractice,',
      sub: 'Votre compte est prêt. Vous pouvez dès maintenant vous entraîner pour l\'examen NHA CCMA avec des questions réalistes générées par IA.',
      steps: [
        'Connectez-vous à votre tableau de bord',
        'Choisissez l\'examen NHA CCMA',
        'Répondez à 10 questions — sans pression',
        'Consultez vos résultats et identifiez vos points faibles',
      ],
      upsell: '💡 Le forfait gratuit inclut le premier chapitre. Passez à Pro pour débloquer tous les chapitres et la simulation d\'examen complète.',
      footer: 'L\'équipe ccmapractice',
    },
    en: {
      btn: 'Start My First Quiz',
      hero: 'Welcome to ccmapractice,',
      sub: 'Your account is ready. Start practicing with AI-powered NHA CCMA certification exam questions immediately.',
      steps: [
        'Log in to your dashboard',
        'Choose the NHA CCMA exam',
        'Answer 10 questions — no pressure',
        'Review your results and identify weak areas',
      ],
      upsell: '💡 The free plan includes the first chapter. Upgrade to Pro to unlock all chapters and the full exam simulation.',
      footer: 'The ccmapractice Team',
    },
    es: {
      btn: 'Comenzar mi primer quiz',
      hero: 'Bienvenido a ccmapractice,',
      sub: 'Tu cuenta está lista. Empieza a practicar con preguntas realistas del examen NHA CCMA generadas por IA.',
      steps: [
        'Inicia sesión en tu panel',
        'Elige el examen NHA CCMA',
        'Responde 10 preguntas — sin presión',
        'Revisa tus resultados e identifica áreas débiles',
      ],
      upsell: '💡 El plan gratuito incluye el primer capítulo. Mejora a Pro para desbloquear todos los capítulos y la simulación completa del examen.',
      footer: 'El equipo de ccmapractice',
    },
  };

  const cta = ctas[lang] || ctas.fr;
  const stepsHtml = cta.steps.map((s, i) => `<tr><td style="padding:6px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;color:#A8B7C9;"><span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#0B2038;color:#20C7C9;font-size:12px;font-weight:700;margin-right:10px;">${i + 1}</span>${s}</td></tr>`).join('');
  const url = 'https://ccmapractice.com/app';
  const siteUrl = 'https://ccmapractice.com';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#031428;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#031428;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="data:image/png;base64,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" alt="ccmapractice" width="240" height="60" style="display:block;max-width:240px;height:auto;border:0;outline:none;text-decoration:none;">
            </td>
          </tr>

          <!-- Hero card -->
          <tr>
            <td style="background:linear-gradient(135deg,#0B2038,#102840);border:1px solid #14506B;border-radius:16px;padding:40px;">
              
              <!-- Hero text -->
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#F5F8FA;text-align:center;">${cta.hero}</h1>
              <p style="font-size:14px;color:#A8B7C9;text-align:center;margin:12px 0 24px;line-height:1.6;">${cta.sub}</p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 28px;">
                <tr>
                  <td align="center" style="background:linear-gradient(135deg,#23D0C6,#168AC2);border-radius:10px;padding:14px 32px;">
                    <a href="${url}" target="_blank" style="color:#FFFFFF;font-size:15px;font-weight:600;text-decoration:none;display:block;">${cta.btn}</a>
                  </td>
                </tr>
              </table>

              <!-- Quick steps -->
              <table width="100%" cellpadding="0" cellspacing="0">
                ${stepsHtml}
              </table>

              <!-- Divider -->
              <div style="height:1px;background:#14506B;margin:24px 0;"></div>

              <!-- Upsell -->
              <p style="font-size:13px;color:#A8B7C9;line-height:1.5;margin:0;text-align:center;">
                ${cta.upsell}
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="font-size:12px;color:#70849A;margin:0;">
                <a href="${siteUrl}" style="color:#20C7C9;text-decoration:none;">ccmapractice</a>
                &nbsp;·&nbsp;
                <a href="${siteUrl}/faq" style="color:#70849A;text-decoration:none;">FAQ</a>
                &nbsp;·&nbsp;
                <a href="${siteUrl}/contact" style="color:#70849A;text-decoration:none;">Support</a>
              </p>
              <p style="font-size:12px;color:#70849A;margin:8px 0 0;">
                ${cta.footer}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendWelcomeEmail(
  toEmail: string,
  userName: string,
  lang: string = 'fr'
): Promise<boolean> {
  return sendEmail(toEmail, getSubject(lang), getBody(userName, lang), getHtmlBody(userName, lang));
}

export async function sendPasswordResetEmail(
  toEmail: string,
  resetLink: string,
  lang: string = 'fr'
): Promise<boolean> {
  const subject: Record<string, string> = {
    en: 'Reset your ccmapractice password',
    fr: 'Réinitialisation de votre mot de passe ccmapractice',
    es: 'Restablece tu contraseña de ccmapractice',
  };
  const body: Record<string, string> = {
    en: [
      'Hello,',
      '',
      'A password reset was requested for your ccmapractice account.',
      '',
      `Reset link (valid for 1 hour):`,
      resetLink,
      '',
      'If you did not request this, please ignore this email.',
      '',
      'The ccmapractice Team',
    ].join('\n'),
    fr: [
      'Bonjour,',
      '',
      'Une réinitialisation de mot de passe a été demandée pour votre compte ccmapractice.',
      '',
      `Lien de réinitialisation (valide 1 heure) :`,
      resetLink,
      '',
      'Si vous n\'avez pas demandé cela, ignorez cet email.',
      '',
      'L\'équipe ccmapractice',
    ].join('\n'),
    es: [
      'Hola,',
      '',
      'Se solicitó un restablecimiento de contraseña para tu cuenta de ccmapractice.',
      '',
      `Enlace de restablecimiento (válido por 1 hora):`,
      resetLink,
      '',
      'Si no solicitaste esto, ignora este correo.',
      '',
      'El equipo de ccmapractice',
    ].join('\n'),
  };

  return sendEmail(toEmail, subject[lang] || subject.fr, body[lang] || body.fr);
}

export async function sendSubscriptionNotification(
  toEmail: string,
  user: { name: string; email: string; id: string },
  plan: string,
  amount: number | null
): Promise<boolean> {
  const subject = `🛒 Nouvel abonnement — ${plan} — ${user.name}`;

  const text = [
    `━━━ Nouvel Abonnement ccmapractice ━━━`,
    '',
    `Plan : ${plan}`,
    amount !== null && amount > 0 ? `Montant : $${((amount ?? 0) / 100).toFixed(2)}` : 'Montant : —',
    '',
    `━━━ Utilisateur ━━━`,
    `Nom      : ${user.name}`,
    `Email    : ${user.email}`,
    `ID       : ${user.id}`,
    '',
    `Admin : https://ccmapractice.com/admin/users`,
    `Stripe : https://dashboard.stripe.com`,
    '',
  ].filter(Boolean).join('\n');

  return sendEmail(toEmail, subject, text);
}

export async function sendNewsletterNotification(email: string): Promise<boolean> {
  const subject = `New Newsletter Subscriber: ${email}`;

  const now = new Date().toISOString();
  const text = [
    `━━━ New Newsletter Subscriber ━━━`,
    '',
    `Email     : ${email}`,
    `Timestamp : ${now}`,
    '',
    `Manage subscribers: https://ccmapractice.com/admin/newsletter`,
    '',
  ].join('\n');

  return sendEmail(ADMIN_NOTIFICATION_EMAIL(), subject, text);
}

export interface TutorFeedbackNotificationParams {
  siteName: string;
  adminUrl: string;
  rating: 'up' | 'down';
  comment: string | null;
  userEmail: string;
  userName: string | null;
  messagePreview: string;
  sessionTopic: string | null;
}

export interface TheoryFeedbackNotificationParams {
  siteName: string;
  adminUrl: string;
  rating: 'up' | 'down';
  comment: string | null;
  userEmail: string;
  userName: string | null;
  chapterName: string;
  chapterId: string;
}

export async function sendTheoryFeedbackNotification(
  params: TheoryFeedbackNotificationParams
): Promise<boolean> {
  const emoji = params.rating === 'up' ? '👍' : '👎';
  const subject = `${emoji} Theory Feedback — ${params.siteName} — ${params.userName || params.userEmail}`;
  const sectionUrl = `${params.adminUrl}/theory?chapterId=${params.chapterId}`;
  const text = [
    `━━━ Theory Feedback — ${params.siteName} ━━━`,
    '',
    `Rating    : ${params.rating === 'up' ? 'Up 👍' : 'Down 👎'}`,
    `Comment   : ${params.comment || '—'}`,
    '',
    `━━━ Utilisateur ━━━`,
    `Nom       : ${params.userName || '—'}`,
    `Email     : ${params.userEmail}`,
    '',
    `━━━ Chapitre ━━━`,
    `Chapitre  : ${params.chapterName}`,
    `Section   : ${sectionUrl}`,
    '',
    `Admin     : ${params.adminUrl}/admin/feedback`,
    `Date      : ${new Date().toISOString()}`,
    '',
  ].filter(Boolean).join('\n');

  return sendEmail(ADMIN_NOTIFICATION_EMAIL(), subject, text);
}

export async function sendTutorFeedbackNotification(
  params: TutorFeedbackNotificationParams
): Promise<boolean> {
  const emoji = params.rating === 'up' ? '👍' : '👎';
  const subject = `${emoji} Tutor Feedback — ${params.siteName} — ${params.userName || params.userEmail}`;
  const text = [
    `━━━ Tutor Feedback — ${params.siteName} ━━━`,
    '',
    `Rating    : ${params.rating === 'up' ? 'Up 👍' : 'Down 👎'}`,
    `Comment   : ${params.comment || '—'}`,
    '',
    `━━━ Utilisateur ━━━`,
    `Nom       : ${params.userName || '—'}`,
    `Email     : ${params.userEmail}`,
    '',
    `━━━ Message tutor ━━━`,
    params.sessionTopic ? `Sujet     : ${params.sessionTopic}` : '',
    `Extrait   : ${params.messagePreview.slice(0, 400)}`,
    '',
    `Admin     : ${params.adminUrl}/admin/tutor`,
    `Date      : ${new Date().toISOString()}`,
    '',
  ].filter(Boolean).join('\n');

  return sendEmail(ADMIN_NOTIFICATION_EMAIL(), subject, text);
}

// ── Plan change confirmation email (sent to user) ──

const PLAN_LABELS: Record<string, { fr: string; en: string }> = {
  FREE: { fr: 'Gratuit', en: 'Free' },
  MONTHLY: { fr: 'Mensuel (Pro)', en: 'Monthly (Pro)' },
  LIFETIME: { fr: 'À vie (Pro)', en: 'Lifetime (Pro)' },
};

const PLAN_FEATURES: Record<string, { fr: string[]; en: string[] }> = {
  FREE: {
    fr: ['Accès à l\'examen NHA CCMA', 'Questions d\'entraînement limitées'],
    en: ['NHA CCMA exam access', 'Limited practice questions'],
  },
  MONTHLY: {
    fr: ['Accès aux tous les examens CCMA', 'Questions illimitées', 'Simulations chronométrées', 'Tuteur IA', 'Annulable en tout temps'],
    en: ['All CCMA certification exams', 'Unlimited questions', 'Timed simulations', 'AI Tutor', 'Cancel anytime'],
  },
  LIFETIME: {
    fr: ['Accès aux tous les examens CCMA', 'Questions illimitées', 'Simulations chronométrées', 'Tuteur IA', 'Accès à vie — paiement unique'],
    en: ['All CCMA certification exams', 'Unlimited questions', 'Timed simulations', 'AI Tutor', 'Lifetime access — one-time payment'],
  },
};

export async function sendPlanChangeConfirmation(
  toEmail: string,
  userName: string,
  newPlan: string,
  oldPlan: string | null,
  lang: string = 'fr'
): Promise<boolean> {
  const isFr = lang !== 'en';
  const l = isFr ? 'fr' : 'en';

  const newLabel = PLAN_LABELS[newPlan]?.[l] ?? newPlan;
  const oldLabel = oldPlan ? (PLAN_LABELS[oldPlan]?.[l] ?? oldPlan) : null;

  const isUpgrade = newPlan !== 'FREE';
  const isDowngrade = newPlan === 'FREE';

  const subject = isFr
    ? (isUpgrade
        ? `✅ Abonnement confirmé — ${newLabel} — ccmapractice`
        : `Votre abonnement a été modifié — ccmapractice`)
    : (isUpgrade
        ? `✅ Subscription Confirmed — ${newLabel} — ccmapractice`
        : `Your Subscription Has Been Updated — ccmapractice`);

  const features = PLAN_FEATURES[newPlan]?.[l] ?? [];
  const featuresHtml = features.map((f) =>
    `<li style="font-size:14px;color:#A8B7C9;padding:4px 0;">✅ ${f}</li>`
  ).join('');

  const changeLine = oldLabel
    ? (isFr
        ? `Votre forfait est passé de <strong style="color:#94A3B8;">${oldLabel}</strong> à <strong style="color:#20C7C9;">${newLabel}</strong>.`
        : `Your plan has changed from <strong style="color:#94A3B8;">${oldLabel}</strong> to <strong style="color:#20C7C9;">${newLabel}</strong>.`)
    : (isFr
        ? `Votre forfait <strong style="color:#20C7C9;">${newLabel}</strong> est maintenant actif.`
        : `Your <strong style="color:#20C7C9;">${newLabel}</strong> plan is now active.`);

  const heroTitle = isFr
    ? (isUpgrade ? 'Abonnement confirmé !' : isDowngrade ? 'Abonnement modifié' : 'Abonnement mis à jour')
    : (isUpgrade ? 'Subscription Confirmed!' : isDowngrade ? 'Subscription Updated' : 'Subscription Updated');

  const heroSub = isFr
    ? (isUpgrade
        ? `Merci ${userName} ! Vous avez maintenant accès à toutes les fonctionnalités Pro.`
        : `Bonjour ${userName}, votre abonnement a été mis à jour.`)
    : (isUpgrade
        ? `Thanks ${userName}! You now have access to all Pro features.`
        : `Hello ${userName}, your subscription has been updated.`);

  const ctaLabel = isFr ? 'Accéder à mon tableau de bord' : 'Go to My Dashboard';
  const footerTeam = isFr ? 'L\'équipe ccmapractice' : 'The ccmapractice Team';
  const supportLine = isFr
    ? 'Des questions ? Écrivez-nous à info@ccmapractice.com'
    : 'Questions? Email us at info@ccmapractice.com';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#031428;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#031428;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;">
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="data:image/png;base64,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" alt="ccmapractice" width="120" height="30" style="display:inline-block;border:0;outline:none;">
            </td>
          </tr>
          <tr>
            <td style="background:linear-gradient(135deg,#0F172A,#0B2038);border:1px solid #0B2038;border-radius:16px;padding:40px;">
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#F5F8FA;text-align:center;">${heroTitle}</h1>
              <p style="font-size:14px;color:#94A3B8;text-align:center;margin:12px 0 24px;line-height:1.6;">${heroSub}</p>

              <div style="background:#031428;border:1px solid #0B2038;border-radius:12px;padding:20px;margin-bottom:24px;">
                <p style="font-size:14px;color:#94A3B8;margin:0 0 8px;text-align:center;">${changeLine}</p>
                ${features.length > 0 ? `
                <div style="border-top:1px solid #0B2038;margin-top:12px;padding-top:12px;">
                  <p style="font-size:12px;font-weight:600;color:#70849A;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 8px;">${isFr ? 'Ce qui est inclus' : 'What\'s included'}</p>
                  <ul style="list-style:none;padding:0;margin:0;">
                    ${featuresHtml}
                  </ul>
                </div>` : ''}
              </div>

              <table cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 20px;">
                <tr>
                  <td align="center" style="background:#20C7C9;border-radius:10px;padding:14px 32px;">
                    <a href="https://ccmapractice.com/app" target="_blank" style="color:#FFFFFF;font-size:15px;font-weight:600;text-decoration:none;display:block;">${ctaLabel}</a>
                  </td>
                </tr>
              </table>

              <p style="font-size:13px;color:#70849A;text-align:center;margin:0;">${supportLine}</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="font-size:12px;color:#70849A;margin:0;">
                <a href="https://ccmapractice.com" style="color:#20C7C9;text-decoration:none;">ccmapractice</a>
                &nbsp;·&nbsp;
                <a href="https://ccmapractice.com/faq" style="color:#70849A;text-decoration:none;">FAQ</a>
                &nbsp;·&nbsp;
                <a href="https://ccmapractice.com/contact" style="color:#70849A;text-decoration:none;">Support</a>
              </p>
              <p style="font-size:12px;color:#70849A;margin:8px 0 0;">${footerTeam}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = isFr
    ? [
        `Bonjour ${userName},`,
        '',
        oldLabel
          ? `Votre forfait est passé de ${oldLabel} à ${newLabel}.`
          : `Votre forfait ${newLabel} est maintenant actif.`,
        '',
        ...(features.length > 0 ? ['Ce qui est inclus :', ...features.map((f) => `  ✅ ${f}`), ''] : []),
        'Accédez à votre tableau de bord : https://ccmapractice.com/app',
        '',
        supportLine,
        '',
        footerTeam,
      ].join('\n')
    : [
        `Hello ${userName},`,
        '',
        oldLabel
          ? `Your plan has changed from ${oldLabel} to ${newLabel}.`
          : `Your ${newLabel} plan is now active.`,
        '',
        ...(features.length > 0 ? ['What\'s included:', ...features.map((f) => `  ✅ ${f}`), ''] : []),
        'Go to your dashboard: https://ccmapractice.com/app',
        '',
        supportLine,
        '',
        footerTeam,
      ].join('\n');

  return sendEmail(toEmail, subject, text, html);
}

export async function sendNewsletterConfirmation(email: string, locale: 'en' | 'fr' = 'en'): Promise<boolean> {
  const isFr = locale === 'fr';
  const pdfUrl = isFr
    ? 'https://ccmapractice.com/study-checklist-30-day-fr.pdf'
    : 'https://ccmapractice.com/study-checklist-30-day.pdf';

  const subject = isFr
    ? 'Checklist de préparation aux examens CCMA 30 jours — CCMAPractice'
    : 'Your 30-Day CCMA Exam Prep Checklist — CCMAPractice';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0A0E1A; color: #F8FAFC; padding: 40px 20px; margin: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; margin: 0 auto;">
    <tr>
      <td style="text-align: center; padding-bottom: 24px;">
        <img src="data:image/png;base64,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" alt="ccmapractice" width="48" height="48" style="display: inline-block; border: 0; outline: none;">
        <h1 style="font-size: 24px; margin: 16px 0 4px;">CCMAPractice</h1>
      </td>
    </tr>
    <tr>
      <td style="background: #1A2035; border: 1px solid #2D3A52; border-radius: 16px; padding: 32px;">
        <h2 style="font-size: 20px; margin: 0 0 12px; color: #F8FAFC;">${isFr ? 'Votre checklist CCMA 30 jours' : 'Your 30-Day CCMA Checklist'}</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #94A3B8; margin: 0 0 20px;">
          ${isFr
            ? 'Merci de vous être abonné à l\'infolettre CCMAPractice ! Voici votre checklist de préparation aux examens CCMA de 30 jours.'
            : 'Thanks for subscribing to the CCMAPractice newsletter! Here\'s your 30-day CCMA exam prep checklist.'}
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #94A3B8; margin: 0 0 20px;">
          ${isFr
            ? 'Cette checklist couvre le programme CCMA — signes vitaux, contrôle des infections, phlébotomie, EKG, terminologie médicale, HIPAA et simulations chronométrées. Suivez une tâche par jour pour rester sur la bonne voie.'
            : 'This checklist covers the CCMA curriculum — vital signs, infection control, phlebotomy, EKG, medical terminology, HIPAA, and timed simulations. Follow one task per day to stay on track.'}
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${pdfUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0D9488, #168AC2); color: #fff; text-decoration: none; border-radius: 12px; font-size: 15px; font-weight: 600;">
            ${isFr ? '📄 Télécharger votre PDF gratuit' : '📄 Download Your Free PDF Checklist'}
          </a>
        </div>
        <p style="font-size: 14px; line-height: 1.5; color: #70849A; margin: 24px 0 0;">
          ${isFr
            ? 'Vous recevrez également des conseils d\'examen, des ressources d\'étude et des mises à jour de fonctionnalités dans les courriels à venir. Vous pouvez vous désabonner à tout moment.'
            : 'You\'ll also receive exam tips, study resources, and feature updates in future emails. Unsubscribe anytime.'}
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align: center; padding-top: 24px; font-size: 12px; color: #70849A;">
        <p style="margin: 0;">${isFr ? 'CCMAPractice — Préparation à l\'examen CCMA (NHA)' : 'CCMAPractice &mdash; NHA CCMA Exam Prep'}</p>
        <p style="margin: 4px 0 0;"><a href="https://ccmapractice.com" style="color: #20C7C9; text-decoration: none;">ccmapractice.com</a></p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = isFr
    ? [
        'Checklist de préparation aux examens CCMA 30 jours — CCMAPractice',
        '',
        'Merci de vous être abonné à l\'infolettre CCMAPractice !',
        '',
        'Consultez et imprimez votre checklist ici :',
        'https://ccmapractice.com/study-checklist-30-day-fr.pdf',
        '',
        'Vous recevrez également des conseils d\'examen, des ressources d\'étude et des mises à jour.',
        '— L\'équipe CCMAPractice',
      ].join('\n')
    : [
        'Your 30-Day CCMA Exam Prep Checklist — CCMAPractice',
        '',
        'Thanks for subscribing to the CCMAPractice newsletter!',
        '',
        'View and print your checklist here:',
        'https://ccmapractice.com/study-checklist-30-day.pdf',
        '',
        'You\'ll also receive exam tips, study resources, and feature updates.',
        '— CCMAPractice Team',
      ].join('\n');

  return sendEmail(email, subject, text, html);
}

export async function sendSampleQuestionsConfirmation(email: string, locale: 'en' | 'fr' = 'en'): Promise<boolean> {
  const isFr = locale === 'fr';
  const subject = isFr
    ? 'Questions pratiques CCMA gratuites — CCMAPractice'
    : 'Your Free CCMA Sample Questions — CCMAPractice';
  const pdfUrl = isFr
    ? 'https://ccmapractice.com/icc-sample-questions-fr.pdf'
    : 'https://ccmapractice.com/icc-sample-questions.pdf';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0A0E1A; color: #F8FAFC; padding: 40px 20px; margin: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; margin: 0 auto;">
    <tr>
      <td style="text-align: center; padding-bottom: 24px;">
        <img src="data:image/png;base64,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" alt="ccmapractice" width="48" height="48" style="display: inline-block; border: 0; outline: none;">
        <h1 style="font-size: 24px; margin: 16px 0 4px;">CCMAPractice</h1>
      </td>
    </tr>
    <tr>
      <td style="background: #1A2035; border: 1px solid #2D3A52; border-radius: 16px; padding: 32px;">
        <h2 style="font-size: 20px; margin: 0 0 12px; color: #F8FAFC;">${isFr ? 'Vos questions pratiques CCMA gratuites' : 'Your Free CCMA Sample Questions'}</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #94A3B8; margin: 0 0 20px;">
          ${isFr
            ? 'Merci de vous être abonné à l\'infolettre CCMAPractice ! Voici 10 questions pratiques CCMA gratuites avec explications détaillées.'
            : 'Thanks for subscribing to the CCMAPractice newsletter! Here are your 10 free CCMA sample practice questions with detailed explanations.'}
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #94A3B8; margin: 0 0 20px;">
          ${isFr
            ? 'Ces questions couvrent le programme CCMA — signes vitaux, contrôle des infections, phlébotomie, EKG, HIPAA et communication — le même style que vous verrez à l\'examen CCMA (NHA).'
            : 'These questions cover the CCMA curriculum — vital signs, infection control, phlebotomy, EKG, HIPAA, and communication — the same style you\'ll see on the NHA CCMA exam.'}
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${pdfUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #20C7C9, #168AC2); color: #fff; text-decoration: none; border-radius: 12px; font-size: 15px; font-weight: 600;">
            ${isFr ? '📄 Télécharger vos questions pratiques PDF' : '📄 Download Your Free Sample Questions PDF'}
          </a>
        </div>
        <p style="font-size: 14px; line-height: 1.5; color: #70849A; margin: 24px 0 0;">
          ${isFr
            ? 'Vous voulez l\'ensemble complet ? CCMAPractice propose 1,000+ questions avec difficulté adaptative, examens chronométrés et explications par l\'IA. <a href="https://ccmapractice.com/fr/auth/register" style="color: #20C7C9; text-decoration: underline;">Créez votre compte gratuit</a> pour commencer.'
            : 'Want the full set? CCMAPractice has 1,000+ questions with adaptive difficulty, timed exams, and AI Tutor explanations. <a href="https://ccmapractice.com/auth/register" style="color: #20C7C9; text-decoration: underline;">Create your free account</a> to get started.'}
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align: center; padding-top: 24px; font-size: 12px; color: #70849A;">
        <p style="margin: 0;">${isFr ? 'CCMAPractice — Préparation aux examens CCMA' : 'CCMAPractice &mdash; CCMA Building Inspector Exam Prep'}</p>
        <p style="margin: 4px 0 0;"><a href="https://ccmapractice.com" style="color: #20C7C9; text-decoration: none;">ccmapractice.com</a></p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = isFr
    ? [
        'Questions pratiques CCMA gratuites — CCMAPractice',
        '',
        'Merci de vous être abonné à l\'infolettre CCMAPractice !',
        '',
        'Téléchargez vos 10 questions pratiques CCMA gratuites ici :',
        'https://ccmapractice.com/icc-sample-questions-fr.pdf',
        '',
        'Vous voulez l\'ensemble complet ? Créez votre compte gratuit sur https://ccmapractice.com/fr/auth/register',
        '— L\'équipe CCMAPractice',
      ].join('\n')
    : [
        'Your Free CCMA Sample Questions — CCMAPractice',
        '',
        'Thanks for subscribing to the CCMAPractice newsletter!',
        '',
        'Download your 10 free CCMA sample practice questions here:',
        'https://ccmapractice.com/icc-sample-questions.pdf',
        '',
        'Want the full set? Create your free account at https://ccmapractice.com/auth/register',
        '— CCMAPractice Team',
      ].join('\n');

  return sendEmail(email, subject, text, html);
}

export async function sendEmail(toEmail: string, subject: string, text: string, html?: string): Promise<boolean> {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) return false;

  try {
    const body: Record<string, unknown> = {
      from: FROM_EMAIL,
      to: [toEmail],
      subject,
      text,
    };
    if (html) body.html = html;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('[Email] Resend error:', res.status, errBody);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[Email] Network error:', err);
    return false;
  }
}
