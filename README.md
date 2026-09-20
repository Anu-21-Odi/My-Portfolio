# Portfolio — Odi Anuntelemi Olurotimi

```
portfolio/
├── index.html                        ← the site markup
├── styles.css                        ← all styling
├── script.js                         ← all interactivity
├── Odi-Anuntelemi-Olurotimi-CV.pdf   ← CV, linked from the Download buttons
├── Odi-Anuntelemi-Olurotimi-CV.html  ← same CV as a web page (printable to PDF)
└── make_cv.py                        ← regenerates the PDF from a content dict
```

Open `index.html` in any browser. No install, no build step, no dependencies.

---

## 1. The three things you must do before anyone sees this

1. **GitHub + LinkedIn URLs.** Right now they point at `https://github.com/` and
   `https://linkedin.com/` — the homepages, not your profiles. Search `index.html` for
   `TODO` and replace both, in the hero socials and again in the contact section.
2. **SpendWise links.** The "Live demo" and "Source code" buttons are `href="#"` — dead.
   Put your repo URL in, or delete both buttons until SpendWise is deployed.
3. **Your real GitHub username in the CV.** The PDF and the CV page say
   `github.com/<your-username>`. Edit `make_cv.py`, run `python3 make_cv.py`, done.

---

## 2. Where everything lives

### `index.html`
| Section | What to edit |
|---|---|
| `<title>` + social meta | first 12 lines — shows in browser tabs and link previews |
| Header brand | `<a class="brand">Odi Olurotimi</a>` |
| Hero `<h1>` | the rotating words are the four `<span>`s inside `id="rot"` |
| Hero intro | `<p class="hero-lead">` |
| Availability badge | `<span id="loc">Lokoja, Nigeria</span>` and the text before it |
| Social icons | `<div class="socials">` — GitHub, LinkedIn, email |
| Skill marquee | `<div class="marquee">` — **duplicate each word twice**, or the scroll will jump |
| Photo | replace `<div class="ph">…</div>` inside `.portrait` with `<img src="me.jpg" alt="Odi Anuntelemi Olurotimi">` |
| Facts strip | the four `<div class="stat">` blocks |
| Featured project | the whole `<article class="feat">` block |
| Experience + education | each `<div class="tl-item">` |
| Skills | the four `<ul class="chips">` lists |
| Contact | the `.contact-sub` paragraph and `anuntelemio@gmail.com` |

### `styles.css`
- **Section 1 (`:root`)** holds every color. Change `--accent: #d9ff3d` and the whole site
  re-themes — buttons, dots, marquee bullets, bullet dashes, hover states, everything.
  Alternatives: `#ff6b4a` coral, `#3ddc97` mint, `#5b8cff` blue, `#ff4d94` pink, `#f4c15d` gold.
- **Section 8** has the featured-project card, including the five `.art-1` … `.art-5`
  gradient backgrounds you can reuse for future projects.
- Light theme, if you want one: set `--bg:#faf9f6`, `--fg:#0d0d0f`, `--muted:#6a6a72`,
  `--bg-card:#fff`, `--line:rgba(0,0,0,.12)`, `--ink:#fff`.

### `script.js`
Six small blocks, each numbered and commented. Nothing needs editing unless you want to
change the rotating-word speed (the `2600` in block 5) or remove a feature.

---

## 3. Adding a second project

Copy the whole `<article class="feat"> … </article>` block inside `<div class="work-list">`,
paste it below the first, then change:

- `class="feat-art art-1"` → `art-2` (up to `art-5`) for a different color
- the `<span>SpendWise · 2026</span>` label
- title, lede paragraph, the three `<li>` bullets, tags, roadmap note, and links

If you'd rather list projects compactly once you have four or five, say the word and I'll
swap the featured card for a row-style list like the first draft had.

---

## 4. Publishing (free)

**Netlify Drop** — fastest. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag
the entire `portfolio` folder onto the page. You get a live HTTPS URL in ~10 seconds, no
account required to start.

**GitHub Pages** — push this folder to a repo → Settings → Pages → source: `main` / root.
Site appears at `yourname.github.io`.

**Vercel** — `npm i -g vercel`, run `vercel` in this folder, accept defaults.

Then add a custom domain under the host's domain settings if you want one (`odi.dev` etc.).
HTTPS is automatic on all three.

---

## 5. Regenerating the CV PDF

```bash
pip install reportlab
python3 make_cv.py     # rewrites Odi-Anuntelemi-Olurotimi-CV.pdf
```

All the CV text lives in the `CONTENT` dict at the top of `make_cv.py` — name, contact line,
summary, education, experience, projects, skills. Edit it, re-run, and the one-page PDF updates.

---

## 6. Honest note on positioning

Your site currently says "one project, well built" rather than padding with fake numbers —
that's deliberate, and it's the stronger play. Recruiters screening students expect one or
two projects. They're much less forgiving of a portfolio that claims six years of experience
and can't answer a question about caching.

The fastest way to make this page hit harder is to **deploy SpendWise** and put a real URL
behind that Live demo button. A working link beats any amount of copy, and it gives you
something concrete to talk through in an interview.
