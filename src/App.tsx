import { type FormEvent, type PointerEvent, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUp,
  CalendarDays,
  Check,
  ClipboardCopy,
  Code2,
  ExternalLink,
  Globe2,
  Laptop,
  Lightbulb,
  Mail,
  Menu,
  MapPin,
  MessageCircle,
  Rocket,
  Share2,
  Sparkles,
  Timer,
  Users,
  Workflow,
  X,
} from 'lucide-react';

type Lang = 'en' | 'de';

const ASSETS = {
  logoTransparent: `${import.meta.env.BASE_URL}assets/logo-tech-meets-problems-transparent.png`,
  logoDark: `${import.meta.env.BASE_URL}assets/logo-tech-meets-problems-dark.png`,
  heroMap: `${import.meta.env.BASE_URL}assets/hero-pizza-prototypes-map.png`,
  roomPreview: `${import.meta.env.BASE_URL}assets/event-room-preview.jpg`,
  startpunkt57: `${import.meta.env.BASE_URL}assets/logo-startpunkt57.png`,
  entrepreneurshipCenter: `${import.meta.env.BASE_URL}assets/logo-entrepreneurship-center.png`,
  niklas: `${import.meta.env.BASE_URL}assets/niklas-bruene.jpg`,
  frederik: `${import.meta.env.BASE_URL}assets/frederik-krause.jpg`,
};

const EVENT = {
  date: {
    en: 'Friday, June 26, 2026',
    de: 'Freitag, 26. Juni 2026',
  },
  time: '18:00 to 21:00',
  timeDe: '18:00 bis 21:00',
  location: 'Startpunkt57 / Haus der Innovation, Siegen',
  address: 'Sandstraße 26, 57072 Siegen',
  size: '15 to 30 people',
  whatsappLink: 'https://wa.me/4917655263773',
  contactEmail: 'info@nikvisuals.de',
  mapsLink: 'https://maps.app.goo.gl/KBy84aPDsBduXJWA9',
  startsAt: '2026-06-26T18:00:00+02:00',
};

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdobqwa';

type InterestForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  codingLevel: string;
  eventLanguage: string;
  startupInterest: string;
  interests: string[];
  followUp: string;
  link: string;
  pizza: string;
  source: string;
  sourceOther: string;
  foodNotes: string;
  notes: string;
};

const initialForm: InterestForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
  status: '',
  codingLevel: '',
  eventLanguage: '',
  startupInterest: '',
  interests: [],
  followUp: '',
  link: '',
  pizza: '',
  source: '',
  sourceOther: '',
  foodNotes: '',
  notes: '',
};

