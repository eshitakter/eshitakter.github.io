# Eshita Akter — Personal Portfolio

A premium, dark-and-lavender personal brand website positioning Eshita Akter for
Business Analyst / Data & Business Analytics roles. Built with plain HTML5, CSS3
and vanilla JavaScript — no build step, no framework, no backend required.

## File structure

```
/portfolio
  ├── index.html                     → all page content
  ├── style.css                      → design system + layout + animation
  ├── script.js                      → loader, scroll reveals, charts, filters
  ├── Eshita_Akter_Resume_ATS.docx   → downloadable CV (linked from Hero + Contact)
  ├── assets/
  │     └── eshita-profile.jpg       → hero portrait
  └── README.md
```

## Design system at a glance

- **Palette:** near-black background (`#09070E`), deep eggplant purple, lavender
  and soft lilac accents, warm-white text. All tokens live at the top of
  `style.css` under `:root` — change them there and the whole site updates.
- **Type:** Fraunces (editorial display headings), Manrope (body/UI), JetBrains
  Mono (data labels, eyebrows, tags) — loaded from Google Fonts.
- **Signature element:** the vertical "thread" spine on the left edge of the
  page (desktop only) that draws itself as you scroll — a visual metaphor for
  turning a raw business question into a resolved insight.
- Respects `prefers-reduced-motion`; all interactive charts are built with
  inline SVG/Canvas (no external chart library).

## Replacing your photo

1. Drop a new image into `assets/`, e.g. `assets/your-photo.jpg`.
2. In `index.html`, find:
   ```html
   <img src="assets/eshita-profile.jpg" alt="Portrait of Eshita Akter" class="portrait-img">
   ```
   and update the `src` (and `alt`) to match.
3. A portrait roughly 5:6 (portrait orientation) fits the frame best — the
   frame will crop wider/taller images via `object-fit: cover`.

## Updating your links

All real links are already wired in from your CV and GitHub wiki:

- LinkedIn — `https://linkedin.com/in/eshitakter`
- GitHub — `https://github.com/eshitakter`
- Kaggle — `https://kaggle.com/eshitakter`
- Portfolio — `https://datascienceportfol.io/eshitakter`
- Email — `eshitaakter5026@gmail.com`
- Phone — `+880 1624-788966`

These appear in the **Hero**, **Projects** (per-project links currently point
to your GitHub profile since individual repo URLs weren't provided — update
the `href` on each `.project-link` once you have direct repo/dashboard links),
and **Contact** sections. Search `index.html` for the URL you want to change
and replace it in place.

## Updating content

Every section pulls directly from your resume and GitHub wiki — nothing was
invented. To edit copy, open `index.html` and look for the matching `<section
id="...">` (ids match the nav: `about`, `journey`, `skills`, `projects`,
`think`, `beyond`, `contact`). Skill "levels" in the radar chart
(`script.js` → `radarData`) are explicitly labeled as a **self-assessed
profile**, not a performance metric — adjust the `value` (0–1) per skill if
your self-assessment changes, no design work needed.

## Deploying to GitHub Pages

1. Create a new repository (or reuse `eshitakter.github.io` for a user-root
   site — recommended, since it needs no extra configuration).
2. Push these files to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Launch portfolio"
   git branch -M main
   git remote add origin https://github.com/eshitakter/eshitakter.github.io.git
   git push -u origin main
   ```
3. If you used a repo name other than `eshitakter.github.io`, go to
   **Settings → Pages** in GitHub, set the source branch to `main` and folder
   to `/ (root)`. Your site will publish at
   `https://eshitakter.github.io/<repo-name>/`.
4. Wait 1–2 minutes, then visit the published URL. GitHub Pages serves static
   files directly, so no build step is needed.

## Pre-launch checklist

- [ ] Swap in your final headshot (see above).
- [ ] Update the two `.project-link` URLs once specific repo/dashboard links exist.
- [ ] Re-check the CV filename matches what you upload (`Eshita_Akter_Resume_ATS.docx`) or update the `href="..."` download links in the Hero and Contact sections.
- [ ] Test on a phone — the nav collapses to a slide-in menu under 900px wide.
- [ ] Run a Lighthouse pass in Chrome DevTools for a final accessibility/performance check.
