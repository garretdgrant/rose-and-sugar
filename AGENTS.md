# Repository Guidelines

This guide summarizes how to contribute safely and efficiently to the Rose & Sugar codebase.

## Project Structure & Module Organization
`src/app` hosts App Router routes, layouts, and the shared stylesheet (`globals.css`). Shared UI sits in `src/components`, with design-system primitives under `src/components/ui` and cookie-specific flows grouped by folder. Hooks live in `src/hooks`, while `src/lib` contains Sanity clients, fetch helpers, and validation utilities. Static imagery and favicons ship from `public`. Core configuration stays at the root: `next.config.ts`, `tailwind.config.ts`, `eslint.config.mjs`, and `tsconfig.json`.

## Build, Test, and Development Commands
`pnpm dev` launches the Turbopack development server on port 3000. `pnpm build` compiles the production bundle, and `pnpm start` serves that output locally. Use `pnpm lint` for the combined Next.js/ESLint ruleset and `pnpm prettier` to apply repository formatting. `pnpm preprod` (format → build → `git status`) is the preferred pre-release check.

## Coding Style & Naming Conventions
The project is TypeScript-first with ES modules and Prettier defaults (2-space indentation, trailing commas where supported). Exported components follow PascalCase; hooks begin with `use` and remain in `src/hooks`; route folders stay kebab-case for readable URLs. UI primitives in `components/ui` keep lowercase filenames to mirror Radix patterns—match that casing when adding peers. Favor Tailwind utility composition and reuse the shared `cn`/`tailwind-merge` helpers.

## Testing Guidelines
An automated runner is not yet configured, and no `test` script exists. For now, verify critical flows manually through `pnpm dev`, especially form submissions, Sanity-backed listings, and outbound email paths. When you introduce automated coverage, co-locate specs with the feature (`ComponentName.test.tsx`), mock Sanity/Resend calls, and add a `test` script to `package.json` so the workflow becomes repeatable.

## Commit & Pull Request Guidelines
Commits follow Conventional Commits (`feat:`, `chore:`, etc.); keep messages imperative and under 72 characters. Before opening a PR, confirm `pnpm lint`, `pnpm prettier`, and `pnpm build` succeed (or run `pnpm preprod`). PRs should summarize the change, call out risk/rollback notes, link related issues, attach screenshots or GIFs for UI work, and highlight any environment variable updates while confirming secrets stay out of git.

## Security & Configuration Notes
Environment secrets (Resend, Sanity, Google Apps Script) belong in `.env.local`; never commit raw values. Rotate tokens quickly if exposure is suspected and prefer read-only scopes. Before sharing builds externally, scrub customer imagery in `public/gallery`, and discuss any new Next.js experimental flags so deployment impact is understood.
