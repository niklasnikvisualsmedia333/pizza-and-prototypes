const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

export const ASSETS = {
  logo: asset('logo-tech-meets-problems-dark-optimized.jpg'),
  logoTransparent: asset('logo-tech-meets-problems-transparent.png'),
  supporterStartpunkt57: asset('logo-startpunkt57.png'),
  supporterEntrepreneurshipCenter: asset('logo-entrepreneurship-center.png'),
  teamProfiles: [
    asset('niklas-bruene.jpg'),
    asset('frederik-krause.jpg'),
    asset('johanna-brenner.jpg'),
  ],
  event: {
    team: asset('event-1/01-team-organizers-close.jpg'),
    pizza: asset('event-1/03-pizza-catering.jpg'),
    builderDiscussion: asset('event-1/04-builder-team-laptop-discussion.jpg'),
    companyHero: asset('event-1/07-event-room-builder-teams-wide.jpg'),
    roomWide: asset('event-1/06-teamwork-community-wide.jpg'),
    roomAlternative: asset('event-1/07-event-room-builder-teams-wide.jpg'),
    communityHero: asset('event-1/08-event-room-problem-boards-wide.jpg'),
    conceptReview: asset('event-1/12-builder-team-concept-review.jpg'),
    codeCloseup: asset('event-1/13-code-closeup-dark-laptop.jpg'),
    codeReview: asset('event-1/14-code-review-pointing-screen.jpg'),
    presenterProjector: asset('event-1/16-demo-presentation-projector-portrait.jpg'),
    demo: asset('event-1/17-demo-proofsiteai-board.jpg'),
    teamSpeaking: asset('event-1/19-team-organizers-speaking.jpg'),
  },
} as const;

const eventImage = (filename: string, width: number, height: number) => ({
    src: asset(`event-1/${filename}`),
    lightboxSrc: asset(`event-1/${filename}`),
    thumbnail: asset(`event-1/optimized/${filename.replace(/\.jpg$/, '')}-320.webp`),
    medium: asset(`event-1/optimized/${filename.replace(/\.jpg$/, '')}-768.webp`),
    large: asset(`event-1/optimized/${filename.replace(/\.jpg$/, '')}-1280.webp`),
    width,
    height,
});

export const EVENT_MEDIA = {
  communityHero: {
    src: ASSETS.event.communityHero,
    width: 2048,
    height: 1365,
  },
  roomAlternative: {
    ...eventImage('07-event-room-builder-teams-wide.jpg', 2048, 1365),
    fit: 'cover' as const,
    objectPosition: 'center',
  },
  builderDiscussion: {
    ...eventImage('04-builder-team-laptop-discussion.jpg', 2048, 1365),
    fit: 'contain' as const,
  },
  codeCloseup: {
    ...eventImage('13-code-closeup-dark-laptop.jpg', 2048, 1365),
    fit: 'contain' as const,
  },
  presenterProjector: {
    ...eventImage('16-demo-presentation-projector-portrait.jpg', 1365, 2048),
    fit: 'contain' as const,
  },
  demo: {
    ...eventImage('17-demo-proofsiteai-board.jpg', 2048, 1365),
    fit: 'contain' as const,
  },
  companyHero: {
    src: ASSETS.event.companyHero,
    width: 2048,
    height: 1365,
  },
  roomWide: {
    src: ASSETS.event.roomWide,
    width: 2048,
    height: 1365,
  },
} as const;
