export type Lang = 'de' | 'en';

export const LANGUAGE_STORAGE_KEY = 'tech-meets-problems-language';
const PRESERVED_QUERY_PARAMETERS = [
  'lang',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export function isLang(value: string | null): value is Lang {
  return value === 'de' || value === 'en';
}

export function getInitialLanguage(): Lang {
  const params = new URLSearchParams(window.location.search);
  const queryLanguage = params.get('lang');
  if (isLang(queryLanguage)) {
    return queryLanguage;
  }

  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isLang(storedLanguage) ? storedLanguage : 'de';
}

export function persistLanguage(language: Lang) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  const current = new URL(window.location.href);
  const cleanUrl = new URL(current.pathname, current.origin);
  for (const key of PRESERVED_QUERY_PARAMETERS) {
    const value = current.searchParams.get(key);
    if (value && key !== 'lang') {
      cleanUrl.searchParams.set(key, value);
    }
  }
  cleanUrl.searchParams.set('lang', language);
  cleanUrl.hash = current.hash;
  window.history.replaceState(null, '', `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
  document.documentElement.lang = language;
}

export function withLanguage(path: string, language: Lang) {
  const url = new URL(path, window.location.origin);
  const current = new URL(window.location.href);
  for (const key of PRESERVED_QUERY_PARAMETERS) {
    const value = current.searchParams.get(key);
    if (value && key !== 'lang') {
      url.searchParams.set(key, value);
    }
  }
  url.searchParams.set('lang', language);
  return `${url.pathname}${url.search}${url.hash}`;
}
