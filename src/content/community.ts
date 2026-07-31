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
  recapDate: string;
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
  teamTextSecondary: string;
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
      'Tech Meets Problems verbindet technische Talente mit realen Herausforderungen aus Unternehmen und der Region. Werde Teil der Community aus Siegen.',
    heroEyebrow: 'Community für technische Talente',
    heroTitle: 'Möchtest du an echten Herausforderungen aus Unternehmen arbeiten?',
    heroText:
      'In der Tech Meets Problems Community triffst du technische Studierende, junge Berufstätige und weitere techniknahe Profile. Gemeinsam entwickelt ihr Konzepte, Workflows, Mockups oder erste Prototypen.',
    heroPrimary: 'Community beitreten',
    heroSecondary: 'Für Unternehmen',
    heroImageAlt: 'Technische Talente arbeiten beim Tech Meets Problems Pilot gemeinsam an Problemkarten',
    heroCaption: 'Gemeinsame Arbeit am ersten Event in Siegen',
    eventEyebrow: 'Neueste Veranstaltung',
    eventPastLabel: 'Abgeschlossen',
    eventUpcomingLabel: 'Bestätigtes Event',
    eventClosedLabel: 'Anmeldung geschlossen',
    eventOpenLabel: 'Anmeldung geöffnet',
    eventWaitlistLabel: 'Warteliste',
    eventSoldOutLabel: 'Ausgebucht',
    eventFallbackText: 'Das nächste Format ist in Vorbereitung. Über die Community erfährst du zuerst davon.',
    eventCta: 'Community beitreten',
    recapEyebrow: 'Rückblick',
    recapTitle: 'Rückblick auf das erste Event',
    recapDate: 'Pizza & Prototypes · 26. Juni 2026',
    recapText:
      'Beim ersten Event arbeiteten kleine Teams an einem realen, anonymisierten Problemraum. Dabei entstanden Workflows, Mockups, technische Konzepte und erste Prototypen.',
    recapFacts: [
      'Reale Problemräume',
      'Kleine Teams',
      'Gemeinsame Konzeptarbeit',
      'Workflows, Mockups und erste Prototypen',
    ],
    recapImageAlt: 'Kleine Teams arbeiten beim ersten Tech Meets Problems Pilot in Siegen',
    recapImageAlts: [
      'Teilnehmende diskutieren gemeinsam an einem Arbeitstisch',
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
    processTitle: 'Von der Herausforderung zum ersten konkreten Ansatz.',
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
    channelsText: 'Dort teilen wir neue Sessions, Problemräume und Projektmöglichkeiten.',
    companyEyebrow: 'Für Unternehmen',
    companyTitle: 'Reale Herausforderung im Unternehmen?',
    companyText:
      'Tech Meets Problems entwickelt Formate, die Unternehmen mit technischen Talenten, neuen Perspektiven und ersten Ansätzen zusammenbringen.',
    companyCta: 'Zusammenarbeit starten',
    teamEyebrow: 'Über uns',
    teamTitle: 'Wer hinter Tech Meets Problems steht.',
    teamText:
      'Wir haben uns im Master Entrepreneurship & SME Management an der Universität Siegen kennengelernt. Uns verbindet die Frage, wie technische Talente, Unternehmen und das regionale Gründungsnetzwerk besser zusammenarbeiten können.',
    teamTextSecondary:
      'Wir bringen Erfahrungen aus Medienproduktion, KI-Gründung, Psychologie, Wirtschaft und einem medizinischen Gründungsprojekt zusammen. Mit Tech Meets Problems wollen wir Open Innovation in Siegen praktisch erlebbar machen.',
    teamImageAlt: 'Niklas Brüne, Frederik Krause und Johanna Brenner von Tech Meets Problems',
    teamMembers: [
      { name: 'Frederik Krause', role: 'Partnerschaften und Open Innovation', description: 'Hat bereits ein KI-Startup aufgebaut und verantwortet Unternehmenszugänge, Formatentwicklung und operative Umsetzung.' },
      { name: 'Johanna Brenner', role: 'Community und Operations', description: 'Dualer Bachelor mit Psychologie- und Wirtschaftsbezug. Arbeitet parallel an einem Gründungsprojekt im Medizinbereich und begleitet Community, Koordination und Gruppenprozesse.' },
      { name: 'Niklas Brüne', role: 'Strategie und Kommunikation', description: 'Medienmanagement im Bachelor und seit 2021 selbstständig mit einer Medienproduktion. Verantwortet Positionierung, Kommunikation und Außenauftritt.' },
    ],
    faqEyebrow: 'Kurz beantwortet',
    faqTitle: 'Das Wichtigste zur Community.',
    faqs: [
      { question: 'Muss ich eine eigene Idee mitbringen?', answer: 'Nein. Die Sessions starten mit konkreten Problemräumen.' },
      { question: 'Muss ich programmieren können?', answer: 'Du musst kein Programmierprofi sein. Du solltest aber technische, gestalterische oder analytische Fähigkeiten mitbringen und Lust haben, praktisch an einer Lösung zu arbeiten.' },
      { question: 'Ist die Community kostenlos?', answer: 'Der Community-Beitritt und der erste Pilot sind kostenlos. Zukünftige Formate können andere Rahmenbedingungen haben.' },
      { question: 'Wie erfahre ich von neuen Events?', answer: 'Trag dich in die Community-Liste ein oder folge unseren Community-Kanälen.' },
    ],
  },
  en: {
    metaTitle: 'Tech Meets Problems | Builder-first community in Siegen',
    metaDescription:
      'Tech Meets Problems connects technical talent with real challenges from companies and the region. Join the community from Siegen.',
    heroEyebrow: 'Community for technical talent',
    heroTitle: 'Want to work on real challenges from companies?',
    heroText:
      'The Tech Meets Problems community brings together technical students, young professionals and other tech-oriented profiles. Together, you develop concepts, workflows, mockups or first prototypes.',
    heroPrimary: 'Join the community',
    heroSecondary: 'For companies',
    heroImageAlt: 'Technical talent working with problem cards at the first Tech Meets Problems pilot',
    heroCaption: 'Collaborative work at the first event in Siegen',
    eventEyebrow: 'Latest event',
    eventPastLabel: 'Completed',
    eventUpcomingLabel: 'Confirmed event',
    eventClosedLabel: 'Registration closed',
    eventOpenLabel: 'Registration open',
    eventWaitlistLabel: 'Waitlist',
    eventSoldOutLabel: 'Sold out',
    eventFallbackText: 'The next format is in preparation. Community members will hear about it first.',
    eventCta: 'Join the community',
    recapEyebrow: 'Recap',
    recapTitle: 'A look back at our first event',
    recapDate: 'Pizza & Prototypes · 26 June 2026',
    recapText:
      'At the first event, small teams worked on a real, anonymized problem space. They developed workflows, mockups, technical concepts and first prototypes.',
    recapFacts: [
      'Real problem spaces',
      'Small teams',
      'Collaborative concept work',
      'Workflows, mockups and first prototypes',
    ],
    recapImageAlt: 'Small teams working at the first Tech Meets Problems pilot in Siegen',
    recapImageAlts: [
      'Participants discussing ideas around a work table',
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
    processTitle: 'From the challenge to a first practical approach.',
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
    channelsText: 'This is where we share new sessions, problem spaces and project opportunities.',
    companyEyebrow: 'For companies',
    companyTitle: 'A real challenge inside your company?',
    companyText:
      'Tech Meets Problems develops formats that bring companies together with technical talent, new perspectives and first approaches.',
    companyCta: 'Start a collaboration',
    teamEyebrow: 'About us',
    teamTitle: 'Who is behind Tech Meets Problems.',
    teamText:
      'We met during the Entrepreneurship & SME Management master’s program at the University of Siegen. We share an interest in how technical talent, companies and the regional startup network can work together more effectively.',
    teamTextSecondary:
      'We combine experience from media production, an AI startup, psychology, business and a medical venture project. With Tech Meets Problems, we want to make open innovation practical in Siegen.',
    teamImageAlt: 'Niklas Brüne, Frederik Krause and Johanna Brenner from Tech Meets Problems',
    teamMembers: [
      { name: 'Frederik Krause', role: 'Partnerships and Open Innovation', description: 'Previously built an AI startup and focuses on company outreach, format development and operational delivery.' },
      { name: 'Johanna Brenner', role: 'Community and Operations', description: 'Completed a dual bachelor’s degree combining psychology and business. She is also working on a venture project in the medical field and focuses on community, coordination and group processes.' },
      { name: 'Niklas Brüne', role: 'Strategy and Communication', description: 'Studied media management at bachelor’s level and has run a media production business since 2021. He focuses on positioning, communication and external presence.' },
    ],
    faqEyebrow: 'Quick answers',
    faqTitle: 'What matters about the community.',
    faqs: [
      { question: 'Do I need to bring an idea?', answer: 'No. Sessions start with concrete problem spaces.' },
      { question: 'Do I need to code?', answer: 'You do not need to be an expert programmer. You should bring technical, design or analytical skills and be willing to work practically on a solution.' },
      { question: 'Is the community free?', answer: 'Joining the community and the first pilot are free. Future formats may have different conditions.' },
      { question: 'How do I hear about new events?', answer: 'Join the community list or follow our community channels.' },
    ],
  },
};
