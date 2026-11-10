import { ASSETS, EVENT_MEDIA } from './assets';
import { SITE } from './site';

export type EventStatus = 'past' | 'upcoming' | 'draft';
export type RegistrationStatus = 'closed' | 'open' | 'waitlist' | 'sold_out';

type RecapImage = { src: string; thumbnail?: string; cardSrc?: string; cardSrcSet?: string; width: number; height: number; objectPosition?: string };
const recapImage = (index: number, width = 2048, height = 1365, objectPosition?: string): RecapImage => ({
  src: `${import.meta.env.BASE_URL}assets/event-overview/${index}-1600.webp`,
  thumbnail: `${import.meta.env.BASE_URL}assets/event-overview/${index}-480.webp`,
  cardSrc: `${import.meta.env.BASE_URL}assets/event-overview/${index === 2 ? '2-card-960' : `${index}-960`}.webp`,
  cardSrcSet: index === 2 ? undefined : `${import.meta.env.BASE_URL}assets/event-overview/${index}-480.webp 480w, ${import.meta.env.BASE_URL}assets/event-overview/${index}-960.webp 960w, ${import.meta.env.BASE_URL}assets/event-overview/${index}-1600.webp 1600w`,
  width, height, objectPosition,
});
const existingRecapImages = [EVENT_MEDIA.roomAlternative, EVENT_MEDIA.builderDiscussion, EVENT_MEDIA.codeCloseup, EVENT_MEDIA.presenterProjector, EVENT_MEDIA.demo].map((image) => ({
  src: image.large ?? image.src,
  thumbnail: image.thumbnail,
  cardSrc: image.width < image.height ? image.large : image.medium,
  cardSrcSet: image.width < image.height ? undefined : `${image.medium} 768w, ${image.large} 1280w`,
  width: image.width,
  height: image.height,
}));

export type SiteEvent = {
  slug: string;
  status: EventStatus;
  titleDe: string;
  titleEn: string;
  subtitleDe: string;
  subtitleEn: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  address?: string;
  speaker?: string;
  company?: { name: string; url: string };
  eventTypeDe?: string;
  eventTypeEn?: string;
  language: string;
  capacity?: number;
  image: string;
  registrationStatus: RegistrationStatus;
  registrationUrl?: string;
  registrationNoteDe?: string;
  registrationNoteEn?: string;
  registrationCtaDe?: string;
  registrationCtaEn?: string;
  recapUrl?: string;
  recap?: { images: RecapImage[]; aftermovie: string; titleDe?: string; titleEn?: string; summaryDe: string; summaryEn: string };
  descriptionDe: string;
  descriptionEn: string;
};

