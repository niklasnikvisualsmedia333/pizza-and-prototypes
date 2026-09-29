# Tech Meets Problems website prototype

This repository contains the Community website and a local progressive signup prototype. The V5 onboarding work is isolated on `prototype/community-onboarding-production-ready-v5` and is not deployed or merged into `master`.

## Local preview

```sh
npm ci
npm run dev
```

The default Vite URL is `http://127.0.0.1:5173/`. Signup defaults to mock mode. Mock submissions and profile answers stay in the current browser session. No signup request is sent to Formspree, n8n, Google Sheets or Gmail by the new flow.

Use `?onboarding=email-first` to preview the email-first variant. Guided-first is the default.

## Signup transport

The UI uses a typed transport contract documented in [the n8n staging handoff](docs/community-signup-n8n-v2-handoff.md). Live mode requires both `VITE_COMMUNITY_SIGNUP_MODE=live` and an explicitly configured `VITE_COMMUNITY_API_ENDPOINT`. Vite variables are public browser configuration. Never put credentials or tokens in them.

No staging endpoint is configured in this branch. Do not enable live mode against production. The live n8n workflow has not been changed.

## Checks

```sh
npm run test:community-contract
npm run test:company-contract
npm run build
npm run test:build
```

The prototype validation workflow builds a mock preview artifact only. The production GitHub Pages workflow is restricted to `master`.
