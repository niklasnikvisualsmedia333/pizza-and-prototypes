import type { Lang } from '../lib/language';

export type SharedContent = {
  brandLine: string;
  communityNav: string;
  recapNav: string;
  companiesNav: string;
  aboutNav: string;
  companyBenefitsNav: string;
  companyFormatsNav: string;
  companyContactNav: string;
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
    recapNav: 'Rückblick',
    companiesNav: 'Für Unternehmen',
    aboutNav: 'Über uns',
    companyBenefitsNav: 'Nutzen',
    companyFormatsNav: 'Formate',
    companyContactNav: 'Kontakt',
    communityCta: 'Community beitreten',
    companyCta: 'Format besprechen',
    privacy: 'Datenschutz',
    imprint: 'Impressum',
    footerLine: 'Where builders work on real business needs.',
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
    recapNav: 'Recap',
    companiesNav: 'For companies',
    aboutNav: 'About',
    companyBenefitsNav: 'Benefits',
    companyFormatsNav: 'Formats',
    companyContactNav: 'Contact',
    communityCta: 'Join the community',
    companyCta: 'Discuss a format',
    privacy: 'Privacy',
    imprint: 'Imprint',
    footerLine: 'Where builders work on real business needs.',
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

