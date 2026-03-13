# CLAUDE.md — AI Assistant Guide for Chelseadashboard

This file provides context and conventions for AI assistants (including Claude Code) working on the Chelseadashboard project. Keep this file up to date as the project evolves.

---

## Project Overview

**Chelseadashboard** is a dashboard application currently in initial setup. As of the last update to this document, the repository is a blank slate awaiting its first scaffolding and technology decisions.

- **Repository:** Shilin237/Chelseadashboard
- **Status:** Early-stage / pre-scaffolding
- **Main branch:** `main`

---

## Repository Structure

```
Chelseadashboard/
├── CLAUDE.md         # This file — AI assistant guide
└── README.md         # Project overview (minimal)
```

> Update this section as directories and files are added.

---

## Technology Stack

> This section will be filled in once the stack is chosen and scaffolded.

### Anticipated / Likely Stack
As this is a dashboard project, it will likely include:
- A frontend framework (React, Vue, or Next.js)
- A styling solution (Tailwind CSS, CSS Modules, or a component library)
- A backend or API layer (Node.js, Python, or serverless functions)
- A data store (PostgreSQL, SQLite, or a managed service)

**Once the stack is decided, document the following here:**
- Language versions (Node.js vX, Python 3.X, etc.)
- Package manager (npm / pnpm / yarn / pip)
- Framework versions
- Key libraries and their purposes

---

## Development Setup

> Populate this section once the project is scaffolded.

### Prerequisites

```bash
# Example (update with actual requirements):
node --version    # e.g., >= 20.x
npm --version     # or pnpm / yarn
```

### Installation

```bash
# Clone and install (update with actual commands):
git clone https://github.com/Shilin237/Chelseadashboard.git
cd Chelseadashboard
npm install       # or pnpm install / yarn
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

> Add `.env.example` to the repository with all required keys and safe placeholder values. Never commit real secrets.

### Running Locally

```bash
# Update with actual dev commands once determined:
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
```

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

### TypeScript (if adopted)

- Prefer `interface` for object shapes, `type` for unions/intersections
- Avoid `any` — use `unknown` and narrow with type guards
- Keep types co-located with the code that uses them (unless shared widely)
- Use strict mode (`"strict": true` in `tsconfig.json`)

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

> Populate once tooling is configured.

```bash
npm run lint        # Run linter
npm run lint:fix    # Auto-fix lint issues
npm run format      # Run formatter (e.g., Prettier)
```

- **ESLint** (or equivalent) should be run before every commit
- **Prettier** (or equivalent) for consistent formatting — use editor integration
- Fix all linting errors before opening a PR; warnings should be minimized

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
| `package.json` | Dependencies and scripts (to be created) |

---

## Updating This Document

This file should be updated whenever:
- The technology stack is decided or changed
- New conventions are established
- Development workflow changes
- New team members or AI assistants need onboarding context

Last updated: 2026-03-13
