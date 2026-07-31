import { readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const source = await readFile('src/pages/CompaniesPage.tsx', 'utf8');
const schema = await readJson('docs/company-contact-payload.schema.json');
const example = await readJson('docs/company-contact-payload.example.json');
const handoff = await readJson('docs/company-contact-n8n-handoff.json');

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const schemaKeys = Object.keys(schema.properties);
const exampleKeys = Object.keys(example);
const handoffFields = [...handoff.requiredFields, ...handoff.optionalFields];

assert(source.includes("const COMPANY_FORM_VERSION = '2026-08-company-v1'"), 'Stable company form version missing');
assert(source.includes("const COMPANY_PRIVACY_VERSION = '2026-08-company-privacy-v1'"), 'Stable privacy version missing');
assert(source.includes("submissionType: 'company_interest'"), 'Company submission type missing');
assert(source.includes('AbortController'), 'Company timeout controller missing');
assert(source.includes('result.ok !== true'), 'Strict success response check missing');
assert(source.includes('companyWebsite.trim()'), 'Honeypot guard missing');
assert(!source.includes('tech-meets-problems-registration'), 'Community webhook referenced by company form');
assert(JSON.stringify(exampleKeys.sort()) === JSON.stringify(schemaKeys.sort()), 'Example fields do not match schema fields');
assert(JSON.stringify(handoffFields.sort()) === JSON.stringify(schemaKeys.sort()), 'Handoff fields do not match schema fields');
assert(example.submissionType === 'company_interest', 'Example submission type is invalid');
assert(example.formVersion === '2026-08-company-v1', 'Example form version is invalid');
assert(example.privacyVersion === '2026-08-company-privacy-v1', 'Example privacy version is invalid');
assert(handoff.successResponse.status === 200 && handoff.successResponse.body.ok === true, 'Handoff success contract is invalid');
assert(handoff.validationResponse.status === 422 && handoff.validationResponse.body.ok === false, 'Handoff validation contract is invalid');

console.log('Company contract verification passed (static, no network request).');
