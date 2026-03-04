# Editing Guide — The Cisneros Group Website

All content lives in plain Markdown/HTML files. No build step needed locally —
just edit, commit, and push; GitHub Pages rebuilds the site in ~1 minute.

---

## Site-wide settings → `_config.yml`

| Field | What it does |
|-------|-------------|
| `title` | Site name shown in the nav bar and browser tab |
| `description` | Subtitle shown in the hero overlay on the home page |
| `hero_image` | (commented out) Path to a static image that replaces the animation |

**Swapping the hero animation for a photo:**
1. Drop your image at `assets/images/hero.jpg` (any format/name works).
2. In `_config.yml`, uncomment and update:
   ```yaml
   hero_image: assets/images/hero.jpg
   ```
3. Push — the animation is replaced with your image.

---

## Home page → `index.md`

### Profile photo
1. Place your photo at `assets/images/profile.jpg`.
2. In `index.md`, find the `<div class="profile-placeholder">` block and
   replace the entire `<div>…</div>` with:
   ```html
   <img src="/assets/images/profile.jpg"
        alt="Dr. Esteban Cisneros"
        class="profile-photo">
   ```

### Bio text
Find the paragraph starting with `<strong>Dr. Esteban Cisneros</strong>` and
edit the surrounding `<p>` tags. Plain text and basic HTML (`<strong>`,
`<a href>`, `<br>`) work fine inside them.

### Research interests
Each bullet is a `<li>` inside `<ul class="interests-list">`.
Edit or add lines following this pattern:
```html
<li>Your research interest here</li>
```

### News items
Each item is a `<div class="news-item">` pair. Add a new one by copying an
existing block and updating the date and text:
```html
<div class="news-item">
  <span class="news-date">Mar 2026</span>
  <span class="news-text">Your news text here.</span>
</div>
```
Dates are freeform text — use whatever format you like.

### Apply section
Edit the paragraphs inside `<div class="apply-box">` directly.

---

## Research page → `research.md`

### Overview paragraphs
Edit the `<p>` tags inside the first `<section class="content-section">`.

### Adding a publication
Copy one `<li class="pub-item">` block and fill in:
- `href="https://doi.org/…"` — the real DOI link
- `.pub-title` — full paper title
- `.pub-authors` — author list (bold your name with `<strong>E. Cisneros</strong>` if you like)
- `.pub-journal` — journal name, volume, pages, year

### Adding a project card
Copy one `<div class="project-card">` block inside `.project-grid` and update
the `<h3>` title, description `<p>`, and funding note.

---

## People page → `people.md`

Each person is a `<li class="person-item">`. There are four groups
(Post-Docs, PhD, MS, Undergraduate). To add someone, copy a `<li>` block
from the appropriate group and update:

- **Avatar initials** — the two-letter `<div class="person-avatar">` text
- **Name + email** — `<a href="mailto:name@utk.edu">Full Name</a>`
- **Role/topic** — the `<span class="person-role">` line

```html
<li class="person-item">
  <div class="person-avatar">AB</div>
  <div class="person-info">
    <span class="person-name">
      <a href="mailto:asmith@vols.utk.edu">Alice Smith</a>
    </span>
    <span class="person-role">Dissertation: DNS of supersonic mixing layers</span>
  </div>
</li>
```

To **remove** a placeholder, delete the entire `<li>…</li>` block.

---

## Teaching page → `teaching.md`

Each course is a `<div class="course-card">`. To add a course, copy the
existing card (or the commented-out template at the bottom of the file) and
fill in:

```html
<div class="course-card">
  <div class="course-code">ME 4XX · Undergraduate</div>
  <div class="course-title">Course Title Here</div>
  <p>Course description.</p>
  <p class="course-meta">
    <strong>Next offering:</strong> Spring 2027 &middot;
    <strong>Credits:</strong> 3 hrs
  </p>
</div>
```

---

## Quick-reference: where everything lives

```
_config.yml          ← site title, description, hero image toggle
index.md             ← Home: bio, research interests, news, apply
research.md          ← Research: overview, publications, projects
people.md            ← People: group members by degree level
teaching.md          ← Teaching: course cards
assets/images/       ← Drop profile.jpg and hero.jpg here
assets/css/custom.css  ← All styles (colours, layout, typography)
assets/js/simulation.js ← Hero animation (no need to touch this)
```

---

## Workflow

```bash
# Edit a file, then:
git add <file>
git commit -m "Update bio / add publication / etc."
git push
# Site rebuilds on GitHub Pages in ~1 minute.
```
