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
  benefits: Array<{ title: string; text: string }>;
  formatsEyebrow: string;
  formatsTitle: string;
  formatsIntro: string;
  formats: Array<{ title: string; text: string; frame: string }>;
  formatsNote: string;
  tailoredEyebrow: string;
  tailoredTitle: string;
  tailoredText: string;
  tailoredCta: string;
  disciplinesEyebrow: string;
  disciplinesTitle: string;
  disciplinesText: string;
  disciplines: string[];
  communityProfileEyebrow: string;
  communityProfileTitle: string;
  communityProfileFacts: string[];
  communityProfileText: string;
  proofEyebrow: string;
  proofTitle: string;
  proofText: string;
  proofExpectationTitle: string;
  proofExpectation: string;
  proofImageAlts: string[];
  processEyebrow: string;
  processTitle: string;
  process: string[];
  contactEyebrow: string;
  contactTitle: string;
  contactText: string;
  directContact: string;
  onePagerEyebrow: string;
  onePagerTitle: string;
  onePagerText: string;
  onePagerRequest: string;
  onePagerDownload: string;
  onePagerPending: string;
  teamEyebrow: string;
  teamTitle: string;
  teamText: string;
  teamTextSecondary: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  form: {
    company: string;
    name: string;
    email: string;
    role: string;
    format: string;
    challenge: string;
    phone: string;
    timeframe: string;
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
    metaTitle: 'Tech Meets Problems für Unternehmen | Open Innovation aus Siegen',
    metaDescription:
      'Tech Meets Problems verbindet Unternehmen mit technischen Talenten und neuen Perspektiven auf Prozesse, Digitalisierung, KI und reale Herausforderungen.',
    heroEyebrow: 'Tech Meets Problems für Unternehmen',
    heroTitle: 'Ihre Herausforderung trifft auf technische Talente.',
    heroText:
      'Tech Meets Problems verbindet Unternehmen mit einer wachsenden technischen Community aus Siegen und der Region. Gemeinsam entstehen neue Perspektiven, erste Ansätze und passende nächste Schritte.',
    heroPrimary: 'Kontakt aufnehmen',
    heroSecondary: 'Zur Community',
    heroImageAlt: 'Technische Talente arbeiten gemeinsam an einem Problem-Canvas',
    benefitsEyebrow: 'Nutzen für Unternehmen',
    benefitsTitle: 'Neue Perspektiven auf konkrete Fragestellungen.',
    benefits: [
      { title: 'Zugang zu technischen Talenten', text: 'Direkter Austausch mit technischen Studierenden, jungen Berufstätigen und weiteren techniknahen Profilen aus der Region.' },
      { title: 'Open Innovation', text: 'Neue Perspektiven auf reale Fragestellungen, ohne sofort ein umfangreiches Entwicklungsprojekt zu starten.' },
      { title: 'Prozesse und Digitalisierung', text: 'Erste Ansätze zu Automatisierung, KI, digitalen Abläufen und konkreten Prozessproblemen.' },
      { title: 'Employer Branding', text: 'Authentische Sichtbarkeit bei technisch orientierten Talenten jenseits klassischer Karrieremessen.' },
    ],
    formatsEyebrow: 'Kooperationsformate',
    formatsTitle: 'Der Rahmen richtet sich nach Ihrer Fragestellung.',
    formatsIntro: 'Mögliche Einstiege. Dauer und beteiligte Profile stimmen wir gemeinsam ab.',
    formats: [
      { title: 'Impuls und Austausch', text: 'Einblicke in Technologien, Projekte, Transformation, Karrierewege oder aktuelle Branchenfragen.', frame: '30 bis 60 Minuten plus Fragen und Austausch' },
      { title: 'Innovation Event', text: 'Eine klar abgegrenzte Herausforderung wird analysiert und in erste Konzepte, Workflows, Mockups oder technische Ansätze übersetzt.', frame: 'Etwa 90 Minuten bis ein Tag' },
      { title: 'Prozessoptimierungs-Event', text: 'Ein Ablauf, Engpass oder wiederkehrender Prozess wird strukturiert betrachtet. Daraus entstehen mögliche digitale, organisatorische oder technische Verbesserungen.', frame: 'Kompakter Workshop oder mehrteiliger Sprint' },
      { title: 'Recruiting und Employer Branding', text: 'Technische Einblicke, reale Aufgaben, Karrierewege und direkter Austausch stärken die regionale Arbeitgeberwahrnehmung.', frame: 'Company Insight, Q&A, Workshop oder Community-Format' },
    ],
    formatsNote: 'Auch individuelle Workshops, mehrteilige Programme und Hackathons sind möglich, wenn sie zur Fragestellung und zur Community passen.',
    tailoredEyebrow: 'Individuelles Format',
    tailoredTitle: 'Nicht jede Herausforderung passt in ein Standardformat.',
    tailoredText:
      'Gemeinsam klären wir Ziel, Zeitraum und passende Profile aus der Community. Möglich sind individuelle Workshops, mehrteilige Programme, Hackathons oder ein speziell entwickeltes Format.',
    tailoredCta: 'Individuelles Format besprechen',
    disciplinesEyebrow: 'Unsere Community',
    disciplinesTitle: 'Technische und techniknahe Profile aus der Region.',
    disciplinesText: 'Eine wachsende technische Community aus Siegen und der Region bringt unterschiedliche Perspektiven zusammen.',
    disciplines: [
      'Informatik und Softwareentwicklung',
      'Wirtschaftsinformatik',
      'Data Science und AI',
      'Human-Computer Interaction',
      'UX, UI und Design',
      'Elektrotechnik',
      'Maschinenbau',
      'Mechatronik',
      'Wirtschaftsingenieurwesen',
    ],
    communityProfileEyebrow: 'Die Community',
    communityProfileTitle: 'Technische Talente mit unterschiedlichen Erfahrungen.',
    communityProfileFacts: ['Über 120 Mitglieder', 'Viele studieren im Master', 'International und praxiserfahren'],
    communityProfileText:
      'Viele Mitglieder haben ihren Bachelor in Deutschland oder im Ausland abgeschlossen und studieren heute im Master. Ein großer Teil bringt bereits Berufserfahrung aus Unternehmen, Projekten oder eigener Gründung mit.',
    proofEyebrow: 'Unser erstes Event',
    proofTitle: 'Pizza & Prototypes · 26. Juni 2026',
    proofText: 'Bei unserem ersten Event arbeiteten kleine Teams an einem realen, anonymisierten Problemraum. Entstanden sind Workflows, Mockups, technische Konzepte und erste Prototypen.',
    proofExpectationTitle: 'Was ein Kurzformat leisten kann',
    proofExpectation: 'Ein Kurzformat liefert keine fertige Software. Es schafft ein gemeinsames Problemverständnis, erste Ansätze und eine Grundlage für mögliche nächste Schritte.',
    proofImageAlts: [
      'Kleines Team arbeitet an einem Canvas beim ersten Tech Meets Problems Event',
      'Weiter Blick in den Raum mit mehreren arbeitenden Teams',
      'Ergebnisboard aus dem ersten Tech Meets Problems Pilot',
    ],
    processEyebrow: 'Zusammenarbeit',
    processTitle: 'In drei Schritten zum passenden Format.',
    process: [
      'Herausforderung und Ziel klären',
      'Passendes Format und beteiligte Profile abstimmen',
      'Ergebnisse auswerten und nächste Schritte prüfen',
    ],
    contactEyebrow: 'Kontakt',
    contactTitle: 'Lassen Sie uns Ihre Fragestellung kurz einordnen.',
    contactText: 'Ein kurzer Überblick reicht für den ersten Austausch. Gemeinsam prüfen wir, welcher Rahmen sinnvoll ist.',
    directContact: 'Oder direkt per E-Mail:',
    onePagerEyebrow: 'Intern weitergeben',
    onePagerTitle: 'Tech Meets Problems kompakt.',
    onePagerText: 'Der One-Pager fasst Ansatz, Formate und Kontakt für die interne Abstimmung zusammen.',
    onePagerRequest: 'One-Pager anfordern',
    onePagerDownload: 'One-Pager herunterladen',
    onePagerPending: 'PDF wird ergänzt',
    teamEyebrow: 'Über uns',
    teamTitle: 'Das Team hinter Tech Meets Problems.',
    teamText:
      'Wir haben uns im Master Entrepreneurship & SME Management an der Universität Siegen kennengelernt. Uns verbindet die Frage, wie technische Talente, Unternehmen und das regionale Gründungsnetzwerk besser zusammenarbeiten können.',
    teamTextSecondary:
      'Wir bringen Erfahrungen aus Medienproduktion, KI-Gründung, Psychologie, Wirtschaft und einem medizinischen Gründungsprojekt zusammen. Mit Tech Meets Problems wollen wir Open Innovation in Siegen praktisch erlebbar machen.',
    faqEyebrow: 'Kurz beantwortet',
    faqTitle: 'Fragen zur Zusammenarbeit.',
    faqs: [
      { question: 'Welche Ergebnisse sind in einem Kurzformat realistisch?', answer: 'Je nach Fragestellung entstehen Problemverständnis, Workflows, Mockups, technische Konzepte oder erste Prototypen.' },
      { question: 'Welche Herausforderung eignet sich?', answer: 'Gut geeignet sind klar beschreibbare Abläufe, Engpässe oder Bedarfe mit offenem Lösungsweg.' },
      { question: 'Müssen vertrauliche Daten geteilt werden?', answer: 'Nein. Wir klären vorab, welche Informationen nötig sind und wie sich sensible Inhalte abstrahieren lassen.' },
      { question: 'Wie startet eine Zusammenarbeit?', answer: 'Mit einem kurzen Gespräch über Herausforderung, Ziel und möglichen Rahmen.' },
    ],
    form: {
      company: 'Unternehmen',
      name: 'Name',
      email: 'Geschäftliche E-Mail-Adresse',
      role: 'Rolle oder Fachbereich, optional',
      format: 'Interesse oder Format',
      challenge: 'Thema oder Herausforderung',
      phone: 'Telefonnummer, optional',
      timeframe: 'Gewünschter Zeitraum, optional',
      privacy: 'Ich habe die Datenschutzhinweise gelesen und möchte meine Anfrage vorbereiten.',
      privacyLink: 'Datenschutzhinweise',
      required: '* Pflichtfelder',
      select: 'Bitte auswählen',
      submitMail: 'E-Mail vorbereiten',
      submitEndpoint: 'Anfrage senden',
      sending: 'Wird gesendet …',
      mailHelp: 'Ihre Angaben werden in eine E-Mail übernommen. Bitte prüfen und senden Sie diese anschließend in Ihrem E-Mail-Programm.',
      success: 'Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt.',
      error: 'Die Anfrage konnte nicht gesendet werden. Bitte nutzen Sie den direkten E-Mail-Kontakt.',
      subject: 'Anfrage zu einem Tech Meets Problems Format',
      emailIntro: 'Guten Tag,\n\nich möchte ein mögliches Format mit Tech Meets Problems besprechen.',
      options: ['Impuls und Austausch', 'Innovation Event', 'Prozessoptimierungs-Event', 'Recruiting und Employer Branding', 'Individuelles Format', 'Noch offen'],
    },
  },
  en: {
    metaTitle: 'Tech Meets Problems for companies | Open innovation from Siegen',
    metaDescription:
      'Tech Meets Problems connects companies with technical talent and new perspectives on processes, digitalization, AI and real challenges.',
    heroEyebrow: 'Tech Meets Problems for companies',
    heroTitle: 'Your challenge meets technical talent.',
    heroText: 'Tech Meets Problems connects companies with a growing technical community from Siegen and the surrounding region. Together, we create new perspectives, first approaches and suitable next steps.',
    heroPrimary: 'Get in touch',
    heroSecondary: 'Visit the community',
    heroImageAlt: 'Technical talent working together on a problem canvas',
    benefitsEyebrow: 'Benefits for companies',
    benefitsTitle: 'New perspectives on concrete questions.',
    benefits: [
      { title: 'Access to technical talent', text: 'Direct exchange with technical students, young professionals and other tech-adjacent profiles from the region.' },
      { title: 'Open innovation', text: 'New perspectives on real questions without immediately starting an extensive development project.' },
      { title: 'Processes and digitalization', text: 'First approaches to automation, AI, digital workflows and concrete process problems.' },
      { title: 'Employer branding', text: 'Authentic visibility among technically oriented talent beyond traditional career fairs.' },
    ],
    formatsEyebrow: 'Collaboration formats',
    formatsTitle: 'The setup follows your question.',
    formatsIntro: 'Possible starting points. We agree on duration and relevant profiles together.',
    formats: [
      { title: 'Impulse and exchange', text: 'Insights into technologies, projects, transformation, career paths or current industry questions.', frame: '30 to 60 minutes plus questions and exchange' },
      { title: 'Innovation event', text: 'A clearly scoped challenge is analyzed and translated into first concepts, workflows, mockups or technical approaches.', frame: 'Around 90 minutes to one day' },
      { title: 'Process improvement event', text: 'A workflow, bottleneck or recurring process is reviewed in a structured way to identify possible digital, organizational or technical improvements.', frame: 'Compact workshop or multi-part sprint' },
      { title: 'Recruiting and employer branding', text: 'Technical insights, real tasks, career paths and direct exchange strengthen regional employer visibility.', frame: 'Company insight, Q&A, workshop or community format' },
    ],
    formatsNote: 'Tailored workshops, multi-part programs and hackathons are also possible when they fit the question and the community.',
    tailoredEyebrow: 'Tailored format',
    tailoredTitle: 'Not every challenge fits a standard format.',
    tailoredText:
      'Together, we clarify the goal, timeframe and suitable profiles from the community. Possible setups include tailored workshops, multi-part programs, hackathons or a purpose-built format.',
    tailoredCta: 'Discuss a tailored format',
    disciplinesEyebrow: 'Our community',
    disciplinesTitle: 'Technical and tech-adjacent profiles from the region.',
    disciplinesText: 'A growing technical community from Siegen and the surrounding region brings different perspectives together.',
    disciplines: [
      'Computer science and software development',
      'Business informatics',
      'Data science and AI',
      'Human-computer interaction',
      'UX, UI and design',
      'Electrical engineering',
      'Mechanical engineering',
      'Mechatronics',
      'Industrial engineering',
    ],
    communityProfileEyebrow: 'The community',
    communityProfileTitle: 'Technical talent with different backgrounds.',
    communityProfileFacts: ['More than 120 members', 'Many are master’s students', 'International and experienced in practice'],
    communityProfileText:
      'Many members completed their bachelor’s degree in Germany or abroad and are now studying at master’s level. A significant part of the community already brings experience from companies, projects or their own ventures.',
    proofEyebrow: 'Our first event',
    proofTitle: 'Pizza & Prototypes · 26 June 2026',
    proofText: 'At our first event, small teams worked on a real, anonymized problem space. They developed workflows, mockups, technical concepts and first prototypes.',
    proofExpectationTitle: 'What a short format can achieve',
    proofExpectation: 'A short format does not deliver finished software. It creates a shared understanding of the problem, first approaches and a foundation for possible next steps.',
    proofImageAlts: [
      'Small team working on a canvas at the first Tech Meets Problems event',
      'Wide view of the room with several teams working together',
      'Result board from the first Tech Meets Problems pilot',
    ],
    processEyebrow: 'Collaboration',
    processTitle: 'Three steps to a suitable format.',
    process: [
      'Clarify the challenge and goal',
      'Agree on the format and relevant participant profiles',
      'Review outcomes and possible next steps',
    ],
    contactEyebrow: 'Contact',
    contactTitle: 'Let us briefly frame your question.',
    contactText: 'A short outline is enough for the first exchange. Together, we review which setup makes sense.',
    directContact: 'Or email us directly:',
    onePagerEyebrow: 'Share internally',
    onePagerTitle: 'Tech Meets Problems at a glance.',
    onePagerText: 'The one-pager summarizes the approach, formats and contact details for internal discussion.',
    onePagerRequest: 'Request the one-pager',
    onePagerDownload: 'Download the one-pager',
    onePagerPending: 'PDF will be added',
    teamEyebrow: 'About us',
    teamTitle: 'The team behind Tech Meets Problems.',
    teamText:
      'We met during the Entrepreneurship & SME Management master’s program at the University of Siegen. We share an interest in how technical talent, companies and the regional startup network can work together more effectively.',
    teamTextSecondary:
      'We combine experience from media production, an AI startup, psychology, business and a medical venture project. With Tech Meets Problems, we want to make open innovation practical in Siegen.',
    faqEyebrow: 'Quick answers',
    faqTitle: 'Questions about collaboration.',
    faqs: [
      { question: 'What can a short format realistically produce?', answer: 'Depending on the question: problem understanding, workflows, mockups, technical concepts or first prototypes.' },
      { question: 'Which challenges are suitable?', answer: 'Clearly describable workflows, bottlenecks or needs with an open solution path work well.' },
      { question: 'Do we need to share confidential data?', answer: 'No. We clarify what information is needed and how sensitive content can be abstracted.' },
      { question: 'How does a collaboration start?', answer: 'With a short conversation about the challenge, goal and possible setup.' },
    ],
    form: {
      company: 'Company',
      name: 'Name',
      email: 'Business email address',
      role: 'Role or department, optional',
      format: 'Interest or format',
      challenge: 'Topic or challenge',
      phone: 'Phone number, optional',
      timeframe: 'Preferred timeframe, optional',
      privacy: 'I have read the privacy notice and want to prepare my inquiry.',
      privacyLink: 'Privacy notice',
      required: '* Required fields',
      select: 'Please select',
      submitMail: 'Prepare email',
      submitEndpoint: 'Send inquiry',
      sending: 'Sending …',
      mailHelp: 'Your information is copied into an email. Please review and send it in your email application.',
      success: 'Thank you. Your inquiry was submitted successfully.',
      error: 'The inquiry could not be sent. Please use the direct email contact.',
      subject: 'Inquiry about a Tech Meets Problems format',
      emailIntro: 'Hello,\n\nI would like to discuss a possible format with Tech Meets Problems.',
      options: ['Impulse and exchange', 'Innovation event', 'Process improvement event', 'Recruiting and employer branding', 'Tailored format', 'Still open'],
    },
  },
};
