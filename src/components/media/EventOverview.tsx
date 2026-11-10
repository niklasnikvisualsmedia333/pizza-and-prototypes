import { ExternalLink } from 'lucide-react';
import { PAST_EVENTS } from '../../config/events';
import type { Lang } from '../../lib/language';
import { EventGallery } from './EventGallery';

export function EventOverview({ lang, page }: { lang: Lang; page: 'community' | 'company' }) {
  const de = lang === 'de';
  const events = PAST_EVENTS.filter((event) => event.recap);
  return (
    <section id={page === 'community' ? 'recap' : 'pilot-proof'} className="page-section page-section-muted">
      <div className="site-shell">
        <h2 className="event-overview-title">{page === 'community' ? (de ? 'Unsere bisherigen Events' : 'Our past events') : (de ? 'Tech Meets Problems in der Praxis' : 'Tech Meets Problems in practice')}</h2>
        <div className="event-overview-list">
          {events.map((event) => {
            const recap = event.recap!;
            const title = de ? recap.titleDe ?? event.titleDe : recap.titleEn ?? event.titleEn;
            const images = recap.images.map((image, index) => ({ ...image, alt: `${title}: ${de ? 'Eventfoto' : 'event photo'} ${index + 1}`, caption: `${title} · ${index + 1}` }));
            return <article key={event.slug} className="event-overview-card">
              <img className="event-overview-cover" src={recap.images[0].thumbnail ?? recap.images[0].src} alt={`${title}: ${de ? 'Eventfoto' : 'event photo'}`} loading="lazy" decoding="async" width={recap.images[0].width} height={recap.images[0].height} />
              <div className="event-overview-content">
                <time dateTime={event.date}>{new Intl.DateTimeFormat(de ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${event.date}T12:00:00`))}</time>
                <h3>{title}</h3>
                {event.speaker && <p>{event.speaker}{event.company ? ` · ${event.company.name}` : ''}</p>}
                <div className="event-overview-actions">
                  <EventGallery images={images} lightboxLabel={title} previousLabel={de ? 'Vorheriges Bild' : 'Previous image'} nextLabel={de ? 'Nächstes Bild' : 'Next image'} closeLabel={de ? 'Schließen' : 'Close'} triggerLabel={de ? 'Fotos ansehen' : 'View photos'} />
                  <a className="event-overview-action" href={recap.aftermovie} target="_blank" rel="noopener noreferrer">{de ? 'Aftermovie ansehen' : 'Watch aftermovie'} <ExternalLink aria-hidden="true" /></a>
                </div>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
