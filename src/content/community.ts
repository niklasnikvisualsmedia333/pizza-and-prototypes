import type { Lang } from '../lib/language';

export type CommunityContent = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  heroPrimary: string;
  heroSecondary: string;
  heroClaim: string;
  recapEyebrow: string;
  recapTitle: string;
  recapText: string;
  recapFacts: string[];
  recapImageAlt: string;
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
  companyPoints: string[];
  companyCta: string;
  teamEyebrow: string;
  teamTitle: string;
  teamText: string;
  teamImageAlt: string;
  teamMembers: Array<{ name: string; role: string }>;
  faqEyebrow: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
};

export const communityContent: Record<Lang, CommunityContent> = {
  de: {
    metaTitle: 'Tech Meets Problems | Builder-first Community in Siegen',
    metaDescription:
      'Tech Meets Problems verbindet technische Talente mit realen Herausforderungen aus Unternehmen und Region. Werde Teil der Builder-first Community aus Siegen.',
    heroEyebrow: 'Builder-first Community für reale Herausforderungen',
    heroTitle: 'Technische Talente arbeiten an echten Problemen.',
    heroText:
      'Tech Meets Problems verbindet Builder, technische Studierende und junge Talente mit realen Herausforderungen aus Unternehmen und Region. In kleinen Teams entstehen neue Perspektiven, Konzepte, Workflows, Mockups und erste Prototypen.',
    heroPrimary: 'Community beitreten',
    heroSecondary: 'Für Unternehmen',
    heroClaim: 'Where builders work on real business needs.',
    recapEyebrow: 'Erster Pilot',
    recapTitle: 'Pizza & Prototypes, Juni 2026',
    recapText:
      'Am 26. Juni kamen Builder, technische Studierende und Maker im Haus der Innovation in Siegen zusammen. In kleinen Teams arbeiteten sie an einem realen, anonymisierten Problemraum und entwickelten Workflows, Konzepte, Mockups, technische Skizzen und erste Prototypen.',
    recapFacts: [
      'Echte Problemräume',
      'Kleine, fokussierte Teams',
      'Offene Laptops und praktische Arbeit',
      'Keine Pitchdecks und kein Startup-Theater',
    ],
    recapImageAlt: 'Builder-Teams arbeiten beim ersten Tech Meets Problems Pilot in Siegen',
    benefitsEyebrow: 'Für Builder',
    benefitsTitle: 'Mehr Praxis. Weniger Theorie.',
    benefitsIntro:
      'Die Community bringt technische und techniknahe Menschen zusammen, die reale Herausforderungen verstehen und greifbare nächste Schritte entwickeln wollen.',
    benefits: [
      {
        title: 'Echte Probleme',
        text: 'Arbeite an realen Bedarfen statt an erfundenen Cases.',
      },
      {
        title: 'Gute Leute',
        text: 'Lerne Builder aus Software, Data, HCI, UX und Engineering kennen.',
      },
      {
        title: 'Greifbare Ergebnisse',
        text: 'Übersetze Ideen in Workflows, Mockups, Konzepte oder erste Prototypen.',
      },
      {
        title: 'Neue Einblicke',
        text: 'Erhalte Einblicke in Unternehmen, Projekte und mögliche nächste Schritte.',
      },
    ],
    processEyebrow: 'So funktionieren Sessions',
    processTitle: 'Von der Herausforderung zum nächsten Schritt.',
    processIntro:
      'Das Format bleibt bewusst kompakt. Es geht nicht um fertige Software, sondern um gutes Problemverständnis und erste belastbare Ansätze.',
    steps: [
      'Reale Herausforderung verstehen',
      'In einem kleinen Team arbeiten',
      'Konzept, Workflow, Mockup oder Prototyp entwickeln',
      'Ergebnis teilen und nächste Schritte prüfen',
    ],
    channelsEyebrow: 'Community-Kanäle',
    channelsTitle: 'Bleib mit Tech Meets Problems verbunden.',
    channelsText:
      'Erhalte Hinweise zu Sessions, Problemräumen und Projekten. Kein Dauerfeuer, nur relevante Updates.',
    companyEyebrow: 'Für Unternehmen',
    companyTitle: 'Reale Herausforderung im Unternehmen?',
    companyText:
      'Wir entwickeln passende Formate, die Unternehmen mit technischen Talenten, neuen Perspektiven und ersten Lösungsansätzen verbinden.',
    companyPoints: ['Technische Talente', 'Reale Herausforderungen', 'Greifbare nächste Schritte'],
    companyCta: 'Zusammenarbeit entdecken',
    teamEyebrow: 'Das Team',
    teamTitle: 'Aus Siegen. Für praktische Zusammenarbeit.',
    teamText:
      'Wir verbinden Community, Unternehmen und regionale Partner. Gemeinsam entwickeln wir Formate, in denen reale Probleme auf technische Neugier treffen.',
    teamImageAlt: 'Team von Tech Meets Problems',
    teamMembers: [
      { name: 'Niklas Brüne', role: 'Strategie, Produkt und Kommunikation' },
      { name: 'Frederik Krause', role: 'Partnerschaften und Open Innovation' },
      { name: 'Johanna Brenner', role: 'Community, Operations und Strategie' },
    ],
    faqEyebrow: 'Kurz beantwortet',
    faqTitle: 'Das Wichtigste zur Community.',
    faqs: [
      {
        question: 'Muss ich eine eigene Idee mitbringen?',
        answer: 'Nein. Tech Meets Problems startet mit realen Problemräumen. Du bringst Neugier und deine Perspektive mit.',
      },
      {
        question: 'Muss ich programmieren können?',
        answer: 'Nein. Software, Data, HCI, UX, Engineering und andere technische Perspektiven ergänzen sich.',
      },
      {
        question: 'Ist der Community-Beitritt kostenlos?',
        answer: 'Ja. Einzelne zukünftige Formate können eigene Rahmenbedingungen haben.',
      },
    ],
  },
  en: {
    metaTitle: 'Tech Meets Problems | Builder-first community in Siegen',
    metaDescription:
      'Tech Meets Problems connects technical talent with real challenges from companies and the region. Join the builder-first community from Siegen.',
    heroEyebrow: 'Builder-first community for real challenges',
    heroTitle: 'Technical talent works on real problems.',
    heroText:
      'Tech Meets Problems connects builders, technical students and young talent with real challenges from companies and the region. Small teams turn them into new perspectives, concepts, workflows, mockups and first prototypes.',
    heroPrimary: 'Join the community',
    heroSecondary: 'For companies',
    heroClaim: 'Where builders work on real business needs.',
    recapEyebrow: 'First pilot',
    recapTitle: 'Pizza & Prototypes, June 2026',
    recapText:
      'On June 26, builders, technical students and makers met at Haus der Innovation in Siegen. Small teams worked on a real, anonymized problem space and developed workflows, concepts, mockups, technical sketches and first prototypes.',
    recapFacts: [
      'Real problem spaces',
      'Small, focused teams',
      'Open laptops and practical work',
      'No pitch decks or startup theatre',
    ],
    recapImageAlt: 'Builder teams working at the first Tech Meets Problems pilot in Siegen',
    benefitsEyebrow: 'For builders',
    benefitsTitle: 'More practice. Less theory.',
    benefitsIntro:
      'The community brings technical and tech-minded people together to understand real challenges and shape practical next steps.',
    benefits: [
      {
        title: 'Real problems',
        text: 'Work on real needs instead of invented cases.',
      },
      {
        title: 'Good people',
        text: 'Meet builders from software, data, HCI, UX and engineering.',
      },
      {
        title: 'Tangible output',
        text: 'Turn ideas into workflows, mockups, concepts or first prototypes.',
      },
      {
        title: 'New perspectives',
        text: 'Gain insight into companies, projects and possible next steps.',
      },
    ],
    processEyebrow: 'How sessions work',
    processTitle: 'From a challenge to a practical next step.',
    processIntro:
      'The format stays intentionally focused. It is not about finished software, but about sound problem understanding and useful first approaches.',
    steps: [
      'Understand a real challenge',
      'Work in a small team',
      'Develop a concept, workflow, mockup or prototype',
      'Share the result and review next steps',
    ],
    channelsEyebrow: 'Community channels',
    channelsTitle: 'Stay connected with Tech Meets Problems.',
    channelsText:
      'Hear about sessions, problem spaces and projects. No constant noise, only relevant updates.',
    companyEyebrow: 'For companies',
    companyTitle: 'A real challenge inside your company?',
    companyText:
      'We develop suitable formats that connect companies with technical talent, fresh perspectives and first solution approaches.',
    companyPoints: ['Technical talent', 'Real challenges', 'Tangible next steps'],
    companyCta: 'Explore collaboration',
    teamEyebrow: 'The team',
    teamTitle: 'From Siegen. Built for practical collaboration.',
    teamText:
      'We connect community, companies and regional partners. Together, we shape formats where real problems meet technical curiosity.',
    teamImageAlt: 'Tech Meets Problems team',
    teamMembers: [
      { name: 'Niklas Brüne', role: 'Strategy, product and communication' },
      { name: 'Frederik Krause', role: 'Partnerships and open innovation' },
      { name: 'Johanna Brenner', role: 'Community, operations and strategy' },
    ],
    faqEyebrow: 'Quick answers',
    faqTitle: 'What matters about the community.',
    faqs: [
      {
        question: 'Do I need to bring an idea?',
        answer: 'No. Tech Meets Problems starts with real problem spaces. You bring curiosity and your perspective.',
      },
      {
        question: 'Do I need to code?',
        answer: 'No. Software, data, HCI, UX, engineering and other technical perspectives complement each other.',
      },
      {
        question: 'Is joining the community free?',
        answer: 'Yes. Individual future formats may have their own conditions.',
      },
    ],
  },
};

