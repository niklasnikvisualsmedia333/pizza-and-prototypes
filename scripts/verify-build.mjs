import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const preview = process.env.VITE_SITE_ENV === 'preview';
const basePath = process.env.VITE_BASE_PATH || '/';
const read = (path) => readFile(resolve(path), 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const [communityHtml, companyHtml, appSource, companySource, downloadsSource, gallerySource] = await Promise.all([
  read('dist/index.html'),
  read('dist/companies/index.html'),
  read('src/App.tsx'),
  read('src/pages/CompaniesPage.tsx'),
  read('src/config/downloads.ts'),
  read('src/components/media/EventGallery.tsx'),
]);

const pdfPath = resolve('dist/downloads/tech-meets-problems-one-pager.pdf');
const pdf = await readFile(pdfPath);
const pdfStats = await stat(pdfPath);

assert(pdf.subarray(0, 4).toString() === '%PDF', 'One-pager is not a readable PDF');
assert(pdfStats.size > 100_000, 'One-pager PDF is unexpectedly small');
assert(downloadsSource.includes("status: 'available'"), 'One-pager download is not marked available');
assert(!communityHtml.includes('/pizza-and-prototypes/'), 'Old repository base path found in community build');
assert(!companyHtml.includes('/pizza-and-prototypes/'), 'Old repository base path found in company build');
assert(appSource.includes("const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdobqwa'"), 'Community Formspree endpoint changed');
assert(appSource.includes("const N8N_WEBHOOK_URL = 'https://n8n.srv1037647.hstgr.cloud/webhook/tech-meets-problems-registration'"), 'Community n8n endpoint changed');
assert(appSource.includes('privacyAndUpdatesAcceptedAt'), 'Community consent payload field missing');
assert(companySource.includes('VITE_COMPANY_CONTACT_ENDPOINT?.trim()'), 'Company endpoint environment fallback missing');
assert(companySource.includes('companyWebsite.trim()'), 'Company honeypot guard missing');
assert(gallerySource.includes("event.key === 'Escape'"), 'Gallery Escape behavior missing');
assert(gallerySource.includes("event.key === 'ArrowLeft'"), 'Gallery keyboard navigation missing');
assert(gallerySource.includes("document.body.style.overflow = 'hidden'"), 'Gallery scroll lock missing');

if (preview) {
  const robots = await read('dist/robots.txt');
  assert(communityHtml.includes('noindex,nofollow,noarchive'), 'Preview community page is indexable');
  assert(companyHtml.includes('noindex,nofollow,noarchive'), 'Preview company page is indexable');
  assert(!communityHtml.includes('static.cloudflareinsights.com'), 'Cloudflare analytics found in preview');
  assert(!companyHtml.includes('static.cloudflareinsights.com'), 'Cloudflare analytics found in preview company page');
  assert(!communityHtml.includes('rel="canonical"'), 'Canonical URL found in preview');
  assert(!companyHtml.includes('rel="canonical"'), 'Company canonical URL found in preview');
  assert(robots.includes('Disallow: /'), 'Preview robots.txt does not block crawling');
  assert(communityHtml.includes(`${basePath}assets/`), 'Preview community assets do not use the preview base path');
  assert(companyHtml.includes(`${basePath}assets/`), 'Preview company assets do not use the preview base path');
} else {
  assert(communityHtml.includes('static.cloudflareinsights.com'), 'Cloudflare analytics missing from production build');
  assert(companyHtml.includes('static.cloudflareinsights.com'), 'Cloudflare analytics missing from production company build');
}

console.log(`Build verification passed (${preview ? 'preview' : 'production'}).`);
