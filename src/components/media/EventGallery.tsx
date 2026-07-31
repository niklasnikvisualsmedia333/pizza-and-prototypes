import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type EventGalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export function EventGallery({
  images,
  lightboxLabel,
  previousLabel,
  nextLabel,
  closeLabel,
}: {
  images: EventGalleryImage[];
  lightboxLabel: string;
  previousLabel: string;
  nextLabel: string;
  closeLabel: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mainButtonRef = useRef<HTMLButtonElement>(null);
  const activeImage = images[activeIndex];

  const showPrevious = () => setActiveIndex((current) => (current - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % images.length);

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
      } else if (event.key === 'ArrowLeft') {
        showPrevious();
      } else if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      mainButtonRef.current?.focus();
    };
  }, [lightboxOpen, images.length]);

  if (!activeImage || images.length === 0) {
    return null;
  }

  return (
    <div className="event-gallery">
      <div className="event-gallery-stage">
        <button
          ref={mainButtonRef}
          type="button"
          className={`event-gallery-main${activeImage.height > activeImage.width ? ' is-portrait' : ''}`}
          onClick={() => setLightboxOpen(true)}
          aria-label={`${lightboxLabel}: ${activeImage.caption}`}
        >
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            width={activeImage.width}
            height={activeImage.height}
            loading="lazy"
          />
          <span className="event-gallery-expand" aria-hidden="true">
            <Expand />
          </span>
        </button>
        <div className="event-gallery-caption" aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
          <p>{activeImage.caption}</p>
          <div>
            <button type="button" onClick={showPrevious} aria-label={previousLabel}><ChevronLeft /></button>
            <button type="button" onClick={showNext} aria-label={nextLabel}><ChevronRight /></button>
          </div>
        </div>
      </div>

      <div className="event-gallery-thumbnails" aria-label={lightboxLabel}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={index === activeIndex ? 'active' : undefined}
            onClick={() => setActiveIndex(index)}
            aria-label={`${index + 1}: ${image.caption}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" />
          </button>
        ))}
      </div>

      {lightboxOpen && createPortal(
        <div
          className="event-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxLabel}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setLightboxOpen(false);
            }
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="event-lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label={closeLabel}
          >
            <X />
          </button>
          <button type="button" className="event-lightbox-arrow previous" onClick={showPrevious} aria-label={previousLabel}>
            <ChevronLeft />
          </button>
          <figure className={activeImage.height > activeImage.width ? 'is-portrait' : undefined}>
            <img src={activeImage.src} alt={activeImage.alt} width={activeImage.width} height={activeImage.height} />
            <figcaption>{activeImage.caption}</figcaption>
          </figure>
          <button type="button" className="event-lightbox-arrow next" onClick={showNext} aria-label={nextLabel}>
            <ChevronRight />
          </button>
        </div>,
        document.body,
      )}
    </div>
  );
}
