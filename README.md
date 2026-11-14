# cv.lucasco.dev

Personal CV for Lucas Casco, built as a static site with Astro. Light mode only,
zero client-side JavaScript, and a downloadable PDF per language.

- English (default): <https://cv.lucasco.dev/>
- Spanish: <https://cv.lucasco.dev/es/>

## Stack

- [Astro 7](https://astro.build) with static output
- Self-hosted Inter via `@fontsource-variable/inter`
- `@astrojs/sitemap` for `sitemap-index.xml`
- Deployed on Vercel

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
npm run verify   # type/diagnostic check + build + dist invariants
```

`npm run verify` runs `astro check`, builds the site, and then executes
`scripts/verify.mjs`. That script guards the invariants that are easy to break
while editing: language attributes, per-language PDF links, canonical and
hreflang URLs, light-mode-only CSS, absence of JS bundles, and sitemap routes.

## Content

All CV content lives in **one typed file**: `src/data/cv.ts`. Both languages are
defined there with the same shape (`CvContent`), so the two versions cannot drift
apart structurally.

To update the CV:

1. Edit the `en` and/or `es` objects in `src/data/cv.ts`.
2. Replace the PDFs in `public/cv/`:
   - `public/cv/lucas-casco-cv-en.pdf`
   - `public/cv/lucas-casco-cv-es.pdf`
3. Run `npm run verify`.

Section numbering, dates, bullets, stack chips, and download links are all driven
by that file. `src/pages/index.astro` and `src/pages/es/index.astro` only select
which locale to render.

## Structure

```text
public/
  cv/                     # downloadable PDFs (one per language)
  favicon.svg
  robots.txt
scripts/
  verify.mjs              # dist invariant checks
src/
  components/
    CvDocument.astro      # full page composition
    DownloadIcon.astro
    JobEntry.astro
    ProjectEntry.astro
    Section.astro
  data/cv.ts              # all content, both languages
  layouts/BaseLayout.astro
  pages/
    index.astro           # /        (English)
    es/index.astro        # /es/     (Spanish)
    404.astro
  styles/global.css       # light-only tokens, layout, responsive, print
```

## Routing and SEO

- `/` renders English, `/es/` renders Spanish. The locale switcher links between
  them and marks the active one with `aria-current="page"`.
- Each page declares `lang`, `canonical`, and `hreflang` alternates
  (`en`, `es`, `x-default`).
- `robots.txt` points to `sitemap-index.xml`, generated at build time.

## Deployment

The repository is ready for Vercel with `vercel.json` (Astro framework preset,
`dist` as the output directory). Import the repo in Vercel and add the custom
domain:

1. Add `cv.lucasco.dev` as a project domain in Vercel.
2. Create the DNS record Vercel indicates (usually a `CNAME` for `cv` pointing to
   `cname.vercel-dns.com`).
3. Vercel issues the TLS certificate automatically.

No environment variables are required.

## Notes

- The site never defines a dark color scheme; `color-scheme: light` is declared
  explicitly and `scripts/verify.mjs` fails the build check if a
  `prefers-color-scheme` rule appears.
- Print styles are included so `Cmd/Ctrl + P` produces a compact two-page CV,
  but the primary downloadable artifact is always the PDF in `public/cv/`.
