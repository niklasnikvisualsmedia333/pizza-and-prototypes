# Community onboarding prototype v4

## Purpose and positioning

This local iteration keeps the reviewed Community page, event photography and section layout. It improves the signup question sequence and captures useful profile context gradually. TMP remains a builder-first community that connects people with practical problems, companies, relevant opportunities and one another; events are one format, not a membership requirement. Joining is free and does not commit someone to attend or contribute.

## Flow

Guided preview (`?onboarding=guided`, default):

1. Choose up to three interests, or choose “Just exploring”.
2. Join with required first name, email and privacy/update consent. Successful submission creates the membership.
3. Confirmation makes the new membership explicit. Profile enrichment is optional.
4. Optional current status.
5. Optional study/professional background. “Other” opens a small optional detail input.
6. Optional university/institution. Student statuses use “Where do you study?”; other statuses use broader wording.
7. Optional practical experience level.
8. Optional contribution areas (up to two), separate from study/background.
9. Optional single profile link at a time (LinkedIn, GitHub or portfolio), then a lightweight summary.

Email-first preview (`?onboarding=email-first`): name/email/consent first, followed by membership confirmation, then optional interests and profile questions. Every enrichment screen can be skipped. No progress bar, step count, total length, completion percentage or remaining-question count is shown.

## Membership and profile data

The prototype separates `CommunityJoinPrototype` from `CommunityProfileV2`.

- Join: stable `memberId`, first name, email, empty compatibility `lastName`, selected goals, consent and timestamp, language, form version, creation time, and automatic UTM/referrer/landing-page attribution.
- Profile: optional status, study field and optional “other” text, university/institution, experience category, contribution areas, profile links and update timestamp.
- Study field answers what someone studies or their background. Contribution areas answer how they would like to participate; the fields are independent.
- Internal `profilePresence` booleans are recalculated after profile updates. No completion score is shown to the visitor.

Before membership is submitted, only selected interests and the preview variant/screen are stored in `sessionStorage`; name, email and consent are not persisted. After the required consent and signup, a stable UUID is created for the mock member. Mock join/profile records live in browser `sessionStorage`, and each profile answer updates that same record by `memberId`. Refresh can resume the current prototype session. Closing the tab may clear it.

The existing local preview scripts force `VITE_COMMUNITY_SIGNUP_MODE=mock`. The live adapter remains opt-in and requires an explicit endpoint; it expects the server to return a stable `memberId`. This iteration must not send production registration requests.

## Analytics events

Local funnel events are stored only when the existing analytics consent is accepted. Event properties are category IDs, language and screen names only. The flow uses events for CTA/start, screen views, interest selection, join submit/success, profile start and category-level status/background/university/experience/contribution/profile-link saves, skips and completion. Email, first name, university text, profile URLs and other free text are never sent to analytics.

## Legacy field classification

| Field | Treatment |
| --- | --- |
| First name, email, consent | Required at community join |
| Interests/goals | Lightweight pre-join selection; saved locally until join, then attached to member |
| Status, study/professional background, institution, experience, contribution areas | Optional post-join profile enrichment |
| LinkedIn, GitHub, portfolio | Optional, one link input at a time |
| UTM source/medium/campaign/content/term, referrer, landing page, language, timestamp | Captured automatically; no manual acquisition-source question |
| Last name | Not asked; empty compatibility field retained in prototype payload |
| Phone | Removed from general community onboarding; ask only if operationally needed |
| Pizza, food notes, allergies | Removed; ask in context of a specific event registration |
| Event language | Removed; ask during a specific event registration if useful |
| Coding level | Removed from general join; ask for a technical project/application where relevant |
| Manual source question | Removed because attribution is captured automatically |
| Standalone startup-interest / follow-up questions | Replaced by selected goals and contribution areas |
| Long notes and detailed CV/experience | Not collected here; request only in a relevant project/opportunity application |

## Privacy and safety

The visible prototype privacy text describes only the local browser mock flow. No local test signup is sent to Formspree, n8n, Google Sheets, Gmail or another production endpoint. The consent/privacy wording requires final legal review before production activation. Before a live integration, the backend must create/return the canonical `memberId`; profile updates must be authorized against that member ID and retried safely on transient failures. A production transport should retain the user's local answer optimistically and offer a non-blocking retry path without creating duplicate member records.

## Product learning limits

Signup/profile data can describe who joins, what they select, where they study, and correlations among segments. It does not establish problem severity, willingness to pay, causal career problems or business-model validity. Qualitative problem interviews remain a separate activity.

## Confirmed current capability vs hypotheses

Confirmed in this local prototype: real event photography and existing page structure remain in place; the signup supports progressive optional profile answers, mock persistence, attribution capture, German and English copy, and a no-progress-indicator flow.

Still to validate: whether the question order improves completion, whether the categories are understood consistently, whether members find the updates useful, and whether clusters emerge beyond Siegen. These are hypotheses, not proven outcomes. Production integration, server-side member ID handling, secure profile-update authorization, and final privacy/legal review remain future work.
