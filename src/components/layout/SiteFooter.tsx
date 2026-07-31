import { Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { ASSETS } from '../../config/assets';
import { SITE } from '../../config/site';
import { sharedContent } from '../../content/shared';
import type { Lang } from '../../lib/language';
import { withLanguage } from '../../lib/language';

export function SiteFooter({ lang, page }: { lang: Lang; page: 'community' | 'companies' }) {
  const content = sharedContent[lang];
  const privacyHref = page === 'community' ? '#privacy' : withLanguage('/#privacy', lang);

  return (
    <footer className="site-footer">
      <div className="site-shell site-footer-grid">
        <div className="site-footer-brand">
          <img src={ASSETS.logo} alt="" width="52" height="52" />
          <div>
            <strong>{SITE.name}</strong>
            <p>{content.footerLine}</p>
          </div>
        </div>

        <div className="site-footer-links">
          <a href={withLanguage(page === 'community' ? '/companies/' : '/', lang)}>
            {page === 'community' ? content.companiesNav : content.communityNav}
          </a>
          <a href={`mailto:${SITE.contactEmail}`}>
            <Mail aria-hidden="true" />
            {SITE.contactEmail}
          </a>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" />
            {content.whatsapp}
          </a>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram aria-hidden="true" />
            {content.instagram}
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin aria-hidden="true" />
            {content.linkedin}
          </a>
          <a href={privacyHref}>{content.privacy}</a>
          <a href={SITE.imprint} target="_blank" rel="noopener noreferrer">
            {content.imprint}
          </a>
        </div>
      </div>
    </footer>
  );
}