const copy = {
  en: {
    nav: ['How it works', 'Problem cards', 'For companies', 'Register'],
    topLink: 'Top of page',
    joinShort: 'Join event',
    brand: 'Tech Meets Problems',
    edition: 'Pizza & Prototypes · First Edition',
    tagline: 'Where builders work on real business needs.',
    eyebrow: 'Builder-first event in Siegen',
    heroTitle: 'Build solutions for real-world problems.',
    heroTitleLines: ['Build solutions for', 'real-world problems.'],
    heroText:
      'A focused evening for developers, makers and technical students to explore real business needs and shape first concepts or prototypes.',
    primaryCta: 'Join the event',
    note: 'No pitch decks. No startup theatre. Just real problems worth working on.',
    countdownLabel: 'Event starts in',
    countdownUnits: ['Days', 'Hours', 'Minutes', 'Seconds'],
    exitTitle: 'Leaving already?',
    exitText: 'This is exactly the kind of evening you will wish you had joined. Save your spot before you forget.',
    exitButton: 'I want in',
    facts: ['Real need', 'Builder team', 'Concept / prototype', 'Group share'],
    problemKicker: 'Why this exists',
    problemTitle: 'Most formats start with business theatre. This one starts with builders.',
    problemLead:
      'Many entrepreneurship formats attract business people first. This pilot flips the perspective: technical people first, real business needs as the starting point, and just enough startup context to make the work useful.',
    whyJoinKicker: 'Why join?',
    whyJoinTitle: 'A compact evening for builders who want more than theory.',
    whyJoin: [
      'Work on real problems instead of theoretical cases',
      'Meet motivated builders and tech enthusiasts',
      'Gain practical problem-solving experience',
      'Explore business model thinking with founder experience',
    ],
    visionKicker: 'Vision',
    visionTitle: 'Innovation happens when different perspectives come together.',
    visionText:
      'We believe innovation happens when different perspectives come together. That’s why we connect students, hobby coders, creative minds, and tech enthusiasts from different disciplines.',
    opportunityKicker: 'What you take away',
    opportunityTitle: 'Not a full hackathon. A focused first step toward something real.',
    opportunityText:
      'At the end, teams briefly share the concept, mockup, workflow or prototype they came up with. With our founder perspective, we can help translate promising ideas into a first Business Model Canvas and discuss what a realistic next step could be. If useful, we can also send that follow-up summary afterwards.',
    opportunityPoints: ['First concept or prototype', 'Short group share', 'Business Model Canvas angle', 'Practical problem-solving experience'],
    problemCards: [
      ['Real problems, not fake startup ideas', 'Work starts from concrete needs from SMEs, crafts businesses, clubs or niche industries.'],
      ['Small teams, not random networking', 'You work in a focused group around one problem space and a realistic sprint window.'],
      ['Concepts, workflows and prototypes before pitches', 'Sketches, mockups, workflows and MVP ideas matter more than polished slides.'],
      ['Tech majority, curated context', 'The room is designed for builders, with enough business context to keep it grounded.'],
    ],
    howKicker: 'How it works',
    howTitle: 'You do not need to bring a startup idea.',
    howLead:
      'We bring problem spaces. You bring curiosity, technical thinking and a willingness to work on something real.',
    steps: [
      'Pick a real problem card',
      'Form a small builder team',
      'Prototype, sketch or automate during the evening',
      'Share the result and discuss possible next steps',
    ],
    examplesKicker: 'Example problem spaces',
    examplesTitle: 'Examples only. Final cases may change.',
    angleLabel: 'Possible angle',
    examples: [
      ['Craft business follow-up chaos', 'Offers are sent, but follow-ups happen manually or not at all.', 'Lightweight CRM or reminder workflow.'],
      ['Club organization via WhatsApp', 'Volunteers, shifts and commitments disappear in group chats.', 'Simple helper planner or form-based workflow.'],
      ['Construction photo documentation', 'Photos are spread across phone galleries, chats and email.', 'Upload flow with project tagging.'],
      ['Maintenance and inspection reminders', 'Recurring appointments are tracked manually.', 'Automated reminder service.'],
    ],
    scheduleKicker: 'Schedule',
    scheduleTitle: 'A compact evening sprint with enough room to meet good people.',
    schedule: [
      ['18:00', 'Arrive, grab pizza, drinks and pick problem cards'],
      ['18:15', 'Short intro and ground rules'],
      ['18:25', 'Team formation'],
      ['18:35', 'Prototype sprint with pizza on the side'],
      ['20:20', 'Demo walk / share results'],
      ['20:45', 'Business opportunity and next steps'],
      ['21:00', 'Open end'],
    ],
    faqKicker: 'FAQ',
    faqTitle: 'Small answers before you sign up.',
    faqs: [
      ['Do I need to bring a startup idea?', 'No. We bring problem cards. You only need curiosity and a willingness to work on something real.'],
      ['Do I need to be an expert programmer?', 'No. You do not need to be an expert. But you should be curious about building, coding, designing or solving technical problems.'],
      ['Is this a pitch event?', 'No. There are no pitch decks. We use a relaxed demo walk.'],
      ['Do I need a laptop?', 'Helpful, but not mandatory. One laptop per team is enough.'],
      ['Is this only for students?', 'No. Students, hobby developers and technical people from the region are welcome.'],
      ['Is this free?', 'Yes. We do not plan to charge participants for this format. Pizza and drinks are included.'],
    ],
    formKicker: 'Event signup',
    formTitle: 'Save your spot for the first session.',
    formSubtitle:
      'Sign up even if you cannot make this date. The first session is limited to around 30 people, so spots are handled first come, first served and we will keep you posted about future events.',
    pilotDetails: 'First pilot details',
    capacityNote: 'Limited to around 30 people',
    laptopNote: 'Laptop recommended. eduroam and guest WiFi are available.',
    included: 'Pizza, non-alcoholic and alcoholic drinks included',
    privacyNote: 'We only use your data to organize this event and send relevant updates. If you arrive through a campaign link, we also store basic source parameters with your signup so we know which channels worked. No spam.',
    privacyKicker: 'Privacy',
    privacyTitle: 'How we handle your data.',
    privacyText:
      'We keep this simple: your signup data is used to organize Pizza & Prototypes, send relevant updates and understand which channels worked. The form is processed through Formspree. No advertising tracking, no resale, no spam.',
    privacyItems: [
      'Registration details are used for event organization only.',
      'Basic UTM/source parameters may be stored when you arrive through a QR code or campaign link.',
      'Questions or deletion requests can go to info@nikvisuals.de.',
    ],
    successTitle: 'You are signed up for the event.',
    successText: 'Thanks. Your registration was sent successfully.',
    nextStepsTitle: 'Nice, you are on the list.',
    nextStepsText: 'Join the WhatsApp group for updates and add the date to your calendar so it does not disappear in the week.',
    addToCalendar: 'Add to calendar',
    googleCalendar: 'Google',
    outlookCalendar: 'Outlook',
    appleCalendar: 'Apple / ICS',
    whatsappAfterSubmit: 'Join WhatsApp group',
    error: 'Please fill in the required fields before joining the event.',
    sendError: 'Sending did not work right now. Please check your connection and try again.',
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      phone: 'Phone number, optional',
      role: 'What describes you best?',
      status: 'Current status, optional',
      coding: 'Can you code?',
      eventLanguage: 'Preferred event language',
      startupInterest: 'Are you interested in startups or founding one yourself?',
      followUp: 'Time for a small follow-up project after the event?',
      link: 'GitHub, LinkedIn, portfolio or personal website, optional',
      pizza: 'Pizza preference',
      source: 'How did you hear about the event? optional',
      sourceOther: 'Where exactly?',
      interests: 'What are you interested in?',
      foodNotes: 'Allergies or food notes, optional',
      notes: 'Anything we should know? Own project idea, question or context?',
      select: 'Select one',
    },
    roles: ['Programmer', 'Computer Science Student', 'Technical Student', 'Maker', 'UI/UX Designer', 'HCI', 'Data Science / AI', 'Engineering', 'Business Informatics Student', 'Business Student', 'Business / Product', 'Other'],
    statusOptions: ['Student at University of Siegen', 'Student at another university', 'Working professional', 'Founder / self-employed', 'Other'],
    codingLevels: ['Yes, confidently', 'Yes, a bit', 'I am learning', 'I can only vibe-code', 'No, but I can design, research or validate'],
    eventLanguageOptions: ['English', 'German', 'No preference'],
    startupInterestOptions: ['Yes, strong interest', 'Maybe someday', 'No, not really'],
    interests: ['Web apps', 'AI tools', 'Automation', 'SaaS', 'Hardware / IoT', 'Design / UX', 'Local business problems', 'Startup ideas', 'Just meeting good people'],
    followUp: ['Yes', 'Maybe', 'Not right now'],
    pizza: ['Yes, normal pizza', 'Vegetarian', 'Vegan', 'No pizza for me'],
    sourceOptions: ['Word of mouth', 'Website', 'Social Media', 'LinkedIn', 'Professor', 'Lecture', 'Flyer', 'Mensa advertising', 'Other'],
    requiredNote: '* Required fields',
    sending: 'Sending...',
    roomKicker: 'Event atmosphere',
    roomTitle: 'This is the kind of room we want to create.',
    roomText:
      'Not classic networking with business cards. More like relaxed tables, open laptops, problem cards, pizza, drinks and people working through real business needs together.',
    roomCaption: 'Visualization of how Pizza & Prototypes could feel in the room.',
    whatsappKicker: 'Builder group',
    whatsappTitle: 'Get updates, problem cards and a place to connect even if you cannot make this date.',
    whatsappCardTitle: 'Join the builder group',
    whatsappButton: 'Join WhatsApp',
    shareKicker: 'Share',
    shareTitle: 'Know someone who likes building? Send this to them.',
    shareText: 'A good room starts with the right people.',
    copyLink: 'Copy page link',
    shareButton: 'Share',
    copied: 'Page link copied.',
    noShare: 'Sharing is not supported in this browser. You can copy the link instead.',
    quickShare: 'Share event',
    languageLabel: 'Language',
    shareNativeText: 'Tech Meets Problems: Pizza & Prototypes is a free builder-first evening in Siegen where developers, makers and technical students work on real business problems. Pizza, non-alcoholic drinks and alcoholic drinks are included. You can sign up here:',
    locationKicker: 'Location',
    locationTitle: 'Taking place at Haus der Innovation in central Siegen.',
    locationText: 'Hosted at Startpunkt57 / Haus der Innovation. Powered by Startpunkt57 and the Entrepreneurship Center.',
    sourceLabel: 'Open in Google Maps',
    organizersKicker: 'About us',
    organizersTitle: 'Built by Niklas Brüne and Frederik Krause.',
    organizersText:
      'We are two master’s students at the University of Siegen studying Entrepreneurship & SME Management. Our mission is to create a platform where tech-minded people can work together on real challenges, learn from each other, and develop innovative ideas. At the same time, we want to bridge the gap between companies with real-world problems and motivated builders who are eager to create impactful solutions.',
    organizers: [
      ['Niklas Brüne', 'Founder', 'Event concept, communication and problem framing'],
      ['Frederik Krause', 'Former founder', 'Outreach, operations and participant experience'],
    ],
    companiesKicker: 'For companies',
    companiesTitle: 'Have a real problem or want to support the format?',
    companiesText:
      'If you are a company, SME, craft business, club, institution, innovation team or potential sponsor, reach out. We are looking for real use cases, open innovation topics and supporters who want technical students and builders to explore useful challenges.',
    companiesButton: 'Contact us',
    companiesVisual: ['Use case', 'Builders', 'Output', 'Real need', 'Useful challenge'],
    poweredBy: 'Supported by',
    supporters: ['Startpunkt57', 'Entrepreneurship Center Siegen'],
    footerSub: 'Where builders work on real business needs.',
    footerLine: 'Tech Meets Problems: Pizza & Prototypes',
    imprint: 'Imprint',
  },
  de: {
    nav: ['Ablauf', 'Problemkarten', 'Für Unternehmen', 'Anmelden'],
    topLink: 'Nach oben',
    joinShort: 'Event',
    brand: 'Tech Meets Problems',
    edition: 'Pizza & Prototypes · Erste Ausgabe',
    tagline: 'Where builders work on real business needs.',
    eyebrow: 'Builder-first Event in Siegen',
    heroTitle: 'Entwickle Lösungen für echte Probleme.',
    heroTitleLines: ['Entwickle Lösungen', 'für echte Probleme.'],
    heroText:
      'Ein fokussierter Abend für Entwickler, Maker und technische Studierende, um echte Business-Probleme in erste Konzepte oder Prototypen zu übersetzen.',
    primaryCta: 'Zum Event anmelden',
    note: 'Keine Pitchdecks. Kein Startup-Theater. Nur echte Probleme, gute Leute und erste Lösungen.',
    countdownLabel: 'Event startet in',
    countdownUnits: ['Tage', 'Stunden', 'Minuten', 'Sekunden'],
    exitTitle: 'Schon weg?',
    exitText: 'Das ist genau der Abend, über den man sich später ärgert, wenn man nicht dabei war. Sichere dir lieber kurz deinen Platz.',
    exitButton: 'Bin dabei',
    facts: ['Echtes Problem', 'Builder-Team', 'Konzept / Prototyp', 'Kurz vorstellen'],
    problemKicker: 'Warum das Format',
    problemTitle: 'Viele Formate starten mit Business-Theater. Dieses startet mit Buildern.',
    problemLead:
      'Viele Entrepreneurship-Formate ziehen Business-Leute zuerst an. Dieser Pilot dreht die Perspektive: technische Leute zuerst, echte Business-Probleme als Startpunkt und nur so viel Startup-Kontext, dass die Arbeit nützlich wird.',
    whyJoinKicker: 'Warum mitmachen?',
    whyJoinTitle: 'Ein kompakter Abend für Builder, die mehr wollen als Theorie.',
    whyJoin: [
      'Arbeite an echten Problemen statt an theoretischen Cases',
      'Triff motivierte Builder und Tech-Enthusiasten',
      'Sammle praktische Erfahrung im Problemlösen',
      'Denke Geschäftsmodelle mit Gründungserfahrung durch',
    ],
    visionKicker: 'Vision',
    visionTitle: 'Innovation entsteht, wenn unterschiedliche Perspektiven zusammenkommen.',
    visionText:
      'Wir glauben, dass Innovation entsteht, wenn unterschiedliche Perspektiven zusammenkommen. Deshalb vernetzen wir Studierende, Hobby-Coder, kreative Köpfe und Tech-Enthusiasten aus verschiedenen Disziplinen.',
    opportunityKicker: 'Was du mitnimmst',
    opportunityTitle: 'Kein kompletter Hackathon. Ein fokussierter erster Schritt in Richtung echte Opportunity.',
    opportunityText:
      'Am Ende stellen die Teams kurz ihr Konzept, Mockup, ihren Workflow oder Prototyp vor. Mit unserer Gründungsperspektive helfen wir dabei, vielversprechende Ideen in ein erstes Business Model Canvas zu übersetzen und realistische nächste Schritte zu besprechen. Wenn es sinnvoll ist, können wir eine kurze Zusammenfassung danach zusenden.',
    opportunityPoints: ['Erstes Konzept oder Prototyp', 'Kurze Vorstellung in der Gruppe', 'Business-Model-Canvas-Perspektive', 'Praktische Problemlösung'],
    problemCards: [
      ['Echte Probleme, keine Fake-Startup-Ideen', 'Der Abend startet mit konkreten Bedürfnissen von KMU, Handwerk, Vereinen oder Nischenbranchen.'],
      ['Kleine Teams, kein Zufallsnetworking', 'Du arbeitest in einer fokussierten Gruppe an einem Problemraum und einem realistischen Sprintfenster.'],
      ['Konzepte, Workflows und Prototypen vor Pitches', 'Skizzen, Mockups, Workflows und MVP-Ideen zählen mehr als perfekte Slides.'],
      ['Tech-Mehrheit, kuratierter Kontext', 'Der Raum ist für Builder gedacht, mit genug Business-Kontext, damit es geerdet bleibt.'],
    ],
    howKicker: 'So läuft es',
    howTitle: 'Du musst keine eigene Startup-Idee mitbringen.',
    howLead:
      'Wir bringen Problemräume mit. Du bringst Neugier, technisches Denken und Lust mit, an etwas Echtem zu arbeiten.',
    steps: [
      'Echte Problemkarte wählen',
      'Kleines Builder-Team bilden',
      'Über den Abend prototypen, skizzieren oder automatisieren',
      'Ergebnis vorstellen und mögliche nächste Schritte besprechen',
    ],
    examplesKicker: 'Beispiel-Problemräume',
    examplesTitle: 'Nur Beispiele. Die finalen Fälle können sich ändern.',
    angleLabel: 'Möglicher Ansatz',
    examples: [
      ['Follow-up-Chaos im Handwerk', 'Angebote werden verschickt, aber Follow-ups passieren manuell oder gar nicht.', 'Leichtes CRM oder Reminder-Workflow.'],
      ['Vereinsorganisation per WhatsApp', 'Freiwillige, Schichten und Zusagen verschwinden in Gruppenchats.', 'Einfacher Helferplaner oder formularbasierter Workflow.'],
      ['Fotodokumentation auf Baustellen', 'Fotos liegen verteilt in Handygalerien, Chats und E-Mails.', 'Upload-Flow mit Projekt-Tags.'],
      ['Wartungs- und Prüferinnerungen', 'Wiederkehrende Termine werden manuell nachgehalten.', 'Automatisierter Reminder-Service.'],
    ],
    scheduleKicker: 'Ablauf',
    scheduleTitle: 'Ein kompakter Abend mit genug Raum für gute Gespräche.',
    schedule: [
      ['18:00', 'Ankommen, Pizza, Getränke und Problemkarten'],
      ['18:15', 'Kurze Einführung und Spielregeln'],
      ['18:25', 'Teambildung'],
      ['18:35', 'Prototype-Sprint mit Pizza nebenbei'],
      ['20:20', 'Demo Walk / Ergebnisse teilen'],
      ['20:45', 'Business Opportunity und nächste Schritte'],
      ['21:00', 'Open End'],
    ],
    faqKicker: 'FAQ',
    faqTitle: 'Kurze Antworten vor der Anmeldung.',
    faqs: [
      ['Muss ich eine Startup-Idee mitbringen?', 'Nein. Wir bringen Problemkarten mit. Du brauchst nur Neugier und Lust, an etwas Echtem zu arbeiten.'],
      ['Muss ich ein Programmierprofi sein?', 'Nein. Du musst kein Experte sein. Aber du solltest Lust auf Bauen, Coden, Designen oder technische Problemlösung haben.'],
      ['Ist das ein Pitch-Event?', 'Nein. Es gibt keine Pitchdecks. Wir nutzen einen entspannten Demo Walk.'],
      ['Brauche ich einen Laptop?', 'Hilfreich, aber nicht Pflicht. Ein Laptop pro Team reicht.'],
      ['Ist das nur für Studierende?', 'Nein. Studierende, Hobby-Entwickler und technische Menschen aus der Region sind willkommen.'],
      ['Ist das kostenlos?', 'Ja. Wir planen nicht, von Teilnehmenden Geld für dieses Format zu nehmen. Pizza und Getränke sind inklusive.'],
    ],
    formKicker: 'Event-Anmeldung',
    formTitle: 'Sichere dir einen Platz für die erste Session.',
    formSubtitle:
      'Trag dich auch ein, wenn du an diesem Termin nicht kannst. Die erste Session ist auf etwa 30 Personen begrenzt, deshalb gilt first come, first served und wir informieren dich auch über kommende Events.',
    pilotDetails: 'Details zum ersten Pilot',
    capacityNote: 'Auf etwa 30 Personen begrenzt',
    laptopNote: 'Laptop empfohlen. eduroam und Gast-WLAN sind verfügbar.',
    included: 'Pizza, alkoholfreie und alkoholische Getränke inklusive',
    privacyNote: 'Wir nutzen deine Daten nur, um dieses Event zu organisieren und relevante Updates zu senden. Wenn du über einen Kampagnenlink kommst, speichern wir auch einfache Herkunftsparameter mit deiner Anmeldung, damit wir sehen, welche Kanäle funktionieren. Kein Spam.',
    privacyKicker: 'Datenschutz',
    privacyTitle: 'So gehen wir mit deinen Daten um.',
    privacyText:
      'Wir halten es einfach: Deine Anmeldedaten nutzen wir nur, um Pizza & Prototypes zu organisieren, relevante Updates zu senden und zu verstehen, welche Kanäle funktioniert haben. Das Formular läuft über Formspree. Kein Werbe-Tracking, kein Weiterverkauf, kein Spam.',
    privacyItems: [
      'Anmeldedaten werden nur für die Organisation des Events genutzt.',
      'Einfache UTM- oder Herkunftsparameter können gespeichert werden, wenn du über QR-Codes oder Kampagnenlinks kommst.',
      'Fragen oder Löschanfragen kannst du an info@nikvisuals.de schicken.',
    ],
    successTitle: 'Du bist für das Event angemeldet.',
    successText: 'Danke. Deine Anmeldung wurde erfolgreich gesendet.',
    nextStepsTitle: 'Nice, du stehst auf der Liste.',
    nextStepsText: 'Tritt gern der WhatsApp-Gruppe bei und speichere dir den Termin direkt im Kalender, damit er nicht in der Woche untergeht.',
    addToCalendar: 'Zum Kalender hinzufügen',
    googleCalendar: 'Google',
    outlookCalendar: 'Outlook',
    appleCalendar: 'Apple / ICS',
    whatsappAfterSubmit: 'WhatsApp-Gruppe beitreten',
    error: 'Bitte fülle die Pflichtfelder aus, bevor du dich fürs Event anmeldest.',
    sendError: 'Das Senden hat gerade nicht geklappt. Bitte prüfe deine Verbindung und versuche es erneut.',
    fields: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer, optional',
      role: 'Was beschreibt dich am besten?',
      status: 'Aktueller Status, optional',
      coding: 'Kannst du coden?',
      eventLanguage: 'Bevorzugte Event-Sprache',
      startupInterest: 'Interessierst du dich für Startups oder dafür, selbst mal zu gründen?',
      followUp: 'Zeit für ein kleines Folgeprojekt nach dem Event?',
      link: 'GitHub, LinkedIn, Portfolio oder Website, optional',
      pizza: 'Pizza-Präferenz',
      source: 'Woher hast du vom Event erfahren? optional',
      sourceOther: 'Woher genau?',
      interests: 'Was interessiert dich?',
      foodNotes: 'Allergien oder Essenshinweise, optional',
      notes: 'Sonst noch etwas? Eigene Projektidee, Frage oder Kontext?',
      select: 'Auswählen',
    },
    roles: ['Programmierer', 'Informatikstudent', 'Technischer Student', 'Maker', 'UI/UX Designer', 'HCI', 'Data Science / AI', 'Engineering', 'Wirtschaftsinformatiker', 'BWLer', 'Business / Product', 'Andere'],
    statusOptions: ['Student an der Uni Siegen', 'Student an einer anderen Uni', 'Berufstätig', 'Gründer / selbstständig', 'Andere'],
    codingLevels: ['Ja, sicher', 'Ja, ein bisschen', 'Ich lerne gerade', 'Ich kann nur vibe-coden', 'Nein, aber ich kann designen, recherchieren oder validieren'],
    eventLanguageOptions: ['Deutsch', 'Englisch', 'Egal'],
    startupInterestOptions: ['Ja, großes Interesse', 'Vielleicht irgendwann', 'Nein, eher nicht'],
    interests: ['Web Apps', 'AI Tools', 'Automatisierung', 'SaaS', 'Hardware / IoT', 'Design / UX', 'Lokale Business-Probleme', 'Startup-Ideen', 'Einfach gute Leute treffen'],
    followUp: ['Ja', 'Vielleicht', 'Gerade nicht'],
    pizza: ['Ja, normale Pizza', 'Vegetarisch', 'Vegan', 'Keine Pizza für mich'],
    sourceOptions: ['Mund-zu-Mund-Propaganda', 'Website', 'Social Media', 'LinkedIn', 'Professor', 'Vorlesung', 'Flyer', 'Werbung in der Mensa', 'Sonstiges'],
    requiredNote: '* Pflichtfelder',
    sending: 'Wird gesendet...',
    roomKicker: 'Event-Atmosphäre',
    roomTitle: 'So soll sich der Raum anfühlen.',
    roomText:
      'Kein klassisches Networking mit Visitenkarten. Eher entspannte Tische, offene Laptops, Problemkarten, Pizza, Getränke und Menschen, die gemeinsam an echten Business-Problemen arbeiten.',
    roomCaption: 'Visualisierung, wie Pizza & Prototypes im Raum wirken könnte.',
    whatsappKicker: 'Builder-Gruppe',
    whatsappTitle: 'Updates, Problemkarten und ein Ort zum Connecten, auch wenn du an diesem Termin nicht kannst.',
    whatsappCardTitle: 'Tritt der Builder-Gruppe bei',
    whatsappButton: 'WhatsApp beitreten',
    shareKicker: 'Teilen',
    shareTitle: 'Kennst du jemanden, der gerne baut? Schick es weiter.',
    shareText: 'Ein guter Raum startet mit den richtigen Leuten.',
    copyLink: 'Link kopieren',
    shareButton: 'Teilen',
    copied: 'Link kopiert.',
    noShare: 'Teilen wird in diesem Browser nicht unterstützt. Du kannst stattdessen den Link kopieren.',
    quickShare: 'Event teilen',
    languageLabel: 'Sprache',
    shareNativeText: 'Tech Meets Problems: Pizza & Prototypes ist ein kostenloser builder-first Abend in Siegen, bei dem Entwickler, Maker und technische Studierende an echten Business-Problemen arbeiten. Pizza, alkoholfreie und alkoholische Getränke sind inklusive. Hier kann man sich anmelden:',
    locationKicker: 'Ort',
    locationTitle: 'Das Event findet im Haus der Innovation in der Siegener Innenstadt statt.',
    locationText: 'Das Event findet im Startpunkt57 / Haus der Innovation statt. Unterstützt von Startpunkt57 und Entrepreneurship Center.',
    sourceLabel: 'In Google Maps öffnen',
    organizersKicker: 'Über uns',
    organizersTitle: 'Gebaut von Niklas Brüne und Frederik Krause.',
    organizersText:
      'Wir sind zwei Masterstudenten an der Universität Siegen im Studiengang Entrepreneurship & SME Management. Unsere Mission ist es, eine Plattform zu schaffen, auf der technikaffine Menschen gemeinsam an echten Herausforderungen arbeiten, voneinander lernen und innovative Ideen entwickeln können. Gleichzeitig wollen wir die Lücke zwischen Unternehmen mit realen Problemen und motivierten Buildern schließen, die Lust haben, wirkungsvolle Lösungen zu entwickeln.',
    organizers: [
      ['Niklas Brüne', 'Gründer', 'Eventkonzept, Kommunikation und Problem-Framing'],
      ['Frederik Krause', 'Ehemaliger Gründer', 'Outreach, Operations und Teilnehmererlebnis'],
    ],
    companiesKicker: 'Für Unternehmen',
    companiesTitle: 'Habt ihr ein echtes Problem oder wollt das Format unterstützen?',
    companiesText:
      'Wenn ihr ein Unternehmen, KMU, Handwerksbetrieb, Verein, eine Institution, ein Innovationsteam oder potenzieller Sponsor seid, meldet euch gerne. Wir suchen reale Use Cases, Open-Innovation-Themen und Unterstützer, die technische Studierende und Builder an sinnvollen Herausforderungen arbeiten lassen wollen.',
    companiesButton: 'Kontakt aufnehmen',
    companiesVisual: ['Use Case', 'Builder', 'Output', 'Echter Bedarf', 'Sinnvolle Challenge'],
    poweredBy: 'Unterstützt von',
    supporters: ['Startpunkt57', 'Entrepreneurship Center Siegen'],
    footerSub: 'Where builders work on real business needs.',
    footerLine: 'Tech Meets Problems: Pizza & Prototypes',
    imprint: 'Impressum',
  },
};

