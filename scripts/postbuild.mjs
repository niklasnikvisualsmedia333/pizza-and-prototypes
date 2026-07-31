import { rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

if (process.env.VITE_SITE_ENV === 'preview') {
  const dist = resolve('dist');
  await Promise.all([
    rm(resolve(dist, 'CNAME'), { force: true }),
    rm(resolve(dist, 'sitemap.xml'), { force: true }),
  ]);
  await writeFile(resolve(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf8');
}
