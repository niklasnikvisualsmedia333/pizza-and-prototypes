import { access, readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const preview = process.env.VITE_SITE_ENV === 'preview';
const basePath = process.env.VITE_BASE_PATH || '/';
const read = (path) => readFile(resolve(path), 'utf8');

async function exists(path) {
  try {
    await access(resolve(path));
    return true;
  } catch {
    return false;
  }
}

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
assert(downloadsSource.includes('downloads/tech-meets-problems-one-pager.pdf'), 'One-pager URL is incorrect');
assert(!communityHtml.includes('/pizza-and-prototypes/'), 'Old repository base path found in community build');
assert(!companyHtml.includes('/pizza-and-prototypes/'), 'Old repository base path found in company build');
assert(appSource.includes("const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdobqwa'"), 'Community Formspree endpoint changed');
assert(appSource.includes("const N8N_WEBHOOK_URL = 'https://n8n.srv1037647.hstgr.cloud/webhook/tech-meets-problems-registration'"), 'Community n8n endpoint changed');
assert(appSource.includes('privacyAndUpdatesAcceptedAt'), 'Community consent payload field missing');
assert(companySource.includes('VITE_COMPANY_CONTACT_ENDPOINT?.trim()'), 'Company endpoint environment fallback missing');
assert(companySource.includes('companyWebsite.trim()'), 'Company honeypot guard missing');
assert(companySource.includes('window.location.href = `mailto:${SITE.contactEmail}'), 'Company mailto fallback missing');
assert(companySource.includes('fetch(COMPANY_CONTACT_ENDPOINT'), 'Company JSON POST flow missing');
assert(!companySource.includes('tech-meets-problems-registration'), 'Company form references the Community webhook');
assert(companySource.includes("submissionType: 'company_interest'"), 'Company payload type missing');
for (const field of ['company', 'name', 'email', 'role', 'format', 'challenge', 'phone', 'timeframe', 'language', 'submittedAt', 'landingPage', 'referrer', 'utmSource', 'utmMedium', 'utmCampaign', 'utmContent', 'utmTerm', 'trackingSummary', 'privacyAccepted', 'privacyAcceptedAt', 'privacyVersion', 'privacyText']) {
  assert(companySource.includes(field), `Company payload field missing: ${field}`);
}
assert(gallerySource.includes("event.key === 'Escape'"), 'Gallery Escape behavior missing');
assert(gallerySource.includes("event.key === 'ArrowLeft'"), 'Gallery keyboard navigation missing');
assert(gallerySource.includes("event.key === 'ArrowRight'"), 'Gallery next-image keyboard navigation missing');
assert(gallerySource.includes("document.body.style.overflow = 'hidden'"), 'Gallery scroll lock missing');
assert(gallerySource.includes('createPortal'), 'Gallery lightbox is not portaled above sticky page chrome');

if (preview) {
  const robots = await read('dist/robots.txt');
  assert(communityHtml.includes('noindex,nofollow,noarchive'), 'Preview community page is indexable');
  assert(companyHtml.includes('noindex,nofollow,noarchive'), 'Preview company page is indexable');
  assert(!communityHtml.includes('static.cloudflareinsights.com'), 'Cloudflare analytics found in preview');
  assert(!companyHtml.includes('static.cloudflareinsights.com'), 'Cloudflare analytics found in preview company page');
  assert(!communityHtml.includes('rel="canonical"'), 'Canonical URL found in preview');
  assert(!companyHtml.includes('rel="canonical"'), 'Company canonical URL found in preview');
  assert(robots.includes('Disallow: /'), 'Preview robots.txt does not block crawling');
  assert(!(await exists('dist/CNAME')), 'CNAME found in preview build');
  assert(!(await exists('dist/sitemap.xml')), 'Sitemap found in preview build');
  assert(communityHtml.includes(`${basePath}assets/`), 'Preview community assets do not use the preview base path');
  assert(companyHtml.includes(`${basePath}assets/`), 'Preview company assets do not use the preview base path');
  assert(appSource.includes("VITE_SITE_ENV === 'preview'"), 'Community preview analytics guard missing');
} else {
  assert(communityHtml.includes('static.cloudflareinsights.com'), 'Cloudflare analytics missing from production build');
  assert(companyHtml.includes('static.cloudflareinsights.com'), 'Cloudflare analytics missing from production company build');
  assert(!communityHtml.includes('noindex,nofollow,noarchive'), 'Production community page is noindexed');
  assert(!companyHtml.includes('noindex,nofollow,noarchive'), 'Production company page is noindexed');
  assert(basePath === '/', 'Production verification must use root base path');
}

console.log(`Build verification passed (${preview ? 'preview' : 'production'}).`);
