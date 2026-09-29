import type { Lang } from './language';
import type { CommunityProfileV2, GoalId } from '../content/communityOnboarding';

const SIGNUPS_KEY = 'tmp_surgical_v2_mock_signups';
const ANALYTICS_KEY = 'tmp_surgical_v2_analytics_events';
const DRAFT_KEY = 'tmp_community_onboarding_prejoin';

export type PrototypeEvent =
  | 'community_cta_click' | 'onboarding_start' | 'onboarding_step_view' | 'onboarding_step_complete'
  | 'interest_selected' | 'community_join_submit' | 'community_join_success' | 'community_profile_start'
  | 'profile_status_saved' | 'profile_background_saved' | 'profile_university_saved'
  | 'profile_experience_saved' | 'profile_contribution_saved' | 'profile_link_saved'
  | 'onboarding_skipped' | 'onboarding_finished';

export interface CommunityJoinPrototype {
  memberId: string;
  firstName: string;
  /** Kept empty for compatibility with the current downstream row shape. */
  lastName: '';
  email: string;
  selectedGoals: GoalId[];
  consent: true;
  consentedAt: string;
  language: Lang;
  formVersion: 'community-onboarding-progressive-v4';
  attribution: { source: string; medium: string; campaign: string; content: string; term: string; referrer: string; landingPage: string };
  createdAt: string;
}

export interface LocalCommunitySubmission {
  id: string;
  join: CommunityJoinPrototype;
  profile: CommunityProfileV2;
  profilePresence: { hasStatus: boolean; hasStudyField: boolean; hasUniversity: boolean; hasExperience: boolean; hasContributionAreas: boolean; hasProfileLink: boolean };
  createdAt: string;
  mode: 'mock' | 'live';
}

export function trackPrototypeEvent(event: PrototypeEvent, properties: Record<string, string> = {}) {
  if (typeof window === 'undefined' || localStorage.getItem('tmp_analytics_consent') !== 'accepted') return;
  try {
    const events = JSON.parse(sessionStorage.getItem(ANALYTICS_KEY) ?? '[]') as Array<{ event: PrototypeEvent; properties: Record<string, string>; at: string }>;
    // Properties are category IDs only. Callers must never pass PII/free text.
    events.push({ event, properties, at: new Date().toISOString() });
    sessionStorage.setItem(ANALYTICS_KEY, JSON.stringify(events.slice(-100)));
  } catch { /* analytics must never interrupt signup */ }
}

export function savePreJoinDraft(goals: GoalId[], variant: 'guided' | 'email-first', screen: string) {
  try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ goals, variant, screen })); } catch { /* best effort */ }
}

export function readPreJoinDraft(variant: 'guided' | 'email-first'): { goals: GoalId[]; screen: string } | undefined {
  try {
    const value = JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? 'null') as { goals?: GoalId[]; variant?: string; screen?: string } | null;
    if (!value || value.variant !== variant || !Array.isArray(value.goals)) return undefined;
    return { goals: value.goals, screen: value.screen ?? (variant === 'guided' ? 'goals' : 'join') };
  } catch { return undefined; }
}

function readAttribution(): CommunityJoinPrototype['attribution'] {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') ?? '', medium: params.get('utm_medium') ?? '', campaign: params.get('utm_campaign') ?? '',
    content: params.get('utm_content') ?? '', term: params.get('utm_term') ?? '', referrer: document.referrer ?? '', landingPage: window.location.pathname,
  };
}

function readRows(): LocalCommunitySubmission[] {
  try { return JSON.parse(sessionStorage.getItem(SIGNUPS_KEY) ?? '[]') as LocalCommunitySubmission[]; } catch { return []; }
}

export async function submitCommunityJoin(input: { firstName: string; email: string; goals: GoalId[]; consent: true; language: Lang }): Promise<LocalCommunitySubmission> {
  const mode = import.meta.env.VITE_COMMUNITY_SIGNUP_MODE ?? 'mock';
  const timestamp = new Date().toISOString();
  let memberId: string = crypto.randomUUID();
  const join: CommunityJoinPrototype = {
    memberId, firstName: input.firstName.trim(), lastName: '', email: input.email.trim(), selectedGoals: input.goals,
    consent: true, consentedAt: timestamp, language: input.language, formVersion: 'community-onboarding-progressive-v4',
    attribution: readAttribution(), createdAt: timestamp,
  };
  trackPrototypeEvent('community_join_submit', { language: input.language, goals: input.goals.join(',') });
  if (mode === 'live') {
    const endpoint = import.meta.env.VITE_COMMUNITY_SIGNUP_ENDPOINT;
    if (!endpoint) throw new Error('Live signup mode requires an explicitly configured endpoint.');
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(join) });
    if (!response.ok) throw new Error('Signup request failed.');
    const result = await response.json().catch(() => null) as { memberId?: string } | null;
    // Future transport must return the stable server memberId. Do not key partial updates by UI state/email.
    if (!result?.memberId) throw new Error('Signup endpoint did not return a memberId.');
    memberId = result.memberId;
    join.memberId = memberId;
  }
  const submission: LocalCommunitySubmission = { id: memberId, join, profile: {}, profilePresence: getProfilePresence({}), createdAt: timestamp, mode };
  if (mode === 'mock') sessionStorage.setItem(SIGNUPS_KEY, JSON.stringify([...readRows(), submission]));
  sessionStorage.removeItem(DRAFT_KEY);
  return submission;
}

/** Optimistic local profile upsert keyed by stable member ID. */
export function updateCommunityProfile(memberId: string, partialProfile: Partial<CommunityProfileV2>): boolean {
  try {
    const rows = readRows();
    const row = rows.find((item) => item.join.memberId === memberId);
    if (!row) return false;
    row.profile = { ...row.profile, ...partialProfile, updatedAt: new Date().toISOString() };
    row.profilePresence = getProfilePresence(row.profile);
    sessionStorage.setItem(SIGNUPS_KEY, JSON.stringify(rows));
    return true;
  } catch { return false; }
}

function getProfilePresence(profile: CommunityProfileV2): LocalCommunitySubmission['profilePresence'] {
  return {
    hasStatus: Boolean(profile.status), hasStudyField: Boolean(profile.studyField || profile.studyFieldOther?.trim()),
    hasUniversity: Boolean(profile.university?.trim()), hasExperience: Boolean(profile.experienceLevel),
    hasContributionAreas: Boolean(profile.contributionAreas?.length), hasProfileLink: Boolean(Object.values(profile.profileLinks ?? {}).some(Boolean)),
  };
}

export function updateCommunityGoals(memberId: string, goals: GoalId[]): boolean {
  try {
    const rows = readRows();
    const row = rows.find((item) => item.join.memberId === memberId);
    if (!row) return false;
    row.join.selectedGoals = goals;
    sessionStorage.setItem(SIGNUPS_KEY, JSON.stringify(rows));
    return true;
  } catch { return false; }
}

export function readMockMember(memberId: string): LocalCommunitySubmission | undefined {
  return readRows().find((item) => item.join.memberId === memberId);
}
