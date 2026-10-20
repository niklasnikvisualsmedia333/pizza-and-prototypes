import { ASSETS } from './assets';
import { SITE } from './site';

export type EventStatus = 'past' | 'upcoming' | 'draft';
export type RegistrationStatus = 'closed' | 'open' | 'waitlist' | 'sold_out';

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
  recapUrl?: string;
  descriptionDe: string;
  descriptionEn: string;
};

export const EVENTS: SiteEvent[] = [
  {
    slug: 'pizza-and-prototypes-2026',
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
    status: 'upcoming',
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
    registrationStatus: 'open',
    registrationUrl: 'https://forms.gle/X49w7RSGtuF3Ay4q8',
    descriptionDe:
      'Einblicke in den Aufbau eines KI-Startups, den Einsatz von KI in industriellen Workflows und Entrepreneurship. Dazu gibt es eine offene Fragerunde. Im Anschluss ist Zeit für kostenlose Getränke und lockeren Austausch.',
    descriptionEn:
      'Insights into building an AI startup, real-world applications of AI in industrial workflows and entrepreneurship, followed by an open Q&A. Free drinks and informal conversations afterward.',
  },
];

const byDateAscending = (a: SiteEvent, b: SiteEvent) => a.date.localeCompare(b.date);

export const UPCOMING_EVENTS = EVENTS
  .filter((event) => event.status === 'upcoming')
  .sort(byDateAscending);

export const PAST_EVENTS = EVENTS
  .filter((event) => event.status === 'past')
  .sort((a, b) => byDateAscending(b, a));