const cardIcons = [Lightbulb, Users, Rocket, Code2];
const founderImages = [ASSETS.niklas, ASSETS.frederik];
const founderLinks = ['https://www.linkedin.com/in/niklas-bruene/', 'https://www.linkedin.com/in/frederik-krause-a80448277/'];
const supporterLogos = [
  { name: 'Startpunkt57', src: ASSETS.startpunkt57, href: 'https://www.startpunkt57.de/' },
  { name: 'Entrepreneurship Center Siegen', src: ASSETS.entrepreneurshipCenter, href: 'https://www.ec.uni-siegen.de/' },
];

function App() {
  const [lang, setLang] = useState<Lang>('en');
  const t = copy[lang];
  const [form, setForm] = useState<InterestForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitNudge, setShowExitNudge] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const pointerFrame = useRef<number | null>(null);
  const pointerPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const armedAt = Date.now() + 12_000;
    if (!hasFinePointer || sessionStorage.getItem('tmp-exit-nudge-seen') === 'true') {
      return;
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (Date.now() >= armedAt && event.clientY <= 0 && event.relatedTarget === null) {
        sessionStorage.setItem('tmp-exit-nudge-seen', 'true');
        setShowExitNudge(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') {
      pointerPosition.current = { x: event.clientX, y: event.clientY };
      if (pointerFrame.current === null) {
        pointerFrame.current = window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--cursor-x', `${pointerPosition.current.x}px`);
          document.documentElement.style.setProperty('--cursor-y', `${pointerPosition.current.y}px`);
          pointerFrame.current = null;
        });
      }
    }
  };

  const updateField = (field: keyof InterestForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFormError('');
  };

  const toggleInterest = (interest: string) => {
    setForm((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.role || !form.codingLevel || !form.eventLanguage || !form.startupInterest || !form.followUp || !form.pizza) {
      setFormError(t.error);
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    const urlParams = new URLSearchParams(window.location.search);
    const tracking = {
      utmSource: urlParams.get('utm_source') || '',
      utmMedium: urlParams.get('utm_medium') || '',
      utmCampaign: urlParams.get('utm_campaign') || '',
      utmContent: urlParams.get('utm_content') || '',
      utmTerm: urlParams.get('utm_term') || '',
      referrer: document.referrer,
      landingPage: window.location.href,
    };
    const trackingSummary = [
      tracking.utmSource && `source:${tracking.utmSource}`,
      tracking.utmMedium && `medium:${tracking.utmMedium}`,
      tracking.utmCampaign && `campaign:${tracking.utmCampaign}`,
      tracking.utmContent && `content:${tracking.utmContent}`,
      tracking.utmTerm && `term:${tracking.utmTerm}`,
    ].filter(Boolean).join(' | ');

    const submission = { ...form, language: lang, submittedAt: new Date().toISOString(), trackingSummary, ...tracking };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submission,
          _subject: `New signup: ${submission.firstName} ${submission.lastName} - Pizza & Prototypes`,
          _replyto: submission.email,
          fullName: `${submission.firstName} ${submission.lastName}`.trim(),
          interests: submission.interests.join(', '),
          event: 'Tech Meets Problems: Pizza & Prototypes',
        }),
      });

      if (!response.ok) {
        throw new Error('Formspree request failed');
      }

      setSubmitted(true);
      setShowSignupModal(true);
      setForm(initialForm);
    } catch {
      setFormError(t.sendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShareMessage(t.copied);
  };

  const nativeShare = async () => {
    if (!navigator.share) {
      setShareMessage(t.noShare);
      return;
    }

    await navigator.share({
      title: 'Tech Meets Problems: Pizza & Prototypes',
      text: t.shareNativeText,
      url: window.location.href,
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#07080d] text-slate-100" onPointerMove={handlePointerMove}>
      <BackgroundScene />
      <Header lang={lang} setLang={setLang} t={t} />
      <MobileQuickNav t={t} lang={lang} setLang={setLang} nativeShare={nativeShare} />
      <ExitNudge t={t} show={showExitNudge} onClose={() => setShowExitNudge(false)} />
      <SignupSuccessModal t={t} show={showSignupModal} onClose={() => setShowSignupModal(false)} />
      <Hero t={t} lang={lang} />
      <ProblemSection t={t} />
      <RoomPreviewSection t={t} />
      <WhyJoinSection t={t} />
      <VisionSection t={t} />
      <OrganizersSection t={t} />
      <OpportunitySection t={t} />
      <HowItWorks t={t} />
      <ExampleProblems t={t} />
      <Schedule t={t} />
      <Registration
        t={t}
        lang={lang}
        form={form}
        submitted={submitted}
        formError={formError}
        isSubmitting={isSubmitting}
        updateField={updateField}
        toggleInterest={toggleInterest}
        handleSubmit={handleSubmit}
      />
      <WhatsAppSection t={t} />
      <ShareSection t={t} copyLink={copyLink} nativeShare={nativeShare} shareMessage={shareMessage} />
      <LocationSection t={t} lang={lang} />
      <CompaniesSection t={t} />
      <PrivacySection t={t} />
      <FAQ t={t} />
      <Footer t={t} />
    </main>
  );
}

function Header({ lang, setLang, t }: { lang: Lang; setLang: (lang: Lang) => void; t: typeof copy.en }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07080d]/75 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <img src={ASSETS.logoDark} alt="Tech Meets Problems" className="brand-logo brand-logo-header" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="brand-title-full truncate text-sm font-semibold text-white sm:text-base">{t.brand}</span>
            <span className="brand-title-mobile text-sm font-semibold text-white">{t.brand}</span>
            <span className="hidden text-[0.68rem] font-medium text-cyan-200/80 sm:block">{t.edition}</span>
          </span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
          <a href="#how" className="hover:text-white">{t.nav[0]}</a>
          <a href="#cards" className="hover:text-white">{t.nav[1]}</a>
          <a href="#register" className="hover:text-white">{t.nav[3]}</a>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a href="#companies" className="company-nav-link hidden xl:inline-flex">{t.nav[2]}</a>
          <LanguageToggle lang={lang} setLang={setLang} />
          <a href="#register" className="btn btn-compact">
            {t.joinShort}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}

function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <div className="language-toggle" aria-label="Language switcher">
      <Globe2 className="h-4 w-4 text-cyan-200" aria-hidden="true" />
      <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
        EN
      </button>
      <button type="button" className={lang === 'de' ? 'active' : ''} onClick={() => setLang('de')}>
        DE
      </button>
    </div>
  );
}

