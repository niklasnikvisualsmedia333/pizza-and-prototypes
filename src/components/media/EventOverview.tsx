import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { PAST_EVENTS, type SiteEvent } from '../../config/events';
import type { Lang } from '../../lib/language';
import { EventGallery } from './EventGallery';

function EventCard({ event, lang }: { event: SiteEvent; lang: Lang }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const de = lang === 'de';
  const recap = event.recap!;
  const title = de ? recap.titleDe ?? event.titleDe : recap.titleEn ?? event.titleEn;
  const images = recap.images.map((image, index) => ({ ...image, alt: `${title}: ${de ? 'Eventfoto' : 'event photo'} ${index + 1}`, caption: `${title} · ${index + 1}` }));
  const image = images[activeIndex];
  const previousLabel = de ? 'Vorheriges Bild' : 'Previous image';
  const nextLabel = de ? 'Nächstes Bild' : 'Next image';

  return <article className="event-overview-card">
    <div className="event-overview-image">
      <img className="event-overview-cover" src={image.thumbnail ?? image.src} alt={image.alt} style={{ objectPosition: image.objectPosition }} loading="lazy" decoding="async" width={image.width} height={image.height} />
      {images.length > 1 && <>
        <button type="button" className="event-overview-arrow is-previous" aria-label={`${previousLabel}: ${title}`} onClick={() => setActiveIndex((index) => (index - 1 + images.length) % images.length)}><ChevronLeft aria-hidden="true" /></button>
        <button type="button" className="event-overview-arrow is-next" aria-label={`${nextLabel}: ${title}`} onClick={() => setActiveIndex((index) => (index + 1) % images.length)}><ChevronRight aria-hidden="true" /></button>
      </>}
    </div>
    <div className="event-overview-content">
      <time dateTime={event.date}>{new Intl.DateTimeFormat(de ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${event.date}T12:00:00`))}</time>
      <h3>{title}</h3>
      {event.speaker && <p>{event.speaker}{event.company ? ` · ${event.company.name}` : ''}</p>}
      <p>{de ? recap.summaryDe : recap.summaryEn}</p>
      <div className="event-overview-actions">
        <EventGallery images={images} lightboxLabel={title} previousLabel={previousLabel} nextLabel={nextLabel} closeLabel={de ? 'Schließen' : 'Close'} triggerLabel={de ? 'Fotos ansehen' : 'View photos'} initialIndex={activeIndex} />
        <a className="event-overview-action" href={recap.aftermovie} target="_blank" rel="noopener noreferrer">{de ? 'Aftermovie ansehen' : 'Watch aftermovie'} <ExternalLink aria-hidden="true" /></a>
      </div>
    </div>
  </article>;
}

export function EventOverview({ lang, page }: { lang: Lang; page: 'community' | 'company' }) {
  const de = lang === 'de';
  const events = PAST_EVENTS.filter((event) => event.recap);
  return (
    <section id={page === 'community' ? 'recap' : 'pilot-proof'} className="page-section page-section-muted">
      <div className="site-shell">
        <h2 className="event-overview-title">{page === 'community' ? (de ? 'Unsere bisherigen Events' : 'Our past events') : (de ? 'Tech Meets Problems in der Praxis' : 'Tech Meets Problems in practice')}</h2>
        <div className="event-overview-list">
          {events.map((event) => <EventCard key={event.slug} event={event} lang={lang} />)}
        </div>
      </div>
    </section>
  );
}
