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
  Instagram,
  Linkedin,
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
type AnalyticsConsent = 'accepted' | 'declined';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: {
      (...args: unknown[]): void;
      initialized?: boolean;
    };
  }
}

const ASSETS = {
  logoTransparent: `${import.meta.env.BASE_URL}assets/logo-tech-meets-problems-transparent.png`,
  logoDark: `${import.meta.env.BASE_URL}assets/logo-tech-meets-problems-dark-optimized.jpg`,
  heroMap: `${import.meta.env.BASE_URL}assets/hero-pizza-prototypes-map-optimized.jpg`,
  roomPreview: `${import.meta.env.BASE_URL}assets/event-room-preview.jpg`,
  startpunkt57: `${import.meta.env.BASE_URL}assets/logo-startpunkt57.png`,
  entrepreneurshipCenter: `${import.meta.env.BASE_URL}assets/logo-entrepreneurship-center.png`,
  niklas: `${import.meta.env.BASE_URL}assets/niklas-bruene.jpg`,
  frederik: `${import.meta.env.BASE_URL}assets/frederik-krause.jpg`,
  johanna: `${import.meta.env.BASE_URL}assets/johanna-brenner.jpg`,
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
  whatsappLink: 'https://chat.whatsapp.com/Is1hh61VskMLHRgjqgJNUH',
  instagramLink: 'https://www.instagram.com/techmeetsproblems/',
  linkedinLink: 'https://www.linkedin.com/company/tech-meets-problems',
  contactEmail: 'info@nikvisuals.de',
  mapsLink: 'https://maps.app.goo.gl/KBy84aPDsBduXJWA9',
  startsAt: '2026-06-26T18:00:00+02:00',
};

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdobqwa';
const N8N_WEBHOOK_URL = 'https://n8n.srv1037647.hstgr.cloud/webhook/tech-meets-problems-registration';
const ANALYTICS_CONSENT_KEY = 'tmp_analytics_consent';
const GA_MEASUREMENT_ID = 'G-SQXS1M7GYN';
const PRIVACY_NOTICE_VERSION = '2026-05-27';
const PHOTO_VIDEO_NOTICE_VERSION = '2026-05-27';
const PENDING_N8N_STORAGE_KEY = 'tmp_pending_n8n_registration';
const N8N_SUBMIT_TIMEOUT_MS = 2000;
let gaLoadPromise: Promise<void> | null = null;
let gaPageViewSent = false;
let pendingN8nRetryStarted = false;

type InterestForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  university: string;
  universityOther: string;
  studyField: string;
  studyFieldOther: string;
  codingLevel: string;
  eventLanguage: string;
  startupInterest: string;
  interests: string[];
  followUp: string;
  link: string;
  githubLink: string;
  linkedinLink: string;
  portfolioLink: string;
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
  university: '',
  universityOther: '',
  studyField: '',
  studyFieldOther: '',
  codingLevel: '',
  eventLanguage: '',
  startupInterest: '',
  interests: [],
  followUp: '',
  link: '',
  githubLink: '',
  linkedinLink: '',
  portfolioLink: '',
  pizza: '',
  source: '',
  sourceOther: '',
  foodNotes: '',
  notes: '',
};

