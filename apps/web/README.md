# AKORD Web

The public AKORD website and immersive Experience Engine, built with Next.js, React, TypeScript, and a motion stack based on GSAP, Motion, Lenis, and Three.js.

## Run locally

From this directory:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

The current website uses local project data and assets under `public/work/`; it does not require the CMS API to render.

## Commands

```bash
pnpm dev          # development server
pnpm build        # optimized production build
pnpm start        # serve a production build
pnpm lint         # ESLint validation
pnpm check-types  # TypeScript validation
```

## Main routes

- `/` — immersive AKORD experience
- `/work` — all selected projects
- `/contact` — project inquiry
- `/privacy` and `/terms` — policy placeholders
- `/styleguide` — internal implementation reference

## Configuration

The application currently has no required environment variables. `next.config.ts` enables the standalone output used by the production Docker image.

Before changing the Experience Engine, read `AGENTS.md`, `../../docs/AKORD-PROJECT-VISION.md`, and `../../docs/AKORD-EXPERIENCE-HANDOFF.md`.

