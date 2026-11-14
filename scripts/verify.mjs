import { access, readFile, readdir } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const failures = [];

const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const read = (path) => readFile(new URL(path, dist), 'utf8');
const exists = async (path) => {
  try {
    await access(new URL(path, dist));
    return true;
  } catch {
    return false;
  }
};

const en = await read('index.html');
const es = await read('es/index.html');
const notFound = await read('404.html');

// Routes and language attributes
check(en.includes('<html lang="en">'), 'EN page is missing <html lang="en">');
check(es.includes('<html lang="es">'), 'ES page is missing <html lang="es">');

// Language-specific content
check(
  en.includes('Fullstack Software Engineer from Paraguay'),
  'EN page is missing the English summary'
);
check(
  !en.includes('Ingeniero de Software Fullstack de Paraguay'),
  'EN page contains the Spanish summary'
);
check(
  es.includes('Ingeniero de Software Fullstack de Paraguay'),
  'ES page is missing the Spanish summary'
);
check(
  !es.includes('Fullstack Software Engineer from Paraguay'),
  'ES page contains the English summary'
);

// Downloads per language
check(
  en.includes('href="/cv/lucas-casco-cv-en.pdf"'),
  'EN page does not link the English PDF'
);
check(
  !en.includes('href="/cv/lucas-casco-cv-es.pdf"'),
  'EN page links the Spanish PDF'
);
check(
  es.includes('href="/cv/lucas-casco-cv-es.pdf"'),
  'ES page does not link the Spanish PDF'
);
check(
  !es.includes('href="/cv/lucas-casco-cv-en.pdf"'),
  'ES page links the English PDF'
);
check(
  (await exists('cv/lucas-casco-cv-en.pdf')) &&
    (await exists('cv/lucas-casco-cv-es.pdf')),
  'PDF assets were not emitted to dist/cv'
);

// Canonical and alternates
check(
  en.includes('<link rel="canonical" href="https://cv.lucasco.dev/">'),
  'EN canonical URL is wrong'
);
check(
  es.includes('<link rel="canonical" href="https://cv.lucasco.dev/es/">'),
  'ES canonical URL is wrong'
);
for (const [name, html] of [
  ['EN', en],
  ['ES', es],
]) {
  check(
    html.includes('hreflang="en" href="https://cv.lucasco.dev/"'),
    `${name} page is missing the en alternate`
  );
  check(
    html.includes('hreflang="es" href="https://cv.lucasco.dev/es/"'),
    `${name} page is missing the es alternate`
  );
  check(
    html.includes('hreflang="x-default"'),
    `${name} page is missing the x-default alternate`
  );
}

// Light mode only
check(
  en.includes('<meta name="color-scheme" content="light"') &&
    es.includes('<meta name="color-scheme" content="light"'),
  'color-scheme meta tag is missing'
);

const assets = await readdir(new URL('_astro/', dist));
const cssFiles = assets.filter((file) => file.endsWith('.css'));
check(cssFiles.length > 0, 'No CSS bundle was emitted');

for (const file of cssFiles) {
  const css = await read(`_astro/${file}`);
  check(
    !css.includes('prefers-color-scheme'),
    `CSS bundle ${file} contains a color-scheme media query`
  );
}

// No client-side JavaScript
const jsFiles = assets.filter((file) => file.endsWith('.js'));
check(jsFiles.length === 0, `Unexpected JS bundles: ${jsFiles.join(', ')}`);
check(!/ <script/i.test(en + es), 'Pages contain client <script> tags');

// Sitemap
const sitemap = await read('sitemap-0.xml');
check(
  sitemap.includes('<loc>https://cv.lucasco.dev/</loc>'),
  'Sitemap is missing the EN URL'
);
check(
  sitemap.includes('<loc>https://cv.lucasco.dev/es/</loc>'),
  'Sitemap is missing the ES URL'
);

// 404
check(
  notFound.includes('Page not found') && notFound.includes('/es/'),
  '404 page is missing content or the Spanish link'
);

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} check(s) failed:`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log('✓ All dist checks passed');