const copy = {
  en: {
    nav: ['How it works', 'Problem cards', 'For companies', 'Join community'],
    topLink: 'Top of page',
    joinShort: 'Community',
    brand: 'Tech Meets Problems',
    edition: 'Community · Future sessions · Real problems',
    tagline: 'Where builders work on real business needs.',
    eyebrow: 'Builder-first tech community in Siegen',
    heroTitle: 'Build solutions for real-world problems.',
    heroTitleLines: ['Build solutions for', 'real-world problems.'],
    heroText:
      'Join a community of developers, technical students, HCI/UX people, AI/Data profiles and builders working on real business needs, future sessions and practical projects.',
    primaryCta: 'Join the community',
    freeBadgeLine1: 'Free to join',
    freeBadgeLine2: 'Future sessions & projects',
    note: 'No pitch decks. No startup theatre. Just real problems worth working on.',
    countdownLabel: 'First pilot starts in',
    countdownUnits: ['Days', 'Hours', 'Minutes', 'Seconds'],
    exitTitle: 'Leaving already?',
    exitText: 'Get on the community list and hear about future sessions, project opportunities and possible waitlist spots.',
    exitButton: 'Join community',
    facts: ['Real need', 'Builder team', 'Concept / prototype', 'Group share'],
    communityFacts: ['Future sessions', 'Real problem spaces', 'Projects & exchange'],
    pilotKicker: 'First pilot',
    pilotContextTitle: 'First pilot event: Pizza & Prototypes',
    pilotContextText:
      'The first pilot is already in selection and limited to around 30 people. Only people with a separate selection confirmation can join on 26 June. New signups join the community list for future sessions, possible waitlist spots and project opportunities.',
    pilotEligibility: 'Because capacity is limited, only selected people with a separate confirmation can join the first pilot.',
    pilotIncluded: 'Pilot detail: pizza, non-alcoholic and alcoholic drinks included.',
    problemKicker: 'Why this exists',
    problemTitle: 'Most formats start with business theatre. This one starts with builders.',
    problemLead:
      'Many entrepreneurship formats attract business people first. This pilot flips the perspective: technical people first, real business needs as the starting point, and just enough startup context to make the work useful.',
    whyJoinKicker: 'Why join?',
    whyJoinTitle: 'A community for builders who want more than theory.',
    whyJoin: [
      'Work on real problems instead of theoretical cases',
      'Meet motivated builders and tech-minded people',
      'Hear about future sessions and project opportunities',
      'Turn ideas into workflows, mockups or first prototypes',
    ],
    visionKicker: 'Vision',
    visionTitle: 'Innovation happens when different perspectives come together.',
    visionText:
      'We believe innovation happens when different perspectives come together. That’s why we connect students, hobby coders, creative minds, and tech enthusiasts from different disciplines.',
    opportunityKicker: 'What you take away',
    opportunityTitle: 'From real problems to practical next steps.',
    opportunityText:
      'Across sessions and projects, the goal is to turn real needs into clear workflows, mockups, prototypes or next-step plans. A simple TMP Canvas can help make promising ideas easier to discuss and continue.',
    opportunityPoints: ['Clear problem framing', 'Workflows or mockups', 'Simple TMP Canvas', 'Practical next steps'],
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
    examplesTitle: 'Example problem spaces for future sessions.',
    angleLabel: 'Possible angle',
    examples: [
      ['Craft business follow-up chaos', 'Offers are sent, but follow-ups happen manually or not at all.', 'Lightweight CRM or reminder workflow.'],
      ['Club organization via WhatsApp', 'Volunteers, shifts and commitments disappear in group chats.', 'Simple helper planner or form-based workflow.'],
      ['Project photo documentation', 'Photos are spread across phone galleries, chats and email.', 'Upload flow with project tagging.'],
      ['Maintenance and inspection reminders', 'Recurring appointments are tracked manually.', 'Automated reminder service.'],
    ],
    scheduleKicker: 'Schedule',
    scheduleTitle: 'First pilot event flow.',
    scheduleLead: 'This is the flow for Pizza & Prototypes on 26 June. Future formats may look different.',
    schedule: [
      ['18:00', 'Arrive, grab pizza, drinks and pick problem cards'],
      ['18:15', 'Short intro and ground rules'],
      ['18:25', 'Team formation'],
      ['18:35', 'Prototype sprint with pizza on the side'],
      ['20:20', 'Demo walk / share results'],
      ['20:45', 'Share results and possible next steps'],
      ['21:00', 'Open end'],
    ],
    faqKicker: 'FAQ',
    faqTitle: 'Small answers before you join the community.',
    faqs: [
      ['Do I need to bring a startup idea?', 'No. We bring problem cards. You only need curiosity and a willingness to work on something real.'],
      ['Do I need to be an expert programmer?', 'No. You do not need to be an expert. But you should be curious about building, coding, designing or solving technical problems.'],
      ['Is this a pitch event?', 'No. There are no pitch decks. We use a relaxed demo walk.'],
      ['Do I need a laptop?', 'Helpful, but not mandatory. One laptop per team is enough.'],
      ['Is this only for students?', 'No. Students, hobby developers and technical people from the region are welcome.'],
      ['Is this free?', 'Joining the community is free, and the first Pizza & Prototypes pilot is free too. Future formats may vary.'],
    ],
    formKicker: 'Community signup',
    formTitle: 'Join the Tech Meets Problems community.',
    formSubtitle:
      'Submissions for the first pilot are closed or already in selection. Join the community list for updates about future sessions, project opportunities and possible waitlist spots. Submitting this form does not guarantee a place on 26 June.',
    formInstruction: 'Fill out the form below to join the community list.',
    formDetailsNote: 'We use your answers to understand your background, plan future sessions and invite fitting people when a format has limited spots.',
    communityCardTitle: 'What you join',
    communityInfo: ['Community updates', 'Future sessions and project opportunities', 'Possible waitlist spots for selected formats', 'WhatsApp community hub available'],
    privacyNote: 'We use your data for Tech Meets Problems community and future-event updates. If you arrive through a campaign link, we also store basic source parameters so we know which channels worked. No spam.',
    privacyKicker: 'Privacy',
    privacyTitle: 'Privacy notice',
    privacyText:
      'We keep it simple: we use your information to manage the Tech Meets Problems community list, send relevant future-event and project updates, and understand which channels worked. This may include name, email address, status, university or institution, study or professional background, profile links, interests, food notes, free-text information, language, timestamp, landing page and UTM parameters.',
    privacyDetails: [
      'The form is processed through Formspree. We also use n8n, Google Sheets and Gmail to store community signups, send relevant updates and receive internal notifications. Cloudflare Web Analytics is used as a simple, privacy-friendly baseline analysis. Google Analytics 4 only loads after your optional analytics consent.',
      'Photos and videos may be taken at the event to document and communicate Tech Meets Problems. If you do not want to appear recognizably in photos, please tell us on site. For interviews, testimonials or focused individual shots, we will ask separately.',
      'No sale of your data, no spam. You can object to further updates or request deletion at any time by emailing info@nikvisuals.de.',
    ],
    privacyItems: [
      'Responsible: Niklas Brüne and Frederik Krause.',
      'Purpose: community communication, future-event planning, optional catering for future formats, channel evaluation and event documentation.',
      'Tools/recipients: Formspree, n8n, Google Sheets, Gmail, Cloudflare Web Analytics and GA4 after consent.',
      'Withdrawal, objection or deletion request: info@nikvisuals.de.',
    ],
    privacyConsentStart: 'I have read the ',
    privacyConsentLink: 'privacy notice',
    privacyConsentEnd:
      ' and want to join the Tech Meets Problems community list. I may receive relevant future-event and project updates by email. No spam, revocable at any time.',
    privacyAndUpdatesText:
      'I have read the privacy notice and want to join the Tech Meets Problems community list. I may receive relevant future-event and project updates by email. No spam, revocable at any time.',
    privacyRequired: 'Please accept the privacy notice and community updates before submitting.',
    photoVideoNotice:
      'Note: Photos and videos may be taken at the event to document and communicate Tech Meets Problems. If you do not want to appear recognizably in photos, please tell us on site. For interviews, testimonials or focused individual shots, we will ask separately.',
    successTitle: 'You are on the community list.',
    successText: 'Thanks. Your community interest was sent successfully.',
    nextStepsTitle: 'Thanks, you are on the Tech Meets Problems community list.',
    nextStepsText: 'We’ll keep you posted about future sessions, possible waitlist spots and project opportunities. You can also join the WhatsApp community hub for updates and exchange.',
    nextStepsEmailNote: 'We’ll use your email only for relevant Tech Meets Problems updates. Please also check your spam folder just in case.',
    addToCalendar: 'Add to calendar',
    googleCalendar: 'Google',
    outlookCalendar: 'Outlook',
    appleCalendar: 'Apple / ICS',
    whatsappAfterSubmit: 'Join WhatsApp community',
    instagramAfterSubmitText: 'For updates and future events, you can also follow us on Instagram.',
    instagramAfterSubmitButton: 'Open Instagram',
    linkedinAfterSubmitText: 'You can also follow us on LinkedIn for updates, future sessions and project opportunities.',
    linkedinAfterSubmitButton: 'Open LinkedIn',
    error: 'Please fill in the required fields before joining the community.',
    sendError: 'Sending did not work right now. Please check your connection and try again.',
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      phone: 'Phone number, optional',
      role: 'What describes you best?',
      status: 'Current status',
      university: 'University or institution',
      universityOther: 'Please specify university or institution',
      studyField: 'Field of study or professional background',
      studyFieldOther: 'Please specify, optional',
      coding: 'Can you code?',
      eventLanguage: 'Preferred language for future formats',
      startupInterest: 'Are you interested in startups or founding one yourself?',
      followUp: 'Interested in future projects or follow-up formats?',
      githubLink: 'GitHub profile, optional',
      linkedinLink: 'LinkedIn profile, optional',
      portfolioLink: 'Portfolio or personal website, optional',
      profileLinks: 'Optional profile links',
      linksHelper: 'Optional links help us understand your background and can improve selection chances for limited formats.',
      pizza: 'Food preference for future events, optional',
      source: 'How did you hear about Tech Meets Problems?',
      sourceOther: 'Where exactly?',
      interests: 'What are you interested in?',
      foodNotes: 'Allergies or food notes, optional',
      notes: 'Anything we should know? Own project idea, question or context?',
      select: 'Select one',
    },
    roles: ['Programmer', 'Computer Science Student', 'Technical Student', 'Builder', 'UI/UX Designer', 'HCI', 'Data Science / AI', 'Engineering', 'Business Informatics Student', 'Business Student', 'Business / Product', 'Other'],
    statusOptions: ['Bachelor student', 'Master student', 'PhD / researcher', 'Working professional', 'Founder / self-employed', 'Not currently studying', 'Other'],
    universityOptions: ['University of Siegen', 'TH Köln / Campus Gummersbach', 'South Westphalia University of Applied Sciences', 'University of Bonn', 'Hochschule Bonn-Rhein-Sieg', 'University of Koblenz', 'Koblenz University of Applied Sciences', 'University of Marburg', 'Justus Liebig University Giessen', 'Technische Hochschule Mittelhessen', 'FOM University of Applied Sciences', 'IU International University', 'Other'],
    studyFieldOptions: ['Computer Science', 'Business Informatics', 'Human-Computer Interaction / HCI', 'UX / UI / Design', 'Data Science / AI', 'Electrical Engineering', 'Mechanical Engineering', 'Mechatronics', 'Industrial Engineering', 'Media / Communication', 'Business Administration / Management', 'Entrepreneurship / SME Management', 'Engineering, other', 'Tech, other', 'Business, other', 'Not currently studying', 'Other'],
    codingLevels: ['Yes, confidently', 'Yes, a bit', 'I am learning', 'I can only vibe-code', 'No, but I can design, research or validate'],
    eventLanguageOptions: ['English', 'German', 'No preference'],
    startupInterestOptions: ['Yes, strong interest', 'Maybe someday', 'No, not really'],
    interests: ['Web apps', 'AI tools', 'Automation', 'SaaS', 'Hardware / IoT', 'Design / UX', 'Local business problems', 'Startup ideas', 'Just meeting good people'],
    followUp: ['Yes', 'Maybe', 'Not right now'],
    pizza: ['No preference', 'Vegetarian', 'Vegan', 'Other / tell us later'],
    sourceOptions: ['Word of mouth', 'Website', 'Social Media', 'LinkedIn', 'Professor', 'Lecture', 'Flyer', 'Mensa advertising', 'Other'],
    requiredNote: '* Required fields',
    sending: 'Sending...',
    roomKicker: 'First pilot atmosphere',
    roomTitle: 'This is the kind of room we want to create.',
    roomText:
      'Not classic networking with business cards. More like relaxed tables, open laptops, problem cards and people working through real business needs together. The first pilot includes pizza and drinks; future formats may vary.',
    roomCaption: 'Visualization of how Pizza & Prototypes could feel in the room.',
    whatsappKicker: 'Community hub',
    whatsappTitle: 'Join the Tech Meets Problems WhatsApp community.',
    whatsappCardTitle: 'General updates, problem cards, project ideas and exchange around real problems, tech, workflows and prototypes.',
    whatsappButton: 'Join WhatsApp community',
    instagramCommunityLabel: 'Updates & impressions on Instagram',
    instagramCommunityHelper: 'For future events and behind-the-scenes updates.',
    linkedinCommunityLabel: 'Updates & project opportunities on LinkedIn',
    linkedinCommunityHelper: 'Follow the company page for future sessions and partner updates.',
    instagramFooter: 'Follow us on Instagram',
    instagramAria: 'Open Tech Meets Problems on Instagram',
    linkedinFooter: 'Follow us on LinkedIn',
    linkedinAria: 'Open Tech Meets Problems on LinkedIn',
    shareKicker: 'Share',
    shareTitle: 'Know someone who likes building? Send this to them.',
    shareText: 'A good room starts with the right people.',
    copyLink: 'Copy page link',
    shareButton: 'Share',
    copied: 'Page link copied.',
    noShare: 'Sharing is not supported in this browser. You can copy the link instead.',
    quickShare: 'Share community',
    languageLabel: 'Language',
    shareNativeText: 'Tech Meets Problems is a builder-first community in Siegen for developers, technical students and tech-minded people who want to work on real business needs. Join the community list for future sessions and project opportunities:',
    organizersKicker: 'About us',
    organizersTitle: 'The team behind Tech Meets Problems.',
    organizersText:
      'We are three master’s students at the University of Siegen studying Entrepreneurship & SME Management. Our mission is to create a platform where tech-minded people can work together on real challenges, learn from each other, and develop innovative ideas. At the same time, we want to bridge the gap between companies with real-world problems and motivated builders who are eager to create impactful solutions.',
    organizers: [
      ['Niklas Brüne', 'Founder', 'Event concept, communication and problem framing'],
      ['Frederik Krause', 'Former founder', 'Outreach, operations and participant experience'],
      ['Johanna Brenner', 'Startup support', 'Coaching, coordination and strategy'],
    ],
    companiesKicker: 'For companies',
    companiesTitle: 'Have a real problem or want to support the format?',
    companiesText:
      'If you are a company, SME, craft business, club, institution, innovation team or potential supporter, reach out. We are looking for real use cases, open innovation topics and partners who want the community to explore useful challenges over time.',
    companiesButton: 'Contact us',
    companiesVisual: ['Use case', 'Builders', 'Output', 'Real need', 'Useful challenge'],
    poweredBy: 'Supported by',
    supporters: ['Startpunkt57', 'Entrepreneurship Center Siegen'],
    footerSub: 'Where builders work on real business needs.',
    footerLine: 'Tech Meets Problems Community · First pilot: Pizza & Prototypes',
    imprint: 'Imprint',
  },
  de: {
    nav: ['Ablauf', 'Problemkarten', 'Für Unternehmen', 'Community'],
    topLink: 'Nach oben',
    joinShort: 'Community',
    brand: 'Tech Meets Problems',
    edition: 'Community · Zukünftige Sessions · Echte Probleme',
    tagline: 'Where builders work on real business needs.',
    eyebrow: 'Builder-first Tech-Community in Siegen',
    heroTitle: 'Entwickle Lösungen für echte Probleme.',
    heroTitleLines: ['Entwickle Lösungen', 'für echte Probleme.'],
    heroText:
      'Werde Teil einer Community aus Entwicklern, technischen Studierenden, HCI/UX-nahen Profilen, AI/Data-Leuten und Buildern, die an echten Business-Problemen, zukünftigen Sessions und praktischen Projekten arbeiten.',
    primaryCta: 'Community beitreten',
    freeBadgeLine1: 'Kostenlos eintragen',
    freeBadgeLine2: 'Sessions & Projekte',
    note: 'Keine Pitchdecks. Kein Startup-Theater. Nur echte Probleme, gute Leute und erste Lösungen.',
    countdownLabel: 'Erster Pilot startet in',
    countdownUnits: ['Tage', 'Stunden', 'Minuten', 'Sekunden'],
    exitTitle: 'Schon weg?',
    exitText: 'Trag dich in die Community-Liste ein und erfahre von zukünftigen Sessions, Projektmöglichkeiten und möglichen Nachrückplätzen.',
    exitButton: 'Community beitreten',
    facts: ['Echtes Problem', 'Builder-Team', 'Konzept / Prototyp', 'Kurz vorstellen'],
    communityFacts: ['Zukünftige Sessions', 'Echte Problemräume', 'Projekte & Austausch'],
    pilotKicker: 'Erster Pilot',
    pilotContextTitle: 'Erstes Pilot-Event: Pizza & Prototypes',
    pilotContextText:
      'Der erste Pilot ist bereits in der Auswahl und auf rund 30 Personen begrenzt. Teilnehmen können nur Personen mit separater Auswahlbestätigung. Neue Eintragungen landen auf der Community-Liste für zukünftige Sessions, mögliche Nachrückplätze und Projektmöglichkeiten.',
    pilotEligibility: 'Da die Kapazität begrenzt ist, können beim ersten Pilot-Event nur ausgewählte Personen mit separater Bestätigung teilnehmen.',
    pilotIncluded: 'Pilot-Detail: Pizza, alkoholfreie und alkoholische Getränke inklusive.',
    problemKicker: 'Warum das Format',
    problemTitle: 'Viele Formate starten mit Business-Theater. Dieses startet mit Buildern.',
    problemLead:
      'Viele Entrepreneurship-Formate ziehen Business-Leute zuerst an. Dieser Pilot dreht die Perspektive: technische Leute zuerst, echte Business-Probleme als Startpunkt und nur so viel Startup-Kontext, dass die Arbeit nützlich wird.',
    whyJoinKicker: 'Warum mitmachen?',
    whyJoinTitle: 'Eine Community für Builder, die mehr wollen als Theorie.',
    whyJoin: [
      'Arbeite an echten Problemen statt an theoretischen Cases',
      'Triff motivierte Builder und technikaffine Menschen',
      'Erhalte Updates zu zukünftigen Sessions und Projektmöglichkeiten',
      'Übersetze Ideen in Workflows, Mockups oder erste Prototypen',
    ],
    visionKicker: 'Vision',
    visionTitle: 'Innovation entsteht, wenn unterschiedliche Perspektiven zusammenkommen.',
    visionText:
      'Wir glauben, dass Innovation entsteht, wenn unterschiedliche Perspektiven zusammenkommen. Deshalb vernetzen wir Studierende, Hobby-Coder, kreative Köpfe und Tech-Enthusiasten aus verschiedenen Disziplinen.',
    opportunityKicker: 'Was du mitnimmst',
    opportunityTitle: 'Von echten Problemen zu konkreten nächsten Schritten.',
    opportunityText:
      'Über Sessions und Projekte hinweg geht es darum, reale Bedarfe in klare Workflows, Mockups, Prototypen oder nächste Schritte zu übersetzen. Ein einfacher TMP Canvas kann helfen, vielversprechende Ideen greifbar zu machen und weiterzudenken.',
    opportunityPoints: ['Klares Problemverständnis', 'Workflows oder Mockups', 'Einfacher TMP Canvas', 'Konkrete nächste Schritte'],
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
    examplesTitle: 'Beispiel-Problemräume für zukünftige Sessions.',
    angleLabel: 'Möglicher Ansatz',
    examples: [
      ['Follow-up-Chaos im Handwerk', 'Angebote werden verschickt, aber Follow-ups passieren manuell oder gar nicht.', 'Leichtes CRM oder Reminder-Workflow.'],
      ['Vereinsorganisation per WhatsApp', 'Freiwillige, Schichten und Zusagen verschwinden in Gruppenchats.', 'Einfacher Helferplaner oder formularbasierter Workflow.'],
      ['Projekt- oder Einsatzdokumentation', 'Fotos liegen verteilt in Handygalerien, Chats und E-Mails.', 'Upload-Flow mit Projekt-Tags.'],
      ['Wartungs- und Prüferinnerungen', 'Wiederkehrende Termine werden manuell nachgehalten.', 'Automatisierter Reminder-Service.'],
    ],
    scheduleKicker: 'Ablauf',
    scheduleTitle: 'Ablauf des ersten Pilot-Events.',
    scheduleLead: 'Das ist der Ablauf für Pizza & Prototypes am 26. Juni. Zukünftige Formate können anders aussehen.',
    schedule: [
      ['18:00', 'Ankommen, Pizza, Getränke und Problemkarten'],
      ['18:15', 'Kurze Einführung und Spielregeln'],
      ['18:25', 'Teambildung'],
      ['18:35', 'Prototype-Sprint mit Pizza nebenbei'],
      ['20:20', 'Demo Walk / Ergebnisse teilen'],
      ['20:45', 'Ergebnisse teilen und mögliche nächste Schritte'],
      ['21:00', 'Open End'],
    ],
    faqKicker: 'FAQ',
    faqTitle: 'Kurze Antworten vor deinem Community-Beitritt.',
    faqs: [
      ['Muss ich eine Startup-Idee mitbringen?', 'Nein. Wir bringen Problemkarten mit. Du brauchst nur Neugier und Lust, an etwas Echtem zu arbeiten.'],
      ['Muss ich ein Programmierprofi sein?', 'Nein. Du musst kein Experte sein. Aber du solltest Lust auf Bauen, Coden, Designen oder technische Problemlösung haben.'],
      ['Ist das ein Pitch-Event?', 'Nein. Es gibt keine Pitchdecks. Wir nutzen einen entspannten Demo Walk.'],
      ['Brauche ich einen Laptop?', 'Hilfreich, aber nicht Pflicht. Ein Laptop pro Team reicht.'],
      ['Ist das nur für Studierende?', 'Nein. Studierende, Hobby-Entwickler und technische Menschen aus der Region sind willkommen.'],
      ['Ist das kostenlos?', 'Der Community-Beitritt ist kostenlos, und auch der erste Pizza & Prototypes Pilot ist kostenlos. Zukünftige Formate können variieren.'],
    ],
    formKicker: 'Community-Updates',
    formTitle: 'Werde Teil der Tech Meets Problems Community.',
    formSubtitle:
      'Die Einreichungen für den ersten Pilot sind geschlossen bzw. bereits in der Auswahl. Trag dich in die Community-Liste ein, wenn du Updates zu zukünftigen Sessions, Projektmöglichkeiten und möglichen Nachrückplätzen bekommen möchtest. Die Eintragung garantiert keinen Platz am 26. Juni.',
    formInstruction: 'Füll das Formular unten aus, um auf die Community-Liste zu kommen.',
    formDetailsNote: 'Wir nutzen deine Angaben, um deinen Hintergrund besser einzuschätzen, zukünftige Sessions zu planen und bei begrenzten Formaten passende Leute einzuladen.',
    communityCardTitle: 'Wofür du dich einträgst',
    communityInfo: ['Community-Updates', 'Zukünftige Sessions und Projektmöglichkeiten', 'Mögliche Nachrückplätze für ausgewählte Formate', 'WhatsApp-Community-Hub verfügbar'],
    privacyNote: 'Wir nutzen deine Daten für Community- und zukünftige Event-Updates von Tech Meets Problems. Wenn du über einen Kampagnenlink kommst, speichern wir auch einfache Herkunftsparameter, damit wir sehen, welche Kanäle funktionieren. Kein Spam.',
    privacyKicker: 'Datenschutz',
    privacyTitle: 'Datenschutzhinweise',
    privacyText:
      'Wir halten es einfach: Deine Angaben nutzen wir, um die Tech Meets Problems Community-Liste zu verwalten, dir relevante Updates zu zukünftigen Sessions und Projekten zu senden und zu verstehen, welche Kanäle funktioniert haben. Dazu können Name, E-Mail-Adresse, Status, Universität oder Hochschule, Studien- oder beruflicher Hintergrund, Profil-Links, Interessen, Essenshinweise, Freitextangaben, Sprache, Zeitstempel, Landingpage und UTM-Parameter verarbeitet werden.',
    privacyDetails: [
      'Das Formular läuft über Formspree. Zusätzlich nutzen wir n8n, Google Sheets und Gmail, um Community-Eintragungen zu speichern, relevante Updates zu senden und interne Benachrichtigungen zu erhalten. Cloudflare Web Analytics ist als einfache, privacy-freundliche Basisanalyse eingebunden. Google Analytics 4 wird nur nach deiner optionalen Analytics-Einwilligung geladen.',
      'Beim Event können Foto- und Videoaufnahmen entstehen, um Tech Meets Problems zu dokumentieren und darüber zu berichten. Wenn du nicht erkennbar auf Bildern erscheinen möchtest, sag uns bitte vor Ort Bescheid. Für Interviews, Testimonials oder gezielte Einzelaufnahmen fragen wir separat.',
      'Kein Verkauf deiner Daten, kein Spam. Du kannst der Nutzung deiner Daten für weitere Updates jederzeit widersprechen oder eine Löschung anfragen. Schreib dafür an info@nikvisuals.de.',
    ],
    privacyItems: [
      'Verantwortlich: Niklas Brüne und Frederik Krause.',
      'Zweck: Community-Kommunikation, Planung zukünftiger Events, optionales Catering für künftige Formate, Kanalauswertung und Eventdokumentation.',
      'Tools/Empfänger: Formspree, n8n, Google Sheets, Gmail, Cloudflare Web Analytics und GA4 nach Consent.',
      'Widerruf, Widerspruch oder Löschanfrage: info@nikvisuals.de.',
    ],
    privacyConsentStart: 'Ich habe die ',
    privacyConsentLink: 'Datenschutzhinweise',
    privacyConsentEnd:
      ' gelesen und möchte der Tech Meets Problems Community-Liste beitreten. Ich kann per E-Mail relevante Updates zu zukünftigen Events und Projekten erhalten. Kein Spam, jederzeit widerrufbar.',
    privacyAndUpdatesText:
      'Ich habe die Datenschutzhinweise gelesen und möchte der Tech Meets Problems Community-Liste beitreten. Ich kann per E-Mail relevante Updates zu zukünftigen Events und Projekten erhalten. Kein Spam, jederzeit widerrufbar.',
    privacyRequired: 'Bitte bestätige die Datenschutzhinweise und Community-Updates vor dem Absenden.',
    photoVideoNotice:
      'Hinweis: Beim Event können Foto- und Videoaufnahmen entstehen, um Tech Meets Problems zu dokumentieren und darüber zu berichten. Wenn du nicht erkennbar auf Bildern erscheinen möchtest, sag uns bitte vor Ort Bescheid. Für Interviews, Testimonials oder gezielte Einzelaufnahmen fragen wir separat.',
    successTitle: 'Du stehst auf der Community-Liste.',
    successText: 'Danke. Dein Community-Interesse wurde erfolgreich gesendet.',
    nextStepsTitle: 'Danke, du bist auf der Tech Meets Problems Community-Liste.',
    nextStepsText: 'Wir halten dich über zukünftige Sessions, mögliche Nachrückplätze und Projektmöglichkeiten auf dem Laufenden. Du kannst außerdem dem WhatsApp-Community-Hub für Updates und Austausch beitreten.',
    nextStepsEmailNote: 'Wir nutzen deine E-Mail nur für relevante Tech Meets Problems Updates. Schau zur Sicherheit auch kurz im Spam-Ordner nach.',
    addToCalendar: 'Zum Kalender hinzufügen',
    googleCalendar: 'Google',
    outlookCalendar: 'Outlook',
    appleCalendar: 'Apple / ICS',
    whatsappAfterSubmit: 'WhatsApp-Community beitreten',
    instagramAfterSubmitText: 'Für Updates und zukünftige Events kannst du uns auch auf Instagram folgen.',
    instagramAfterSubmitButton: 'Instagram öffnen',
    linkedinAfterSubmitText: 'Für Updates, zukünftige Sessions und Projektmöglichkeiten kannst du uns auch auf LinkedIn folgen.',
    linkedinAfterSubmitButton: 'LinkedIn öffnen',
    error: 'Bitte fülle die Pflichtfelder aus, bevor du der Community beitrittst.',
    sendError: 'Das Senden hat gerade nicht geklappt. Bitte prüfe deine Verbindung und versuche es erneut.',
    fields: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer, optional',
      role: 'Was beschreibt dich am besten?',
      status: 'Aktueller Status',
      university: 'Universität oder Hochschule',
      universityOther: 'Universität oder Hochschule angeben',
      studyField: 'Studienfach oder beruflicher Hintergrund',
      studyFieldOther: 'Bitte genauer angeben, optional',
      coding: 'Kannst du coden?',
      eventLanguage: 'Bevorzugte Sprache für zukünftige Formate',
      startupInterest: 'Interessierst du dich für Startups oder dafür, selbst mal zu gründen?',
      followUp: 'Interesse an zukünftigen Projekten oder Folgeformaten?',
      githubLink: 'GitHub-Profil, optional',
      linkedinLink: 'LinkedIn-Profil, optional',
      portfolioLink: 'Portfolio oder eigene Website, optional',
      profileLinks: 'Optionale Profil-Links',
      linksHelper: 'Optionale Links helfen uns, deinen Hintergrund besser einzuschätzen und können die Auswahlchancen bei begrenzten Formaten verbessern.',
      pizza: 'Essenspräferenz für zukünftige Events, optional',
      source: 'Wie hast du von Tech Meets Problems erfahren?',
      sourceOther: 'Woher genau?',
      interests: 'Was interessiert dich?',
      foodNotes: 'Allergien oder Essenshinweise, optional',
      notes: 'Sonst noch etwas? Eigene Projektidee, Frage oder Kontext?',
      select: 'Auswählen',
    },
    roles: ['Programmierer', 'Informatikstudent', 'Technischer Student', 'Builder', 'UI/UX Designer', 'HCI', 'Data Science / AI', 'Engineering', 'Wirtschaftsinformatiker', 'BWLer', 'Business / Product', 'Andere'],
    statusOptions: ['Bachelorstudent/in', 'Masterstudent/in', 'Promotion / Forschung', 'Berufstätig', 'Gründer/in / selbstständig', 'Aktuell nicht im Studium', 'Sonstiges'],
    universityOptions: ['Universität Siegen', 'TH Köln / Campus Gummersbach', 'Fachhochschule Südwestfalen', 'Universität Bonn', 'Hochschule Bonn-Rhein-Sieg', 'Universität Koblenz', 'Hochschule Koblenz', 'Philipps-Universität Marburg', 'Justus-Liebig-Universität Gießen', 'Technische Hochschule Mittelhessen', 'FOM Hochschule', 'IU Internationale Hochschule', 'Sonstiges'],
    studyFieldOptions: ['Informatik', 'Wirtschaftsinformatik', 'Human-Computer Interaction / HCI', 'UX / UI / Design', 'Data Science / AI', 'Elektrotechnik', 'Maschinenbau', 'Mechatronik', 'Wirtschaftsingenieurwesen', 'Medien / Kommunikation', 'BWL / Management', 'Entrepreneurship / SME Management', 'Ingenieurwesen, anderes', 'Tech, anderes', 'Business, anderes', 'Aktuell nicht im Studium', 'Sonstiges'],
    codingLevels: ['Ja, sicher', 'Ja, ein bisschen', 'Ich lerne gerade', 'Ich kann nur vibe-coden', 'Nein, aber ich kann designen, recherchieren oder validieren'],
    eventLanguageOptions: ['Deutsch', 'Englisch', 'Egal'],
    startupInterestOptions: ['Ja, großes Interesse', 'Vielleicht irgendwann', 'Nein, eher nicht'],
    interests: ['Web Apps', 'AI Tools', 'Automatisierung', 'SaaS', 'Hardware / IoT', 'Design / UX', 'Lokale Business-Probleme', 'Startup-Ideen', 'Einfach gute Leute treffen'],
    followUp: ['Ja', 'Vielleicht', 'Gerade nicht'],
    pizza: ['Keine Präferenz', 'Vegetarisch', 'Vegan', 'Anderes / später mitteilen'],
    sourceOptions: ['Mund-zu-Mund-Propaganda', 'Website', 'Social Media', 'LinkedIn', 'Professor', 'Vorlesung', 'Flyer', 'Werbung in der Mensa', 'Sonstiges'],
    requiredNote: '* Pflichtfelder',
    sending: 'Wird gesendet...',
    roomKicker: 'Atmosphäre im ersten Piloten',
    roomTitle: 'So soll sich der Raum anfühlen.',
    roomText:
      'Kein klassisches Networking mit Visitenkarten. Eher entspannte Tische, offene Laptops, Problemkarten und Menschen, die gemeinsam an echten Business-Problemen arbeiten. Beim ersten Piloten gibt es Pizza und Getränke, zukünftige Formate können anders aussehen.',
    roomCaption: 'Visualisierung, wie Pizza & Prototypes im Raum wirken könnte.',
    whatsappKicker: 'Community-Hub',
    whatsappTitle: 'Tritt der Tech Meets Problems WhatsApp-Community bei.',
    whatsappCardTitle: 'Allgemeine Updates, Infos zu zukünftigen Sessions, Problemkarten, Projektideen und Austausch rund um echte Probleme, Tech, Workflows und Prototypen.',
    whatsappButton: 'WhatsApp-Community beitreten',
    instagramCommunityLabel: 'Updates & Eindrücke auf Instagram',
    instagramCommunityHelper: 'Für zukünftige Events und Einblicke.',
    linkedinCommunityLabel: 'Updates & Projektmöglichkeiten auf LinkedIn',
    linkedinCommunityHelper: 'Folge der Company Page für zukünftige Sessions und Partner-Updates.',
    instagramFooter: 'Folge uns auf Instagram',
    instagramAria: 'Tech Meets Problems auf Instagram öffnen',
    linkedinFooter: 'Folge uns auf LinkedIn',
    linkedinAria: 'Tech Meets Problems auf LinkedIn öffnen',
    shareKicker: 'Teilen',
    shareTitle: 'Kennst du jemanden, der gerne baut? Schick es weiter.',
    shareText: 'Ein guter Raum startet mit den richtigen Leuten.',
    copyLink: 'Link kopieren',
    shareButton: 'Teilen',
    copied: 'Link kopiert.',
    noShare: 'Teilen wird in diesem Browser nicht unterstützt. Du kannst stattdessen den Link kopieren.',
    quickShare: 'Community teilen',
    languageLabel: 'Sprache',
    shareNativeText: 'Tech Meets Problems ist eine builder-first Community in Siegen für Entwickler, technische Studierende und technikaffine Menschen, die an echten Business-Problemen arbeiten möchten. Hier kann man sich für zukünftige Sessions und Projektmöglichkeiten eintragen:',
    organizersKicker: 'Über uns',
    organizersTitle: 'Das Team hinter Tech Meets Problems.',
    organizersText:
      'Wir sind drei Masterstudierende an der Universität Siegen im Studiengang Entrepreneurship & SME Management. Unsere Mission ist es, eine Plattform zu schaffen, auf der technikaffine Menschen gemeinsam an echten Herausforderungen arbeiten, voneinander lernen und innovative Ideen entwickeln können. Gleichzeitig wollen wir die Lücke zwischen Unternehmen mit realen Problemen und motivierten Buildern schließen, die Lust haben, wirkungsvolle Lösungen zu entwickeln.',
    organizers: [
      ['Niklas Brüne', 'Gründer', 'Eventkonzept, Kommunikation und Problem-Framing'],
      ['Frederik Krause', 'Ehemaliger Gründer', 'Outreach, Operations und Teilnehmererlebnis'],
      ['Johanna Brenner', 'Gründungsbegleitung', 'Coaching, Koordination und Strategie'],
    ],
    companiesKicker: 'Für Unternehmen',
    companiesTitle: 'Habt ihr ein echtes Problem oder wollt das Format unterstützen?',
    companiesText:
      'Wenn ihr ein Unternehmen, KMU, Handwerksbetrieb, Verein, eine Institution, ein Innovationsteam oder potenzielle Unterstützer seid, meldet euch gerne. Wir suchen reale Use Cases, Open-Innovation-Themen und Partner, die der Community langfristig sinnvolle Herausforderungen ermöglichen möchten.',
    companiesButton: 'Kontakt aufnehmen',
    companiesVisual: ['Use Case', 'Builder', 'Output', 'Echter Bedarf', 'Sinnvolle Challenge'],
    poweredBy: 'Unterstützt von',
    supporters: ['Startpunkt57', 'Entrepreneurship Center Siegen'],
    footerSub: 'Where builders work on real business needs.',
    footerLine: 'Tech Meets Problems Community · Erster Pilot: Pizza & Prototypes',
    imprint: 'Impressum',
  },
};

