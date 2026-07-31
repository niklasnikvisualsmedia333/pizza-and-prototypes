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
  freeEyebrow: string;
  freeText: string;
  eventEyebrow: string;
  eventPastLabel: string;
  eventUpcomingLabel: string;
  eventClosedLabel: string;
  eventOpenLabel: string;
  eventWaitlistLabel: string;
  eventSoldOutLabel: string;
  eventRegistrationNote: string;
  eventTypeFallback: string;
  eventFallbackText: string;
  eventCta: string;
  recapEyebrow: string;
  recapTitle: string;
  recapDate: string;
  recapText: string;
  recapFacts: string[];
  recapImageAlt: string;
  recapImageAlts: string[];
  recapImageCaptions: string[];
  galleryLabel: string;
  galleryPrevious: string;
  galleryNext: string;
  galleryClose: string;
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
  teamStoryTitle: string;
  teamStoryParagraphs: string[];
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
    heroEyebrow: 'Builder-first Tech-Community in Siegen',
    heroTitle: 'Arbeite an echten Herausforderungen aus Unternehmen.',
    heroText:
      'In der Tech Meets Problems Community triffst du technische Studierende, junge Berufstätige und weitere techniknahe Profile. Gemeinsam entwickelt ihr Konzepte, Workflows, Mockups oder erste Prototypen.',
    heroPrimary: 'Community beitreten',
    heroSecondary: 'Für Unternehmen',
    heroImageAlt: 'Technische Talente arbeiten beim Tech Meets Problems Pilot gemeinsam an Problemkarten',
    freeEyebrow: 'Kostenlos für dich',
    freeText: 'Der Community-Beitritt ist kostenlos. Beim ersten Pilot gab es Essen und Getränke; zukünftige Formate können anders aussehen.',
    eventEyebrow: 'Neueste Veranstaltung',
    eventPastLabel: 'Abgeschlossen',
    eventUpcomingLabel: 'Nächstes Event',
    eventClosedLabel: 'Anmeldung geschlossen',
    eventOpenLabel: 'Anmeldung erforderlich',
    eventWaitlistLabel: 'Warteliste',
    eventSoldOutLabel: 'Ausgebucht',
    eventRegistrationNote: 'Für dieses Event ist eine separate Anmeldung erforderlich. Über die Community erhältst du die Anmeldeinformationen per E-Mail.',
    eventTypeFallback: 'Community-Format',
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
      'Kleine Teams arbeiten gemeinsam an einem realen Problemraum',
      'Teilnehmende diskutieren gemeinsam an einem Arbeitstisch',
      'Code auf einem Laptop während der technischen Umsetzung',
      'Ein Teilnehmer präsentiert ein Ergebnis vor dem Beamer',
      'Ergebnisboard aus dem ersten Tech Meets Problems Pilot',
    ],
    recapImageCaptions: [
      'Problemraum und Teams',
      'Gemeinsamer Austausch am Tisch',
      'Technische Umsetzung',
      'Präsentation vor der Gruppe',
      'Sichtbares Ergebnis am Board',
    ],
    galleryLabel: 'Bilder vom ersten Tech Meets Problems Event',
    galleryPrevious: 'Vorheriges Bild',
    galleryNext: 'Nächstes Bild',
    galleryClose: 'Galerie schließen',
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
    teamStoryTitle: 'Warum wir Tech Meets Problems gestartet haben',
    teamStoryParagraphs: [
      'Wir haben uns im Master Entrepreneurship & SME Management an der Universität Siegen kennengelernt. In gemeinsamen Projekten haben wir erlebt, wie spannend Zusammenarbeit wird, wenn technische, gestalterische und unternehmerische Perspektiven früh zusammenkommen.',
      'Gleichzeitig fehlt häufig ein unkomplizierter Rahmen, in dem technische Talente und Unternehmen an realen Fragestellungen arbeiten können. Tech Meets Problems soll genau diesen Raum schaffen: praktisch, offen und mit Ergebnissen, an denen weitergearbeitet werden kann.',
      'Wir bringen eigene Gründungs- und Projekterfahrung mit und sind im Siegener Gründungsnetzwerk eng vernetzt. Unser Ziel ist, Open Innovation in der Region greifbar zu machen und aus ersten Begegnungen starke Kontakte, neue Formate und mögliche Folgeprojekte entstehen zu lassen.',
    ],
    teamImageAlt: 'Niklas Brüne, Frederik Krause und Johanna Brenner von Tech Meets Problems',
    teamMembers: [
      { name: 'Frederik Krause', role: 'Partnerschaften und Open Innovation', description: 'Erfahrung aus einer eigenen KI-Gründung. Verantwortet Unternehmenszugänge und Formatentwicklung.' },
      { name: 'Johanna Brenner', role: 'Community und Operations', description: 'Background in Psychologie und Wirtschaft sowie Erfahrung aus einem medizinischen Gründungsprojekt.' },
      { name: 'Niklas Brüne', role: 'Strategie und Kommunikation', description: 'Background in Medienmanagement und seit 2021 selbstständig mit einer Medienproduktion.' },
    ],
    faqEyebrow: 'Kurz beantwortet',
    faqTitle: 'Das Wichtigste zur Community.',
    faqs: [
      { question: 'Muss ich eine eigene Idee mitbringen?', answer: 'Nein. Die Sessions starten mit konkreten Problemräumen.' },
      { question: 'Muss ich programmieren können?', answer: 'Du musst kein Programmierprofi sein. Du solltest aber technische, gestalterische oder analytische Fähigkeiten mitbringen und Lust haben, praktisch an einer Lösung zu arbeiten.' },
      { question: 'Ist die Community kostenlos?', answer: 'Ja, der Community-Beitritt ist kostenlos. Einzelne Formate können unterschiedliche Rahmenbedingungen haben.' },
      { question: 'Wie erfahre ich von neuen Events?', answer: 'Trag dich in die Community-Liste ein oder folge unseren Community-Kanälen.' },
    ],
  },
  en: {
    metaTitle: 'Tech Meets Problems | Builder-first community in Siegen',
    metaDescription:
      'Tech Meets Problems connects technical talent with real challenges from companies and the region. Join the community from Siegen.',
    heroEyebrow: 'Builder-first tech community in Siegen',
    heroTitle: 'Work on real challenges from companies.',
    heroText:
      'The Tech Meets Problems community brings together technical students, young professionals and other tech-oriented profiles. Together, you develop concepts, workflows, mockups or first prototypes.',
    heroPrimary: 'Join the community',
    heroSecondary: 'For companies',
    heroImageAlt: 'Technical talent working with problem cards at the first Tech Meets Problems pilot',
    freeEyebrow: 'Free for community members',
    freeText: 'Joining the community is free. The first pilot included food and drinks; future formats may look different.',
    eventEyebrow: 'Latest event',
    eventPastLabel: 'Completed',
    eventUpcomingLabel: 'Upcoming event',
    eventClosedLabel: 'Registration closed',
    eventOpenLabel: 'Registration required',
    eventWaitlistLabel: 'Waitlist',
    eventSoldOutLabel: 'Sold out',
    eventRegistrationNote: 'Separate registration is required for this event. Community members receive the registration details by email.',
    eventTypeFallback: 'Community format',
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
      'Small teams working together on a real problem space',
      'Participants discussing ideas around a work table',
      'Code on a laptop during the technical implementation',
      'A participant presenting a result in front of the projector',
      'Result board from the first Tech Meets Problems pilot',
    ],
    recapImageCaptions: [
      'Problem space and teams',
      'Exchange around the table',
      'Technical implementation',
      'Presentation to the group',
      'Visible result on the board',
    ],
    galleryLabel: 'Photos from the first Tech Meets Problems event',
    galleryPrevious: 'Previous image',
    galleryNext: 'Next image',
    galleryClose: 'Close gallery',
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
    teamStoryTitle: 'Why we started Tech Meets Problems',
    teamStoryParagraphs: [
      'We met during the Entrepreneurship & SME Management master’s program at the University of Siegen. Through shared projects, we saw how valuable collaboration becomes when technical, design and business perspectives come together early.',
      'At the same time, there is often no straightforward setting in which technical talent and companies can work on real questions together. Tech Meets Problems is designed to create that space: practical, open and focused on results that can be developed further.',
      'We bring our own startup and project experience and are closely connected to the startup network in Siegen. Our aim is to make open innovation tangible in the region and turn first encounters into strong contacts, new formats and possible follow-up projects.',
    ],
    teamImageAlt: 'Niklas Brüne, Frederik Krause and Johanna Brenner from Tech Meets Problems',
    teamMembers: [
      { name: 'Frederik Krause', role: 'Partnerships and Open Innovation', description: 'Experience from building an AI startup. Focuses on company outreach and format development.' },
      { name: 'Johanna Brenner', role: 'Community and Operations', description: 'Background in psychology and business, with experience from a medical venture project.' },
      { name: 'Niklas Brüne', role: 'Strategy and Communication', description: 'Background in media management and running a media production business since 2021.' },
    ],
    faqEyebrow: 'Quick answers',
    faqTitle: 'What matters about the community.',
    faqs: [
      { question: 'Do I need to bring an idea?', answer: 'No. Sessions start with concrete problem spaces.' },
      { question: 'Do I need to code?', answer: 'You do not need to be an expert programmer. You should bring technical, design or analytical skills and be willing to work practically on a solution.' },
      { question: 'Is the community free?', answer: 'Yes, joining the community is free. Individual formats may have different arrangements.' },
      { question: 'How do I hear about new events?', answer: 'Join the community list or follow our community channels.' },
    ],
  },
};
