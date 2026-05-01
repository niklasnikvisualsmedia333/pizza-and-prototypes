import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardCopy,
  Code2,
  Download,
  ExternalLink,
  Image as ImageIcon,
  Lightbulb,
  MapPin,
  MessageCircle,
  Network,
  Pizza,
  Rocket,
  Share2,
  Sparkles,
  Timer,
  Users,
  WandSparkles,
  Workflow,
} from 'lucide-react';
import prototypeNightImage from './assets/prototype-night.jpg';

type Lang = 'de' | 'en';

const EVENT = {
  // Change these values later if the event date, time or venue changes.
  date: {
    de: 'Freitag, 26. Juni 2026',
    en: 'Friday, June 26, 2026',
  },
  time: '18:30 bis 21:00',
  location: 'Startpunkt57 / Haus der Innovation, Siegen',
  locationFlexible: {
    de: 'geplant im Startpunkt57, Haus der Innovation, Siegen',
    en: 'planned at Startpunkt57, Haus der Innovation, Siegen',
  },
  address: 'Sandstrasse 26, 57072 Siegen',
  // TODO: Replace this placeholder with the real WhatsApp invite link.
  whatsappLink: 'https://chat.whatsapp.com/REPLACE_WITH_REAL_LINK',
};

const STORAGE_KEY = 'pizza-prototypes-interest-list';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdobqwa';

type InterestForm = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  codingLevel: string;
  interests: string[];
  followUp: string;
  link: string;
  pizza: string;
  foodNotes: string;
  notes: string;
};

const initialForm: InterestForm = {
  fullName: '',
  email: '',
  phone: '',
  role: '',
  codingLevel: '',
  interests: [],
  followUp: '',
  link: '',
  pizza: '',
  foodNotes: '',
  notes: '',
};