const cardIcons = [Lightbulb, Users, Rocket, Code2];
const founderImages = [ASSETS.niklas, ASSETS.frederik, ASSETS.johanna];
const founderLinks = [
  'https://www.linkedin.com/in/niklas-bruene/',
  'https://www.linkedin.com/in/frederik-krause-a80448277/',
  'https://www.linkedin.com/in/johanna-brenner-619a36328',
];
const supporterLogos = [
  { name: 'Startpunkt57', src: ASSETS.startpunkt57, href: 'https://www.startpunkt57.de/' },
  { name: 'Entrepreneurship Center Siegen', src: ASSETS.entrepreneurshipCenter, href: 'https://www.ec.uni-siegen.de/' },
];

const LANGUAGE_STORAGE_KEY = 'tech-meets-problems-language';
const SITE_URL = 'https://techmeetsproblems.com/';
const seoByLang: Record<Lang, { title: string; description: string }> = {
  de: {
    title: 'Tech Meets Problems | Builder-first Community in Siegen',
    description:
      'Tech Meets Problems ist eine builder-first Tech-Community in Siegen. Pizza & Prototypes ist der erste Pilot für echte Probleme, zukünftige Sessions und praktische Projekte.',
  },
  en: {
    title: 'Tech Meets Problems | Builder-first community in Siegen',
    description:
      'Tech Meets Problems is a builder-first tech community in Siegen. Pizza & Prototypes is the first pilot for real problems, future sessions and practical projects.',
  },
};

