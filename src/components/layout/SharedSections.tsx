import { Check, ExternalLink } from 'lucide-react';
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

export function Supporters({ lang }: { lang: Lang }) {
  const content = sharedContent[lang];

  return (
    <div className="supporter-strip">
      <span>{content.supportedBy}</span>
      <a href={SITE.supporters.startpunkt57} target="_blank" rel="noopener noreferrer" aria-label="Startpunkt57">
        <img src={ASSETS.supporterStartpunkt57} alt="Startpunkt57" width="620" height="180" loading="lazy" />
      </a>
      <a
        href={SITE.supporters.entrepreneurshipCenter}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Entrepreneurship Center Universität Siegen"
      >
        <img
          src={ASSETS.supporterEntrepreneurshipCenter}
          alt="Entrepreneurship Center Universität Siegen"
          width="620"
          height="180"
          loading="lazy"
        />
      </a>
    </div>
  );
}

export function TeamBlock({
  lang,
  title,
  text,
  imageAlt,
  members,
}: {
  lang: Lang;
  title: string;
  text: string;
  imageAlt: string;
  members: Array<{ name: string; role: string }>;
}) {
  const linkedInProfiles = [
    'https://www.linkedin.com/in/niklas-bruene',
    'https://www.linkedin.com/in/frederik-krause-a80448277/',
    'https://www.linkedin.com/in/johanna-brenner-619a36328',
  ];

  return (
    <div className="team-block">
      <figure className="team-photo">
        <img src={ASSETS.event.team} alt={imageAlt} width="2048" height="1365" loading="lazy" />
      </figure>
      <div className="team-copy">
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="team-list">
          {members.map((member, index) => (
            <article key={member.name}>
              <Check aria-hidden="true" />
              <div>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
                <a href={linkedInProfiles[index]} target="_blank" rel="noopener noreferrer">
                  LinkedIn <ExternalLink aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Supporters lang={lang} />
    </div>
  );
}

