# Vortex — landing site

Marketing / pre-launch landing page for **Vortex**, built with **React + Vite**
(JavaScript), Tailwind CSS 4, Framer Motion and Lenis smooth scroll.

A preloader + splash "curtain lift" reveal, custom cursor, ambient animated
background, and sections for hero, how it works, showcase, stats, platforms,
FAQ and an email waitlist.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Deploy (Vercel)

Static Vite build — Vercel auto-detects the framework (build `vite build`,
output `dist`), no config needed.

The waitlist form validates and acknowledges signups client-side but does
**not** store them (there is no backend), and the UI shows no fabricated
signup counter — no invented social proof. To capture real signups, POST the
email to a form service or API in `src/components/vortex/download.jsx`.
