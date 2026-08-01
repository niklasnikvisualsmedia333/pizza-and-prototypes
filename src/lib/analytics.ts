export type AnalyticsConsent = 'accepted' | 'declined';

export const ANALYTICS_CONSENT_KEY = 'tmp_analytics_consent';
const GA_MEASUREMENT_ID = 'G-SQXS1M7GYN';

let gaLoadPromise: Promise<void> | null = null;
let gaPageViewSent = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: {
      (...args: unknown[]): void;
      initialized?: boolean;
    };
  }
}

export function getStoredAnalyticsConsent(): AnalyticsConsent | null {
  const storedConsent = localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return storedConsent === 'accepted' || storedConsent === 'declined' ? storedConsent : null;
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };
  }
}

function loadGoogleAnalyticsScript() {
  if (gaLoadPromise) {
    return gaLoadPromise;
  }

  ensureGtag();

  const existingScript = document.querySelector<HTMLScriptElement>(`script[data-ga4-id="${GA_MEASUREMENT_ID}"]`);
  if (existingScript) {
    gaLoadPromise = Promise.resolve();
    return gaLoadPromise;
  }

  gaLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.dataset.ga4Id = GA_MEASUREMENT_ID;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('GA4 script failed to load')), { once: true });
    document.head.appendChild(script);
  });

  return gaLoadPromise;
}

export async function loadGoogleAnalyticsAndSendPageView() {
  if (import.meta.env.VITE_SITE_ENV === 'preview' || gaPageViewSent) {
    return;
  }

  try {
    await loadGoogleAnalyticsScript();
    ensureGtag();
    if (gaPageViewSent) {
      return;
    }
    if (!window.gtag?.initialized) {
      window.gtag?.('js', new Date());
      window.gtag!.initialized = true;
    }
    window.gtag?.('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
    });
    window.gtag?.('event', 'page_view', {
      send_to: GA_MEASUREMENT_ID,
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
    });
    gaPageViewSent = true;
  } catch (error) {
    console.warn('GA4 analytics failed to load', error);
  }
}