function MobileQuickNav({ t, lang, setLang, nativeShare }: { t: typeof copy.en; lang: Lang; setLang: (lang: Lang) => void; nativeShare: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener('scroll', closeMenu, { passive: true });

    return () => window.removeEventListener('scroll', closeMenu);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="mobile-quick-nav" aria-label="Quick navigation">
      <a href="#top" aria-label="Back to top">
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </a>
      <details className="quick-menu" open={isMenuOpen} onToggle={(event) => setIsMenuOpen(event.currentTarget.open)}>
        <summary aria-label={isMenuOpen ? 'Close page navigation' : 'Open page navigation'}>
          {isMenuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
        </summary>
        <div>
          <div className="quick-language-block" aria-label={t.languageLabel}>
            <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => { setLang('en'); closeMenu(); }}>
              <span aria-hidden="true">🇬🇧</span>
              EN
            </button>
            <button type="button" className={lang === 'de' ? 'active' : ''} onClick={() => { setLang('de'); closeMenu(); }}>
              <span aria-hidden="true">🇩🇪</span>
              DE
            </button>
          </div>
          <a href="#top" onClick={closeMenu}>{t.topLink}</a>
          <a href="#how" onClick={closeMenu}>{t.nav[0]}</a>
          <a href="#cards" onClick={closeMenu}>{t.nav[1]}</a>
          <a href="#companies" onClick={closeMenu}>{t.nav[2]}</a>
          <a href="#register" onClick={closeMenu}>{t.nav[3]}</a>
          <a href="#privacy" onClick={closeMenu}>{t.privacyKicker}</a>
          <button type="button" className="quick-share-button" onClick={() => { nativeShare(); closeMenu(); }}>
            <Share2 className="h-4 w-4" aria-hidden="true" />
            {t.quickShare}
          </button>
        </div>
      </details>
      <a href="#register">{t.joinShort}</a>
    </nav>
  );
}