function isLang(value: string | null): value is Lang {
  return value === 'en' || value === 'de';
}

function getInitialLanguage(): Lang {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (isLang(urlLang)) {
    return urlLang;
  }

  const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isLang(storedLang)) {
    return storedLang;
  }

  return 'de';
}

function getShareUrl(lang: Lang) {
  const url = new URL(SITE_URL);
  const currentParams = new URLSearchParams(window.location.search);
  currentParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  url.searchParams.set('lang', lang);
  if (!url.searchParams.has('utm_source')) {
    url.searchParams.set('utm_source', 'website');
  }
  if (!url.searchParams.has('utm_medium')) {
    url.searchParams.set('utm_medium', 'share');
  }
  if (!url.searchParams.has('utm_campaign')) {
    url.searchParams.set('utm_campaign', 'tech_meets_problems_community');
  }
  if (!url.searchParams.has('utm_content')) {
    url.searchParams.set('utm_content', isLikelyMobileShare() ? 'website_share_mobile' : 'website_share_desktop');
  }
  return url.toString();
}

function getWhatsAppShareUrl(lang: Lang) {
  const url = new URL(SITE_URL);
  url.searchParams.set('lang', lang);
  url.searchParams.set('utm_source', 'whatsapp');
  url.searchParams.set('utm_medium', 'share');
  url.searchParams.set('utm_campaign', 'tech_meets_problems_community');
  url.searchParams.set('utm_content', lang === 'de' ? 'website_share' : 'website_share_en');
  return url.toString();
}

