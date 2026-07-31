import { ASSETS } from './assets';

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
    status: 'upcoming',
    titleDe: 'AI in Software Development',
    titleEn: 'AI in Software Development',
    subtitleDe: 'A Great New Chance or Just Marketing?',
    subtitleEn: 'A Great New Chance or Just Marketing?',
    date: '2026-08-06',
    startTime: '18:00',
    eventTypeDe: 'Vortrag & Austausch',
    eventTypeEn: 'Talk & discussion',
    language: 'DE / EN',
    image: ASSETS.event.roomAlternative,
    registrationStatus: 'open',
    descriptionDe: 'Vortrag und anschließender Austausch über den Einsatz von KI in der Softwareentwicklung.',
    descriptionEn: 'A talk followed by discussion about the use of AI in software development.',
  },
];

const byDateAscending = (a: SiteEvent, b: SiteEvent) => a.date.localeCompare(b.date);

export const UPCOMING_EVENTS = EVENTS
  .filter((event) => event.status === 'upcoming')
  .sort(byDateAscending);

export const PAST_EVENTS = EVENTS
  .filter((event) => event.status === 'past')
  .sort((a, b) => byDateAscending(b, a));
