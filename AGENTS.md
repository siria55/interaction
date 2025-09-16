# Repository Guidelines

## Project Structure & Module Organization
The project uses Next.js App Router. High-level pages live in `app/`, where each `interactionN/` folder wraps a dedicated learning experience with its own route components and assets. Shared UI primitives and interactive canvases are under `components/`, and reusable machine-learning helpers (TensorFlow digit and pixel classifiers) live in `services/`. Styling is centralized in `app/globals.css` with Tailwind utilities configured via `tailwind.config.js` and `postcss.config.js`.

## Build, Test, and Development Commands
Use `npm install` once per clone to set up dependencies. `npm run dev` starts the hot-reloading Next.js dev server. `npm run build` performs a production build and catches type errors. `npm run start` serves the built output. `npm run lint` runs the Next.js ESLint suite; treat lint failures as blockers. Adopt Vitest for automated checks: after installing it, add a `test` script that runs `vitest --run` so `npm run test` is available locally and in CI.

## Coding Style & Naming Conventions
Write components in TypeScript with functional React patterns and keep client components explicitly marked with `'use client'` when they manage state or effects. Follow the repository's two-space indentation and single-quote preference visible in existing files. Compose UI with Tailwind utility classes; prefer semantic class groupings that match layout sections. Import shared modules through the `@/` alias defined in `tsconfig.json`. Run `npm run lint` before pushing; no additional formatter is configured, so match the current code style when editing.

## Testing Guidelines
Standardize on Vitest with React Testing Library for component and integration coverage. Install with `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event`, then expose a `vitest.config.ts` that loads the Next.js testing preset. Organize specs in `__tests__/` alongside related modules, naming them `ComponentName.test.tsx`. Use `npx vitest` for watch mode and `npx vitest run --coverage` for CI, and capture manual checks in PRs until the suite is seeded. Favor deterministic fixtures for TensorFlow helpers to avoid flaky predictions.

## Commit & Pull Request Guidelines
Existing commits are generic (`update`), so improve clarity by using imperative summaries such as `Add quiz scoring feedback` and include a short body when context helps. Reference related issue IDs in the body. For pull requests, provide: a concise summary of the change, testing evidence (command output or screenshots), and any follow-up tasks. Request review for changes touching shared components or ML services and ensure the branch is synced with the latest main before merging.

## Environment & Security Notes
TensorFlow Node bindings increase install time; if native builds fail locally, switch to pure JS by temporarily removing `@tensorflow/tfjs-node` from `package.json` during development. Do not commit API keys or model weights—store secrets in environment variables managed through Next.js runtime configs.
