# AKORD CMS API

NestJS and Prisma API for AKORD content, projects, pages, media, menus, users, settings, and authentication.

## Setup

```bash
cp .env.example .env
pnpm install
pnpm exec prisma generate
pnpm exec prisma migrate dev
pnpm start:dev
```

The API runs at `http://localhost:3001`. Swagger documentation is available at `/api/docs`, and the health endpoint is `/health`.

## Environment

Required values are documented in `.env.example`:

- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`

Owner account variables are optional at runtime but required when running the database seed. Never commit `.env` or production credentials.

## Commands

```bash
pnpm build
pnpm check-types
pnpm lint
pnpm test
pnpm test:e2e
pnpm exec prisma migrate deploy
pnpm exec prisma db seed
```

For the complete containerized stack, use the root `docker-compose.yaml` and root `.env.example`.

