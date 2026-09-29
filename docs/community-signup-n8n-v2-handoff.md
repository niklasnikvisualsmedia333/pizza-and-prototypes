# Community signup V2: n8n staging handoff

Status: frontend contract prepared locally. No live endpoint is configured and no n8n workflow was changed or called.

## Staging sequence

1. Duplicate the current Community registration workflow. Keep the existing production workflow untouched.
2. Give the duplicate a separate staging webhook path and point it to a separate staging Google Sheet or isolated staging tab.
3. Disable participant confirmation email during technical tests, or route it to an internal test recipient. Disable the internal new-member notification too.
4. Configure the local preview with `VITE_COMMUNITY_SIGNUP_MODE=live` and `VITE_COMMUNITY_API_ENDPOINT` set to that staging webhook. These `VITE_` values are public browser configuration. Do not place a bearer secret in the browser. CORS and Origin checks are not authentication; add server-side abuse controls such as rate limits and bot protection, validate every field, and keep profile writes protected by the opaque update credential.
5. Test join retries, profile patches, consent, duplicate email handling, and notification idempotency using staging data only.
6. Review privacy wording, consent, email communication and double opt-in handling before production activation. Then plan a deliberate production workflow migration.

The frontend uses one JSON endpoint for two request types. It sends no request in mock mode. In live mode it refuses to send unless the absolute HTTPS endpoint is configured. It sends no API credential.

## `community_join`

Request envelope: `type: community_join`, `schemaVersion: community-v1`, and a stable client `requestId`. The browser creates the request ID before its first submission attempt and keeps it in the non-personal pre-join session draft so an in-session retry reuses it. Name, email and consent are never written to pre-join storage.

The payload contains separate `firstName` and `lastName`, `email`, `selectedGoals`, `consent`, `consentedAt`, `consentVersion`, `language`, automatic UTM/referrer/landing-page attribution, and `createdAt`.

Required node behavior:

1. Validate JSON, request type/version, stable request ID, non-empty first and last name, syntactically valid email, goal IDs, language and explicit consent.
2. Normalize email on the server, for example trim and lowercase. Keep the originally entered address for participant email delivery if appropriate.
3. Validate/limit attribution fields and lengths. Do not trust arbitrary request object properties.
4. Look up `requestId` in an idempotency ledger before creating a row. If already processed, return the original `memberId` and the same active profile update credential. Serialize or otherwise protect concurrent executions to avoid a race between lookup and insert.
5. For a new request, generate a stable random `memberId` and a cryptographically random opaque profile update token. Return the token only over HTTPS to the browser. Store only a SHA-256 hash of that token in a separate restricted operational store keyed by `memberId`; do not put the raw token in the Community reporting sheet. Add expiry/rotation handling.
6. Create or update one Community row. Record the consent timestamp and version. Keep retries from appending duplicate members.
7. Send the participant confirmation and internal notification only once. Track delivery state in the idempotency ledger so a retry does not resend. The confirmation can address the person by `firstName`.
8. Return JSON with `ok`, `memberId`, and `profileUpdateToken`. Do not return row data or internal errors.

Expected response:

```json
{"ok":true,"memberId":"opaque-member-id","profileUpdateToken":"opaque-random-token"}
```

## `community_profile_update`

The request includes `type: community_profile_update`, `schemaVersion: community-v1`, a fresh unique `requestId`, `memberId`, `profileUpdateToken`, and a partial `patch`.

Required node behavior:

1. Validate request type/version, request ID, member ID, token and patch shape.
2. Look up the stored token hash for the member and compare it with SHA-256 of the supplied token using a constant-time comparison where the n8n runtime permits. Reject mismatches. Knowing a `memberId` alone must never authorize a write.
3. Allow only these keys: `selectedGoals`, `status`, `studyField`, `studyFieldOther`, `university`, `experienceLevel`, `contributionAreas`, `linkedinUrl`, `githubUrl`, `portfolioUrl`. Validate each value and impose conservative length limits. Ignore/reject unknown keys.
4. Make updates idempotent by request ID. Find and update the existing member row; never append a second member. Preserve every field absent from the patch and set `updatedAt`.
5. Return `{"ok":true,"memberId":"opaque-member-id","updatedAt":"ISO-8601"}`.
6. Do not send participant confirmation or internal new-signup notifications for profile updates.

## Proposed Community sheet columns

Use one header row with these columns:

`memberId`, `firstName`, `lastName`, `email`, `emailNormalized`, `selectedGoals`, `status`, `studyField`, `studyFieldOther`, `university`, `experienceLevel`, `contributionAreas`, `linkedinUrl`, `githubUrl`, `portfolioUrl`, `consentAccepted`, `consentAcceptedAt`, `consentVersion`, `language`, `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm`, `referrer`, `landingPage`, `createdAt`, `updatedAt`.

Store selected-goal and contribution arrays as JSON strings or a documented delimiter format. Do not add the raw profile update token to this sheet. Store a token hash and request/idempotency ledger in a separate restricted n8n Data Table or similarly access-controlled operational store. Limit access to both stores and do not publish a sheet as a browser-readable feed.

## Existing form fields and context

| Field | V2 treatment |
|---|---|
| First name, last name, email, consent | Required at Community join |
| Goals/interests | Chosen before join; locally stored until membership submission, then included in join |
| Status, study/professional background, university, practical experience, contribution areas | Optional, one screen at a time, autosaved as profile patches |
| LinkedIn, GitHub, portfolio | Optional, one link input at a time |
| Phone, food preferences, allergies, event language | Removed from general Community join; request only in a relevant event flow |
| Coding level | Removed from general join; request only for a technical project/application where it matters |
| Manual source, long notes, standalone startup interest/follow-up | Removed; attribution is automatic and goals cover general interests |
| Detailed CV or role history | Request only in an opportunity or project application |

The existing Formspree and legacy n8n code remain in the repository for compatibility, but the new progressive profile update path must not use Formspree. Formspree is append-oriented and cannot be the canonical member/profile store. Do not enable a new Formspree path. If retained as an emergency initial-join fallback later, document the duplicate/idempotency and notification consequences and require an explicit product decision first.

## Privacy and analytics

The local preview defaults to mock mode and stores test member data in `sessionStorage`. Before membership submission, only selected goals, variant, screen and a non-personal idempotency request ID are saved. After successful membership, the active session stores the member response, session-scoped update credential, profile draft and any failed profile patches so they can be retried on refresh. Closing the browser session clears this prototype state.

Analytics are gated on the site's existing consent and accept only category IDs, language, flow variant and screen names. They reject arbitrary property names and values. Never include names, email, free-text university/study answers, profile URLs, member ID or the update credential.

Final consent wording, email communication and double opt-in handling require review before production activation. This document does not claim legal approval.

Signup/profile data can describe who joins, where they came from and which categories they select. It does not establish problem severity, willingness to pay, causal career problems or business-model validity. Qualitative interviews remain separate.

## Frontend configuration

The only public Vite settings are:

```dotenv
VITE_COMMUNITY_SIGNUP_MODE=mock
VITE_COMMUNITY_API_ENDPOINT=https://staging.example.invalid/community-v1
```

Use `mock` for all local and preview work unless staging integration is deliberately being tested. Never put a token, API key or n8n credential in a `VITE_` variable. Production n8n must verify writes, enforce idempotency and validate both request types server-side.
