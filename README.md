# Domin — Factory Monitoring Dashboard

A real-time production line monitoring dashboard for a hydraulic valve manufacturing facility. Built as part of the Domin frontend engineering interview task.

**Live demo:** https://domin-assignment-4n1n.vercel.app

---

## Overview

The application gives operations engineers a live view of the production line — machine statuses, utilisation trends, fault counts, and throughput. Data is simulated via an in-browser mock layer that mirrors what a real REST/SSE API would provide.

Two main views:

- **Dashboard** — factory-wide KPIs, utilisation chart with 1h/4h/24h time range toggle, and a status breakdown
- **Stations** — per-machine table with status badges, utilisation bars, time-in-state, and CSV export

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Routing | React Router v7 |
| Data fetching | TanStack Query v5 |
| Charts | Recharts |
| Styling | Tailwind CSS v4 |
| Testing | Vitest + React Testing Library |
| Linting / formatting | ESLint + Prettier |

---

## Getting started

```bash
pnpm install
pnpm dev
```

```bash
pnpm test       # run tests
pnpm build      # production build
```

Node 18+ and pnpm required.

---

## Project structure

```
src/
  design-system/        # Component library (Badge, Card, Button, etc.)
    components/
    tokens/             # Colour tokens — single source of truth
    utils/
  components/
    features/           # Feature-scoped components (dashboard, stations)
    layout/             # AppLayout, Sidebar, TopBar
  hooks/                # useMachines, useUtilisationHistory
  mock/                 # Simulated API (fixtures, simulator, api.ts)
  pages/                # Route-level components
  utils/                # format.ts, export.ts
```

The design system lives at `src/design-system/` and is aliased as `@domin/ui` so it behaves like a separate package without the overhead of a monorepo.

---

## Architecture

See `architecture_diagram.png` for the full system diagram (Part 1 of the task).

At a high level:

- **Layer 1 — Infrastructure:** Machinery reports telemetry (temp, pressure, RPM etc.) via a DAQ process into PostgreSQL
- **Layer 2 — API:** Python REST API exposes static endpoints (polling) and SSE endpoints (streaming) behind an auth layer
- **Layer 3 — Frontend:** TanStack Query handles polling/SSE, domain hooks encapsulate business logic, a component layer built on top of the design system renders the UI

In this submission the API layer is replaced by `src/mock/` — a browser-side simulator that generates realistic machine state and history data.

---

## AI disclosure

Claude (Anthropic) was used throughout this task as a coding assistant via Claude Code. Its role:

- **Scaffolding** — initial project setup, routing, mock data layer
- **Component implementation** — dashboard KPIs, utilisation chart, stations table, design system components
- **Design decisions** — translating the reference screenshots into component structure and token-based styling
- **Tooling** — Prettier/ESLint config, Vitest test suite setup
- **Deployment** — resolving TypeScript build errors for Vercel

All architectural decisions, the system diagram, and the overall approach were my own. Claude accelerated implementation but the structure, decisions, and judgement calls were directed by me. I reviewed and understood every piece of code before accepting it.