function ExitNudge({ t, show, onClose }: { t: typeof copy.en; show: boolean; onClose: () => void }) {
  if (!show) {
    return null;
  }

  return (
    <aside className="exit-nudge" role="dialog" aria-label={t.exitTitle}>
      <button type="button" onClick={onClose} aria-label="Close">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <Rocket className="h-5 w-5 text-cyan-300" aria-hidden="true" />
      <div>
        <strong>{t.exitTitle}</strong>
        <p>{t.exitText}</p>
        <a href="#register" onClick={onClose}>{t.exitButton}</a>
      </div>
    </aside>
  );
}

function SignupSuccessModal({ t, show, onClose }: { t: typeof copy.en; show: boolean; onClose: () => void }) {
  if (!show) {
    return null;
  }

  return (
    <div className="signup-modal-backdrop" role="presentation">
      <section className="signup-modal" role="dialog" aria-modal="true" aria-label={t.successTitle}>
        <button type="button" className="signup-modal-close" onClick={onClose} aria-label="Close">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="signup-modal-icon">
          <Check className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2>{t.successTitle}</h2>
        <p>{t.successText}</p>
        <SuccessActions t={t} />
      </section>
    </div>
  );
}

function Hero({ t, lang }: { t: typeof copy.en; lang: Lang }) {
  return (
    <section id="top" className="relative mx-auto grid max-w-7xl items-start gap-10 px-4 pb-12 pt-20 sm:px-5 sm:pb-14 sm:pt-24 lg:grid-cols-[1.08fr_0.92fr] lg:pt-16">
      <div className="min-w-0 max-w-3xl">
        <div className="eyebrow mb-5">
          <Sparkles className="h-4 w-4 text-cyan-300" aria-hidden="true" />
          {t.eyebrow}
        </div>
        <h1 className="hero-title max-w-5xl text-[clamp(2.7rem,12vw,4.15rem)] font-semibold leading-[0.98] tracking-tight text-white lg:text-[4.25rem]">
          <span>{t.heroTitleLines[0]}</span>
          <span className="hero-title-line-compact">{t.heroTitleLines[1]}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-xl">{t.heroText}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a href="#register" className="btn btn-primary">
            {t.primaryCta}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
        <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
          <HeroFact icon={CalendarDays} label={EVENT.date[lang]} />
          <HeroFact icon={Timer} label={lang === 'de' ? EVENT.timeDe : EVENT.time} />
          <HeroFact icon={MapPin} label={EVENT.location} href={EVENT.mapsLink} />
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-400">{t.note}</p>
      </div>
      <HeroVisual t={t} />
    </section>
  );
}

