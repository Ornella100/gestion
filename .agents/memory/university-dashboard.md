---
name: University Dashboard Architecture
description: Key design decisions and conventions for the UniGest Pro university dashboard.
---

## API / Frontend routing
- API server runs at `/api`, frontend at `/`. Both are separate artifacts routed by path in Replit.
- Dashboard endpoints live under `/api/dashboard/*`.
- Year filter is passed as `?annee=<value>` query param to every dashboard endpoint.

## Conventions
- All new sidebar nav items **must** have a corresponding `<Route>` in App.tsx (use `ComingSoon` page for unbuilt modules).
- Recharts tooltip components must use `TooltipProps<ValueType, NameType>` from recharts — never `any`.
- Sidebar collapsed state hides label text; links in collapsed mode require `aria-label` on the `<Link>` element.

**Why:** Code review flagged fake year filter, broken routes, and a11y regressions as critical issues.

**How to apply:** When adding a new module route, add both the sidebar nav item and the route definition. When adding chart tooltips, import proper Recharts types.
