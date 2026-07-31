import type { Lang } from '../lib/language';

export type CommunityContent = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  heroPrimary: string;
  heroSecondary: string;
  heroImageAlt: string;
  heroCaption: string;
  eventEyebrow: string;
  eventPastLabel: string;
  eventUpcomingLabel: string;
  eventClosedLabel: string;
  eventOpenLabel: string;
  eventWaitlistLabel: string;
  eventSoldOutLabel: string;
  eventFallbackText: string;
  eventCta: string;
  recapEyebrow: string;
  recapTitle: string;
  recapText: string;
  recapFacts: string[];
  recapImageAlt: string;
  recapImageAlts: string[];
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: Array<{ title: string; text: string }>;
  processEyebrow: string;
  processTitle: string;
  processIntro: string;
  steps: string[];
  channelsEyebrow: string;
  channelsTitle: string;
  channelsText: string;
  companyEyebrow: string;
  companyTitle: string;
  companyText: string;
  companyCta: string;
  teamEyebrow: string;
  teamTitle: string;
  teamText: string;
  teamImageAlt: string;
  teamMembers: Array<{ name: string; role: string; description: string }>;
  faqEyebrow: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
};

export const communityContent: Record<Lang, CommunityContent> = {
  de: {
    metaTitle: 'Tech Meets Problems | Builder-first Community in Siegen',
    metaDescription:
      'Tech Meets Problems bringt technische Studierende, junge Talente und Builder mit realen Herausforderungen aus Unternehmen und Region zusammen.',
    heroEyebrow: 'Builder-first Community für reale Herausforderungen',
    heroTitle: 'Technische Studierende arbeiten an echten Problemen aus Unternehmen.',
    heroText:
      'Tech Meets Problems bringt technische Studierende, junge Talente und weitere Builder mit realen Herausforderungen aus Unternehmen und Region zusammen. In kleinen Teams entstehen Konzepte, Workflows, Mockups und erste Prototypen.',
    heroPrimary: 'Community beitreten',
    heroSecondary: 'Für Unternehmen',
    heroImageAlt: 'Technische Talente arbeiten beim Tech Meets Problems Pilot gemeinsam an Problemkarten',
    heroCaption: 'Einblick in den ersten Pilot in Siegen',
    eventEyebrow: 'Neueste Veranstaltung',
    eventPastLabel: 'Abgeschlossen',
    eventUpcomingLabel: 'Bestätigtes Event',
    eventClosedLabel: 'Anmeldung geschlossen',
    eventOpenLabel: 'Anmeldung geöffnet',
    eventWaitlistLabel: 'Warteliste',
    eventSoldOutLabel: 'Ausgebucht',
    eventFallbackText: 'Das nächste Format ist in Vorbereitung. Über die Community erfährst du zuerst davon.',
    eventCta: 'Community beitreten',
    recapEyebrow: 'Rückblick auf den ersten Pilot',
    recapTitle: 'Pizza & Prototypes, Juni 2026',
    recapText:
      'Beim ersten Pilot arbeiteten kleine Teams an einem realen, anonymisierten Problemraum. Dabei entstanden konkrete Workflows, Mockups, technische Konzepte und erste Prototypen.',
    recapFacts: [
      'Reale Problemräume',
      'Kleine Teams',
      'Gemeinsame Konzeptarbeit',
      'Workflows, Mockups und erste Prototypen',
    ],
    recapImageAlt: 'Kleine Teams arbeiten beim ersten Tech Meets Problems Pilot in Siegen',
    recapImageAlts: [
      'Teilnehmende diskutieren gemeinsam an einem Arbeitstisch',
      'Teilnehmer präsentiert ein Ergebnis vor dem Projektor',
      'Ergebnisboard aus dem ersten Tech Meets Problems Pilot',
    ],
    benefitsEyebrow: 'Community',
    benefitsTitle: 'Praxis, Austausch und neue Perspektiven.',
    benefitsIntro:
      'Die Community verbindet technische und techniknahe Menschen, die gemeinsam an konkreten Fragestellungen arbeiten möchten.',
    benefits: [
      { title: 'Reale Herausforderungen', text: 'Arbeite an konkreten Bedarfen aus Unternehmen und Region.' },
      { title: 'Technische Community', text: 'Lerne Menschen aus Software, Data, HCI, UX und Engineering kennen.' },
      { title: 'Praktische Ergebnisse', text: 'Entwickle Konzepte, Workflows, Mockups oder erste Prototypen.' },
      { title: 'Neue Einblicke', text: 'Erhalte Einblicke in Unternehmen, Technologien und mögliche Projekte.' },
    ],
    processEyebrow: 'So funktionieren Sessions',
    processTitle: 'Ein klarer Ablauf für den ersten nächsten Schritt.',
    processIntro:
      'Ein kurzes Format liefert keine fertige Software. Es schafft Problemverständnis, erste Ansätze und eine Grundlage für weitere Schritte.',
    steps: [
      'Herausforderung verstehen',
      'Kleines Team bilden',
      'Ansatz entwickeln und ausprobieren',
      'Ergebnis teilen und nächste Schritte prüfen',
    ],
    channelsEyebrow: 'Community-Kanäle',
    channelsTitle: 'Bleib mit Tech Meets Problems verbunden.',
    channelsText: 'Neue Sessions, Problemräume und Projektmöglichkeiten teilen wir über unsere Community-Kanäle.',
    companyEyebrow: 'Für Unternehmen',
    companyTitle: 'Reale Herausforderung im Unternehmen?',
    companyText:
      'Tech Meets Problems entwickelt Formate, die Unternehmen mit technischen Talenten, neuen Perspektiven und ersten Ansätzen zusammenbringen.',
    companyCta: 'Für Unternehmen',
    teamEyebrow: 'Über uns',
    teamTitle: 'Das Team hinter Tech Meets Problems.',
    teamText: 'Wir entwickeln die Community, Formate und Partnerschaften aus Siegen heraus.',
    teamImageAlt: 'Niklas Brüne, Frederik Krause und Johanna Brenner von Tech Meets Problems',
    teamMembers: [
      { name: 'Niklas Brüne', role: 'Strategie und Kommunikation', description: 'Positionierung, Produktlogik und Außenauftritt' },
      { name: 'Frederik Krause', role: 'Partnerschaften und Open Innovation', description: 'Unternehmenszugänge, Formatentwicklung und operative Umsetzung' },
      { name: 'Johanna Brenner', role: 'Community und Operations', description: 'Community, Koordination und Gruppenprozesse' },
    ],
    faqEyebrow: 'Kurz beantwortet',
    faqTitle: 'Das Wichtigste zur Community.',
    faqs: [
      { question: 'Muss ich eine eigene Idee mitbringen?', answer: 'Nein. Die Sessions starten mit konkreten Problemräumen.' },
      { question: 'Muss ich programmieren können?', answer: 'Nein. Unterschiedliche technische und techniknahe Perspektiven ergänzen sich.' },
      { question: 'Ist die Community kostenlos?', answer: 'Der Community-Beitritt und der erste Pilot sind kostenlos. Zukünftige Formate können andere Rahmenbedingungen haben.' },
      { question: 'Wie erfahre ich von neuen Events?', answer: 'Trag dich in die Community-Liste ein oder folge unseren Community-Kanälen.' },
    ],
  },
  en: {
    metaTitle: 'Tech Meets Problems | Builder-first community in Siegen',
    metaDescription:
      'Tech Meets Problems brings technical students, young talent and builders together with real challenges from companies and the region.',
    heroEyebrow: 'Builder-first community for real challenges',
    heroTitle: 'Technical students work on real company problems.',
    heroText:
      'Tech Meets Problems brings technical students, young talent and other builders together with real challenges from companies and the region. Small teams turn them into concepts, workflows, mockups and first prototypes.',
    heroPrimary: 'Join the community',
    heroSecondary: 'For companies',
    heroImageAlt: 'Technical talent working with problem cards at the first Tech Meets Problems pilot',
    heroCaption: 'A look inside the first pilot in Siegen',
    eventEyebrow: 'Latest event',
    eventPastLabel: 'Completed',
    eventUpcomingLabel: 'Confirmed event',
    eventClosedLabel: 'Registration closed',
    eventOpenLabel: 'Registration open',
    eventWaitlistLabel: 'Waitlist',
    eventSoldOutLabel: 'Sold out',
    eventFallbackText: 'The next format is in preparation. Community members will hear about it first.',
    eventCta: 'Join the community',
    recapEyebrow: 'First pilot recap',
    recapTitle: 'Pizza & Prototypes, June 2026',
    recapText:
      'At the first pilot, small teams worked on a real, anonymized problem space. They created concrete workflows, mockups, technical concepts and first prototypes.',
    recapFacts: [
      'Real problem spaces',
      'Small teams',
      'Collaborative concept work',
      'Workflows, mockups and first prototypes',
    ],
    recapImageAlt: 'Small teams working at the first Tech Meets Problems pilot in Siegen',
    recapImageAlts: [
      'Participants discussing ideas around a work table',
      'Participant presenting a result in front of the projector',
      'Result board from the first Tech Meets Problems pilot',
    ],
    benefitsEyebrow: 'Community',
    benefitsTitle: 'Practice, exchange and new perspectives.',
    benefitsIntro:
      'The community connects technical and tech-adjacent people who want to work together on concrete questions.',
    benefits: [
      { title: 'Real challenges', text: 'Work on concrete needs from companies and the region.' },
      { title: 'Technical community', text: 'Meet people from software, data, HCI, UX and engineering.' },
      { title: 'Practical output', text: 'Develop concepts, workflows, mockups or first prototypes.' },
      { title: 'New insights', text: 'Gain insight into companies, technologies and possible projects.' },
    ],
    processEyebrow: 'How sessions work',
    processTitle: 'A clear path to a practical first step.',
    processIntro:
      'A short format does not deliver finished software. It creates problem understanding, first approaches and a foundation for further steps.',
    steps: [
      'Understand the challenge',
      'Form a small team',
      'Develop and test an approach',
      'Share the result and review next steps',
    ],
    channelsEyebrow: 'Community channels',
    channelsTitle: 'Stay connected with Tech Meets Problems.',
    channelsText: 'We share new sessions, problem spaces and project opportunities through our community channels.',
    companyEyebrow: 'For companies',
    companyTitle: 'A real challenge inside your company?',
    companyText:
      'Tech Meets Problems develops formats that bring companies together with technical talent, new perspectives and first approaches.',
    companyCta: 'For companies',
    teamEyebrow: 'About us',
    teamTitle: 'The team behind Tech Meets Problems.',
    teamText: 'We develop the community, formats and partnerships from Siegen.',
    teamImageAlt: 'Niklas Brüne, Frederik Krause and Johanna Brenner from Tech Meets Problems',
    teamMembers: [
      { name: 'Niklas Brüne', role: 'Strategy and Communication', description: 'Positioning, product logic and external communication' },
      { name: 'Frederik Krause', role: 'Partnerships and Open Innovation', description: 'Company outreach, format development and operational delivery' },
      { name: 'Johanna Brenner', role: 'Community and Operations', description: 'Community, coordination and group processes' },
    ],
    faqEyebrow: 'Quick answers',
    faqTitle: 'What matters about the community.',
    faqs: [
      { question: 'Do I need to bring an idea?', answer: 'No. Sessions start with concrete problem spaces.' },
      { question: 'Do I need to code?', answer: 'No. Different technical and tech-adjacent perspectives complement each other.' },
      { question: 'Is the community free?', answer: 'Joining the community and the first pilot are free. Future formats may have different conditions.' },
      { question: 'How do I hear about new events?', answer: 'Join the community list or follow our community channels.' },
    ],
  },
};
