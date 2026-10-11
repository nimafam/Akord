# AKORD

AKORD is an immersive brand and business experience built as a TypeScript monorepo. The website combines a cinematic, scroll-led Experience Engine with independent case-study pages, while the CMS API provides content, media, authentication, and administration capabilities for future data-driven publishing.

## Repository structure

```text
apps/
  web/    Next.js website and Experience Engine
  api/    NestJS CMS API with Prisma
docs/     Product vision and Experience Engine handoff notes
packages/ Shared repository configuration
```

The website currently reads its selected-work content from local assets so it can run independently. The API and PostgreSQL services are available for CMS development and later integration.

## Technology

- Next.js 16, React 19, TypeScript
- GSAP, Motion, Lenis, React Three Fiber and Three.js
- NestJS 11, Prisma and PostgreSQL 16
- pnpm workspaces and Turborepo
- Docker Compose for the complete local stack

## Requirements

- Node.js 20 or newer
- pnpm 9
- Docker Desktop (optional, for the containerized stack)

## Local development

Install workspace dependencies from the repository root:

```bash
corepack enable
pnpm install
```

Start all workspace applications:

```bash
pnpm dev
```

Or run an application independently:

```bash
pnpm --dir apps/web dev
pnpm --dir apps/api start:dev
```

Default local addresses:

- Website: `http://localhost:3000`
- API: `http://localhost:3001`
- API documentation: `http://localhost:3001/api/docs`
- API health check: `http://localhost:3001/health`

The website does not require the API for its current local-data experience.

## Environment configuration

Never commit real credentials. The repository tracks example files only.

For the full Docker stack:

```bash
cp .env.example .env
```

Replace every `CHANGE_ME` and `REPLACE_WITH_...` value before starting the services.

For API-only development:

```bash
cp apps/api/.env.example apps/api/.env
```

The API environment includes the database connection, optional initial owner details, and independent access/refresh token secrets. The web application currently has no required environment variables.

## Docker

The Compose configuration starts three services:

- `akord-web` on port `3000`
- `akord-api` on port `3001`
- `akord-postgres` on host port `5433`

After creating the root `.env` file, run:

```bash
pnpm docker:up
pnpm docker:logs
```

Stop the stack without deleting database or upload volumes:

```bash
pnpm docker:down
```

To remove persisted Docker data as well, explicitly run `docker compose down --volumes`.

Database migrations are applied automatically when the API container starts. Creating the initial CMS owner remains an explicit action:

```bash
docker compose exec api ./node_modules/.bin/prisma db seed
```

## Quality checks

Run these before opening a pull request:

```bash
pnpm check-types
pnpm lint
pnpm build
```

Motion-related changes also require browser validation with slow and fast wheel input, interrupted scrolling, reverse scrolling, and repeated direction changes. See [`apps/web/AGENTS.md`](apps/web/AGENTS.md) and the documents in [`docs/`](docs/) for the Experience Engine rules.

## Git hygiene

- Local `.env` files, generated output, caches, logs, uploads, archives, and TypeScript build metadata are ignored.
- Commit `.env.example` files whenever a required environment key changes.
- Do not commit generated `.next`, `dist`, `node_modules`, database volumes, or uploaded CMS media.
- Keep project artwork under `apps/web/public/work/` when it is intentionally part of the portfolio.

## Brand

- Display name: **AKORD**
- Primary color: `#01362E`
- Accent color: `#BB987D`
- Title typeface: Kento
- Body typeface: Ubuntu