function isLikelyMobileShare() {
  return navigator.share !== undefined || window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
}

function setMetaContent(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

function getStoredAnalyticsConsent(): AnalyticsConsent | null {
  const storedConsent = localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return storedConsent === 'accepted' || storedConsent === 'declined' ? storedConsent : null;
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };
  }
}

function loadGoogleAnalyticsScript() {
  if (gaLoadPromise) {
    return gaLoadPromise;
  }

  ensureGtag();

  const existingScript = document.querySelector<HTMLScriptElement>(`script[data-ga4-id="${GA_MEASUREMENT_ID}"]`);
  if (existingScript) {
    gaLoadPromise = Promise.resolve();
    return gaLoadPromise;
  }

  gaLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.dataset.ga4Id = GA_MEASUREMENT_ID;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('GA4 script failed to load')), { once: true });
    document.head.appendChild(script);
  });

  return gaLoadPromise;
}

async function loadGoogleAnalyticsAndSendPageView() {
  if (gaPageViewSent) {
    return;
  }

  try {
    await loadGoogleAnalyticsScript();
    ensureGtag();
    if (gaPageViewSent) {
      return;
    }
    if (!window.gtag?.initialized) {
      window.gtag?.('js', new Date());
      window.gtag!.initialized = true;
    }
    window.gtag?.('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
    });
    window.gtag?.('event', 'page_view', {
      send_to: GA_MEASUREMENT_ID,
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
    });
    gaPageViewSent = true;
  } catch (error) {
    console.warn('GA4 analytics failed to load', error);
  }
}