const copy = {
  de: {
    nav: ['Ablauf', 'Problemkarten', 'Anmelden'],
    joinShort: 'Liste',
    eyebrow: 'Builder-first Prototype Night in Siegen',
    heroTitle: 'Baue etwas Echtes an einem Abend.',
    heroText:
      'Pizza & Prototypes ist ein builder-first Abend in Siegen fuer Entwickler, Maker und technische Studierende, die echte lokale Probleme in erste Prototypen verwandeln wollen.',
    primaryCta: 'Auf die Interessentenliste',
    secondaryCta: 'WhatsApp-Gruppe beitreten',
    note: 'Keine Pitch Decks. Kein Startup-Theater. Nur echte Probleme, gute Leute und Prototypen.',
    facts: ['Echte Problemkarten', 'Kleine Teams', '90-Minuten-Sprint', 'Demo Walk'],
    problemKicker: 'Warum das Format',
    problemTitle: 'Viele Formate starten mit Business-Theater. Dieses startet mit Buildern.',
    problemLead:
      'Viele Entrepreneurship-Formate ziehen Business-Leute an, aber zu wenige technische Builder. Pizza & Prototypes dreht die Perspektive: erst bauen, dann Business-Kontext.',
    problemCards: [
      ['Echte Probleme, keine Fake-Ideen', 'Der Abend startet mit konkreten Pain Points von KMU, Handwerk, Vereinen und Nischenbranchen.'],
      ['Kleine Teams, kein Zufallsnetworking', 'Du arbeitest mit einer fokussierten Gruppe an einer Karte, einem klaren Ansatz und einem kurzen Sprint.'],
      ['Erst Prototyp, spaeter Pitch', 'UI-Skizzen, Workflows, Code-Demos und Validierungstests zaehlen mehr als perfekte Slides.'],
      ['Tech-Mehrheit, kuratierter Kontext', 'Der Raum ist fuer Menschen gedacht, die Dinge bauen, mit genug Realitaetskontakt, damit es nuetzlich bleibt.'],
    ],
    howKicker: 'So laeuft es',
    howTitle: 'Du musst keine eigene Startup-Idee mitbringen.',
    steps: ['Problemkarte waehlen', 'Kleines Builder-Team bilden', '60 bis 90 Minuten bauen, skizzieren oder automatisieren', 'Ergebnis zeigen oder 7-Tage-Test definieren'],
    examplesKicker: 'Beispiel-Problemkarten',
    examplesTitle: 'Konkret genug zum Bauen. Klein genug fuer einen Abend.',
    prototypeIdea: 'Prototyp-Idee',
    examples: [
      ['Follow-up-Chaos im Handwerk', 'Angebote werden verschickt, aber Follow-ups passieren manuell oder gar nicht.', 'Leichtes CRM oder Reminder-Workflow.'],
      ['Vereinsorganisation per WhatsApp', 'Freiwillige, Schichten und Zusagen verschwinden in Gruppenchats.', 'Einfacher Helferplaner oder formularbasierter Workflow.'],
      ['Fotodokumentation auf Baustellen', 'Fotos liegen verteilt in Handygalerien, Chats und E-Mails.', 'Upload-Flow mit Projekt-Tags.'],
      ['Wartungs- und Prueferinnerungen', 'Wiederkehrende Termine werden manuell nachgehalten.', 'Automatisierter Reminder-Service.'],
    ],
    vibeKicker: 'So koennte es aussehen',
    vibeTitle: 'Ein Abend mit Laptops, Problemkarten, Pizza und schnellen Prototypen.',
    vibeText:
      'Das Bild ist bewusst als Vorschau generiert: Es zeigt die gewuenschte Atmosphaere, nicht ein echtes Foto der Location.',
    locationKicker: 'Location',
    locationTitle: 'Geplant im Haus der Innovation, mitten in Siegen.',
    locationText:
      'Startpunkt57 beschreibt das Haus der Innovation als Raum fuer Gruendergeist, Vernetzung, Coworking, Workshops und kreative Koepfe in der Siegener Unterstadt.',
    sourceLabel: 'Offizielle Startpunkt57-Info',
    whoKicker: 'Wer kommen sollte',
    whoTitle: 'Entworfen fuer Menschen, die gerne bauen.',
    mainly: 'Vor allem fuer',
    also: 'Auch willkommen',
    whoNote: 'Das ist kein allgemeines Networking-Event. Es ist fuer Menschen gedacht, die gerne bauen.',
    audienceMain: ['Programmierer', 'Informatikstudierende', 'Hobby-Entwickler', 'Maker', 'UI/UX- und HCI-Leute', 'Data-Science- und AI-Enthusiasten', 'Technische Problemloeser'],
    audienceAlso: ['Zugang zu echten Problemen', 'Produktdenken', 'Startup-Interesse'],
    scheduleKicker: 'Ablauf',
    scheduleTitle: 'Ein kompakter Abend mit genug Raum fuer gute Gespraeche.',
    schedule: [
      ['18:30', 'Ankommen, Pizza und Problemkarten'],
      ['18:45', 'Kurze Einfuehrung und Spielregeln'],
      ['18:55', 'Teambildung'],
      ['19:05', 'Prototype Sprint'],
      ['20:20', 'Demo Walk'],
      ['20:45', 'Naechste Schritte und WhatsApp-Gruppe'],
      ['21:00', 'Open End'],
    ],
    formKicker: 'Interessentenliste',
    formTitle: 'Komm in die erste Builder-Runde.',
    pilotDetails: 'Pilotdetails',
    organizerExport: 'Organizer-Export',
    localStorageNote: 'Eintraege werden an Formspree gesendet und zusaetzlich in diesem Browser als Organizer-Backup gespeichert.',
    stored: 'gespeicherte Eintraege',
    successTitle: 'Du bist auf der Interessentenliste.',
    successText: 'Danke. Deine Anmeldung wurde gesendet und zusaetzlich lokal als Backup gespeichert.',
    error: 'Bitte fuelle die Pflichtfelder aus, bevor du dich eintraegst.',
    sendError: 'Das Senden hat gerade nicht geklappt. Bitte pruefe deine Verbindung und versuche es erneut.',
    fields: {
      fullName: 'Vollstaendiger Name',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer, optional',
      role: 'Was beschreibt dich am besten?',
      coding: 'Kannst du coden?',
      followUp: 'Zeit fuer ein kleines Folgeprojekt nach dem Event?',
      link: 'GitHub, LinkedIn, Portfolio oder Website, optional',
      pizza: 'Pizza-Praeferenz',
      interests: 'Was interessiert dich?',
      foodNotes: 'Allergien oder Essenshinweise, optional',
      notes: 'Sonst noch etwas, das wir wissen sollten?',
      select: 'Auswaehlen',
    },
    roles: ['Programmierer', 'Informatikstudent', 'Maker', 'UI/UX Designer', 'HCI', 'Data Science / AI', 'Engineering', 'Business / Product', 'Andere'],
    codingLevels: ['Ja, sicher', 'Ja, ein bisschen', 'Ich lerne gerade', 'Nein, aber ich kann designen, recherchieren oder validieren'],
    interests: ['Web Apps', 'AI Tools', 'Automatisierung', 'SaaS', 'Hardware / IoT', 'Design / UX', 'Lokale Business-Probleme', 'Startup-Ideen', 'Einfach gute Leute treffen'],
    followUp: ['Ja', 'Vielleicht', 'Gerade nicht'],
    pizza: ['Ja, normale Pizza', 'Vegetarisch', 'Vegan', 'Keine Pizza fuer mich'],
    whatsappKicker: 'Builder-Gruppe',
    whatsappTitle: 'Updates, Problemkarten und Follow-up-Projekte an einem Ort.',
    whatsappButton: 'WhatsApp beitreten',
    shareKicker: 'Teilen',
    shareTitle: 'Kennst du jemanden, der gerne baut? Schick es weiter.',
    shareText: 'Ein guter Abend startet mit den richtigen Leuten.',
    copyLink: 'Link kopieren',
    shareButton: 'Teilen',
    sending: 'Wird gesendet...',
    copied: 'Link kopiert.',
    noShare: 'Teilen wird in diesem Browser nicht unterstuetzt. Du kannst stattdessen den Link kopieren.',
    shareNativeText: 'Kennst du jemanden, der gerne baut? Schick Pizza & Prototypes in Siegen weiter.',
    faqKicker: 'FAQ',
    faqTitle: 'Kurze Antworten vor der Anmeldung.',
    faqs: [
      ['Muss ich eine Startup-Idee mitbringen?', 'Nein. Wir bringen Problemkarten mit. Du brauchst nur Neugier und Lust zu bauen.'],
      ['Muss ich Expert Programmer sein?', 'Nein. Builder, Einsteiger, Designer, HCI-Leute und technische Problemloeser sind willkommen.'],
      ['Ist das ein Pitch-Event?', 'Nein. Es gibt keine Pitch Decks. Wir machen einen entspannten Demo Walk.'],
      ['Brauche ich einen Laptop?', 'Hilfreich, aber nicht Pflicht. Ein Laptop pro Team reicht.'],
      ['Ist das nur fuer Studierende?', 'Nein. Studierende, Hobby-Entwickler und technische Menschen aus der Region sind willkommen.'],
      ['Ist das kostenlos?', 'Fuer den ersten Pilot ja.'],
    ],
    footerSub: 'Builder-first Prototype Night in Siegen',
    footerLine: 'Made for people who prefer building over talking.',
  },
  en: {
    nav: ['How it works', 'Problem cards', 'Register'],
    joinShort: 'Join list',
    eyebrow: 'Builder-first prototype night in Siegen',
    heroTitle: 'Build something real in one evening.',
    heroText:
      'Pizza & Prototypes is a builder-first night in Siegen for developers, makers and technical students who want to turn real local problems into first prototypes.',
    primaryCta: 'Join the interest list',
    secondaryCta: 'Join the WhatsApp group',
    note: 'No pitch decks. No startup theatre. Just real problems, good people and prototypes.',
    facts: ['Real problem cards', 'Small teams', '90-minute sprint', 'Demo walk'],
    problemKicker: 'Why this exists',
    problemTitle: 'Most formats start with business theatre. This one starts with builders.',
    problemLead:
      'Many entrepreneurship formats attract business people, but not enough technical builders. Pizza & Prototypes flips the perspective: builders first, business context second.',
    problemCards: [
      ['Real problems, not fake startup ideas', 'Work starts from concrete pain points gathered from local SMEs, crafts businesses, clubs and niche industries.'],
      ['Small teams, not random networking', 'You build with a focused group around a problem card, a clear angle and a short sprint window.'],
      ['Prototype first, pitch later', 'UI sketches, workflows, code demos and validation tests matter more than polished slide decks.'],
      ['Tech majority, curated context', 'The room is designed for people who make things, with enough real-world context to keep it useful.'],
    ],
    howKicker: 'How it works',
    howTitle: 'You do not need to bring a startup idea.',
    steps: ['Pick a real problem card', 'Form a small builder team', 'Build, sketch or automate for 60 to 90 minutes', 'Demo the result or define a 7-day test'],
    examplesKicker: 'Example problem cards',
    examplesTitle: 'Concrete enough to build. Small enough to finish.',
    prototypeIdea: 'Prototype idea',
    examples: [
      ['Craft business follow-up chaos', 'Offers are sent, but follow-ups happen manually or not at all.', 'Lightweight CRM or reminder workflow.'],
      ['Club organization via WhatsApp', 'Volunteers, shifts and commitments disappear in group chats.', 'Simple helper planner or form-based workflow.'],
      ['Construction photo documentation', 'Photos are spread across phone galleries, chats and email.', 'Upload flow with project tagging.'],
      ['Maintenance and inspection reminders', 'Recurring appointments are tracked manually.', 'Automated reminder service.'],
    ],
    vibeKicker: 'What it could feel like',
    vibeTitle: 'An evening with laptops, problem cards, pizza and fast prototypes.',
    vibeText:
      'This image is intentionally generated as a preview of the desired atmosphere, not a real photo of the location.',
    locationKicker: 'Location',
    locationTitle: 'Planned at Haus der Innovation, in central Siegen.',
    locationText:
      'Startpunkt57 describes Haus der Innovation as a place for entrepreneurial spirit, networking, coworking, workshops and creative minds in Siegen.',
    sourceLabel: 'Official Startpunkt57 info',
    whoKicker: 'Who should come',
    whoTitle: 'Designed for people who like building.',
    mainly: 'Mainly for',
    also: 'Also welcome',
    whoNote: 'This is not a general networking event. It is designed for people who like building.',
    audienceMain: ['Programmers', 'Computer science students', 'Hobby developers', 'Makers', 'UI/UX and HCI people', 'Data science and AI enthusiasts', 'Technical problem solvers'],
    audienceAlso: ['Real problem access', 'Product thinking', 'Startup interest'],
    scheduleKicker: 'Schedule',
    scheduleTitle: 'A tight evening sprint with enough room to meet good people.',
    schedule: [
      ['18:30', 'Check-in, pizza and problem cards'],
      ['18:45', 'Short intro and ground rules'],
      ['18:55', 'Team formation'],
      ['19:05', 'Prototype sprint'],
      ['20:20', 'Demo walk'],
      ['20:45', 'Next steps and WhatsApp group'],
      ['21:00', 'Open end'],
    ],
    formKicker: 'Interest list',
    formTitle: 'Join the first builder cohort.',
    pilotDetails: 'Pilot details',
    organizerExport: 'Organizer export',
    localStorageNote: 'Submissions are sent to Formspree and also stored in this browser as an organizer backup.',
    stored: 'stored submissions',
    successTitle: 'You are on the interest list.',
    successText: 'Thanks. Your registration was sent and also saved locally as a backup.',
    error: 'Please fill in the required fields before joining the list.',
    sendError: 'Sending did not work right now. Please check your connection and try again.',
    fields: {
      fullName: 'Full name',
      email: 'Email address',
      phone: 'Phone number, optional',
      role: 'What describes you best?',
      coding: 'Can you code?',
      followUp: 'Time for a small follow-up project after the event?',
      link: 'GitHub, LinkedIn, portfolio or personal website, optional',
      pizza: 'Pizza preference',
      interests: 'What are you interested in?',
      foodNotes: 'Allergies or food notes, optional',
      notes: 'Anything we should know?',
      select: 'Select one',
    },
    roles: ['Programmer', 'Computer Science Student', 'Maker', 'UI/UX Designer', 'HCI', 'Data Science / AI', 'Engineering', 'Business / Product', 'Other'],
    codingLevels: ['Yes, confidently', 'Yes, a bit', 'I am learning', 'No, but I can design, research or validate'],
    interests: ['Web apps', 'AI tools', 'Automation', 'SaaS', 'Hardware / IoT', 'Design / UX', 'Local business problems', 'Startup ideas', 'Just meeting good people'],
    followUp: ['Yes', 'Maybe', 'Not right now'],
    pizza: ['Yes, normal pizza', 'Vegetarian', 'Vegan', 'No pizza for me'],
    whatsappKicker: 'Builder group',
    whatsappTitle: 'Get updates, problem cards and follow-up project threads.',
    whatsappButton: 'Join WhatsApp',
    shareKicker: 'Share',
    shareTitle: 'Know someone who likes building? Send this to them.',
    shareText: 'A good room starts with the right people.',
    copyLink: 'Copy page link',
    shareButton: 'Share',
    sending: 'Sending...',
    copied: 'Page link copied.',
    noShare: 'Sharing is not supported in this browser. You can copy the link instead.',
    shareNativeText: 'Know someone who likes building? Send them Pizza & Prototypes in Siegen.',
    faqKicker: 'FAQ',
    faqTitle: 'Small answers before you sign up.',
    faqs: [
      ['Do I need to bring a startup idea?', 'No. We bring problem cards. You only need curiosity and a willingness to build.'],
      ['Do I need to be an expert programmer?', 'No. Builders, beginners, designers, HCI people and technical problem solvers are welcome.'],
      ['Is this a pitch event?', 'No. There are no pitch decks. We use a relaxed demo walk.'],
      ['Do I need a laptop?', 'Helpful, but not mandatory. One laptop per team is enough.'],
      ['Is this only for students?', 'No. Students, hobby developers and technical people from the region are welcome.'],
      ['Is this free?', 'For the first pilot, yes.'],
    ],
    footerSub: 'Builder-first prototype night in Siegen',
    footerLine: 'Made for people who prefer building over talking.',
  },
};

