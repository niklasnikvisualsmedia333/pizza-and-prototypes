export type Lang = 'de' | 'en';

export const LANGUAGE_STORAGE_KEY = 'tech-meets-problems-language';

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
  const url = new URL(window.location.href);
  url.searchParams.set('lang', language);
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  document.documentElement.lang = language;
}

export function withLanguage(path: string, language: Lang) {
  const url = new URL(path, window.location.origin);
  url.searchParams.set('lang', language);
  return `${url.pathname}${url.search}${url.hash}`;
}