type RegistrationPayload = Record<string, unknown>;

function storePendingN8nRegistration(payload: RegistrationPayload) {
  try {
    localStorage.setItem(PENDING_N8N_STORAGE_KEY, JSON.stringify({ payload, savedAt: new Date().toISOString() }));
  } catch (error) {
    console.warn('Unable to store pending n8n registration payload', error);
  }
}

function clearPendingN8nRegistration() {
  try {
    localStorage.removeItem(PENDING_N8N_STORAGE_KEY);
  } catch (error) {
    console.warn('Unable to clear pending n8n registration payload', error);
  }
}

async function submitN8nRegistration(payload: RegistrationPayload, storeOnFailure = false) {
  const body = JSON.stringify(payload);
  const request = fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: body.length < 60_000,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`n8n registration webhook failed with ${response.status}`);
      }
      clearPendingN8nRegistration();
      return true;
    })
    .catch((error) => {
      console.warn('n8n registration webhook failed', error);
      if (storeOnFailure) {
        storePendingN8nRegistration(payload);
      }
      return false;
    });

  const result = await Promise.race([
    request,
    new Promise<'timeout'>((resolve) => window.setTimeout(() => resolve('timeout'), N8N_SUBMIT_TIMEOUT_MS)),
  ]);

  if (result === 'timeout') {
    console.warn('n8n registration webhook timed out; storing payload for retry');
    if (storeOnFailure) {
      storePendingN8nRegistration(payload);
    }
    return false;
  }

  return result;
}

function retryPendingN8nRegistration() {
  if (pendingN8nRetryStarted) {
    return;
  }
  pendingN8nRetryStarted = true;

  try {
    const raw = localStorage.getItem(PENDING_N8N_STORAGE_KEY);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw) as { payload?: RegistrationPayload };
    if (parsed.payload) {
      void submitN8nRegistration(parsed.payload, true);
    }
  } catch (error) {
    console.warn('Unable to retry pending n8n registration payload', error);
  }
}

