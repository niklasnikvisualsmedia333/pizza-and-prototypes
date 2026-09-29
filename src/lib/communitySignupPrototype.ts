import type { Lang } from './language';
import type { CommunityProfileV2, GoalId } from '../content/communityOnboarding';
import { getSignupMode, postCommunityApi, type CommunityJoinRequest, type CommunityJoinResponse, type CommunityProfilePatch, type CommunityProfileUpdateRequest, type CommunityProfileUpdateResponse } from './communitySignupTransport';

const SIGNUPS_KEY = 'tmp_surgical_v2_mock_signups';
const ANALYTICS_KEY = 'tmp_surgical_v2_analytics_events';
const DRAFT_KEY = 'tmp_community_onboarding_prejoin';

export type PrototypeEvent =
  | 'community_cta_click' | 'onboarding_start' | 'onboarding_step_view' | 'onboarding_step_complete'
  | 'interest_selected' | 'community_join_submit' | 'community_join_success' | 'community_profile_start'
  | 'profile_status_saved' | 'profile_background_saved' | 'profile_university_saved'
  | 'profile_experience_saved' | 'profile_contribution_saved' | 'profile_link_saved'
  | 'onboarding_skipped' | 'onboarding_finished';

const ANALYTICS_KEYS = new Set(['language', 'variant', 'step', 'goals', 'areas', 'value']);
const CATEGORY_IDS = new Set(['de', 'en', 'guided', 'email-first', 'goals', 'join', 'success', 'stage', 'study', 'studyOther', 'university', 'experience', 'contribution', 'profileLink', 'profileLinkInput', 'summary', 'jobs', 'projects', 'startups', 'companies', 'events', 'community', 'exploring', 'bachelor', 'master', 'research', 'professional', 'founder', 'other', 'computer-science', 'ai-data', 'engineering', 'business-informatics', 'business', 'entrepreneurship', 'product-design', 'media', 'science-research', 'unsure', 'tech', 'data', 'product', 'none', 'uni-projects', 'first-role', 'multiple', 'linkedin', 'github', 'portfolio', 'provided', 'skipped']);

export interface CommunityJoinPrototype {
  memberId: string;
  requestId: string;
  firstName: string;
  lastName: string;
  email: string;
  selectedGoals: GoalId[];
  consent: true;
  consentedAt: string;
  consentVersion: string;
  language: Lang;
  formVersion: 'community-v1';
  attribution: { utmSource: string; utmMedium: string; utmCampaign: string; utmContent: string; utmTerm: string; referrer: string; landingPage: string };
  createdAt: string;
}

export interface LocalCommunitySubmission {
  id: string;
  join: CommunityJoinPrototype;
  profile: CommunityProfileV2;
  profilePresence: { hasStatus: boolean; hasStudyField: boolean; hasUniversity: boolean; hasExperience: boolean; hasContributionAreas: boolean; hasProfileLink: boolean };
  createdAt: string;
  mode: 'mock' | 'live';
  /** Session-only credential. Never emitted to analytics, URLs, or console. */
  profileUpdateToken: string;
  pendingProfileUpdates: Array<{ requestId: string; patch: CommunityProfilePatch }>;
}

export function trackPrototypeEvent(event: PrototypeEvent, properties: Record<string, string> = {}) {
  if (typeof window === 'undefined' || localStorage.getItem('tmp_analytics_consent') !== 'accepted') return;
  try {
    const safeProperties = Object.fromEntries(Object.entries(properties).filter(([key, value]) => {
      if (!ANALYTICS_KEYS.has(key)) return false;
      const values = value.split(',').filter(Boolean);
      return values.length > 0 && values.every((item) => CATEGORY_IDS.has(item));
    }));
    const events = JSON.parse(sessionStorage.getItem(ANALYTICS_KEY) ?? '[]') as Array<{ event: PrototypeEvent; properties: Record<string, string>; at: string }>;
    events.push({ event, properties: safeProperties, at: new Date().toISOString() });
    sessionStorage.setItem(ANALYTICS_KEY, JSON.stringify(events.slice(-100)));
  } catch { /* analytics must never interrupt signup */ }
}

