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
    companyHero: asset('event-1/05-teamwork-canvas-wide.jpg'),
    roomWide: asset('event-1/06-teamwork-community-wide.jpg'),
    roomAlternative: asset('event-1/07-event-room-builder-teams-wide.jpg'),
    communityHero: asset('event-1/08-event-room-problem-boards-wide.jpg'),
    conceptReview: asset('event-1/12-builder-team-concept-review.jpg'),
    codeReview: asset('event-1/14-code-review-pointing-screen.jpg'),
    presenterProjector: asset('event-1/16-demo-presentation-projector-portrait.jpg'),
    demo: asset('event-1/17-demo-proofsiteai-board.jpg'),
    teamSpeaking: asset('event-1/19-team-organizers-speaking.jpg'),
  },
} as const;