function Countdown({ t, compact = false }: { t: typeof copy.en; compact?: boolean }) {
  const [remaining, setRemaining] = useState(() => getTimeRemaining());

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getTimeRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={compact ? 'countdown-strip countdown-strip-hero-visual' : 'countdown-strip'} aria-label={t.countdownLabel}>
      <span>{t.countdownLabel}</span>
      <div>
        {[remaining.days, remaining.hours, remaining.minutes, remaining.seconds].map((value, index) => (
          <strong key={t.countdownUnits[index]}>
            {String(value).padStart(2, '0')}
            <small>{t.countdownUnits[index]}</small>
          </strong>
        ))}
      </div>
    </div>
  );
}

function getTimeRemaining() {
  const target = new Date(EVENT.startsAt).getTime();
  const diff = Math.max(0, target - Date.now());

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

function HeroVisual({ t }: { t: typeof copy.en }) {
  return (
    <div className="relative min-w-0">
      <div className="event-map-card hero-visual-card">
        <img src={ASSETS.heroMap} alt={`${t.edition.split(' · ')[0]} event flow`} className="hero-visual-image" decoding="async" fetchPriority="high" />
      </div>
      <HeroSupporters t={t} />
      <Countdown t={t} compact />
    </div>
  );
}

function HeroSupporters({ t }: { t: typeof copy.en }) {
  return (
    <div className="hero-supporters" aria-label={t.poweredBy}>
      <span>{t.poweredBy}</span>
      {supporterLogos.map((supporter) => (
        <a key={supporter.name} href={supporter.href} target="_blank" rel="noreferrer" aria-label={supporter.name}>
          <img src={supporter.src} alt={supporter.name} loading="lazy" decoding="async" />
        </a>
      ))}
    </div>
  );
}

function OpportunitySection({ t }: { t: typeof copy.en }) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-5">
      <div className="opportunity-layout">
        <div>
          <p className="eyebrow mb-5">
            <Sparkles className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            {t.opportunityKicker}
          </p>
          <h2>{t.opportunityTitle}</h2>
          <p>{t.opportunityText}</p>
        </div>
        <div className="opportunity-list">
          {t.opportunityPoints.map((point) => (
            <div key={point}>
              <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection({ t }: { t: typeof copy.en }) {
  return (
    <Section id="problem" kicker={t.problemKicker} title={t.problemTitle}>
      <p className="section-lead">{t.problemLead}</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {t.problemCards.map(([title, text], index) => (
          <FeatureCard key={title} title={title} text={text} icon={cardIcons[index]} />
        ))}
      </div>
    </Section>
  );
}

function WhyJoinSection({ t }: { t: typeof copy.en }) {
  return (
    <Section id="why-join" kicker={t.whyJoinKicker} title={t.whyJoinTitle}>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {t.whyJoin.map((item) => (
          <div key={item} className="why-chip">
            <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function VisionSection({ t }: { t: typeof copy.en }) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-5">
      <div className="vision-band">
        <p className="eyebrow mb-5">
          <Sparkles className="h-4 w-4 text-cyan-300" aria-hidden="true" />
          {t.visionKicker}
        </p>
        <h2>{t.visionTitle}</h2>
        <p>{t.visionText}</p>
      </div>
    </section>
  );
}

function RoomPreviewSection({ t }: { t: typeof copy.en }) {
  return (
    <Section id="room-preview" kicker={t.roomKicker} title={t.roomTitle}>
      <div className="room-preview-card mt-10">
        <div className="room-preview-copy">
          <p>{t.roomText}</p>
          <span>{t.roomCaption}</span>
        </div>
        <figure className="room-preview-media">
          <img src={ASSETS.roomPreview} alt={t.roomCaption} loading="lazy" decoding="async" />
        </figure>
      </div>
    </Section>
  );
}

function HowItWorks({ t }: { t: typeof copy.en }) {
  return (
    <Section id="how" kicker={t.howKicker} title={t.howTitle}>
      <p className="section-lead">{t.howLead}</p>
      <div className="mt-10 grid gap-4 lg:grid-cols-4">
        {t.steps.map((step, index) => (
          <div key={step} className="glass-card group relative p-5 sm:p-6">
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-950">
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className="text-lg font-semibold leading-7 text-white sm:text-xl">{step}</h3>
            {index < t.steps.length - 1 && <div className="flow-line" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </Section>
  );
}

function ExampleProblems({ t }: { t: typeof copy.en }) {
  return (
    <Section id="cards" kicker={t.examplesKicker} title={t.examplesTitle}>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {t.examples.map(([title, description, angle]) => (
          <article key={title} className="problem-card">
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">
                Example
              </span>
              <Workflow className="h-5 w-5 text-orange-300" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-white sm:text-2xl">{title}</h3>
            <p className="mt-4 leading-7 text-slate-300">{description}</p>
            <div className="mt-6 rounded-lg border border-emerald-300/15 bg-emerald-300/8 p-4">
              <p className="text-sm font-medium text-emerald-200">{t.angleLabel}</p>
              <p className="mt-1 text-slate-300">{angle}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}


function Schedule({ t }: { t: typeof copy.en }) {
  return (
    <Section id="schedule" kicker={t.scheduleKicker} title={t.scheduleTitle}>
      <div className="timeline mt-10">
        {t.schedule.map(([time, item]) => (
          <div key={time} className="timeline-row">
            <time>{time}</time>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FAQ({ t }: { t: typeof copy.en }) {
  return (
    <Section id="faq" kicker={t.faqKicker} title={t.faqTitle}>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {t.faqs.map(([question, answer]) => (
          <details key={question} className="faq-card">
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

type RegistrationProps = {
  t: typeof copy.en;
  lang: Lang;
  form: InterestForm;
  submitted: boolean;
  formError: string;
  isSubmitting: boolean;
  updateField: (field: keyof InterestForm, value: string) => void;
  toggleInterest: (interest: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function Registration({ t, lang, form, submitted, formError, isSubmitting, updateField, toggleInterest, handleSubmit }: RegistrationProps) {
  return (
    <Section id="register" kicker={t.formKicker} title={t.formTitle}>
      <p className="section-lead">{t.formSubtitle}</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="glass-card p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-white">{t.pilotDetails}</h3>
          <div className="mt-7 space-y-4">
            <InfoRow icon={CalendarDays} label={EVENT.date[lang]} />
            <InfoRow icon={Timer} label={lang === 'de' ? EVENT.timeDe : EVENT.time} />
            <InfoRow icon={MapPin} label={`${EVENT.location} · ${EVENT.address}`} href={EVENT.mapsLink} />
            <InfoRow icon={Check} label={t.included} />
          </div>
          <div className="event-alerts mt-6">
            <div className="event-alert event-alert-strong">
              <Users className="h-5 w-5" aria-hidden="true" />
              <span>{t.capacityNote}</span>
            </div>
            <div className="event-alert">
              <Laptop className="h-5 w-5" aria-hidden="true" />
              <span>{t.laptopNote}</span>
            </div>
          </div>
          <div className="mt-8 rounded-xl border border-cyan-300/20 bg-cyan-300/8 p-5">
            <p className="font-medium text-cyan-100">{lang === 'de' ? 'Datennutzung' : 'Data use'}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{t.privacyNote}</p>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          {submitted && (
            <div className="mb-6 rounded-xl border border-emerald-300/25 bg-emerald-300/10 p-5 text-emerald-100">
              <div className="flex items-center gap-3 font-semibold">
                <Check className="h-5 w-5" aria-hidden="true" />
                {t.successTitle}
              </div>
              <p className="mt-2 text-sm text-emerald-100/80">{t.successText}</p>
              <SuccessActions t={t} />
            </div>
          )}
          {formError && <p className="mb-5 rounded-lg border border-rose-300/25 bg-rose-300/10 p-4 text-sm text-rose-100">{formError}</p>}

          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label={t.fields.firstName} required value={form.firstName} onChange={(value) => updateField('firstName', value)} />
            <TextInput label={t.fields.lastName} required value={form.lastName} onChange={(value) => updateField('lastName', value)} />
            <TextInput label={t.fields.email} required type="email" value={form.email} onChange={(value) => updateField('email', value)} />
            <TextInput label={t.fields.phone} value={form.phone} onChange={(value) => updateField('phone', value)} />
            <SelectInput label={t.fields.role} required value={form.role} options={t.roles} placeholder={t.fields.select} onChange={(value) => updateField('role', value)} />
            <SelectInput label={t.fields.status} value={form.status} options={t.statusOptions} placeholder={t.fields.select} onChange={(value) => updateField('status', value)} />
            <SelectInput label={t.fields.coding} required value={form.codingLevel} options={t.codingLevels} placeholder={t.fields.select} onChange={(value) => updateField('codingLevel', value)} />
            <SelectInput label={t.fields.eventLanguage} required value={form.eventLanguage} options={t.eventLanguageOptions} placeholder={t.fields.select} onChange={(value) => updateField('eventLanguage', value)} />
            <SelectInput label={t.fields.startupInterest} required value={form.startupInterest} options={t.startupInterestOptions} placeholder={t.fields.select} onChange={(value) => updateField('startupInterest', value)} />
            <SelectInput label={t.fields.followUp} required value={form.followUp} options={t.followUp} placeholder={t.fields.select} onChange={(value) => updateField('followUp', value)} />
            <TextInput label={t.fields.link} value={form.link} onChange={(value) => updateField('link', value)} />
            <SelectInput label={t.fields.pizza} required value={form.pizza} options={t.pizza} placeholder={t.fields.select} onChange={(value) => updateField('pizza', value)} />
          </div>

          <fieldset className="mt-6">
            <legend className="mb-3 text-sm font-medium text-slate-200">{t.fields.interests}</legend>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {t.interests.map((interest) => (
                <label key={interest} className="checkbox-card">
                  <input type="checkbox" checked={form.interests.includes(interest)} onChange={() => toggleInterest(interest)} />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <SelectInput label={t.fields.source} value={form.source} options={t.sourceOptions} placeholder={t.fields.select} onChange={(value) => updateField('source', value)} />
            {(form.source === 'Other' || form.source === 'Sonstiges') && (
              <TextInput label={t.fields.sourceOther} value={form.sourceOther} onChange={(value) => updateField('sourceOther', value)} />
            )}
            <TextInput label={t.fields.foodNotes} value={form.foodNotes} onChange={(value) => updateField('foodNotes', value)} />
            <label className="field sm:row-span-2">
              <span>{t.fields.notes}</span>
              <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} rows={5} />
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-7 w-full justify-center" disabled={isSubmitting}>
            {isSubmitting ? t.sending : t.primaryCta}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <p className="required-note">{t.requiredNote}</p>
        </form>
      </div>
    </Section>
  );
}

function SuccessActions({ t }: { t: typeof copy.en }) {
  const calendarLinks = getCalendarLinks();

  return (
    <div className="success-actions">
      <div>
        <strong>{t.nextStepsTitle}</strong>
        <p>{t.nextStepsText}</p>
      </div>
      <div className="success-action-grid">
        <a href={EVENT.whatsappLink} target="_blank" rel="noreferrer">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {t.whatsappAfterSubmit}
        </a>
        <a href={calendarLinks.google} target="_blank" rel="noreferrer">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          {t.googleCalendar}
        </a>
        <a href={calendarLinks.outlook} target="_blank" rel="noreferrer">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          {t.outlookCalendar}
        </a>
        <a href={calendarLinks.ics} download="tech-meets-problems-pizza-prototypes.ics">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          {t.appleCalendar}
        </a>
      </div>
    </div>
  );
}

function getCalendarLinks() {
  const title = 'Tech Meets Problems: Pizza & Prototypes';
  const details = 'Builder-first prototype night in Siegen. Pizza, drinks, real problem cards and first concepts or prototypes.';
  const location = `${EVENT.location}, ${EVENT.address}`;
  const start = '20260626T160000Z';
  const end = '20260626T190000Z';
  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  const outlook = `https://outlook.live.com/calendar/0/action/compose?subject=${encodeURIComponent(title)}&startdt=2026-06-26T18%3A00%3A00%2B02%3A00&enddt=2026-06-26T21%3A00%3A00%2B02%3A00&body=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  const ics = `data:text/calendar;charset=utf-8,${encodeURIComponent([
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tech Meets Problems//Pizza and Prototypes//EN',
    'BEGIN:VEVENT',
    'UID:tech-meets-problems-pizza-prototypes-20260626',
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n'))}`;

  return { google, outlook, ics };
}

function WhatsAppSection({ t }: { t: typeof copy.en }) {
  return (
    <Section id="whatsapp" kicker={t.whatsappKicker} title={t.whatsappTitle}>
      <div className="cta-card">
        <div>
          <p className="eyebrow mb-5 w-max">
            <MessageCircle className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            {t.whatsappKicker}
          </p>
          <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">{t.whatsappCardTitle}</h3>
        </div>
        <a href={EVENT.whatsappLink} className="btn btn-secondary" target="_blank" rel="noreferrer">
          {t.whatsappButton}
          <ExternalLink className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}

function ShareSection({ t, copyLink, nativeShare, shareMessage }: { t: typeof copy.en; copyLink: () => void; nativeShare: () => void; shareMessage: string }) {
  return (
    <Section id="share" kicker={t.shareKicker} title={t.shareTitle}>
      <div className="share-card flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="text-slate-300">{t.shareText}</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-secondary" onClick={copyLink}>
            <ClipboardCopy className="h-5 w-5" aria-hidden="true" />
            {t.copyLink}
          </button>
          <button type="button" className="btn btn-secondary" onClick={nativeShare}>
            <Share2 className="h-5 w-5" aria-hidden="true" />
            {t.shareButton}
          </button>
        </div>
      </div>
      {shareMessage && <p className="mt-4 text-sm text-cyan-200">{shareMessage}</p>}
    </Section>
  );
}

function LocationSection({ t, lang }: { t: typeof copy.en; lang: Lang }) {
  return (
    <Section id="location" kicker={t.locationKicker} title={t.locationTitle}>
      <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-card p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-white">
            <a href={EVENT.mapsLink} target="_blank" rel="noreferrer" className="transition hover:text-cyan-100">
              {EVENT.location}
            </a>
          </h3>
          <div className="mt-6 space-y-4">
            <InfoRow icon={CalendarDays} label={EVENT.date[lang]} />
            <InfoRow icon={Timer} label={lang === 'de' ? EVENT.timeDe : EVENT.time} />
            <InfoRow icon={MapPin} label={EVENT.address} href={EVENT.mapsLink} />
          </div>
        </div>
        <div className="location-panel">
          <p>
            <a href={EVENT.mapsLink} target="_blank" rel="noreferrer">Startpunkt57 / Haus der Innovation</a>
            {t.locationText.includes('Hosted') ? ' is hosting the event in central Siegen. Powered by Startpunkt57 and the Entrepreneurship Center.' : ' ist der Ort des Events in der Siegener Innenstadt. Unterstützt von Startpunkt57 und Entrepreneurship Center.'}
          </p>
          <a href={EVENT.mapsLink} target="_blank" rel="noreferrer" className="btn btn-secondary mt-6">
            {t.sourceLabel}
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Section>
  );
}

function OrganizersSection({ t }: { t: typeof copy.en }) {
  return (
    <Section id="organizers" kicker={t.organizersKicker} title={t.organizersTitle}>
      <div className="founders-panel mt-10">
        <div>
          <p className="section-lead mt-0">{t.organizersText}</p>
          <div className="supporter-panel mt-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">{t.poweredBy}</p>
            <div className="supporter-grid">
              {supporterLogos.map((supporter) => (
                <a key={supporter.name} href={supporter.href} target="_blank" rel="noreferrer" className="supporter-card" aria-label={supporter.name}>
                  <img src={supporter.src} alt={supporter.name} loading="lazy" decoding="async" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="founder-grid">
          {t.organizers.map(([name, status, description], index) => (
            <article key={name} className="founder-card compact-founder-card">
              <img src={founderImages[index]} alt={name} loading="lazy" decoding="async" />
              <div>
                <h3>{name}</h3>
                <p className="founder-status">{status}</p>
                <p>{description}</p>
                <a href={founderLinks[index]} target="_blank" rel="noreferrer" className="founder-link" aria-label={`${name} LinkedIn`}>
                  LinkedIn
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CompaniesSection({ t }: { t: typeof copy.en }) {
  return (
    <Section id="companies" kicker={t.companiesKicker} title={t.companiesTitle}>
      <div className="company-contact mt-10">
        <div>
          <p>{t.companiesText}</p>
          <a href={`mailto:${EVENT.contactEmail}?subject=Tech%20Meets%20Problems%20cooperation`} className="btn btn-secondary mt-6">
            {t.companiesButton}
            <Mail className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
        <div className="company-visual" aria-hidden="true">
          <div className="company-node company-node-problem">
            <Lightbulb className="h-5 w-5" />
            <span>{t.companiesVisual[0]}</span>
          </div>
          <div className="company-node company-node-builders">
            <Users className="h-5 w-5" />
            <span>{t.companiesVisual[1]}</span>
          </div>
          <div className="company-node company-node-output">
            <Workflow className="h-5 w-5" />
            <span>{t.companiesVisual[2]}</span>
          </div>
          <div className="company-core">
            <span>{t.companiesVisual[3]}</span>
            <strong>{t.companiesVisual[4]}</strong>
          </div>
        </div>
      </div>
    </Section>
  );
}

function PrivacySection({ t }: { t: typeof copy.en }) {
  return (
    <Section id="privacy" kicker={t.privacyKicker} title={t.privacyTitle}>
      <div className="privacy-card mt-10">
        <p>{t.privacyText}</p>
        <ul>
          {t.privacyItems.map((item) => (
            <li key={item}>
              <Check className="h-4 w-4" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Footer({ t }: { t: typeof copy.en }) {
  return (
    <footer className="relative mx-auto max-w-7xl border-t border-white/10 px-5 py-10 text-sm text-slate-400">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img src={ASSETS.logoDark} alt="Tech Meets Problems" className="brand-logo brand-logo-footer" />
          <div>
            <p className="font-semibold text-white">{t.brand}</p>
            <p>{t.footerSub}</p>
          </div>
        </div>
        <div className="footer-links">
          <p>{t.footerLine}</p>
          <a href="#privacy">{t.privacyKicker}</a>
          <a href="https://nikvisuals.de/impressum" target="_blank" rel="noreferrer">
            {t.imprint}
          </a>
        </div>
      </div>
    </footer>
  );
}

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16">
      <div className="max-w-4xl">
        <p className="eyebrow mb-5">
          <Sparkles className="h-4 w-4 text-cyan-300" aria-hidden="true" />
          {kicker}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function HeroFact({ icon: Icon, label, href }: { icon: typeof CalendarDays; label: string; href?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
      <Icon className="mb-3 h-5 w-5 text-cyan-300" aria-hidden="true" />
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="text-sm leading-6 text-slate-200 underline decoration-cyan-300/30 underline-offset-4 transition hover:text-white hover:decoration-cyan-200">
          {label}
        </a>
      ) : (
        <p className="text-sm leading-6 text-slate-200">{label}</p>
      )}
    </div>
  );
}

function FeatureCard({ title, text, icon: Icon }: { title: string; text: string; icon: typeof Lightbulb }) {
  return (
    <article className="glass-card p-6">
      <Icon className="mb-5 h-7 w-7 text-orange-300" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
    </article>
  );
}

function InfoRow({ icon: Icon, label, href }: { icon: typeof CalendarDays; label: string; href?: string }) {
  return (
    <div className="flex items-start gap-3 text-slate-200">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="text-slate-200 underline decoration-cyan-300/30 underline-offset-4 transition hover:text-white hover:decoration-cyan-200">
          {label}
        </a>
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}

function TextInput({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="field">
      <span>
        {label}
        {required && <strong aria-label="required">*</strong>}
      </span>
      <input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectInput({ label, value, options, placeholder, onChange, required = false }: { label: string; value: string; options: string[]; placeholder: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="field">
      <span>
        {label}
        {required && <strong aria-label="required">*</strong>}
      </span>
      <select required={required} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function BackgroundScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_80%_25%,rgba(251,146,60,0.10),transparent_25%),linear-gradient(180deg,#07080d_0%,#0b1020_50%,#07080d_100%)]" />
      <div className="grid-overlay" />
      <div className="cursor-glow" />
    </div>
  );
}

export default App;
