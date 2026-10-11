<div align="center">

<img src="docs/banner.svg" alt="Vortex — paste a link, keep the video. Free Android app, no ads, no accounts." width="100%">

<br>

[![Live site](https://img.shields.io/badge/%E2%96%B6_live_site-vortex--site--pi.vercel.app-c084fc?style=for-the-badge&labelColor=0a0618)](https://vortex-site-pi.vercel.app)

![React 19](https://img.shields.io/badge/React_19-0a0618?style=flat-square&logo=react&logoColor=22d3ee)
![Vite](https://img.shields.io/badge/Vite-0a0618?style=flat-square&logo=vite&logoColor=c084fc)
![Tailwind 4](https://img.shields.io/badge/Tailwind_4-0a0618?style=flat-square&logo=tailwindcss&logoColor=22d3ee)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0a0618?style=flat-square&logo=framer&logoColor=c084fc)

**The marketing and pre-launch site for Vortex, a free Android app that saves video and audio from a pasted link straight to your Downloads folder.**

</div>

<br>

## What's on the page

A cinematic single-page launch site: a preloader and splash **curtain-lift reveal**, a custom cursor, an ambient animated background and Lenis smooth scrolling, then the story in order.

| Section | Job |
|---|---|
| Hero | The one-line promise: *Paste a link. Keep the video.* |
| How it works | Three steps from link to file |
| Showcase | The app UI in motion |
| Stats / Platforms | What it supports and why it's fast |
| FAQ | Radix accordion with the honest answers |
| Waitlist | Email capture with inline validation |

## Stack

React 19 · Vite · Tailwind CSS 4 · Framer Motion · Lenis · Radix UI (accordion) · Sonner toasts · Lucide icons

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Deploy

Static Vite build. Vercel auto-detects the framework (`vite build`, output `dist`), no config needed.

## Honest by design

The waitlist form validates and acknowledges signups client-side but does **not** store them (there is no backend), and the UI shows no fabricated signup counter. No invented social proof. To capture real signups, POST the email to a form service or API in `src/components/vortex/download.jsx`.

<div align="center"><sub>Built by <a href="https://github.com/TPAINN">Apostolos Peiniris</a></sub></div>