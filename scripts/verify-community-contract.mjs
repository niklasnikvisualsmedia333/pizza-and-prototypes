import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const [flow, service, transport, onboarding, app, assets] = await Promise.all([
  read('src/components/community/CommunitySignupFlow.tsx'),
  read('src/lib/communitySignupPrototype.ts'),
  read('src/lib/communitySignupTransport.ts'),
  read('src/content/communityOnboarding.ts'),
  read('src/App.tsx'),
  read('src/config/assets.ts'),
]);

for (const [field, autocomplete] of [['first-name', 'given-name'], ['last-name', 'family-name'], ['email', 'email']]) {
  assert(flow.includes(`tmp-community-${field}`), `Required ${field} field is missing`);
  assert(flow.includes(`autoComplete="${autocomplete}"`), `${field} autocomplete is incorrect`);
  assert(flow.includes(`required value={flow.${field === 'first-name' ? 'firstName' : field === 'last-name' ? 'lastName' : 'email'}}`), `${field} is not required`);
}
assert(service.includes('lastName: string;') && service.includes('lastName: input.lastName.trim()'), 'First/last name must be separate in the join model');
assert(!service.includes("lastName: ''"), 'Legacy empty last-name compatibility must be removed');
assert(service.includes("type: 'community_join'") && service.includes("schemaVersion: 'community-v1'"), 'Join request envelope is incomplete');
assert(service.includes("type: 'community_profile_update'") && service.includes('profileUpdateToken: token'), 'Profile update request is missing its opaque credential');
assert(service.includes('row.join.requestId !== input.requestId'), 'Mock join retries do not replace the same request ID');
assert(service.includes("find((row) => row.join.requestId === input.requestId)"), 'A repeated client request ID must return the same session member');
assert(flow.includes('lastNameRequired') && flow.includes('if (!lastName)'), 'Last name validation is missing');
assert(flow.includes('id="tmp-community-consent" type="checkbox" required'), 'Consent checkbox must be required');
assert(transport.includes('VITE_COMMUNITY_API_ENDPOINT') && transport.includes('VITE_COMMUNITY_SIGNUP_MODE'), 'Public transport configuration is missing');
assert(transport.includes("mode === 'live'") && transport.includes('getCommunityApiEndpoint()'), 'Live requests do not require the configured endpoint');
assert(!transport.includes('Authorization') && !transport.includes('Bearer'), 'Browser transport must not contain an API credential');
assert(service.includes("const ANALYTICS_KEYS = new Set(['language', 'variant', 'step', 'goals', 'areas', 'value'])"), 'Analytics does not enforce the category-only property allowlist');
assert(service.includes('if (!ANALYTICS_KEYS.has(key)) return false') && service.includes('CATEGORY_IDS.has(item)'), 'Analytics values are not category allowlisted');
assert(!service.match(/const ANALYTICS_KEYS = new Set\(\[[^\]]*(email|firstName|lastName|university|profileUpdateToken|memberId)/), 'PII or credentials appear in analytics property allowlist');
const profileAllowlist = service.match(/function toProfilePatch\([\s\S]*?return patch;/)?.[0] ?? '';
assert(profileAllowlist && !profileAllowlist.includes('...'), 'Profile updates must construct the approved allowlist, not forward arbitrary objects');
assert(/savePreJoinDraft\(goals: GoalId\[\], variant: 'guided' \| 'email-first', screen: string, requestId\?: string\)[\s\S]*JSON\.stringify\(\{ goals, variant, screen, requestId \}\)/.test(service), 'Pre-join storage must exclude name, email and consent');
for (const field of ['selectedGoals', 'status', 'studyField', 'studyFieldOther', 'university', 'experienceLevel', 'contributionAreas', 'linkedinUrl', 'githubUrl', 'portfolioUrl']) {
  assert(transport.includes(`${field}?:`), `Approved profile patch field is missing: ${field}`);
}
assert(!/progress\s*bar|step\s*\d+\s*of\s*\d+|questions?\s*(left|remaining)/i.test(flow + onboarding), 'Visible total-progress copy found');
assert(app.includes('EVENT_MEDIA.communityHero') && assets.includes('communityHero: asset('), 'Real Community Hero photography mapping is missing');
assert(!app.includes('heroMap') || app.includes('EVENT_MEDIA.communityHero'), 'Hero image reference audit failed');
assert(app.includes("VITE_LEGACY_N8N_RETRY === 'true'"), 'Legacy n8n retries are not behind an explicit opt-in guard');
assert(onboarding.includes('lastNameLabel: \'Nachname\'') && onboarding.includes("lastNameLabel: 'Last name'"), 'Bilingual last-name labels are missing');

console.log('Community onboarding contract checks passed.');
