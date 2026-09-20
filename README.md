# Odi.dev — Odi Anuntelemi Olurotimi

A responsive, dark futuristic portfolio built with **HTML, CSS, and vanilla JavaScript**. No runtime dependencies, framework, build step, external font requests, or backend.

## Preview

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Open `http://localhost:3000`. In Arena, open **Odi’s portfolio** in Live Preview (port 3000). Static deployment also works on GitHub Pages, Netlify, or Vercel; publish the repository root with no build command.

## Theme

CSS custom properties at the top of `styles.css` control the palette:

| Token           | Color     | Purpose                             |
| --------------- | --------- | ----------------------------------- |
| `--bg`          | `#0a0a0f` | Deep dark background                |
| `--steel`       | `#6687a8` | Mature steel blue, replacing purple |
| `--steel-light` | `#a0bbd6` | Readable accent text and gradients  |
| `--teal`        | `#00d4aa` | Availability, actions, highlights   |
| `--pink`        | `#ff6b9d` | Small complementary accents         |

Inter and JetBrains Mono (Google Fonts families) are **self-hosted** in `assets/fonts`, with their SIL Open Font Licenses. The small purple PHP tag dot represents the brand, not the site theme.

## Features

- Fixed transparent-to-glass navigation, active-section tracking, and a mobile slide-in drawer with backdrop, focus trapping, Escape handling, and scroll locking.
- Steel-blue grid, three drifting background orbs, scroll parallax, and a fine-pointer cursor glow.
- Five rotating typed roles, viewport-triggered counters and reveals, animated degree progress, floating glass cards, and hover effects.
- Semantic sections for about, skills, projects, experience, education, and contact.
- SpendWise project card with a screenshot of the real deployed dashboard, plus **Live Demo** and **Source Code** links.
- Downloadable one-page PDF résumé and a printable HTML source.
- `prefers-reduced-motion` support, including changes while the page is open. With reduced motion, content and final progress values remain visible and typing is static. Content is readable without JavaScript.

## Contact behavior — no fake delivery

The contact form validates required fields, email syntax, minimum message length, and whitespace-only input. It then creates a properly encoded **mailto draft** addressed to `anuntelemio@gmail.com`.

- Visitors must review and send it in their email app.
- Feedback says **“Email Draft Prepared,” not “Message Sent.”**
- The form keeps the typed message in case no email app is configured. A fallback link can reopen the draft.
- No form content is stored on a server or in local storage.
- The submit button is initially disabled and only enabled once JavaScript handlers are ready; a no-JavaScript notice provides the direct email link.
- To enable actual in-page delivery later, connect an email/form service and only show a delivery confirmation after its successful response.

## Content and links

- GitHub: `https://github.com/Anu-21-Odi`
- Verified SpendWise source: `https://github.com/Anu-21-Odi/SpendWise`
- **Live demo URL:** `https://spendwiseanu.netlify.app/`, linked from the project card’s Live Demo button.
- **LinkedIn:** `https://www.linkedin.com/in/anuntelemi-odi-80a9433b2/`, linked from the contact section and the footer.
- The project preview uses a real screenshot of the deployed SpendWise dashboard, provided by the site owner.
- Backend/database integration remains labeled as a roadmap item, using the provided project description.
- The training statistic describes the July–September **three-month program**, not three completed months of employment.
- The degree progress is labeled **~50% (estimated)**, as specified; it is not calculated from academic credits.
- Open-source collaboration is described as a next learning goal, not an invented contribution history.

## Updating the photo and CV

Replace `.avatar-initials` in `index.html` with a real photo and meaningful alt text when available. The initials placeholder avoids inventing a portrait; keep the surrounding glow and floating cards.

For résumé changes, edit `Odi-Anuntelemi-Olurotimi-CV.html` and regenerate `Odi-Anuntelemi-Olurotimi-CV.pdf` using Chromium **Print → Save as PDF**, A4, background graphics enabled, headers/footers disabled. The résumé retains a print-friendly light theme.

## Files

- `index.html` — content, inline SVG icons, form, project preview
- `styles.css` — theme, responsive rules, motion, and reduced-motion alternatives
- `script.js` — all interactions, no libraries
- `assets/fonts/` — local variable fonts and licenses
- `assets/favicon.svg` — gradient site icon
- `assets/spendwise-dashboard.png` — live SpendWise dashboard screenshot used as the project preview
- `Odi-Anuntelemi-Olurotimi-CV.html` and `.pdf` — résumé source and download
