import { ArrowRight, Globe2, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const content = sharedContent[lang];
  const isCommunity = page === 'community';

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, [menuOpen]);

  const navigation = isCommunity
    ? [
        { label: content.recapNav, href: '#recap' },
        { label: content.communityNav, href: '#community' },
        { label: content.companiesNav, href: withLanguage('/companies/', lang), emphasized: true },
        { label: content.aboutNav, href: '#about' },
      ]
    : [
        { label: content.companyBenefitsNav, href: '#benefits' },
        { label: content.companyFormatsNav, href: '#formats' },
        { label: content.communityNav, href: withLanguage('/', lang), emphasized: true },
        { label: content.aboutNav, href: '#about' },
      ];

  const ctaHref = isCommunity ? '#community-signup' : '#company-contact';
  const ctaLabel = isCommunity ? content.communityCta : content.companyCta;

  return (
    <header className="site-header">
      <nav className="site-shell site-header-inner" aria-label={lang === 'de' ? 'Hauptnavigation' : 'Main navigation'}>
        <a className="site-brand" href={withLanguage('/', lang)} aria-label="Tech Meets Problems">
          <img src={ASSETS.logo} alt="" width="48" height="48" />
          <span>
            <strong>Tech Meets Problems</strong>
            <small>{content.brandLine}</small>
          </span>
        </a>

        <div className="site-nav-desktop">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className={item.emphasized ? 'site-nav-company' : undefined}>
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
          <button
            className="site-menu-button"
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
}: {
  lang: Lang;
  onLanguageChange: (language: Lang) => void;
  compact?: boolean;
}) {
  return (
    <div className={`site-language${compact ? ' site-language-wide' : ''}`} aria-label="Language switcher">
      <Globe2 aria-hidden="true" />
      <button type="button" className={lang === 'de' ? 'active' : ''} onClick={() => onLanguageChange('de')}>
        DE
      </button>
      <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => onLanguageChange('en')}>
        EN
      </button>
    </div>
  );
}
