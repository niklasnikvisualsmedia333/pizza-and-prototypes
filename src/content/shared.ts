import type { Lang } from '../lib/language';

export type SharedContent = {
  brandLine: string;
  communityNav: string;
  eventNav: string;
  howNav: string;
  recapNav: string;
  companiesNav: string;
  aboutNav: string;
  companyBenefitsNav: string;
  companyFormatsNav: string;
  companyContactNav: string;
  companyPilotNav: string;
  communityCta: string;
  companyCta: string;
  privacy: string;
  imprint: string;
  footerLine: string;
  instagram: string;
  linkedin: string;
  whatsapp: string;
  languageLabel: string;
  menuOpen: string;
  menuClose: string;
  consentLabel: string;
  consentText: string;
  consentAccept: string;
  consentDecline: string;
  supportedBy: string;
};

export const sharedContent: Record<Lang, SharedContent> = {
  de: {
    brandLine: 'Builder-first Community aus Siegen',
    communityNav: 'Community',
    eventNav: 'Event',
    howNav: 'So funktioniert es',
    recapNav: 'Rückblick',
    companiesNav: 'Für Unternehmen',
    aboutNav: 'Über uns',
    companyBenefitsNav: 'Nutzen',
    companyFormatsNav: 'Formate',
    companyContactNav: 'Kontakt',
    companyPilotNav: 'Pilot',
    communityCta: 'Community beitreten',
    companyCta: 'Gespräch starten',
    privacy: 'Datenschutz',
    imprint: 'Impressum',
    footerLine: 'Community, reale Probleme und praktische Projekte aus Siegen.',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    whatsapp: 'WhatsApp',
    languageLabel: 'Sprache',
    menuOpen: 'Navigation öffnen',
    menuClose: 'Navigation schließen',
    consentLabel: 'Analytics-Zustimmung',
    consentText:
      'Wir nutzen Cookies, um die Nutzung der Website zu analysieren und das Erlebnis zu verbessern. Du kannst ablehnen. Dann erfassen wir weiterhin nur anonyme Basisdaten ohne Google Analytics.',
    consentAccept: 'Akzeptieren',
    consentDecline: 'Ablehnen',
    supportedBy: 'Unterstützt von',
  },
  en: {
    brandLine: 'Builder-first community from Siegen',
    communityNav: 'Community',
    eventNav: 'Event',
    howNav: 'How it works',
    recapNav: 'Recap',
    companiesNav: 'For companies',
    aboutNav: 'About',
    companyBenefitsNav: 'Benefits',
    companyFormatsNav: 'Formats',
    companyContactNav: 'Contact',
    companyPilotNav: 'Pilot',
    communityCta: 'Join the community',
    companyCta: 'Start a conversation',
    privacy: 'Privacy',
    imprint: 'Imprint',
    footerLine: 'Community, real problems and practical projects from Siegen.',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    whatsapp: 'WhatsApp',
    languageLabel: 'Language',
    menuOpen: 'Open navigation',
    menuClose: 'Close navigation',
    consentLabel: 'Analytics consent',
    consentText:
      'We use cookies to analyze site usage and improve your experience. You can decline. We will still collect anonymous baseline analytics without Google Analytics.',
    consentAccept: 'Accept',
    consentDecline: 'Decline',
    supportedBy: 'Supported by',
  },
};