function App() {
  const [lang, setLangState] = useState<Lang>(() => getInitialLanguage());
  const t = copy[lang];
  const [form, setForm] = useState<InterestForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitNudge, setShowExitNudge] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState<AnalyticsConsent | null>(() => getStoredAnalyticsConsent());
  const [privacyNoticeOpen, setPrivacyNoticeOpen] = useState(false);
  const [privacyAndUpdatesAccepted, setPrivacyAndUpdatesAccepted] = useState(false);
  const pointerFrame = useRef<number | null>(null);
  const pointerPosition = useRef({ x: 0, y: 0 });

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);

    const url = new URL(window.location.href);
    url.searchParams.set('lang', nextLang);
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  };

  useEffect(() => {
    const seo = seoByLang[lang];
    document.documentElement.lang = lang;
    document.title = seo.title;
    setMetaContent('meta[name="description"]', seo.description);
    setMetaContent('meta[property="og:title"]', seo.title);
    setMetaContent('meta[property="og:description"]', seo.description);
    setMetaContent('meta[name="twitter:title"]', seo.title);
    setMetaContent('meta[name="twitter:description"]', seo.description);
  }, [lang]);

  useEffect(() => {
    if (analyticsConsent === 'accepted') {
      void loadGoogleAnalyticsAndSendPageView();
    }
  }, [analyticsConsent]);

  useEffect(() => {
    retryPendingN8nRegistration();
  }, []);

  const updateAnalyticsConsent = (nextConsent: AnalyticsConsent) => {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, nextConsent);
    setAnalyticsConsent(nextConsent);
  };

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

  const openPrivacyNotice = () => {
    setPrivacyNoticeOpen(true);
    window.requestAnimationFrame(() => {
      document.getElementById('privacy')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const needsSourceDetail = form.source === 'Other' || form.source === 'Sonstiges';
    const isStudentStatus = ['Bachelor student', 'Master student', 'PhD / researcher', 'Bachelorstudent/in', 'Masterstudent/in', 'Promotion / Forschung'].includes(form.status);
    const needsUniversityDetail = form.university === 'Other' || form.university === 'Sonstiges';

    if (!form.firstName || !form.lastName || !form.email || !form.role || !form.status || !form.studyField || !form.codingLevel || !form.eventLanguage || !form.startupInterest || !form.followUp || !form.source || (isStudentStatus && !form.university) || (isStudentStatus && needsUniversityDetail && !form.universityOther) || (needsSourceDetail && !form.sourceOther)) {
      setFormError(t.error);
      return;
    }

    if (!privacyAndUpdatesAccepted) {
      setFormError(t.privacyRequired);
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

    const submittedAt = new Date().toISOString();
    const submission = {
      ...form,
      language: lang,
      submittedAt,
      trackingSummary,
      privacyAndUpdatesAccepted,
      privacyAndUpdatesAcceptedAt: submittedAt,
      privacyAndUpdatesVersion: PRIVACY_NOTICE_VERSION,
      privacyAndUpdatesText: t.privacyAndUpdatesText,
      photoVideoNoticeShown: true,
      photoVideoNoticeVersion: PHOTO_VIDEO_NOTICE_VERSION,
      photoVideoNoticeText: t.photoVideoNotice,
      ...tracking,
    };
    const submissionPayload = {
      ...submission,
      signupType: 'community_interest',
      eventId: 'future_events_general',
      formVersion: '2026-06-19-community-v1',
      _subject: 'New Tech Meets Problems community signup',
      _replyto: submission.email,
      fullName: `${submission.firstName} ${submission.lastName}`.trim(),
      interests: submission.interests.join(', '),
      event: 'Tech Meets Problems Community / Future Events',
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionPayload),
      });

      if (!response.ok) {
        throw new Error('Formspree request failed');
      }

      await submitN8nRegistration(submissionPayload, true);

      setSubmitted(true);
      setShowSignupModal(true);
      setForm(initialForm);
      setPrivacyAndUpdatesAccepted(false);
    } catch {
      setFormError(t.sendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(getShareUrl(lang));
    setShareMessage(t.copied);
  };

  const nativeShare = async () => {
    const shareUrl = getWhatsAppShareUrl(lang);

    if (!navigator.share) {
      await navigator.clipboard.writeText(shareUrl);
      setShareMessage(t.noShare);
      return;
    }

    await navigator.share({
      title: 'Tech Meets Problems',
      text: t.shareNativeText,
      url: shareUrl,
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#07080d] text-slate-100" onPointerMove={handlePointerMove}>
      <BackgroundScene />
      <Header lang={lang} setLang={setLang} t={t} />
      <MobileQuickNav t={t} lang={lang} setLang={setLang} nativeShare={nativeShare} openPrivacyNotice={openPrivacyNotice} />
      <ExitNudge t={t} show={showExitNudge} onClose={() => setShowExitNudge(false)} />
      <SignupSuccessModal t={t} show={showSignupModal} onClose={() => setShowSignupModal(false)} />
      <AnalyticsConsentBanner lang={lang} consent={analyticsConsent} onChoice={updateAnalyticsConsent} />
      <Hero t={t} />
      <ProblemSection t={t} />
      <RoomPreviewSection t={t} />
      <WhyJoinSection t={t} />
      <VisionSection t={t} />
      <OrganizersSection t={t} />
      <OpportunitySection t={t} />
      <HowItWorks t={t} />
      <ExampleProblems t={t} />
      <FirstPilotSection t={t} lang={lang} />
      <Schedule t={t} />
      <Registration
        t={t}
        lang={lang}
        form={form}
        submitted={submitted}
        formError={formError}
        isSubmitting={isSubmitting}
        privacyAndUpdatesAccepted={privacyAndUpdatesAccepted}
        setPrivacyAndUpdatesAccepted={setPrivacyAndUpdatesAccepted}
        setFormError={setFormError}
        openPrivacyNotice={openPrivacyNotice}
        updateField={updateField}
        toggleInterest={toggleInterest}
        handleSubmit={handleSubmit}
      />
      <WhatsAppSection t={t} />
      <ShareSection t={t} copyLink={copyLink} nativeShare={nativeShare} shareMessage={shareMessage} />
      <CompaniesSection t={t} />
      <PrivacySection t={t} isOpen={privacyNoticeOpen} setIsOpen={setPrivacyNoticeOpen} />
      <FAQ t={t} />
      <Footer t={t} openPrivacyNotice={openPrivacyNotice} />
    </main>
  );
}

function AnalyticsConsentBanner({
  lang,
  consent,
  onChoice,
}: {
  lang: Lang;
  consent: AnalyticsConsent | null;
  onChoice: (nextConsent: AnalyticsConsent) => void;
}) {
  if (consent !== null) {
    return null;
  }

  const isGerman = lang === 'de';
  return (
    <aside className="analytics-consent" aria-label={isGerman ? 'Analytics Zustimmung' : 'Analytics consent'}>
      <p>
        {isGerman
          ? 'Wir nutzen Cookies, um die Nutzung der Website zu analysieren und das Erlebnis zu verbessern. Du kannst ablehnen. Dann erfassen wir weiterhin nur anonyme Basisdaten ohne Google Analytics.'
          : 'We use cookies to analyze site usage and improve your experience. You can decline. We will still collect anonymous baseline analytics without Google Analytics.'}
      </p>
      <div>
        <button type="button" className="analytics-consent-decline" onClick={() => onChoice('declined')}>
          {isGerman ? 'Ablehnen' : 'Decline'}
        </button>
        <button type="button" className="analytics-consent-accept" onClick={() => onChoice('accepted')}>
          {isGerman ? 'Akzeptieren' : 'Accept'}
        </button>
      </div>
    </aside>
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

function MobileQuickNav({
  t,
  lang,
  setLang,
  nativeShare,
  openPrivacyNotice,
}: {
  t: typeof copy.en;
  lang: Lang;
  setLang: (lang: Lang) => void;
  nativeShare: () => void;
  openPrivacyNotice: () => void;
}) {
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
          <a href="#privacy" onClick={() => { openPrivacyNotice(); closeMenu(); }}>{t.privacyKicker}</a>
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

function Hero({ t }: { t: typeof copy.en }) {
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
          <div className="hero-free-badge" aria-label={`${t.freeBadgeLine1}, ${t.freeBadgeLine2}`}>
            <span className="hero-free-badge-icons" aria-hidden="true">
              <Sparkles className="h-4 w-4" />
              <Users className="h-4 w-4" />
            </span>
            <span>
              <strong>{t.freeBadgeLine1}</strong>
              <small>{t.freeBadgeLine2}</small>
            </span>
          </div>
        </div>
        <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
          <HeroFact icon={CalendarDays} label={t.communityFacts[0]} />
          <HeroFact icon={Lightbulb} label={t.communityFacts[1]} />
          <HeroFact icon={Workflow} label={t.communityFacts[2]} />
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
        <img src={ASSETS.heroMap} alt={`${t.pilotContextTitle} flow`} className="hero-visual-image" decoding="async" fetchPriority="high" />
      </div>
      <HeroSupporters t={t} />
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

function FirstPilotSection({ t, lang }: { t: typeof copy.en; lang: Lang }) {
  return (
    <Section id="first-pilot" kicker={t.pilotKicker} title={t.pilotContextTitle}>
      <div className="glass-card mt-10 p-6 sm:p-8">
          <p className="section-lead mt-0">{t.pilotContextText}</p>
          <p className="mt-5 text-sm leading-6 text-cyan-100">{t.pilotEligibility}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <InfoRow icon={CalendarDays} label={EVENT.date[lang]} />
            <InfoRow icon={Timer} label={lang === 'de' ? EVENT.timeDe : EVENT.time} />
            <InfoRow icon={MapPin} label={`${EVENT.location} · ${EVENT.address}`} href={EVENT.mapsLink} />
          </div>
          <p className="mt-5 text-sm text-slate-400">{t.pilotIncluded}</p>
          <div className="mt-5 max-w-xl">
            <Countdown t={t} />
          </div>
      </div>
    </Section>
  );
}


function Schedule({ t }: { t: typeof copy.en }) {
  return (
    <Section id="schedule" kicker={t.scheduleKicker} title={t.scheduleTitle}>
      <p className="section-lead">{t.scheduleLead}</p>
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
  privacyAndUpdatesAccepted: boolean;
  setPrivacyAndUpdatesAccepted: (accepted: boolean) => void;
  setFormError: (message: string) => void;
  openPrivacyNotice: () => void;
  updateField: (field: keyof InterestForm, value: string) => void;
  toggleInterest: (interest: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function Registration({
  t,
  lang,
  form,
  submitted,
  formError,
  isSubmitting,
  privacyAndUpdatesAccepted,
  setPrivacyAndUpdatesAccepted,
  setFormError,
  openPrivacyNotice,
  updateField,
  toggleInterest,
  handleSubmit,
}: RegistrationProps) {
  const showUniversity = ['Bachelor student', 'Master student', 'PhD / researcher', 'Bachelorstudent/in', 'Masterstudent/in', 'Promotion / Forschung'].includes(form.status);

  return (
    <Section id="register" kicker={t.formKicker} title={t.formTitle}>
      <p className="section-lead">{t.formSubtitle}</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="glass-card p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-white">{t.communityCardTitle}</h3>
          <div className="mt-7 space-y-4">
            <InfoRow icon={MessageCircle} label={t.communityInfo[0]} />
            <InfoRow icon={CalendarDays} label={t.communityInfo[1]} />
            <InfoRow icon={Users} label={t.communityInfo[2]} />
            <InfoRow icon={MessageCircle} label={t.communityInfo[3]} />
          </div>
          <div className="mt-8 rounded-xl border border-cyan-300/20 bg-cyan-300/8 p-5">
            <p className="font-medium text-cyan-100">{lang === 'de' ? 'Datennutzung' : 'Data use'}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{t.privacyNote}</p>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.035] p-4">
            <p className="font-medium text-white">{t.formInstruction}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">{t.formDetailsNote}</p>
          </div>
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
            <SelectInput label={t.fields.status} required value={form.status} options={t.statusOptions} placeholder={t.fields.select} onChange={(value) => updateField('status', value)} />
            {showUniversity && (
              <SelectInput label={t.fields.university} required value={form.university} options={t.universityOptions} placeholder={t.fields.select} onChange={(value) => updateField('university', value)} />
            )}
            {showUniversity && (form.university === 'Other' || form.university === 'Sonstiges') && (
              <TextInput label={t.fields.universityOther} required value={form.universityOther} onChange={(value) => updateField('universityOther', value)} />
            )}
            <SelectInput label={t.fields.studyField} required value={form.studyField} options={t.studyFieldOptions} placeholder={t.fields.select} onChange={(value) => updateField('studyField', value)} />
            {(form.studyField === 'Other' || form.studyField === 'Sonstiges') && (
              <TextInput label={t.fields.studyFieldOther} value={form.studyFieldOther} onChange={(value) => updateField('studyFieldOther', value)} />
            )}
            <SelectInput label={t.fields.coding} required value={form.codingLevel} options={t.codingLevels} placeholder={t.fields.select} onChange={(value) => updateField('codingLevel', value)} />
            <SelectInput label={t.fields.eventLanguage} required value={form.eventLanguage} options={t.eventLanguageOptions} placeholder={t.fields.select} onChange={(value) => updateField('eventLanguage', value)} />
            <SelectInput label={t.fields.startupInterest} required value={form.startupInterest} options={t.startupInterestOptions} placeholder={t.fields.select} onChange={(value) => updateField('startupInterest', value)} />
            <SelectInput label={t.fields.followUp} required value={form.followUp} options={t.followUp} placeholder={t.fields.select} onChange={(value) => updateField('followUp', value)} />
            <SelectInput label={t.fields.pizza} value={form.pizza} options={t.pizza} placeholder={t.fields.select} onChange={(value) => updateField('pizza', value)} />
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium text-slate-200">{t.fields.profileLinks}</legend>
            <p className="mt-2 text-sm leading-6 text-slate-400">{t.fields.linksHelper}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <TextInput label={t.fields.githubLink} value={form.githubLink} onChange={(value) => updateField('githubLink', value)} />
              <TextInput label={t.fields.linkedinLink} value={form.linkedinLink} onChange={(value) => updateField('linkedinLink', value)} />
              <TextInput label={t.fields.portfolioLink} value={form.portfolioLink} onChange={(value) => updateField('portfolioLink', value)} />
            </div>
          </fieldset>

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
            <SelectInput label={t.fields.source} required value={form.source} options={t.sourceOptions} placeholder={t.fields.select} onChange={(value) => updateField('source', value)} />
            {(form.source === 'Other' || form.source === 'Sonstiges') && (
              <TextInput label={t.fields.sourceOther} required value={form.sourceOther} onChange={(value) => updateField('sourceOther', value)} />
            )}
            <TextInput label={t.fields.foodNotes} value={form.foodNotes} onChange={(value) => updateField('foodNotes', value)} />
            <label className="field sm:row-span-2">
              <span>{t.fields.notes}</span>
              <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} rows={5} />
            </label>
          </div>
          <div className="legal-consent mt-7">
            <label className="legal-checkbox">
              <input
                type="checkbox"
                required
                checked={privacyAndUpdatesAccepted}
                onChange={(event) => {
                  setPrivacyAndUpdatesAccepted(event.target.checked);
                  if (event.target.checked) {
                    setFormError('');
                  }
                }}
                onInvalid={() => setFormError(t.privacyRequired)}
              />
              <span>
                {t.privacyConsentStart}
                <a
                  href="#privacy"
                  className="privacy-link-button"
                  onClick={(event) => {
                    event.preventDefault();
                    openPrivacyNotice();
                  }}
                >
                  {t.privacyConsentLink}
                </a>
                <strong className="required-star" aria-label="required">*</strong>
                {t.privacyConsentEnd}
              </span>
            </label>
            <p className="photo-video-note">{t.photoVideoNotice}</p>
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
  return (
    <div className="success-actions">
      <div>
        <strong>{t.nextStepsTitle}</strong>
        <p>{t.nextStepsText}</p>
        <p className="mt-3 text-sm text-emerald-100/70">{t.nextStepsEmailNote}</p>
      </div>
      <div className="success-action-grid success-action-grid-single">
        <a href={EVENT.whatsappLink} className="success-action-whatsapp" target="_blank" rel="noreferrer">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>{t.whatsappAfterSubmit}</span>
        </a>
      </div>
      <div className="success-instagram">
        <p>{t.instagramAfterSubmitText}</p>
        <a href={EVENT.instagramLink} target="_blank" rel="noopener noreferrer" aria-label={t.instagramAria}>
          <Instagram className="h-4 w-4" aria-hidden="true" />
          {t.instagramAfterSubmitButton}
        </a>
      </div>
      <div className="success-instagram">
        <p>{t.linkedinAfterSubmitText}</p>
        <a href={EVENT.linkedinLink} target="_blank" rel="noopener noreferrer" aria-label={t.linkedinAria}>
          <Linkedin className="h-4 w-4" aria-hidden="true" />
          {t.linkedinAfterSubmitButton}
        </a>
      </div>
    </div>
  );
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
        <div className="community-actions">
          <a href={EVENT.whatsappLink} className="btn btn-secondary" target="_blank" rel="noreferrer">
            {t.whatsappButton}
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={EVENT.instagramLink}
            className="community-instagram-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.instagramAria}
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            <span>
              <strong>{t.instagramCommunityLabel}</strong>
              <small>{t.instagramCommunityHelper}</small>
            </span>
          </a>
          <a
            href={EVENT.linkedinLink}
            className="community-instagram-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.linkedinAria}
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            <span>
              <strong>{t.linkedinCommunityLabel}</strong>
              <small>{t.linkedinCommunityHelper}</small>
            </span>
          </a>
        </div>
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

function PrivacySection({
  t,
  isOpen,
  setIsOpen,
}: {
  t: typeof copy.en;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Section id="privacy" kicker={t.privacyKicker} title={t.privacyTitle}>
      <div className="privacy-card mt-10">
        <p>{t.privacyText}</p>
        <details className="privacy-details" open={isOpen} onToggle={(event) => setIsOpen(event.currentTarget.open)}>
          <summary>{t.privacyKicker}</summary>
          {t.privacyDetails.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul>
            {t.privacyItems.map((item) => (
              <li key={item}>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </Section>
  );
}

function Footer({ t, openPrivacyNotice }: { t: typeof copy.en; openPrivacyNotice: () => void }) {
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
          <a href="#privacy" onClick={openPrivacyNotice}>{t.privacyKicker}</a>
          <a href={EVENT.instagramLink} target="_blank" rel="noopener noreferrer" aria-label={t.instagramAria}>
            <Instagram className="h-4 w-4" aria-hidden="true" />
            {t.instagramFooter}
          </a>
          <a href={EVENT.linkedinLink} target="_blank" rel="noopener noreferrer" aria-label={t.linkedinAria}>
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            {t.linkedinFooter}
          </a>
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
