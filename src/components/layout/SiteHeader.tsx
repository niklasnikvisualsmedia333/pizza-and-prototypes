import { ArrowRight, Globe2, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ASSETS } from '../../config/assets';
import { sharedContent } from '../../content/shared';
import type { Lang } from '../../lib/language';
import { withLanguage } from '../../lib/language';

type HeaderPage = 'community' | 'companies';

export function SiteHeader({
  lang,
  page,
  onLanguageChange,
}: {
  lang: Lang;
  page: HeaderPage;
  onLanguageChange: (language: Lang) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const content = sharedContent[lang];
  const isCommunity = page === 'community';

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const close = () => setMenuOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('resize', close);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('resize', close);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  const navigation = isCommunity
    ? [
        { label: content.eventNav, href: '#latest-event' },
        { label: content.communityNav, href: '#community' },
        { label: content.howNav, href: '#how' },
        { label: content.companiesNav, href: withLanguage('/companies/', lang), emphasized: true, external: true },
        { label: content.aboutNav, href: '#about' },
      ]
    : [
        { label: content.companyBenefitsNav, href: '#benefits' },
        { label: content.companyFormatsNav, href: '#formats' },
        { label: content.companyPilotNav, href: '#pilot-proof' },
        { label: content.aboutNav, href: '#about' },
        { label: content.companyContactNav, href: '#company-contact' },
        { label: content.communityNav, href: withLanguage('/', lang), emphasized: true, external: true },
      ];

  const ctaHref = isCommunity ? '#community-signup' : '#company-contact';
  const ctaLabel = isCommunity ? content.communityCta : content.companyCta;

  return (
    <header className="site-header">
      <nav className="site-shell site-header-inner" aria-label={lang === 'de' ? 'Hauptnavigation' : 'Main navigation'}>
        <a className="site-brand" href={withLanguage(isCommunity ? '/' : '/companies/', lang)} aria-label="Tech Meets Problems">
          <img src={ASSETS.logo} alt="" width="48" height="48" />
          <span>
            <strong>Tech Meets Problems</strong>
            <small>{content.brandLine}</small>
          </span>
        </a>

        <div className="site-nav-desktop">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={item.emphasized ? 'site-nav-company' : undefined}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="site-header-actions">
          <LanguageControl lang={lang} onLanguageChange={onLanguageChange} />
          <a className="button button-primary button-small site-header-cta" href={ctaHref}>
            {ctaLabel}
            <ArrowRight aria-hidden="true" />
          </a>
          {isCommunity && !menuOpen && <LanguageControl lang={lang} onLanguageChange={onLanguageChange} quick />}
          <button
            className="site-menu-button"
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? content.menuClose : content.menuOpen}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {menuOpen && (
          <div className="site-mobile-menu">
            <LanguageControl lang={lang} onLanguageChange={onLanguageChange} compact />
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={item.emphasized ? 'site-nav-company' : undefined}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a className="button button-primary" href={ctaHref} onClick={() => setMenuOpen(false)}>
              {ctaLabel}
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

function LanguageControl({
  lang,
  onLanguageChange,
  compact = false,
  quick = false,
}: {
  lang: Lang;
  onLanguageChange: (language: Lang) => void;
  compact?: boolean;
  quick?: boolean;
}) {
  return (
    <div
      className={`site-language${compact ? ' site-language-wide' : ''}${quick ? ' site-language-quick' : ''}`}
      aria-label={lang === 'de' ? 'Sprache wählen' : 'Choose language'}
    >
      {!quick && <Globe2 aria-hidden="true" />}
      <button
        type="button"
        className={lang === 'de' ? 'active' : ''}
        aria-label={lang === 'de' ? 'Deutsch' : 'German'}
        aria-pressed={lang === 'de'}
        onClick={() => onLanguageChange('de')}
      >
        DE
      </button>
      <button
        type="button"
        className={lang === 'en' ? 'active' : ''}
        aria-label={lang === 'de' ? 'Englisch' : 'English'}
        aria-pressed={lang === 'en'}
        onClick={() => onLanguageChange('en')}
      >
        EN
      </button>
    </div>
  );
}
