# TA Software FU Wiki

Documentation hub for the APU Technical Assistant Software Functional Unit — procedures, setup guides and reference material. Built with [Astro Starlight](https://starlight.astro.build), written in plain Markdown, deployed on Cloudflare Pages. All source, docs included, lives in this repo.

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the built site locally
```

Every page shows a "Last updated" date and an "Edited by" name pulled straight from `git log` at build time (see [How the byline works](#how-the-byline--last-updated-works)), so those only appear correctly once a page has at least one commit — a brand-new, uncommitted page just won't show one yet.

## Page structure

Every page is a Markdown file under `src/content/docs/`, one folder per sidebar section:

```
src/content/docs/
├── index.mdx              # the hub/home page
├── macos/                  # "macOS Guides" section
│   └── utm-setup.md
├── windows/                 # "Windows & Lab Systems" section
│   └── reimaging-guide.md
├── software-fu/             # "Software FU Procedures" section
│   └── overview.md
└── archive/                 # "Archived" section — see below
    └── noload-setup.md
```

The folder a page lives in **is** its sidebar section — Starlight autogenerates each section's sidebar entries from its folder (configured in `astro.config.mjs` under `starlight().sidebar`), sorted alphabetically by default. A page's URL matches its path, e.g. `src/content/docs/macos/utm-setup.md` → `/macos/utm-setup/`.

## Adding a new page

1. Add a `.md` file under the right section folder (or create a new folder for a new section — see below).
2. Give it front matter:
   ```md
   ---
   title: Page Title
   description: One sentence, used for search results and link previews.
   ---
   ```
   Optional: `sidebar: { order: 1 }` to manually order it within its section (default is alphabetical).
3. Write the body in plain Markdown. Headings automatically populate the right-hand "On this page" table of contents — no manual TOC markup needed.
4. Commit and open a PR. `npm run build` runs in CI on every PR as a sanity check.

### Adding a new section

Create a new folder under `src/content/docs/`, add at least one page to it, then add an entry to the `sidebar` array in `astro.config.mjs`:

```js
{
  label: 'Your Section Label',
  items: [{ autogenerate: { directory: 'your-folder-name' } }],
},
```

If it should also appear as a quick-access card on the home page, add a `<Card>` to `src/content/docs/index.mdx`.

### Archiving a page

When a guide is no longer maintained but worth keeping for reference (e.g. `archive/noload-setup.md`):

1. Move the file into `src/content/docs/archive/` (`git mv` to keep its history).
2. Add a `banner` to its front matter — Starlight renders this as a full-width notice at the top of the page:
   ```yaml
   banner:
     content: |
       <strong>Archived</strong> — this guide is no longer maintained and may be outdated. Kept for reference only.
   ```
3. Fix any links to it elsewhere on the site (home page cards, other guides) so they point at still-current pages instead.
4. Add an entry to `public/_redirects` from its old path to its new `/archive/...` path, since the URL changes.

The "Archived" sidebar section (`astro.config.mjs`) is collapsed by default and excluded from the home page's "Recently updated" list (`src/components/RecentlyUpdated.astro`), so archiving a page doesn't make it look freshly updated.

## Callouts

Use Starlight's built-in [asides](https://starlight.astro.build/components/asides/) instead of custom HTML — this project's convention maps severity to type like this:

| Use for | Syntax |
|---|---|
| Critical / destructive actions | `:::danger` |
| Important, must-follow instructions | `:::caution` |
| General information | `:::note` |

```md
:::caution
Admin access is required for this step.
:::

:::danger[Custom title]
This step **permanently deletes data**. Back up first.
:::
```

A bracketed title (`:::caution[Custom title]`) is optional and replaces the default "Caution"/"Danger"/"Note" label.

## Images

Put images under `src/assets/images/<section>/` and reference them with a relative Markdown path:

```md
![Alt text describing the image](../../../assets/images/macos/screenshot.png)
```

Astro optimizes images referenced this way automatically (resizing, format conversion). Don't put new images in `public/` unless they need to be referenced by an absolute, unprocessed URL.

## How the byline (last-updated / author) works

- The "Last updated" date is Starlight's native `lastUpdated` feature — it reads each file's git history at build time.
- The "Edited by" name is custom (Starlight doesn't have this built in): `src/lib/gitAuthor.ts` runs `git log -1` per file at build time, and `src/components/Footer.astro` (a Starlight [component override](https://starlight.astro.build/guides/overriding-components/)) renders it next to the date.
- Both require the build machine to have real git history available — Cloudflare Pages' git integration does a full clone by default, so this works out of the box in production. Locally, it reflects whatever's actually committed on your branch.

## Look and feel

The default Starlight theme is overridden to move away from the generic "developer docs" starter look:

- **Fonts**: [Lexend](https://fonts.google.com/specimen/Lexend) for UI/body text, [JetBrains Mono](https://www.jetbrains.com/lp/mono/) for code — self-hosted via `@fontsource/*` packages, loaded in `astro.config.mjs`'s `customCss`.
- **Color**: a purple accent (`src/styles/custom.css`, Starlight's `--sl-color-accent*` tokens), with matching card/aside/hero styling.
- `src/components/Footer.astro` — adds the author byline described above.

The site logo/favicon (`src/assets/logo.png`, `public/favicon.ico`) is unrelated to this theming pass and hasn't been changed. Everything else (sidebar, search, mobile nav, table of contents, dark mode toggle) is Starlight's native behavior, unmodified.

## Deployment

The site is live at **wiki.tasw.qzz.io**, deployed via Cloudflare's Workers Builds (project name `sw-wiki`, connected to this repo's `main` branch in the Cloudflare dashboard — not a GitHub Action). Each push runs `npm run build`, then `wrangler.jsonc` tells `wrangler deploy` to publish `dist/` as static assets:

```jsonc
{
	"name": "sw-wiki",
	"compatibility_date": "2026-09-23",
	"assets": {
		"directory": "./dist",
		"not_found_handling": "404-page"
	}
}
```

`wrangler.jsonc` matters more than it looks: without it, Wrangler auto-detects "this is an Astro project" and runs `astro add cloudflare` to bolt on the SSR adapter (Cloudflare Images/Sessions bindings), which this static site doesn't need and which broke the build the first time. Don't remove this file or add `@astrojs/cloudflare` unless the site actually needs server-side rendering.

`public/_redirects` maps the old Jekyll site's URLs to their new paths. It only rewrites paths on whatever domain serves this deployment — the old site was on `ta-wiki.nodr.me`, this one is on `wiki.tasw.qzz.io`, so if the old domain's bookmarks need to keep working too, that needs a separate domain-level redirect.

`.github/workflows/ci.yml` only runs `npm run build` as a PR sanity check — it does not deploy anything.
