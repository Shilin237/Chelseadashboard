# CLAUDE.md — AI Assistant Guide for Chelseadashboard

This file provides context and conventions for AI assistants (including Claude Code) working on the Chelseadashboard project. Keep this file up to date as the project evolves.

---

## Project Overview

**Chelseadashboard** is a personal dashboard application built with Next.js 15 and Tailwind CSS, deployable to Vercel.

- **Repository:** Shilin237/Chelseadashboard
- **Status:** Active development
- **Main branch:** `main`
- **Deployment:** Vercel (auto-deploy from `main`)

---

## Repository Structure

```
Chelseadashboard/
├── src/
│   └── app/
│       ├── globals.css       # Global styles + Tailwind imports
│       ├── layout.tsx        # Root layout (metadata, body wrapper)
│       └── page.tsx          # Dashboard home page
├── CLAUDE.md                 # This file — AI assistant guide
├── README.md                 # Public-facing project overview
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── .gitignore
```

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.2.1 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^3.4 |
| Runtime | React | ^19 |
| Package manager | npm | — |
| Deployment | Vercel | — |

### Key Conventions
- Uses the **App Router** (`src/app/`) — not the Pages Router
- All pages are Server Components by default; add `"use client"` only when needed
- Tailwind utility classes for all styling — no CSS-in-JS or external component libraries (yet)

---

## Development Setup

### Prerequisites

```bash
node --version    # >= 20.x recommended
npm --version     # >= 10.x
```

### Installation

```bash
git clone https://github.com/Shilin237/Chelseadashboard.git
cd Chelseadashboard
npm install
```

### Running Locally

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

### Vercel Deployment

The project is configured for zero-config Vercel deployment:
1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new)
2. Vercel auto-detects Next.js — no build config changes needed
3. Every push to `main` triggers an automatic production deploy
4. Every PR gets an automatic preview deployment URL

---

## Git Workflow

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Features | `feature/<short-description>` | `feature/user-auth` |
| Bug fixes | `fix/<short-description>` | `fix/chart-render-bug` |
| AI/Claude work | `claude/<description>-<session-id>` | `claude/add-docs-1vPgc` |
| Chores/docs | `chore/<short-description>` | `chore/update-deps` |

### Commit Messages

Use the **Conventional Commits** format:

```
<type>(<scope>): <short summary>

[optional body]
[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`

**Examples:**
```
feat(dashboard): add revenue chart component
fix(auth): handle expired token redirect
docs: update CLAUDE.md with stack details
chore: upgrade dependencies to latest
```

### Pull Requests

- Keep PRs focused — one feature or fix per PR
- Write a clear description of what changed and why
- Link related issues in the PR body
- Request review before merging to `main`

---

## Code Conventions

> Expand this section as conventions are established. Below are defaults to follow until overridden.

### General

- Prefer **clarity over brevity** — readable code is better than clever code
- Keep functions small and single-purpose
- Avoid over-engineering: don't add abstractions for hypothetical future needs
- Delete unused code rather than commenting it out

### Naming

| Element | Convention | Example |
|---------|-----------|---------|
| Files | kebab-case | `user-profile.tsx` |
| Components | PascalCase | `UserProfile` |
| Functions | camelCase | `fetchUserData` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| CSS classes | kebab-case | `user-profile__avatar` |

### TypeScript

- Prefer `interface` for object shapes, `type` for unions/intersections
- Avoid `any` — use `unknown` and narrow with type guards
- Keep types co-located with the code that uses them (unless shared widely)
- Strict mode is enabled (`"strict": true` in `tsconfig.json`)

### API / Data Fetching

- Co-locate data fetching logic with the component that uses it, or use a dedicated `services/` or `api/` layer
- Handle loading, error, and empty states explicitly
- Never expose raw API errors to the UI — map to user-friendly messages

### Styling

- Define spacing, colors, and typography in a design token / theme file — avoid magic numbers in components
- Use responsive-first approaches (mobile → tablet → desktop)

---

## Testing

> Populate once a testing framework is chosen.

### Running Tests

```bash
npm run test          # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Conventions

- Co-locate unit tests with source files (e.g., `Button.test.tsx` next to `Button.tsx`)
- Use descriptive `describe` / `it` blocks that read like sentences
- Prefer testing behavior over implementation details
- Aim for coverage on critical paths (auth, data mutation, calculations)

---

## Linting & Formatting

```bash
npm run lint        # Run ESLint (via next lint)
```

- **ESLint** is configured via `eslint-config-next`
- Run lint before opening a PR; fix all errors, minimize warnings
- Prettier is not yet configured — follow the existing code style manually

---

## AI Assistant Instructions (Claude-Specific)

### What Claude Should Do

- **Read files before editing.** Never modify code that hasn't been read first.
- **Understand before suggesting.** Research the codebase context before proposing changes.
- **Keep changes minimal.** Only modify what is directly requested or clearly necessary.
- **Follow branch rules.** Work on `claude/...` branches; never push to `main` directly.
- **Write conventional commits.** Use the commit format described above.
- **Check for existing patterns.** Before creating a utility, check if one already exists.
- **Prefer editing over creating.** Edit existing files rather than creating new ones where possible.

### What Claude Should Avoid

- Adding unnecessary comments, docstrings, or type annotations to unchanged code
- Introducing over-engineered abstractions for one-off operations
- Adding error handling for scenarios that cannot realistically occur
- Creating duplicate utilities or helpers
- Refactoring code that wasn't part of the request
- Pushing to production branches without explicit user approval

### Confirming Before Acting

Claude should **pause and confirm** before:
- Deleting files or directories
- Force-pushing or resetting git history
- Modifying CI/CD pipelines
- Making changes that affect other developers (shared config, environment, etc.)

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `CLAUDE.md` | This guide — update when conventions change |
| `README.md` | Public-facing project overview |
| `.env.example` | Environment variable template (to be created) |
| `package.json` | Dependencies and scripts |

---

## Updating This Document

This file should be updated whenever:
- The technology stack is decided or changed
- New conventions are established
- Development workflow changes
- New team members or AI assistants need onboarding context

Last updated: 2026-03-13 — scaffolded Next.js 15 + Tailwind CSS, configured for Vercel deployment
