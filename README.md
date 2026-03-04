# The Cisneros Group — ecisneros8.github.io

Personal academic website for The Cisneros Group at the University of Tennessee
Space Institute (UTSI).

**Live site:** https://ecisneros8.github.io

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.md` | Bio, research interests, news, apply |
| Research | `research.md` | Overview, publications, current projects |
| People | `people.md` | Group members by degree level |
| Teaching | `teaching.md` | Course list |

## Customising the hero section

By default the homepage shows an animated turbulent-flow simulation.
To replace it with a static image:

1. Drop your image at `assets/images/hero.jpg` (any format works).
2. Open `_config.yml` and uncomment/update the `hero_image:` line.

## Adding a profile photo

Replace the placeholder in `index.md` with:

```html
<img src="/assets/images/profile.jpg" alt="Dr. Esteban Cisneros" class="profile-photo">
```

and place your photo at `assets/images/profile.jpg`.

## Local development

```bash
bundle exec jekyll serve
```
