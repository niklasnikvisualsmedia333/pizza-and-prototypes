import type { Lang } from './language';
import type { ContributionId, ExperienceId, GoalId, StudyFieldId } from '../content/communityOnboarding';

export type SignupMode = 'mock' | 'live';

export interface CommunityAttribution {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  referrer: string;
  landingPage: string;
}

export interface CommunityJoinRequest {
  type: 'community_join';
  schemaVersion: 'community-v1';
  requestId: string;
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    selectedGoals: GoalId[];
    consent: true;
    consentedAt: string;
    consentVersion: string;
    language: Lang;
    attribution: CommunityAttribution;
    createdAt: string;
  };
}

export interface CommunityJoinResponse {
  ok: boolean;
  memberId?: string;
  profileUpdateToken?: string;
}

export interface CommunityProfilePatch {
  selectedGoals?: GoalId[];
  status?: 'bachelor' | 'master' | 'research' | 'professional' | 'founder' | 'other';
  studyField?: StudyFieldId;
  studyFieldOther?: string;
  university?: string;
  experienceLevel?: ExperienceId;
  contributionAreas?: ContributionId[];
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}

export type CommunityProfileUpdateRequest = {
  type: 'community_profile_update';
  schemaVersion: 'community-v1';
  requestId: string;
  memberId: string;
  profileUpdateToken: string;
  patch: CommunityProfilePatch;
};

export interface CommunityProfileUpdateResponse {
  ok: boolean;
  memberId?: string;
  updatedAt?: string;
}

export function getSignupMode(): SignupMode {
  const mode = import.meta.env.VITE_COMMUNITY_SIGNUP_MODE;
  if (!mode || mode === 'mock') return 'mock';
  if (mode === 'live') return 'live';
  throw new Error('VITE_COMMUNITY_SIGNUP_MODE must be mock or live.');
}

export function getCommunityApiEndpoint(): string {
  const endpoint = import.meta.env.VITE_COMMUNITY_API_ENDPOINT?.trim();
  if (!endpoint) throw new Error('Live signup mode requires VITE_COMMUNITY_API_ENDPOINT.');
  let parsed: URL;
  try { parsed = new URL(endpoint); } catch { throw new Error('Community API endpoint must be an absolute URL.'); }
  if (parsed.protocol !== 'https:' && parsed.hostname !== 'localhost' && parsed.hostname !== '127.0.0.1') {
    throw new Error('Community API endpoint must use HTTPS.');
  }
  return parsed.toString();
}

export async function postCommunityApi<Request, Response>(payload: Request): Promise<Response> {
  const response = await fetch(getCommunityApiEndpoint(), {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Community API request failed (${response.status}).`);
  return await response.json() as Response;
}
