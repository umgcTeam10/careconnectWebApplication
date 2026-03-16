# CareConnect Web App – Initial React Implementation

## Project Overview

CareConnect is a healthcare coordination platform designed to support caregivers and care recipients in managing daily health tasks, appointments, medications, and communication with care teams. The application provides a shared interface where caregivers can track and manage the health needs of the people they support, and care recipients can stay informed and engaged with their own care.

This repository contains the initial React-based web implementation of CareConnect, built from a responsive Figma design. The focus of this version is on establishing a solid front-end foundation — project structure, routing, a shared responsive layout, semantic HTML, and accessibility-conscious patterns — rather than full backend functionality or production-ready features. All data shown in the app is placeholder content used for layout and demonstration purposes.

## Current Scope

This initial implementation includes:

- A clean, organized React project structure ready for team collaboration
- Client-side routing across all primary application screens
- A shared application layout (header, sidebar navigation, notification banner, bottom navigation) that adapts across breakpoints
- Fully rendered pages for Dashboard, Tasks, Messages, Calendar, Health Logs, Profile, Sign In, and Onboarding
- Responsive behavior targeting mobile, tablet, and desktop viewports
- Semantic HTML throughout all pages and components
- Accessibility foundations including keyboard navigation, proper labeling, and a skip-to-content link
- A centralized mock data module for easy future replacement with real API responses
- Reusable UI components extracted from repeated patterns in the design

The Profile page is implemented as a lighter stub compared to the other screens. No backend services, authentication logic, or persistent data storage are included — the Sign In and Onboarding screens are visual implementations only.

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI component library |
| [React Router 7](https://reactrouter.com/) | Client-side routing |
| [CSS Modules](https://github.com/css-modules/css-modules) | Scoped, component-level styling |
| [Vite 6](https://vite.dev/) | Build tool and development server |

No additional UI frameworks, icon libraries, or state management libraries were added. Icons are implemented as inline SVGs within a custom `Icon` component to keep dependencies minimal.

## Project Structure

```
careconnect/
├── index.html                  Entry HTML document
├── package.json                Dependencies and scripts
├── vite.config.js              Vite configuration
└── src/
    ├── main.jsx                Application entry point (BrowserRouter setup)
    ├── App.jsx                 Route definitions
    ├── components/             Reusable UI components
    │   ├── Badge.jsx           Status and priority labels
    │   ├── BottomNav.jsx       Mobile/tablet bottom navigation bar
    │   ├── Button.jsx          Button with variant and size options
    │   ├── Card.jsx            Card container with padding options
    │   ├── Header.jsx          Sticky top header with hamburger menu
    │   ├── Icon.jsx            Inline SVG icon system
    │   ├── NotificationBanner.jsx  Appointment notification strip
    │   ├── SectionHeader.jsx   Section title with optional action
    │   ├── Sidebar.jsx         Navigation drawer (mobile) / fixed sidebar (desktop)
    │   └── StatCard.jsx        Statistic display card
    ├── data/
    │   └── mockData.js         Centralized placeholder data
    ├── layouts/
    │   └── AppLayout.jsx       Shared app shell (header, nav, content area)
    ├── pages/
    │   ├── Calendar.jsx        Calendar view with event schedule
    │   ├── Dashboard.jsx       Main dashboard with health summary and tasks
    │   ├── HealthLogs.jsx      Health logs with summary, filters, and entries
    │   ├── Messages.jsx        Chat interface with quick replies
    │   ├── Onboarding.jsx      Role selection (first-time setup)
    │   ├── Profile.jsx         User profile (stub)
    │   ├── SignIn.jsx          Sign-in form
    │   └── Tasks.jsx           Task management with tabs and search
    └── styles/
        └── global.css          CSS custom properties, reset, and utility classes
```

Each component and page has a co-located `.module.css` file for scoped styling. Design tokens (colors, spacing, typography, shadows) are defined as CSS custom properties in `global.css` and referenced throughout.

## Available Routes

| Route | Page | Status |
|---|---|---|
| `/` | Onboarding (role selection) | Implemented |
| `/signin` | Sign In | Implemented |
| `/dashboard` | Dashboard | Implemented |
| `/tasks` | Tasks | Implemented |
| `/messages` | Messages | Implemented |
| `/calendar` | Calendar | Implemented |
| `/health-logs` | Health Logs | Implemented |
| `/profile` | Profile | Stub (basic layout with placeholder content) |
| `/*` | Redirects to `/dashboard` | — |

The Onboarding and Sign In pages render outside the main app layout. All other routes share the `AppLayout` shell, which includes the header, sidebar, notification banner, and bottom navigation.

## Accessibility Considerations

This implementation was built with accessibility as a foundational concern:

- **Semantic HTML**: Pages use `header`, `nav`, `main`, `section`, `aside`, `fieldset`, `legend`, and `dl` elements where appropriate rather than generic `div` wrappers.
- **Heading hierarchy**: Each page context has one `h1` (rendered in the header), `h2` elements for major content sections, and `h3` for subsections. No heading levels are skipped.
- **Keyboard navigation**: All interactive elements (links, buttons, form inputs, tabs) are reachable and operable via keyboard. Focus styles are visible on inputs and interactive controls.
- **Proper element usage**: Navigation uses `a` / `NavLink` elements. Actions use `button` elements. Forms use `label` elements associated with their inputs.
- **Skip-to-content link**: A visually hidden skip link appears on focus at the top of every page using the app layout, allowing keyboard users to bypass navigation.
- **ARIA usage**: ARIA attributes are used sparingly and only where native semantics are insufficient — for example, `aria-label` on icon-only buttons, `role="tablist"` / `role="tab"` on the task filter tabs, and `role="log"` on the message history.
- **Form accessibility**: All inputs have visible labels or associated `label` elements. Required fields are indicated visually.

## Responsive Design

The layout adapts across three target breakpoints based on the Figma design:

| Breakpoint | Viewport | Behavior |
|---|---|---|
| Mobile | 375px | Stacked single-column layout. Bottom navigation bar is the primary nav. Sidebar opens as a drawer via the hamburger menu. Cards and stats stack vertically. |
| Tablet | 768px | Stat cards and grids shift to horizontal arrangements. Bottom nav remains active. Sidebar is still a drawer. |
| Desktop | 1024px+ (targeting 1440px) | Fixed sidebar is always visible. Bottom nav is hidden. Content areas use two-column grids where appropriate (Dashboard, Calendar, Health Logs). Hamburger menu is hidden. |

The layout does not simply scale the desktop view down — each breakpoint has intentional structural changes to the navigation, grid layout, and content organization.

## Running the Project

**Prerequisites**: Node.js 18+ and npm installed.

```bash
# Navigate to the project directory
cd careconnect

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**.

To create a production build:

```bash
npm run build
```

The output will be written to the `dist/` directory and can be previewed with `npm run preview`.

## Notes / Future Work

This is an initial scaffold intended to establish front-end structure and demonstrate early progress. Likely next steps include:

- Expanding the Profile page with full account settings and preferences
- Connecting pages to a backend API and replacing mock data with real responses
- Implementing authentication flow (the current Sign In page is visual only)
- Adding form validation and error handling
- Refining responsive behavior and testing across real devices
- Conducting accessibility audits with screen readers and automated tools (axe, Lighthouse)
- Adding unit and integration tests
- Implementing state management as data requirements grow

## Team

**Team 10** — SWEN 661

- Joriel Rivas
- Chastity Sapp
- Henry Stewart
