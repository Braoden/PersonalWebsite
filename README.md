# Braden Chan — Portfolio

A single-page personal portfolio with heavy 3D and mouse-driven interactivity.
Built with React + Vite, Three.js (React Three Fiber), Framer Motion, Tailwind,
and Lenis smooth scroll. Dark, premium, Awwwards-leaning aesthetic.

![Hero](public/favicon.svg)

## Stack

| Concern        | Tech                                            |
| -------------- | ----------------------------------------------- |
| Framework      | React 18 + Vite                                 |
| 3D / WebGL     | three, @react-three/fiber, @react-three/drei    |
| DOM animation  | framer-motion                                   |
| Smooth scroll  | lenis                                            |
| Styling        | Tailwind CSS + CSS variables                    |
| Icons          | lucide-react                                     |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Requires Node 18+.

## Project structure

```
src/
  data/content.js      ← ALL site copy, projects, links (edit here)
  lib/
    MouseProvider.jsx  ← global cursor state (3D ref + Framer motion values)
    SmoothScroll.jsx   ← Lenis provider + scrollTo for nav anchors
  hooks/               ← useMousePosition, useIsTouch
  three/
    SceneCanvas.jsx    ← fixed background <Canvas> (perf, pause, mobile fidelity)
    HeroBlob.jsx       ← distorted sphere centerpiece (cursor + scroll reactive)
    Particles.jsx      ← drifting particle field w/ mouse parallax
    FloatingShapes.jsx ← wireframe geometry accents
  components/          ← Navbar, CustomCursor, MagneticButton, ProjectCard, SectionWrapper
  sections/            ← Hero, About, Skills, Projects, Experience, Education, Contact, Footer
  index.css            ← Tailwind layers, design tokens, custom cursor, fluid type
```

## Editing content

**All text, projects, skills, and links live in [`src/data/content.js`](src/data/content.js).**
Components read from it — you never touch JSX to change copy.

### Content sources

All content is real: **experience, education, and skills** come from Braden's
resume; **bio and the three pinned projects** come from the GitHub profile;
**contact email** is `chanb53@mcmaster.ca`. Everything is editable here.

The Experience section will render a warning banner if any entry in the
`experience` array is flagged `isPlaceholder: true` — none currently are.

## Changing colors / theme

Colors are defined in **two synced places** — update both:

1. `src/index.css` → the `:root` CSS variables (`--bg`, `--accent`, …)
2. `tailwind.config.js` → the `theme.extend.colors` map (so `bg-accent` etc. work)

Current palette: bg `#0F141A`, surface `#1C242E`, text `#DCE3EB`,
accent `#38BDF8`, accent-2 `#7DD3FC`. Fonts: Space Grotesk (display) + Inter
(body), loaded in `index.html`.

## Contact & résumé

The Contact section is just three links — GitHub, LinkedIn, and email (no form).
The résumé PDF lives at `public/Braden-Chan-Resume.pdf` and is offered as a
download button in the About section (path set by `meta.resumeUrl` in
`content.js`). Drop in a new PDF at that path to update it.

## Performance & accessibility

- Background `<Canvas>` is lazy-loaded and `Suspense`-wrapped; pixel ratio capped to `[1, 2]`.
- Rendering pauses (`frameloop="never"`) when the tab is hidden or the user prefers reduced motion.
- Particle / shape counts drop on small screens.
- Custom cursor, magnetic buttons, and mouse parallax are disabled on touch devices.
- `prefers-reduced-motion` is respected globally (CSS) and in 3D/Lenis.
- Semantic landmarks, focusable controls, alt/aria where relevant.

## Deployment

Static build — host the `dist/` folder anywhere:

- **Vercel / Netlify:** import the repo; build command `npm run build`, output `dist`.
- **AWS S3 + CloudFront:** `npm run build`, then upload `dist/` to the bucket.

No environment variables or server are required.
