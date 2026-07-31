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

export function Supporters({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const content = sharedContent[lang];

  return (
    <div className={`supporter-strip${compact ? ' supporter-strip-compact' : ''}`}>
      <span>{content.supportedBy}</span>
      <a href={SITE.supporters.startpunkt57} target="_blank" rel="noopener noreferrer" aria-label="Startpunkt57">
        <img
          src={ASSETS.supporterStartpunkt57}
          alt="Startpunkt57"
          width="620"
          height="180"
          loading={compact ? 'eager' : 'lazy'}
        />
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
          loading={compact ? 'eager' : 'lazy'}
        />
      </a>
    </div>
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

export function PreviewNotice({ lang }: { lang: Lang }) {
  if (import.meta.env.VITE_SITE_ENV !== 'preview') {
    return null;
  }

  return (
    <aside className="preview-notice" aria-label={lang === 'de' ? 'Hinweis zur Vorschau' : 'Preview notice'}>
      <strong>{lang === 'de' ? 'Interne Vorschau' : 'Internal preview'}</strong>
      <span>
        {lang === 'de'
          ? 'Community-Anmeldungen in dieser Vorschau sind echte Übermittlungen. Bitte nur bewusst mit Testdaten absenden.'
          : 'Community signups in this preview are real submissions. Please only submit intentional test data.'}
      </span>
    </aside>
  );
}