const cardIcons = [Lightbulb, Users, Rocket, Code2];

function App() {
  const [lang, setLang] = useState<Lang>('de');
  const t = copy[lang];
  const [form, setForm] = useState<InterestForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registrations = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as InterestForm[];
    } catch {
      return [];
    }
  }, [submitted]);

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

    if (!form.fullName || !form.email || !form.role || !form.codingLevel || !form.followUp || !form.pizza) {
      setFormError(t.error);
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    const submission = { ...form, language: lang, submittedAt: new Date().toISOString() };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submission,
          interests: submission.interests.join(', '),
          event: 'Pizza & Prototypes',
        }),
      });

      if (!response.ok) {
        throw new Error('Formspree request failed');
      }

      // Keep a local organizer backup so the export buttons still work on this device.
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved, submission]));
      setSubmitted(true);
      setForm(initialForm);
    } catch {
      setFormError(t.sendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportData = (format: 'json' | 'csv') => {
    const raw = localStorage.getItem(STORAGE_KEY) ?? '[]';
    const data = JSON.parse(raw);
    const content = format === 'json' ? JSON.stringify(data, null, 2) : toCsv(data as Record<string, unknown>[]);
    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pizza-prototypes-interest-list.${format}`;
    link.click();
    URL.revokeObjectURL(url);
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
      title: 'Pizza & Prototypes',
      text: t.shareNativeText,
      url: window.location.href,
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#07080d] text-slate-100">
      <BackgroundScene />
      <Header lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} />
      <ProblemSection t={t} />
      <HowItWorks t={t} />
      <ExampleProblems t={t} />
      <VibeSection t={t} />
      <LocationSection t={t} lang={lang} />
      <WhoShouldCome t={t} />
      <Schedule t={t} />
      <Registration
        t={t}
        form={form}
        submitted={submitted}
        formError={formError}
        registrationsCount={registrations.length}
        isSubmitting={isSubmitting}
        updateField={updateField}
        toggleInterest={toggleInterest}
        handleSubmit={handleSubmit}
        exportData={exportData}
      />
      <WhatsAppSection t={t} />
      <ShareSection t={t} copyLink={copyLink} nativeShare={nativeShare} shareMessage={shareMessage} />
      <FAQ t={t} />
      <Footer t={t} />
    </main>
  );
}

function Header({ lang, setLang, t }: { lang: Lang; setLang: (lang: Lang) => void; t: typeof copy.de }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07080d]/75 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
        <a href="#top" className="flex min-w-0 items-center gap-2 font-semibold tracking-tight sm:gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/8">
            <Pizza className="h-5 w-5 text-orange-300" aria-hidden="true" />
          </span>
          <span className="truncate">Pizza & Prototypes</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
          <a href="#how" className="hover:text-white">{t.nav[0]}</a>
          <a href="#cards" className="hover:text-white">{t.nav[1]}</a>
          <a href="#register" className="hover:text-white">{t.nav[2]}</a>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle lang={lang} setLang={setLang} />
          <a href="#register" className="btn btn-compact hidden sm:inline-flex">
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
      <button type="button" className={lang === 'de' ? 'active' : ''} onClick={() => setLang('de')}>
        DE
      </button>
      <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
        EN
      </button>
    </div>
  );
}

function Hero({ t, lang }: { t: typeof copy.de; lang: Lang }) {
  return (
    <section id="top" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-5 sm:pb-20 sm:pt-32 lg:grid-cols-[1.02fr_0.98fr]">
      <div className="max-w-3xl">
        <div className="eyebrow mb-6">
          <Sparkles className="h-4 w-4 text-cyan-300" aria-hidden="true" />
          {t.eyebrow}
        </div>
        <h1 className="max-w-5xl text-[clamp(2.8rem,13vw,4.2rem)] font-semibold leading-[0.98] tracking-tight text-white lg:text-7xl">
          {t.heroTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-xl">{t.heroText}</p>
        <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
          <HeroFact icon={CalendarDays} label={EVENT.date[lang]} />
          <HeroFact icon={Timer} label={EVENT.time} />
          <HeroFact icon={MapPin} label={EVENT.location} />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#register" className="btn btn-primary">
            {t.primaryCta}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <a href={EVENT.whatsappLink} className="btn btn-secondary" target="_blank" rel="noreferrer">
            {t.secondaryCta}
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-400">{t.note}</p>
      </div>
      <HeroVisual t={t} />
    </section>
  );
}

function HeroVisual({ t }: { t: typeof copy.de }) {
  return (
    <div className="relative">
      <div className="terminal-card">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex gap-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs text-slate-500">prototype-night.tsx</span>
        </div>
        <div className="space-y-5 p-5 font-mono text-xs sm:p-6 sm:text-sm">
          <CodeLine muted value="const night = createEvent({" />
          <CodeLine indent value='mode: "builder-first",' />
          <CodeLine indent value='input: "real local problems",' />
          <CodeLine indent value='output: ["workflow", "UI", "code demo"],' />
          <CodeLine indent value='avoid: ["pitch decks", "startup theatre"],' />
          <CodeLine muted value="});" />
          <div className="grid gap-3 pt-3 sm:grid-cols-2">
            {t.facts.map((item) => (
              <div key={item} className="rounded-lg border border-cyan-300/20 bg-cyan-300/7 px-4 py-3 text-cyan-100">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="floating-chip left-2 top-8">
        <Network className="h-4 w-4" /> SME problem input
      </div>
      <div className="floating-chip bottom-10 right-0">
        <WandSparkles className="h-4 w-4" /> 7-day test output
      </div>
    </div>
  );
}

function ProblemSection({ t }: { t: typeof copy.de }) {
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

function HowItWorks({ t }: { t: typeof copy.de }) {
  return (
    <Section id="how" kicker={t.howKicker} title={t.howTitle}>
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

function ExampleProblems({ t }: { t: typeof copy.de }) {
  return (
    <Section id="cards" kicker={t.examplesKicker} title={t.examplesTitle}>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {t.examples.map(([title, description, prototype]) => (
          <article key={title} className="problem-card">
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">
                {t.examplesKicker}
              </span>
              <Workflow className="h-5 w-5 text-orange-300" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-white sm:text-2xl">{title}</h3>
            <p className="mt-4 leading-7 text-slate-300">{description}</p>
            <div className="mt-6 rounded-lg border border-emerald-300/15 bg-emerald-300/8 p-4">
              <p className="text-sm font-medium text-emerald-200">{t.prototypeIdea}</p>
              <p className="mt-1 text-slate-300">{prototype}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function VibeSection({ t }: { t: typeof copy.de }) {
  return (
    <Section id="vibe" kicker={t.vibeKicker} title={t.vibeTitle}>
      <figure className="vibe-frame mt-10">
        <img src={prototypeNightImage} alt="Generated preview of teams working together at Pizza & Prototypes" />
        <figcaption>
          <ImageIcon className="h-4 w-4" aria-hidden="true" />
          {t.vibeText}
        </figcaption>
      </figure>
    </Section>
  );
}

function LocationSection({ t, lang }: { t: typeof copy.de; lang: Lang }) {
  return (
    <Section id="location" kicker={t.locationKicker} title={t.locationTitle}>
      <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-card p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-white">{EVENT.location}</h3>
          <div className="mt-6 space-y-4">
            <InfoRow icon={CalendarDays} label={EVENT.date[lang]} />
            <InfoRow icon={Timer} label={EVENT.time} />
            <InfoRow icon={MapPin} label={`${EVENT.locationFlexible[lang]} · ${EVENT.address}`} />
          </div>
        </div>
        <div className="location-panel">
          <p>{t.locationText}</p>
          <a href="https://www.startpunkt57.de/in/haus-der-innovation" target="_blank" rel="noreferrer" className="btn btn-secondary mt-6">
            {t.sourceLabel}
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Section>
  );
}

function WhoShouldCome({ t }: { t: typeof copy.de }) {
  return (
    <Section id="who" kicker={t.whoKicker} title={t.whoTitle}>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-white">{t.mainly}</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.audienceMain.map((item) => (
              <CheckPill key={item}>{item}</CheckPill>
            ))}
          </div>
        </div>
        <div className="glass-card p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-white">{t.also}</h3>
          <div className="mt-6 space-y-3">
            {t.audienceAlso.map((item) => (
              <CheckPill key={item}>{item}</CheckPill>
            ))}
          </div>
          <p className="mt-6 leading-7 text-slate-300">{t.whoNote}</p>
        </div>
      </div>
    </Section>
  );
}

function Schedule({ t }: { t: typeof copy.de }) {
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

type RegistrationProps = {
  t: typeof copy.de;
  form: InterestForm;
  submitted: boolean;
  formError: string;
  registrationsCount: number;
  isSubmitting: boolean;
  updateField: (field: keyof InterestForm, value: string) => void;
  toggleInterest: (interest: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  exportData: (format: 'json' | 'csv') => void;
};

function Registration({ t, form, submitted, formError, registrationsCount, isSubmitting, updateField, toggleInterest, handleSubmit, exportData }: RegistrationProps) {
  return (
    <Section id="register" kicker={t.formKicker} title={t.formTitle}>
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="glass-card p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-white">{t.pilotDetails}</h3>
          <div className="mt-7 space-y-4">
            <InfoRow icon={CalendarDays} label={EVENT.date.de} />
            <InfoRow icon={Timer} label={EVENT.time} />
            <InfoRow icon={MapPin} label={EVENT.locationFlexible.de} />
          </div>
          <div className="mt-8 rounded-xl border border-orange-300/20 bg-orange-300/8 p-5">
            <p className="font-medium text-orange-100">{t.organizerExport}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{t.localStorageNote}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" className="btn btn-small" onClick={() => exportData('json')}>
                <Download className="h-4 w-4" /> JSON
              </button>
              <button type="button" className="btn btn-small" onClick={() => exportData('csv')}>
                <Download className="h-4 w-4" /> CSV
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-500">{registrationsCount} {t.stored}</p>
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
            </div>
          )}
          {formError && <p className="mb-5 rounded-lg border border-rose-300/25 bg-rose-300/10 p-4 text-sm text-rose-100">{formError}</p>}

          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label={t.fields.fullName} required value={form.fullName} onChange={(value) => updateField('fullName', value)} />
            <TextInput label={t.fields.email} required type="email" value={form.email} onChange={(value) => updateField('email', value)} />
            <TextInput label={t.fields.phone} value={form.phone} onChange={(value) => updateField('phone', value)} />
            <SelectInput label={t.fields.role} required value={form.role} options={t.roles} placeholder={t.fields.select} onChange={(value) => updateField('role', value)} />
            <SelectInput label={t.fields.coding} required value={form.codingLevel} options={t.codingLevels} placeholder={t.fields.select} onChange={(value) => updateField('codingLevel', value)} />
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
        </form>
      </div>
    </Section>
  );
}

function WhatsAppSection({ t }: { t: typeof copy.de }) {
  return (
    <Section id="whatsapp" kicker={t.whatsappKicker} title={t.whatsappTitle}>
      <div className="cta-card">
        <div>
          <p className="eyebrow mb-5 w-max">
            <MessageCircle className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            {t.whatsappKicker}
          </p>
          <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">{t.whatsappTitle}</h3>
        </div>
        <a href={EVENT.whatsappLink} className="btn btn-primary" target="_blank" rel="noreferrer">
          {t.whatsappButton}
          <ExternalLink className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}

function ShareSection({ t, copyLink, nativeShare, shareMessage }: { t: typeof copy.de; copyLink: () => void; nativeShare: () => void; shareMessage: string }) {
  return (
    <Section id="share" kicker={t.shareKicker} title={t.shareTitle}>
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
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

function FAQ({ t }: { t: typeof copy.de }) {
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

function Footer({ t }: { t: typeof copy.de }) {
  return (
    <footer className="relative mx-auto max-w-7xl border-t border-white/10 px-5 py-10 text-sm text-slate-400">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">Pizza & Prototypes</p>
          <p>{t.footerSub}</p>
        </div>
        <p>{t.footerLine}</p>
      </div>
    </footer>
  );
}

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-24">
      <div className="max-w-3xl">
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

function HeroFact({ icon: Icon, label }: { icon: typeof CalendarDays; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
      <Icon className="mb-3 h-5 w-5 text-cyan-300" aria-hidden="true" />
      <p className="text-sm leading-6 text-slate-200">{label}</p>
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

function CheckPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-200">
      <Check className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
      {children}
    </div>
  );
}

function InfoRow({ icon: Icon, label }: { icon: typeof CalendarDays; label: string }) {
  return (
    <div className="flex items-start gap-3 text-slate-200">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function TextInput({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectInput({ label, value, options, placeholder, onChange, required = false }: { label: string; value: string; options: string[]; placeholder: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="field">
      <span>{label}</span>
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

function CodeLine({ value, indent = false, muted = false }: { value: string; indent?: boolean; muted?: boolean }) {
  return (
    <p className={`${indent ? 'pl-5 sm:pl-6' : ''} ${muted ? 'text-slate-500' : 'text-slate-200'}`}>
      <span className="text-slate-600">›</span> {value}
    </p>
  );
}

function BackgroundScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_80%_25%,rgba(251,146,60,0.12),transparent_25%),linear-gradient(180deg,#07080d_0%,#0b1020_50%,#07080d_100%)]" />
      <div className="grid-overlay" />
    </div>
  );
}

function toCsv(rows: Record<string, unknown>[]) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const escapeCell = (value: unknown) => {
    const text = Array.isArray(value) ? value.join('; ') : String(value ?? '');
    return `"${text.replace(/"/g, '""')}"`;
  };
  return [headers.join(','), ...rows.map((row) => headers.map((header) => escapeCell(row[header])).join(','))].join('\n');
}

export default App;
