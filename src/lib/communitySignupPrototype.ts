import type { Lang } from './language';
import type { CommunityProfileV2, GoalId } from '../content/communityOnboarding';

const SIGNUPS_KEY = 'tmp_surgical_v2_mock_signups';
const ANALYTICS_KEY = 'tmp_surgical_v2_analytics_events';

export type PrototypeEvent =
  | 'community_cta_click'
  | 'onboarding_start'
  | 'onboarding_step_view'
  | 'onboarding_step_complete'
  | 'community_join_submit'
  | 'community_join_success'
  | 'community_profile_start'
  | 'community_profile_complete'
  | 'community_onboarding_skip';

export interface CommunityJoinPrototype {
  firstName: string;
  /** Kept empty for compatibility with the current downstream row shape. */
  lastName: '';
  email: string;
  selectedGoals: GoalId[];
  consent: true;
  consentedAt: string;
  timestamp: string;
  language: Lang;
  formVersion: 'community-onboarding-v2';
  attribution: {
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
    referrer: string;
    landingPage: string;
  };
}

export interface LocalCommunitySubmission {
  id: string;
  join: CommunityJoinPrototype;
  profile: CommunityProfileV2;
  createdAt: string;
  mode: 'mock' | 'live';
}

export function trackPrototypeEvent(event: PrototypeEvent, properties: Record<string, string> = {}) {
  if (typeof window === 'undefined' || localStorage.getItem('tmp_analytics_consent') !== 'accepted') return;
  try {
    const events = JSON.parse(sessionStorage.getItem(ANALYTICS_KEY) ?? '[]') as Array<{
      event: PrototypeEvent;
      properties: Record<string, string>;
      at: string;
    }>;
    events.push({ event, properties, at: new Date().toISOString() });
    sessionStorage.setItem(ANALYTICS_KEY, JSON.stringify(events.slice(-100)));
  } catch {
    // Local prototype analytics must never interrupt signup.
  }
}

function readAttribution(): CommunityJoinPrototype['attribution'] {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') ?? '',
    medium: params.get('utm_medium') ?? '',
    campaign: params.get('utm_campaign') ?? '',
    content: params.get('utm_content') ?? '',
    term: params.get('utm_term') ?? '',
    referrer: document.referrer ?? '',
    landingPage: window.location.pathname,
  };
}

export async function submitCommunityJoin(input: {
  firstName: string;
  email: string;
  goals: GoalId[];
  consent: true;
  language: Lang;
}): Promise<LocalCommunitySubmission> {
  const mode = import.meta.env.VITE_COMMUNITY_SIGNUP_MODE ?? 'mock';
  const timestamp = new Date().toISOString();
  const join: CommunityJoinPrototype = {
    firstName: input.firstName.trim(),
    lastName: '',
    email: input.email.trim(),
    selectedGoals: input.goals,
    consent: true,
    consentedAt: timestamp,
    timestamp,
    language: input.language,
    formVersion: 'community-onboarding-v2',
    attribution: readAttribution(),
  };

  trackPrototypeEvent('community_join_submit', { language: input.language, goals: input.goals.join(',') });

  if (mode === 'live') {
    const endpoint = import.meta.env.VITE_COMMUNITY_SIGNUP_ENDPOINT;
    if (!endpoint) throw new Error('Live signup mode requires an explicitly configured endpoint.');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(join),
    });
    if (!response.ok) throw new Error('Signup request failed.');
    return { id: crypto.randomUUID(), join, profile: {}, createdAt: timestamp, mode: 'live' };
  }

  const submission: LocalCommunitySubmission = {
    id: crypto.randomUUID(),
    join,
    profile: {},
    createdAt: timestamp,
    mode: 'mock',
  };
  const existing = JSON.parse(sessionStorage.getItem(SIGNUPS_KEY) ?? '[]') as LocalCommunitySubmission[];
  sessionStorage.setItem(SIGNUPS_KEY, JSON.stringify([...existing, submission]));
  return submission;
}

export function saveLocalProfile(email: string, profile: CommunityProfileV2) {
  try {
    const rows = JSON.parse(sessionStorage.getItem(SIGNUPS_KEY) ?? '[]') as LocalCommunitySubmission[];
    const row = [...rows].reverse().find((item) => item.join.email === email);
    if (row) {
      row.profile = profile;
      sessionStorage.setItem(SIGNUPS_KEY, JSON.stringify(rows));
    }
  } catch {
    // Profile enrichment is optional and must not block the member flow.
  }
}

export function saveLocalGoals(email: string, goals: GoalId[]) {
  try {
    const rows = JSON.parse(sessionStorage.getItem(SIGNUPS_KEY) ?? '[]') as LocalCommunitySubmission[];
    const row = [...rows].reverse().find((item) => item.join.email === email);
    if (row) {
      row.join.selectedGoals = goals;
      sessionStorage.setItem(SIGNUPS_KEY, JSON.stringify(rows));
    }
  } catch {
    // Updating local prototype goals is best-effort.
  }
}