export function savePreJoinDraft(goals: GoalId[], variant: 'guided' | 'email-first', screen: string, requestId?: string) {
  try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ goals, variant, screen, requestId })); } catch { /* best effort */ }
}

export function readPreJoinDraft(variant: 'guided' | 'email-first'): { goals: GoalId[]; screen: string; requestId?: string } | undefined {
  try {
    const value = JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? 'null') as { goals?: GoalId[]; variant?: string; screen?: string; requestId?: string } | null;
    if (!value || value.variant !== variant || !Array.isArray(value.goals)) return undefined;
    return { goals: value.goals, screen: value.screen ?? (variant === 'guided' ? 'goals' : 'join'), requestId: value.requestId };
  } catch { return undefined; }
}

function readAttribution(): CommunityJoinPrototype['attribution'] {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') ?? '', utmMedium: params.get('utm_medium') ?? '', utmCampaign: params.get('utm_campaign') ?? '',
    utmContent: params.get('utm_content') ?? '', utmTerm: params.get('utm_term') ?? '', referrer: document.referrer ?? '', landingPage: window.location.pathname,
  };
}

function readRows(): LocalCommunitySubmission[] {
  try { return JSON.parse(sessionStorage.getItem(SIGNUPS_KEY) ?? '[]') as LocalCommunitySubmission[]; } catch { return []; }
}

export async function submitCommunityJoin(input: { requestId: string; firstName: string; lastName: string; email: string; goals: GoalId[]; consent: true; language: Lang }): Promise<LocalCommunitySubmission> {
  const mode = getSignupMode();
  const existing = readRows().find((row) => row.join.requestId === input.requestId);
  if (existing) return existing;
  const timestamp = new Date().toISOString();
  const join: CommunityJoinPrototype = {
    memberId: crypto.randomUUID(), requestId: input.requestId, firstName: input.firstName.trim(), lastName: input.lastName.trim(), email: input.email.trim(), selectedGoals: input.goals,
    consent: true, consentedAt: timestamp, consentVersion: 'community-updates-v1', language: input.language, formVersion: 'community-v1',
    attribution: readAttribution(), createdAt: timestamp,
  };
  trackPrototypeEvent('community_join_submit', { language: input.language, goals: input.goals.join(',') });
  let memberId: string = join.memberId;
  let profileUpdateToken: string = crypto.randomUUID();
  if (mode === 'live') {
    const payload: CommunityJoinRequest = {
      type: 'community_join', schemaVersion: 'community-v1', requestId: input.requestId,
      payload: {
        firstName: join.firstName, lastName: join.lastName, email: join.email, selectedGoals: join.selectedGoals, consent: true,
        consentedAt: timestamp, consentVersion: join.consentVersion, language: input.language, attribution: join.attribution, createdAt: timestamp,
      },
    };
    const result = await postCommunityApi<CommunityJoinRequest, CommunityJoinResponse>(payload);
    if (!result.ok || !result.memberId || !result.profileUpdateToken) throw new Error('Signup endpoint returned an incomplete response.');
    memberId = result.memberId;
    profileUpdateToken = result.profileUpdateToken;
    join.memberId = memberId;
  }
  const submission: LocalCommunitySubmission = { id: memberId, join, profile: {}, profilePresence: getProfilePresence({}), createdAt: timestamp, mode, profileUpdateToken, pendingProfileUpdates: [] };
  sessionStorage.setItem(SIGNUPS_KEY, JSON.stringify([...readRows().filter((row) => row.join.requestId !== input.requestId), submission]));
  sessionStorage.removeItem(DRAFT_KEY);
  return submission;
}

/** Optimistically updates the same member. Failed live patches remain in session storage for retry. */
export async function updateCommunityProfile(memberId: string, token: string, partialProfile: Partial<CommunityProfileV2>): Promise<boolean> {
  try {
    const rows = readRows();
    const row = rows.find((item) => item.join.memberId === memberId);
    if (!row) return false;
    if (row.mode === 'live' && (!token || row.profileUpdateToken !== token)) return false;
    const patch = toProfilePatch(partialProfile);
    if (!Object.keys(patch).length) return true;
    row.profile = { ...row.profile, ...partialProfile, updatedAt: new Date().toISOString() };
    row.profilePresence = getProfilePresence(row.profile);
    if (row.mode === 'live') row.pendingProfileUpdates.push({ requestId: crypto.randomUUID(), patch });
    sessionStorage.setItem(SIGNUPS_KEY, JSON.stringify(rows));
    if (row.mode === 'mock') return true;
    return flushPendingProfileUpdates(row, rows, token);
  } catch { return false; }
}

