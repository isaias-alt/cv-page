# cv.lucasco.dev

Personal CV for Lucas Casco, rendered as the document itself: two A4 sheets that
reproduce the layout of the source PDF, light mode only and zero client-side
JavaScript.

- English (default): <https://cv.lucasco.dev/>
- Spanish: <https://cv.lucasco.dev/es/>

## Stack

- [Astro 7](https://astro.build) with static output
- Self-hosted [Libertinus Serif](https://github.com/alerque/libertinus) via
  `@fontsource/libertinus-serif`
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

## Fidelity to the source PDF

The layout is measured from the PDFs in `public/cv/`, not approximated. The values
live in `src/styles/global.css`:

| Element | Value |
| --- | --- |
| Page | A4, 18.3 mm top / 20 mm sides and bottom padding |
| Body | Libertinus Serif 12 pt, 16.3 pt line height |
| Name | 22 pt regular, centred |
| Section headings | 12 pt bold, uppercase, 0.5 pt `#969696` rule |
| Job titles | 12.6 pt bold; role titles 12 pt bold |
| Dates | 12 pt italic `#5a5a5a`, right aligned |
| Links | `#1a4fa8` |
| Bullets | marker at 10.8 pt, text at 22.2 pt |

Page 1 holds the header, summary and professional experience; page 2 holds
projects, education, stack, languages and references. Printing the pages
(`@media print`) produces exactly two A4 pages with the same margins.

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

The typed model carries the exact PDF strings (titles, date ranges, reference
text), so the rendered document and the downloadable file say the same thing.
`src/pages/index.astro` and `src/pages/es/index.astro` only select which locale
to render.

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
    CvDocument.astro      # two-sheet composition, toolbar, language switch
    CvSection.astro       # uppercase heading with its rule
    DownloadIcon.astro
  data/cv.ts              # all content, both languages
  layouts/BaseLayout.astro
  pages/
    index.astro           # /        (English)
    es/index.astro        # /es/     (Spanish)
    404.astro
  styles/global.css       # document metrics, responsive, print
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
- Responsive rules are scoped to `@media screen` on purpose: during printing the
  layout viewport is the paper width, so unscoped width queries would shrink the
  document.
- Print styles are included so `Cmd/Ctrl + P` produces the same two-page
  document, but the primary downloadable artifact is always the PDF in
  `public/cv/`.
