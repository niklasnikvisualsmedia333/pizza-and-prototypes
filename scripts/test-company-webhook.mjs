const endpoint = process.env.COMPANY_CONTACT_TEST_URL?.trim();

if (!endpoint) {
  console.error('Set COMPANY_CONTACT_TEST_URL explicitly to a dedicated company test webhook.');
  process.exit(1);
}

if (endpoint.includes('tech-meets-problems-registration')) {
  console.error('Refusing to use the community registration webhook for a company inquiry test.');
  process.exit(1);
}

const payload = {
  company: 'Example Industries GmbH',
  name: 'Alex Example',
  email: 'alex@example.com',
  role: 'Innovation Management',
  format: 'Innovation Event',
  challenge: 'Fictitious test request for a process workshop.',
  phone: '',
  timeframe: 'Autumn 2026',
  submissionType: 'company_interest',
  formVersion: '2026-07-company-prototype-v2',
  language: 'en',
  submittedAt: new Date().toISOString(),
  landingPage: 'http://localhost/companies/?utm_source=test',
  referrer: '',
  utmSource: 'test',
  utmMedium: 'script',
  utmCampaign: 'company_webhook_test',
  utmContent: '',
  utmTerm: '',
  trackingSummary: 'source:test | medium:script | campaign:company_webhook_test',
  privacyAccepted: true,
  privacyAcceptedAt: new Date().toISOString(),
  privacyVersion: '2026-07-company-prototype-v2',
  privacyText: 'Fictitious test consent.',
};

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

console.log(`Company test webhook responded with HTTP ${response.status}.`);
if (!response.ok) {
  process.exitCode = 1;
}
