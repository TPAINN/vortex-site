# Vortex — landing site

Marketing / pre-launch landing page for **Vortex**, built with Next.js 16,
React 19, Tailwind CSS 4, shadcn/ui and Framer Motion.

Features a preloader + splash "curtain lift" reveal, custom cursor, ambient
animated background, smooth (Lenis) scrolling, and sections for hero, how it
works, showcase, stats, platforms, FAQ and an email waitlist.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy (Vercel)

Deploys on Vercel with zero config — the framework is auto-detected as Next.js
(build `next build`, no `vercel.json` needed).

The waitlist endpoint (`/api/waitlist`) validates and acknowledges signups but
does **not** persist them — there is no database attached and, by design, the
UI shows no fabricated signup counter. To capture real signups, wire a store
(Postgres / KV / an email service) into `src/app/api/waitlist/route.ts`.
