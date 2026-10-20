import { ExternalLink } from 'lucide-react';
import { ASSETS } from '../../config/assets';
import { SITE } from '../../config/site';
import { sharedContent } from '../../content/shared';
import type { Lang } from '../../lib/language';

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

type Organization = {
  name: string;
  href: string;
  logo: string;
  width: number;
  height: number;
  darkBackground?: boolean;
};

const supporters: Organization[] = [
  { name: 'Startpunkt57', href: SITE.supporters.startpunkt57, logo: ASSETS.supporterStartpunkt57, width: 1000, height: 260 },
  { name: 'Entrepreneurship Center Universität Siegen', href: SITE.supporters.entrepreneurshipCenter, logo: ASSETS.supporterEntrepreneurshipCenter, width: 1000, height: 260 },
];

const network: Organization[] = [
  ...supporters,
  { name: 'Ingenieurgemeinschaft Klietsch GmbH', href: SITE.network.klietsch, logo: ASSETS.networkKlietsch, width: 567, height: 201 },
  { name: 'AutomatIQ Synergies GmbH', href: SITE.network.automatiqSynergies, logo: ASSETS.networkAutomatiqSynergies, width: 640, height: 129 },
  { name: 'Jarvis GmbH', href: SITE.network.jarvis, logo: ASSETS.networkJarvis, width: 640, height: 202, darkBackground: true },
];

function OrganizationLinks({ organizations, eager = false }: { organizations: Organization[]; eager?: boolean }) {
  return organizations.map((organization) => (
    <a
      key={organization.name}
      href={organization.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={organization.name}
      className={organization.darkBackground ? 'logo-dark-background' : undefined}
    >
      <img src={organization.logo} alt={organization.name} width={organization.width} height={organization.height} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </a>
  ));
}

export function Supporters({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  return (
    <div className={`supporter-strip${compact ? ' supporter-strip-compact' : ''}`}>
      <span>{sharedContent[lang].supportedBy}</span>
      <OrganizationLinks organizations={supporters} eager={compact} />
    </div>
  );
}

export function NetworkSection({ lang }: { lang: Lang }) {
  const content = sharedContent[lang];

  return (
    <section className="page-section page-section-compact network-section" aria-labelledby="network-title">
      <div className="site-shell">
        <h2 id="network-title">{content.networkTitle}</h2>
        <p>{content.networkText}</p>
        <div className="supporter-strip network-logos">
          <OrganizationLinks organizations={network} />
        </div>
      </div>
    </section>
  );
}

export function TeamBlock({
  storyTitle,
  storyParagraphs,
  imageAlt,
  members,
}: {
  storyTitle: string;
  storyParagraphs: string[];
  imageAlt: string;
  members: Array<{ name: string; role: string; description: string }>;
}) {
  const linkedInProfiles: Record<string, string> = {
    'Frederik Krause': 'https://www.linkedin.com/in/frederik-krause-a80448277/',
    'Johanna Brenner': 'https://www.linkedin.com/in/johanna-brenner-619a36328',
    'Niklas Brüne': 'https://www.linkedin.com/in/niklas-bruene',
  };

  return (
    <div className="team-block">
      <figure className="team-photo">
        <img src={ASSETS.event.team} alt={imageAlt} width="2048" height="1365" loading="lazy" decoding="async" />
      </figure>
      <div className="team-copy">
        <h3>{storyTitle}</h3>
        {storyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="team-list">
        {members.map((member) => (
          <article key={member.name}>
            <div>
              <strong>{member.name}</strong>
              <span>{member.role}</span>
              <p>{member.description}</p>
              <a
                href={linkedInProfiles[member.name]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} LinkedIn`}
              >
                LinkedIn <ExternalLink aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
