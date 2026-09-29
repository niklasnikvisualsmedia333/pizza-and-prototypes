import { readFile } from 'node:fs/promises';

const files = ['src/content/community.ts', 'src/content/communityOnboarding.ts', 'src/App.tsx', 'index.html'];
for (const file of files) {
  const text = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
  const match = text.match(/[\u2013\u2014]/u);
  if (match) {
    const line = text.slice(0, match.index).split('\n').length;
    throw new Error(`Long dash punctuation found in ${file}:${line}`);
  }
}
console.log('Community copy check passed: no en dash or em dash punctuation in reviewed UI source.');