export const EVENTS: SiteEvent[] = [
  {
    slug: 'pizza-and-prototypes-2026',
    recap: { images: [existingRecapImages[0], recapImage(1), ...existingRecapImages.slice(1)], aftermovie: SITE.aftermovie.url, summaryDe: 'Kleine Teams entwickelten Ideen zu einer echten Herausforderung.', summaryEn: 'Small teams developed ideas around a real challenge.' },
    status: 'past',
    titleDe: 'Pizza & Prototypes',
    titleEn: 'Pizza & Prototypes',
    subtitleDe: 'Erster Pilot von Tech Meets Problems',
    subtitleEn: 'The first Tech Meets Problems pilot',
    date: '2026-06-26',
    startTime: '18:00',
    endTime: '21:00',
    location: 'Startpunkt57 / Haus der Innovation',
    address: 'Sandstraße 26, 57072 Siegen',
    language: 'DE / EN',
    capacity: 30,
    image: ASSETS.event.roomAlternative,
    registrationStatus: 'closed',
    descriptionDe:
      'Builder, technische Studierende und junge Talente arbeiteten in kleinen Teams an einem realen, anonymisierten Problemraum.',
    descriptionEn:
      'Builders, technical students and young talent worked in small teams on a real, anonymized problem space.',
  },
  {
    slug: 'ai-in-software-development-2026',
    recap: { images: [recapImage(2, 1365, 2048, 'center 25%'), recapImage(3), recapImage(4)], aftermovie: 'https://de.linkedin.com/posts/niklas-bruene_techmeetsproblems-openinnovation-techtalents-activity-7501519713097699328-ibGa', titleDe: 'AI in Software Development – From Euphoria to Reality', titleEn: 'AI in Software Development – From Euphoria to Reality', summaryDe: 'Ein Vortrag und Austausch über KI in der Softwareentwicklung.', summaryEn: 'A talk and discussion about AI in software development.' },
    status: 'past',
    titleDe: 'AI in Software Development',
    titleEn: 'AI in Software Development',
    subtitleDe: 'From Euphoria to Reality',
    subtitleEn: 'From Euphoria to Reality',
    date: '2026-08-06',
    startTime: '18:00',
    endTime: '20:00',
    location: 'Startpunkt57 / Haus der Innovation',
    address: 'Sandstraße 26, 57072 Siegen',
    speaker: 'Sebastian Klietsch',
    company: { name: 'Ingenieurgemeinschaft Klietsch GmbH', url: SITE.network.klietsch },
    eventTypeDe: 'Vortrag & Austausch',
    eventTypeEn: 'Talk & discussion',
    language: 'DE / EN',
    image: ASSETS.event.roomAlternative,
    registrationStatus: 'closed',
    descriptionDe: 'Vortrag und anschließender Austausch über den Einsatz von KI in der Softwareentwicklung.',
    descriptionEn: 'A talk followed by discussion about the use of AI in software development.',
  },
  {
    slug: 'tech-talks-niklas-woelfl-automatiq-2026',
    recap: { images: [recapImage(5), recapImage(6), recapImage(7), recapImage(8)], aftermovie: 'https://lnkd.in/p/gauSjxYU', summaryDe: 'Einblicke in den Aufbau eines KI-Startups und industrielle KI-Anwendungen.', summaryEn: 'Insights into building an AI startup and industrial AI applications.' },
    status: 'past',
    titleDe: 'Tech Talks by TMP: Niklas Wölfl × AutomatIQ Synergies',
    titleEn: 'Tech Talks by TMP: Niklas Wölfl × AutomatIQ Synergies',
    subtitleDe: 'Eintritt frei · Vortrag auf Englisch',
    subtitleEn: 'Free admission · Talk in English',
    date: '2026-10-29',
    startTime: '18:00',
    location: 'Startpunkt57 / Haus der Innovation',
    address: 'Sandstraße 26, 57072 Siegen, Germany',
    speaker: 'Niklas Wölfl',
    company: { name: 'AutomatIQ Synergies GmbH', url: SITE.network.automatiqSynergies },
    eventTypeDe: 'Vortrag & offene Fragerunde',
    eventTypeEn: 'Talk & open Q&A',
    language: 'EN',
    image: ASSETS.event.roomAlternative,
    registrationStatus: 'closed',
    registrationUrl: 'https://forms.gle/X49w7RSGtuF3Ay4q8',
    descriptionDe:
      'Einblicke in den Aufbau eines KI-Startups, den Einsatz von KI in industriellen Workflows und Entrepreneurship. Dazu gibt es eine offene Fragerunde. Im Anschluss ist Zeit für kostenlose Getränke und lockeren Austausch.',
    descriptionEn:
      'Insights into building an AI startup, real-world applications of AI in industrial workflows and entrepreneurship, followed by an open Q&A. Free drinks and informal conversations afterward.',
  },
  {
    slug: 'pizza-and-prototypes-pagyz-2026',
    status: 'upcoming',
    titleDe: 'Pizza & Prototypes × Pagyz',
    titleEn: 'Pizza & Prototypes × Pagyz',
    subtitleDe: 'Kostenlos · Echte Probleme. Kleine Teams. Gemeinsam etwas entwickeln.',
    subtitleEn: 'Free admission · Real problems. Small teams. Hands-on building.',
    date: '2026-11-18',
    startTime: '17:30',
    endTime: '20:30',
    location: 'Startpunkt57 / Haus der Innovation',
    address: 'Sandstraße 26, 57072 Siegen, Germany',
    eventTypeDe: 'Workshop · Pizza & Getränke inklusive',
    eventTypeEn: 'Workshop · Free pizza & drinks',
    language: 'EN',
    capacity: 30,
    image: ASSETS.event.roomAlternative,
    registrationStatus: 'open',
    registrationUrl: 'https://forms.gle/YMBLpsbM746i9xHk7',
    registrationNoteDe: 'Eine Anmeldung ist erforderlich. Es gibt rund 30 Plätze. Dein Platz wird separat per E-Mail bestätigt.',
    registrationNoteEn: 'Registration is required. Places are limited to around 30 participants. Your place will be confirmed by email.',
    registrationCtaDe: 'Jetzt zum Workshop anmelden',
    registrationCtaEn: 'Register for the workshop',
    descriptionDe: 'Gemeinsam mit Pagyz, einem KI-Startup für intelligentere wissenschaftliche Recherche, arbeiten wir an sechs echten Herausforderungen aus KI, Software und UX. In kleinen Teams entwickeln wir Ideen, Workflows, Mockups oder erste Prototypen. Willkommen sind Menschen aus Informatik, KI, Design, HCI/UX, Produktentwicklung und Business.',
    descriptionEn: 'Join us for a hands-on workshop with Pagyz, an AI startup building smarter tools for scientific research. Choose from six real challenges in AI, software and UX and develop ideas, workflows, mockups or first prototypes in small teams. Open to developers, designers, students and business-minded problem-solvers.',
  },
];

const byDateAscending = (a: SiteEvent, b: SiteEvent) => a.date.localeCompare(b.date);

export const UPCOMING_EVENTS = EVENTS
  .filter((event) => event.status === 'upcoming')
  .sort(byDateAscending);

export const PAST_EVENTS = EVENTS
  .filter((event) => event.status === 'past')
  .sort((a, b) => byDateAscending(b, a));