export async function updateCommunityGoals(memberId: string, token: string, goals: GoalId[]): Promise<boolean> {
  try {
    const rows = readRows();
    const row = rows.find((item) => item.join.memberId === memberId);
    if (!row || (row.mode === 'live' && (!token || row.profileUpdateToken !== token))) return false;
    row.join.selectedGoals = goals;
    if (row.mode === 'live') row.pendingProfileUpdates.push({ requestId: crypto.randomUUID(), patch: { selectedGoals: goals } });
    sessionStorage.setItem(SIGNUPS_KEY, JSON.stringify(rows));
    if (row.mode === 'mock') return true;
    return flushPendingProfileUpdates(row, rows, token);
  } catch { return false; }
}

export async function retryPendingCommunityProfileUpdates(memberId: string, token: string): Promise<boolean> {
  const rows = readRows();
  const row = rows.find((item) => item.join.memberId === memberId);
  if (!row || row.mode !== 'live' || !token || row.profileUpdateToken !== token) return false;
  return flushPendingProfileUpdates(row, rows, token);
}

function toProfilePatch(profile: Partial<CommunityProfileV2>): CommunityProfilePatch {
  const patch: CommunityProfilePatch = {};
  if (profile.status) patch.status = profile.status;
  if (profile.studyField) patch.studyField = profile.studyField;
  if (profile.studyFieldOther !== undefined) patch.studyFieldOther = profile.studyFieldOther;
  if (profile.university !== undefined) patch.university = profile.university;
  if (profile.experienceLevel) patch.experienceLevel = profile.experienceLevel;
  if (profile.contributionAreas) patch.contributionAreas = profile.contributionAreas;
  if (profile.profileLinks?.linkedin !== undefined) patch.linkedinUrl = profile.profileLinks.linkedin;
  if (profile.profileLinks?.github !== undefined) patch.githubUrl = profile.profileLinks.github;
  if (profile.profileLinks?.portfolio !== undefined) patch.portfolioUrl = profile.profileLinks.portfolio;
  return patch;
}

async function flushPendingProfileUpdates(row: LocalCommunitySubmission, rows: LocalCommunitySubmission[], token: string): Promise<boolean> {
  let allSaved = true;
  for (const pending of [...row.pendingProfileUpdates]) {
    try {
      const request: CommunityProfileUpdateRequest = {
        type: 'community_profile_update', schemaVersion: 'community-v1', requestId: pending.requestId,
        memberId: row.join.memberId, profileUpdateToken: token, patch: pending.patch,
      };
      const response = await postCommunityApi<CommunityProfileUpdateRequest, CommunityProfileUpdateResponse>(request);
      if (!response.ok || response.memberId !== row.join.memberId) { allSaved = false; continue; }
      row.pendingProfileUpdates = row.pendingProfileUpdates.filter((item) => item.requestId !== pending.requestId);
    } catch { allSaved = false; }
    sessionStorage.setItem(SIGNUPS_KEY, JSON.stringify(rows));
  }
  return allSaved;
}

export function getProfilePresence(profile: CommunityProfileV2): LocalCommunitySubmission['profilePresence'] {
  return {
    hasStatus: Boolean(profile.status), hasStudyField: Boolean(profile.studyField || profile.studyFieldOther?.trim()),
    hasUniversity: Boolean(profile.university?.trim()), hasExperience: Boolean(profile.experienceLevel),
    hasContributionAreas: Boolean(profile.contributionAreas?.length), hasProfileLink: Boolean(Object.values(profile.profileLinks ?? {}).some(Boolean)),
  };
}

export function readMockMember(memberId: string): LocalCommunitySubmission | undefined {
  return readRows().find((item) => item.join.memberId === memberId);
}
