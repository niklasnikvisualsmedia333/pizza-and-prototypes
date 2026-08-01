import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const files = (await readdir(resolve('dist/assets'))).filter((name) => name.endsWith('.js'));
const bundles = Object.fromEntries(await Promise.all(files.map(async (name) => [name, await readFile(resolve('dist/assets', name), 'utf8')])));
const companyBundle = Object.entries(bundles).find(([name]) => name.startsWith('companies-'))?.[1] || '';
const communityBundle = Object.entries(bundles).find(([name]) => name.startsWith('community-'))?.[1] || '';
const endpoint = process.env.VITE_COMPANY_CONTACT_ENDPOINT;

assert(endpoint, 'Set VITE_COMPANY_CONTACT_ENDPOINT when verifying the endpoint-configured preview build');
assert(companyBundle.includes(endpoint), 'Preview company bundle does not contain the configured company endpoint');
assert(!communityBundle.includes(endpoint), 'Preview community bundle contains the company endpoint');
assert(!companyBundle.includes('tech-meets-problems-registration'), 'Preview company bundle references the community webhook');
for (const text of ['Anfrage senden', 'Send inquiry', 'Anfrage erfolgreich gesendet', 'Inquiry sent successfully', 'Spam-Ordner', 'spam folder']) {
  assert(companyBundle.includes(text), `Preview company bundle is missing: ${text}`);
}
assert(companyBundle.includes('role:"dialog"') || companyBundle.includes('role:"dialog"'), 'Company success modal dialog semantics are missing');
assert(companyBundle.includes('aria-modal'), 'Company success modal aria-modal is missing');

console.log('Preview company build verification passed (static, no network request).');
