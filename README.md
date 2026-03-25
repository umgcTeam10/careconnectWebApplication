# CareConnect Web App

## Project Overview

CareConnect is a healthcare coordination platform designed to support caregivers and care recipients in managing appointments, medications, messages, and other daily health tasks.

This repository contains the React-based web client for CareConnect. The current implementation focuses on front-end structure, routing, responsive UI, reusable components, and accessibility-conscious patterns rather than backend integration. All data shown in the app is placeholder content for layout and demonstration purposes.

## Current Scope

The current implementation includes:

- Client-side routing for the public flow and the main application
- Shared application layout for authenticated pages
- Responsive pages for Dashboard, Tasks, Messages, Calendar, Health Logs, Profile, Onboarding, and Sign In
- A two-step public entry flow: standalone welcome screen, then role selection, then sign-in
- Reusable UI components and CSS Modules for scoped styling
- Accessibility-minded markup including semantic HTML, labeling, keyboard support, and skip navigation
- Placeholder data and visual-only auth flow behavior

The Profile page is still a lighter stub compared to the other pages. No backend services, persistent storage, or real authentication are included yet.

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI component library |
| [React Router 7](https://reactrouter.com/) | Client-side routing |
| [CSS Modules](https://github.com/css-modules/css-modules) | Scoped component styling |
| [Vite 6](https://vite.dev/) | Dev server and production build tool |
| [Vitest](https://vitest.dev/) | Unit/component testing |
| [Testing Library](https://testing-library.com/) | DOM-oriented React tests |
| [Cypress](https://www.cypress.io/) | End-to-end browser testing |

## Project Structure

```text
careconnectWebApplication/
|-- index.html
|-- package.json
|-- vite.config.js
|-- vercel.json
`-- src/
    |-- main.jsx
    |-- App.jsx
    |-- components/
    |-- data/
    |-- layouts/
    |-- pages/
    |   |-- Calendar.jsx
    |   |-- Dashboard.jsx
    |   |-- HealthLogs.jsx
    |   |-- Messages.jsx
    |   |-- Onboarding.jsx
    |   |-- Profile.jsx
    |   |-- SignIn.jsx
    |   `-- Tasks.jsx
    `-- styles/
        `-- global.css
```

## Available Routes

| Route | Page | Notes |
|---|---|---|
| `/` | Onboarding | Opens on the standalone welcome screen, then advances to role selection on click |
| `/signin` | Sign In | Visual sign-in form |
| `/dashboard` | Dashboard | Main app page |
| `/tasks` | Tasks | Task management page |
| `/messages` | Messages | Messaging page |
| `/calendar` | Calendar | Calendar and schedule page |
| `/health-logs` | Health Logs | Health history and tracking page |
| `/profile` | Profile | Basic placeholder profile page |
| `*` | Redirect | Unknown routes redirect to `/dashboard` |

The Onboarding and Sign In routes render outside the shared app shell. The dashboard and all other in-app routes use the common layout.

## Accessibility

This implementation includes:

- Semantic elements such as `main`, `section`, `fieldset`, `legend`, and labeled form controls
- Keyboard-reachable interactive controls
- Focus styling on interactive elements
- Skip navigation support in the shared app layout
- Minimal ARIA usage where native semantics are not enough

## Responsive Behavior

The UI is designed for mobile, tablet, and desktop breakpoints:

- Mobile: stacked layout with bottom navigation
- Tablet: expanded grids while keeping mobile navigation patterns
- Desktop: persistent sidebar and wider content layouts

## Running Locally

Prerequisite: Node.js 18+ installed.

Install dependencies:

```bash
npm install
```

or

```bash
pnpm install
```

Start the development server:

```bash
npm run dev
```

or

```bash
pnpm dev
```

The app runs locally at `http://localhost:3000`.

## Building

Create a production build:

```bash
npm run build
```

or

```bash
pnpm build
```

Preview the production build locally:

```bash
npm run preview
```

or

```bash
pnpm preview
```

## Testing

Run the full test suite:

```bash
npm test
```

or

```bash
pnpm test
```

Run a specific test file:

```bash
npm test -- src/pages/Onboarding.test.jsx
```

or

```bash
pnpm test -- src/pages/Onboarding.test.jsx
```

Run coverage:

```bash
npm run test:coverage
```

or

```bash
pnpm test:coverage
```

Run the Cypress end-to-end suite:

```bash
npm run test:e2e
```

Run the Cypress suite in headed mode from the terminal:

```bash
npm run test:e2e:headed
```

Run the headed suite more slowly for demos:

```bash
npm run test:e2e:headed:slow
```

Open Cypress interactively:

```bash
npm run cy:open
```

The current Cypress coverage includes 5 critical user flows:

- Welcome screen to role-selection transition
- Role selection to sign-in
- Sign-in to dashboard
- Primary in-app navigation across main sections
- Core interactions in Tasks, Health Logs, and Profile

## Notes / Future Work

Likely next steps include:

- Connecting pages to a backend API
- Replacing placeholder data with real data sources
- Implementing real authentication and session handling
- Adding form validation and error states
- Expanding the Profile page
- Adding more deployment and CI validation

## Team

**Team 10 - SWEN 661**

- Joriel Rivas
- Chastity Sapp
- Henry Stewart
