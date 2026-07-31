import type { AnalyticsConsent } from '../../lib/analytics';
import type { Lang } from '../../lib/language';
import { sharedContent } from '../../content/shared';

export function AnalyticsConsentBanner({
  lang,
  consent,
  onChoice,
}: {
  lang: Lang;
  consent: AnalyticsConsent | null;
  onChoice: (nextConsent: AnalyticsConsent) => void;
}) {
  if (import.meta.env.VITE_SITE_ENV === 'preview' || consent !== null) {
    return null;
  }

  const content = sharedContent[lang];

  return (
    <aside className="analytics-consent" aria-label={content.consentLabel}>
      <p>{content.consentText}</p>
      <div>
        <button type="button" className="analytics-consent-decline" onClick={() => onChoice('declined')}>
          {content.consentDecline}
        </button>
        <button type="button" className="analytics-consent-accept" onClick={() => onChoice('accepted')}>
          {content.consentAccept}
        </button>
      </div>
    </aside>
  );
}
