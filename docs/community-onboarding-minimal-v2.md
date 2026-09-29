# Community onboarding V2 — local surgical prototype

## Scope and baseline

This prototype starts from `origin/master` at `c418fa36b6da63222643fb101664f99f6eaa8c62`, the latest fetched community website baseline used for this work. The original local `master` checkout remains untouched. The earlier, broader prototype is preserved on `prototype/community-onboarding-v2`. Before the review fixes, the current uncommitted state was saved in `/private/tmp/tmp-community-prototype-review-v3-working.patch` and `/private/tmp/tmp-community-prototype-review-v3-untracked.tgz`; committed state is preserved by `backup/community-onboarding-before-review-fixes-20260929-0900`.

The goal is to lower community signup friction and express ongoing community value while retaining the existing site's visual identity and section structure.

## Change classification

**KEEP**

- Shorter, broader DE/EN hero copy and updated copy in the existing four-card benefits component.
- A guided-first signup flow: one multi-select interests screen, email plus consent, then optional profile enrichment.
- Required first name and email at membership signup, plus required consent. No last name is requested; the local compatibility payload leaves `lastName` empty.
- No progress bar, step count, percentage, or total-step indicator is shown.
- Local mock submission, existing UTM/referrer capture, and consent-gated local analytics events.
- Email-first preview via `?onboarding=email-first` for comparison.
- Scoped onboarding styles and a preview-safe dev command.

**REVERTED from the broader prototype**

- Whole-page redesign and reordering; this branch uses the current master page structure and components.
- The old map/generated hero treatment and other image substitutions; the master event photography is retained.
- Broad/global styling and replacement visual system; styles added here are scoped to `.tmp-onboarding-*`.

**PRESERVED from master**

- Header, navigation, hero layout, event section/cards, gallery, process, company, team, supporters, footer, language handling, and design tokens.
- The real responsive hero image source: `EVENT_MEDIA.communityHero`, including the optimized `08-event-room-problem-boards-wide` variants.
- Existing legacy form code and production integrations for deliberate future migration; the old form is no longer mounted by this prototype.

## Prototype flow

1. **Guided (default):** select up to three areas of interest, or choose “just exploring.”
2. **Join:** required first name, email, and consent. This is the membership point.
3. **Optional profile:** stage, contribution areas, experience level, and university. These steps can be skipped.
4. **Summary:** selected interests/profile tags and a small set of existing community links.

Email-first can be previewed with `?onboarding=email-first`; guided is `?onboarding=guided` or no parameter.

## Data model and transport

The prototype supports a `community_join` shape with email, selected goals, consent timestamp, language, form version, submission timestamp, and automatically captured UTM/referrer/landing-page attribution. Optional profile data is kept separately in the local prototype record. Event registration is not part of this general join.

By default, submissions are stored only in this browser tab's `sessionStorage`. Analytics events are also local and only recorded when the site's existing analytics consent is accepted; no PII is sent to analytics. Live transport requires both `VITE_COMMUNITY_SIGNUP_MODE=live` and an explicit `VITE_COMMUNITY_SIGNUP_ENDPOINT`. No endpoint is configured in this prototype. Local `dev` scripts force mock signup mode and set `VITE_SITE_ENV=preview`, which strips the existing Cloudflare Analytics beacon and production canonical/SEO URLs.

The existing long-form implementation remains in `App.tsx` as an unmounted legacy component for compatibility/reference. Its automatic pending-registration retry and GA page view are gated behind explicit live mode during this prototype.

## Positioning

The copy broadens the audience to students and young professionals across Tech, Business, Product, Design, and adjacent hands-on fields. It retains the existing event and “real challenges” proof. “Started in Siegen. Open beyond Siegen.” expresses geographic openness without claiming established nationwide physical infrastructure. Opportunities are described as selected and network-based, when available.

## Not established / needs validation

- This is a conversion prototype, not evidence that the broader positioning or profile questions improve conversion or community outcomes.
- Experience answers are directional self-reports, not conclusive evidence about practical experience.
- The currently displayed consent/privacy copy should receive a deliberate legal/privacy review before production transport is enabled.
- Email-first is a local preview only; no A/B infrastructure or experiment has been created.

## Before production integration

- Decide the production payload contract and map selected goals/profile fields into the existing n8n/Sheet flow deliberately.
- Confirm consent wording, retention, and post-join email expectations.
- Configure a reviewed signup endpoint outside source code; do not enable live mode just for local testing.
- Test a controlled production submission and verify downstream normalization before replacing the legacy form.

## Instagram bio options (not applied externally)

Character counts include spaces and punctuation, excluding surrounding code formatting.

1. **Recommended — builder/tech emphasis (EN, 166 chars):**
   `Beyond lectures. Into real work. Tech Meets Problems connects student builders with real challenges, companies, selected opportunities & a community. Siegen → beyond.`
   Keeps a credible builder/technology signal while showing value beyond events and Siegen.

2. **Broader community (EN, 152 chars):**
   `For students who want more than lectures. Real-world experience, selected opportunities, companies and people who make things happen. Started in Siegen.`
   Leads with the audience and practical experience, with less explicit technology language.

3. **German, locally rooted (DE, 157 chars):**
   `Mehr als Vorlesungen: echte Herausforderungen, praktische Erfahrung und ausgewählte Opportunities. Für Studierende, die umsetzen wollen. In Siegen gestartet.`
   Feels native for a German-first audience and stresses execution without reading like a networking offer.
