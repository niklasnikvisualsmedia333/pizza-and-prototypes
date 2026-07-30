import type { Lang } from '../lib/language';

export type CompaniesContent = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  heroPrimary: string;
  heroSecondary: string;
  heroImageAlt: string;
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefits: Array<{ title: string; points: string[] }>;
  formatsEyebrow: string;
  formatsTitle: string;
  formatsIntro: string;
  formats: Array<{ title: string; text: string; frame: string }>;
  disciplinesEyebrow: string;
  disciplinesTitle: string;
  disciplines: string[];
  proofEyebrow: string;
  proofTitle: string;
  proofText: string;
  proofExpectation: string;
  proofImageAlt: string;
  processEyebrow: string;
  processTitle: string;
  process: string[];
  expectationEyebrow: string;
  expectationTitle: string;
  expectationText: string;
  contactEyebrow: string;
  contactTitle: string;
  contactText: string;
  directContact: string;
  form: {
    company: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    format: string;
    challenge: string;
    phone: string;
    timeframe: string;
    details: string;
    privacy: string;
    privacyLink: string;
    required: string;
    select: string;
    submitMail: string;
    submitEndpoint: string;
    sending: string;
    mailHelp: string;
    success: string;
    error: string;
    subject: string;
    emailIntro: string;
    options: string[];
  };
};

