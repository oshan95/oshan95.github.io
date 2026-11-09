# oshan95.github.io

Personal portfolio for Oshan Mendis, a software engineer based in Auckland, New Zealand.

Live site: https://oshan95.github.io

## About the site

A static site with no build step and no runtime dependencies. It uses plain HTML, CSS and a small amount of JavaScript.

- Light and dark themes. The first visit follows the system setting and the toggle remembers the choice.
- Responsive layout, keyboard friendly, skip link, and support for reduced motion.
- Fonts (Fraunces, Inter, JetBrains Mono) are self-hosted in `/fonts`, so the page makes no third-party requests.
- Images are optimised WebP files in `/images`.

## Structure

```
index.html            all page content
index.css             theme tokens, layout and components
index.js              theme toggle, mobile menu, scroll effects
fonts/                self-hosted variable fonts (SIL Open Font License)
images/               portrait, project illustrations, favicon
resume/               CV as a PDF, linked from the hero and contact sections
```

## Run locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Updating content

- Text, roles, projects and skills live in `index.html`. Each section is marked with a comment.
- Colours and fonts are CSS variables at the top of `index.css`. Light values are in `:root` and dark values are in `:root[data-theme="dark"]`.
- Replace `resume/Oshan_Mendis_CV.pdf` when the CV changes and keep the same file name. Keep phone and email out of the public copy.
