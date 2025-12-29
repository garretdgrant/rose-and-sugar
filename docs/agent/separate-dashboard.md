# Monorepo Migration Guide: Deploy Dashboard Separately (Keep `/dashboard` Path)

## Goal

You currently have **one Next.js repo** where:

- Marketing site lives in `src/app/*`
- Dashboard lives in `src/app/dashboard/*`

You want to:

- Deploy the dashboard **separately**
- Keep the public URL as: `https://edcwebdesign.com/dashboard`
- Avoid SEO concerns for the dashboard
- Enable cleaner architecture and scaling

The correct solution is a **monorepo** with **two deployable apps**.

---

## Target Architecture

.
├─ apps/
│ ├─ marketing/ ← Public marketing site
│ └─ dashboard/ ← Private app (dashboard)
├─ packages/
│ └─ ui/ ← Shared components (optional, later)
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ tsconfig.base.json ← Optional shared TS config

---

## High-Level Strategy

- Split marketing and dashboard into **separate Next.js apps**
- Deploy each app **independently** on Vercel
- Use a **rewrite** so:
  `/dashboard/*` → dashboard deployment
- Users still see:
  `edcwebdesign.com/dashboard`
- Internally:
  - Marketing app serves `/`
  - Dashboard app serves `/`

---

## Step 0 — Prerequisites

- Next.js App Router
- pnpm (recommended)
- Vercel for deployments

---

## Step 1 — Create Monorepo Structure

At repo root:

mkdir apps packages

Result:

.
├─ apps/
├─ packages/

---

## Step 2 — Move Existing App Into `apps/marketing`

1. Create directory:
   mkdir apps/marketing

2. Move EVERYTHING from your current repo into `apps/marketing` EXCEPT:
   - `.git/`
   - files you’ll create at the root (`pnpm-workspace.yaml`, `turbo.json`, root `package.json`)

After move:

apps/marketing/
├─ src/
│ └─ app/
│ ├─ page.tsx
│ ├─ dashboard/
│ └─ ...
├─ next.config.js
├─ package.json
└─ tsconfig.json

At this point:

- `apps/marketing` should run exactly like before

---

## Step 3 — Create Dashboard App

From repo root:

pnpm dlx create-next-app@latest apps/dashboard --ts --tailwind --eslint --app --src-dir

This creates a **clean Next.js app** for the dashboard.

Test it:

pnpm --filter dashboard dev

---

## Step 4 — Move Dashboard Routes

You currently have:

apps/marketing/src/app/dashboard/\*

Move them:

mv apps/marketing/src/app/dashboard apps/dashboard/src/app/

Now dashboard app contains:

apps/dashboard/src/app/dashboard/\*

### Flatten Routes (Recommended)

The dashboard app should treat `/` as the dashboard root.

Do:

mv apps/dashboard/src/app/dashboard/\* apps/dashboard/src/app/
rmdir apps/dashboard/src/app/dashboard

Now:

- Dashboard home = `/`
- Requests = `/requests`
- Invoices = `/invoices`

---

## Step 5 — Fix Path Aliases

In `apps/dashboard/tsconfig.json`:

{
"compilerOptions": {
"baseUrl": ".",
"paths": {
"@/_": ["./src/_"]
}
}
}

Repeat similarly in `apps/marketing` if not already present.

---

## Step 6 — Root Workspace Files

### Root `package.json`

{
"name": "edcwebdesign",
"private": true,
"packageManager": "pnpm@9.0.0",
"scripts": {
"dev": "turbo dev",
"build": "turbo build",
"lint": "turbo lint",
"typecheck": "turbo typecheck"
},
"devDependencies": {
"turbo": "^2.0.0"
}
}

---

### `pnpm-workspace.yaml`

packages:

- "apps/\*"
- "packages/\*"

---

### `turbo.json`

{
"$schema": "https://turbo.build/schema.json",
"tasks": {
"dev": {
"cache": false,
"persistent": true
},
"build": {
"dependsOn": ["^build"],
"outputs": [".next/**"]
},
"lint": {},
"typecheck": {}
}
}

---

## Step 7 — App Scripts

Ensure both apps have these scripts:

apps/marketing/package.json  
apps/dashboard/package.json

{
"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint"
}
}

---

## Step 8 — Local Development

Install deps:

pnpm install

Run both apps:

pnpm dev

Or individually:

PORT=3000 pnpm --filter marketing dev
PORT=3001 pnpm --filter dashboard dev

---

## Step 9 — Deploy on Vercel (Two Projects)

### Marketing Project

- Root Directory: `apps/marketing`
- Domain: `edcwebdesign.com`

### Dashboard Project

- Root Directory: `apps/dashboard`
- Domain: `edc-dashboard.vercel.app` (or any)

Each project:

- Uses same repo
- Has its own env vars

---

## Step 10 — Rewrite `/dashboard` to Dashboard App

In `apps/marketing/next.config.js`:

/\*_ @type {import('next').NextConfig} _/
const nextConfig = {
async rewrites() {
return [
{
source: "/dashboard/:path*",
destination: "https://edc-dashboard.vercel.app/:path*"
}
];
}
};

module.exports = nextConfig;

IMPORTANT:

- Dashboard app must NOT expect `/dashboard` prefix
- Internal links should be `/requests`, `/invoices`, etc.

---

## Step 11 — Remove Old Dashboard Routes

Delete:

apps/marketing/src/app/dashboard/\*

Marketing app no longer owns dashboard code.

---

## Step 12 — Optional: Shared UI Package

Create:

packages/ui/

packages/ui/package.json

{
"name": "@edc/ui",
"private": true,
"version": "0.0.0"
}

Export shared components and import into both apps:

import { Button } from "@edc/ui/button";

Optional — can be done later.

---

## Step 13 — Common Gotchas

### Auth & Cookies

- Rewrite approach keeps cookies scoped to `edcwebdesign.com`
- Ensure cookies use:
  - SameSite=Lax or None (if cross-origin)
  - Secure=true

### API URLs

Use env vars per app:

NEXT_PUBLIC_API_BASE_URL=https://api.edcwebdesign.com

### Links

Dashboard app should use relative routes (`/requests`, not `/dashboard/requests`).

---

## Final Result

- Clean separation of concerns
- Independent deploys
- Faster iteration
- Dashboard behaves like a real app
- URL stays clean and unchanged