export const companiesContent: Record<Lang, CompaniesContent> = {
  de: {
    metaTitle: 'Tech Meets Problems für Unternehmen | Technische Talente aus Siegen',
    metaDescription:
      'Tech Meets Problems verbindet Unternehmen mit technischen Talenten und neuen Perspektiven auf reale Herausforderungen, Digitalisierung, Automatisierung und KI.',
    heroEyebrow: 'Tech Meets Problems für Unternehmen',
    heroTitle: 'Sie bringen die Herausforderung. Wir bringen technische Talente und neue Perspektiven zusammen.',
    heroText:
      'Tech Meets Problems ist eine regionale Open-Innovation-Initiative aus Siegen. Wir verbinden Unternehmen mit einer technisch orientierten und praxisinteressierten Community.',
    heroPrimary: 'Format besprechen',
    heroSecondary: 'Pilot ansehen',
    heroImageAlt: 'Technische Talente arbeiten gemeinsam an einem Problem-Canvas',
    benefitsEyebrow: 'Möglicher Nutzen',
    benefitsTitle: 'Kompakte Formate für reale Fragestellungen.',
    benefits: [
      {
        title: 'Reale Herausforderungen',
        points: [
          'Reale Unternehmensprobleme als Ausgangspunkt',
          'Technisches Know-how trifft unternehmerischen Kontext',
        ],
      },
      {
        title: 'Zugang zu Talenten',
        points: [
          'Kontakt zu einer technisch orientierten Community',
          'Regionale Verbindung von Unternehmen, Universität und Talenten',
        ],
      },
      {
        title: 'Neue Perspektiven',
        points: [
          'Erste Ansätze ohne sofortiges Großprojekt',
          'Impulse zu Digitalisierung, Automatisierung, KI und Prozessen',
        ],
      },
    ],
    formatsEyebrow: 'Kooperationsformate',
    formatsTitle: 'Der Rahmen richtet sich nach Ihrer Herausforderung.',
    formatsIntro:
      'Vom kompakten Impuls bis zum mehrwöchigen Sprint. Wir klären zuerst Ziel, Problemraum und passende Community-Profile.',
    formats: [
      {
        title: 'Impulsvortrag und Networking',
        text: 'Einblicke in Technologien, Transformation, Karrierewege oder aktuelle Branchenfragen.',
        frame: '30 bis 60 Minuten plus Austausch',
      },
      {
        title: 'Problem-Solving-Workshop',
        text: 'Eine klar abgegrenzte Herausforderung wird in erste Konzepte, Lösungsansätze, Mockups oder Prototypen übersetzt.',
        frame: 'ca. 90 Minuten bis 3 Stunden',
      },
      {
        title: 'Innovation Sprint',
        text: 'Vielversprechende Ansätze werden über mehrere Tage oder Wochen analysiert, entwickelt und praktisch erprobt.',
        frame: 'mehrtägig oder mehrwöchig',
      },
    ],
    disciplinesEyebrow: 'Community-Profile',
    disciplinesTitle: 'Technische und techniknahe Perspektiven.',
    disciplines: [
      'Engineering und Mechatronik',
      'Informatik und Softwareentwicklung',
      'Data Science und Artificial Intelligence',
      'Wirtschaftsinformatik',
      'Human-Computer Interaction',
      'User Experience und Design',
    ],
    proofEyebrow: 'Der erste Pilot',
    proofTitle: 'Ein erster Test mit echten Buildern.',
    proofText:
      'Pizza & Prototypes hat gezeigt, dass sich eine motivierte technische Community rund um reale Business-Probleme aktivieren lässt. Der stärkste Beweis war konzentrierte Teamarbeit, offene Laptops, Problemkarten und greifbare erste Ergebnisse.',
    proofExpectation:
      'Ein Kurzformat liefert keine fertige Software. Es schafft Problemverständnis, neue Perspektiven, erste Konzepte und eine belastbare Grundlage für mögliche nächste Schritte.',
    proofImageAlt: 'Builder diskutieren Konzepte und erste technische Lösungsansätze',
    processEyebrow: 'Zusammenarbeit',
    processTitle: 'Drei Schritte bis zum passenden Format.',
    process: [
      'Herausforderung und Ziel klären',
      'Format und Community-Profile auswählen',
      'Ergebnisse auswerten und nächste Schritte prüfen',
    ],
    expectationEyebrow: 'Erwartungsmanagement',
    expectationTitle: 'Ein guter erster Schritt, kein fertiges Produktversprechen.',
    expectationText:
      'Wir versprechen keine fertige Software in wenigen Stunden. Ziel sind bessere Fragen, neue Perspektiven und greifbare Ansätze, die intern oder in einem Folgeprojekt weitergeführt werden können.',
    contactEyebrow: 'Kontakt',
    contactTitle: 'Lassen Sie uns die Herausforderung kurz einordnen.',
    contactText:
      'Beschreiben Sie Thema, Ziel und gewünschten Rahmen. Ohne konfigurierten Company-Endpunkt bereitet die Website lediglich eine E-Mail vor.',
    directContact: 'Oder direkt per E-Mail:',
    form: {
      company: 'Unternehmen',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'Geschäftliche E-Mail-Adresse',
      role: 'Rolle oder Fachbereich',
      format: 'Interesse an einem Format',
      challenge: 'Thema oder Herausforderung',
      phone: 'Telefonnummer, optional',
      timeframe: 'Gewünschter Zeitraum, optional',
      details: 'Weitere Informationen, optional',
      privacy: 'Ich habe die Datenschutzhinweise gelesen und möchte meine Anfrage vorbereiten.',
      privacyLink: 'Datenschutzhinweise',
      required: '* Pflichtfelder',
      select: 'Bitte auswählen',
      submitMail: 'E-Mail vorbereiten',
      submitEndpoint: 'Anfrage senden',
      sending: 'Wird gesendet …',
      mailHelp:
        'Ihre Angaben werden in eine E-Mail übernommen. Bitte prüfen und senden Sie diese anschließend in Ihrem E-Mail-Programm.',
      success: 'Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt.',
      error: 'Die Anfrage konnte nicht gesendet werden. Bitte nutzen Sie den direkten E-Mail-Kontakt.',
      subject: 'Anfrage zu einem Tech Meets Problems Format',
      emailIntro: 'Guten Tag,\n\nich möchte ein mögliches Format mit Tech Meets Problems besprechen.',
      options: [
        'Impulsvortrag und Networking',
        'Problem-Solving-Workshop',
        'Innovation Sprint',
        'Hackathon oder individuelles Format',
        'Noch offen',
      ],
    },
  },
  en: {
    metaTitle: 'Tech Meets Problems for companies | Technical talent from Siegen',
    metaDescription:
      'Tech Meets Problems connects companies with technical talent and fresh perspectives on real challenges, digitalization, automation and AI.',
    heroEyebrow: 'Tech Meets Problems for companies',
    heroTitle: 'You bring the challenge. We bring technical talent and new perspectives together.',
    heroText:
      'Tech Meets Problems is a regional open-innovation initiative from Siegen. We connect companies with a technically oriented, hands-on community.',
    heroPrimary: 'Discuss a format',
    heroSecondary: 'See the pilot',
    heroImageAlt: 'Technical talent working together on a problem canvas',
    benefitsEyebrow: 'Potential value',
    benefitsTitle: 'Focused formats for real questions.',
    benefits: [
      {
        title: 'Real challenges',
        points: [
          'Real company problems as the starting point',
          'Technical know-how meets business context',
        ],
      },
      {
        title: 'Access to talent',
        points: [
          'Connect with a technically oriented community',
          'Regional links between companies, university and talent',
        ],
      },
      {
        title: 'New perspectives',
        points: [
          'First approaches without starting a large project',
          'Input on digitalization, automation, AI and processes',
        ],
      },
    ],
    formatsEyebrow: 'Collaboration formats',
    formatsTitle: 'The setup follows your challenge.',
    formatsIntro:
      'From a focused impulse to a multi-week sprint. We first clarify the goal, problem space and suitable community profiles.',
    formats: [
      {
        title: 'Impulse talk and networking',
        text: 'Insights into technology, transformation, career paths or current industry questions.',
        frame: '30 to 60 minutes plus exchange',
      },
      {
        title: 'Problem-solving workshop',
        text: 'A clearly scoped challenge is translated into first concepts, solution approaches, mockups or prototypes.',
        frame: 'approx. 90 minutes to 3 hours',
      },
      {
        title: 'Innovation sprint',
        text: 'Promising approaches are analyzed, developed and practically tested over several days or weeks.',
        frame: 'several days or weeks',
      },
    ],
    disciplinesEyebrow: 'Community profiles',
    disciplinesTitle: 'Technical and tech-adjacent perspectives.',
    disciplines: [
      'Engineering and mechatronics',
      'Computer science and software development',
      'Data science and artificial intelligence',
      'Business informatics',
      'Human-computer interaction',
      'User experience and design',
    ],
    proofEyebrow: 'The first pilot',
    proofTitle: 'A first test with real builders.',
    proofText:
      'Pizza & Prototypes showed that a motivated technical community can be activated around real business problems. The strongest proof was focused teamwork, open laptops, problem cards and tangible first output.',
    proofExpectation:
      'A short format does not deliver finished software. It creates problem understanding, fresh perspectives, first concepts and a sound basis for possible next steps.',
    proofImageAlt: 'Builders reviewing concepts and first technical solution approaches',
    processEyebrow: 'Collaboration',
    processTitle: 'Three steps to a suitable format.',
    process: [
      'Clarify the challenge and goal',
      'Select the format and community profiles',
      'Review outcomes and possible next steps',
    ],
    expectationEyebrow: 'Clear expectations',
    expectationTitle: 'A useful first step, not a finished-product promise.',
    expectationText:
      'We do not promise finished software in a few hours. The goal is better questions, new perspectives and tangible approaches that can continue internally or in a follow-up project.',
    contactEyebrow: 'Contact',
    contactTitle: 'Let us briefly frame the challenge.',
    contactText:
      'Describe the topic, goal and preferred setup. Without a configured company endpoint, the website only prepares an email.',
    directContact: 'Or email us directly:',
    form: {
      company: 'Company',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Business email address',
      role: 'Role or department',
      format: 'Format of interest',
      challenge: 'Topic or challenge',
      phone: 'Phone number, optional',
      timeframe: 'Preferred timeframe, optional',
      details: 'Additional information, optional',
      privacy: 'I have read the privacy notice and want to prepare my inquiry.',
      privacyLink: 'Privacy notice',
      required: '* Required fields',
      select: 'Please select',
      submitMail: 'Prepare email',
      submitEndpoint: 'Send inquiry',
      sending: 'Sending …',
      mailHelp:
        'Your information is copied into an email. Please review and send it in your email application.',
      success: 'Thank you. Your inquiry was submitted successfully.',
      error: 'The inquiry could not be sent. Please use the direct email contact.',
      subject: 'Inquiry about a Tech Meets Problems format',
      emailIntro: 'Hello,\n\nI would like to discuss a possible format with Tech Meets Problems.',
      options: [
        'Impulse talk and networking',
        'Problem-solving workshop',
        'Innovation sprint',
        'Hackathon or individual format',
        'Still open',
      ],
    },
  },
};

