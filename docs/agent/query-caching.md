# Dashboard Query Caching Implementation Instructions (TanStack Query)

These instructions are for implementing **query caching** in the dashboard app to prevent unnecessary backend calls when navigating between list and detail pages (e.g. Requests list → Request detail).

DO NOT include code snippets in your output. Focus on structure, intent, and configuration.

---

## Goal

- Prevent duplicate API calls when navigating from a list view to a detail view
- Reuse already-fetched list data for instant detail rendering
- Allow background refetching when data becomes stale
- Replace the old “Redux to avoid refetching” pattern with modern query caching
- Work cleanly in a **Next.js App Router dashboard app**

---

## High-Level Approach

- Use **TanStack Query** as the single source of truth for server state
- Treat backend data as _cached queries_, not global UI state
- Share cached data automatically across routes
- Let the cache control freshness instead of manual state plumbing

---

## Required Architecture Changes

### 1. Add a Global Query Client Provider

- Create a single Query Client instance for the dashboard app
- Wrap the dashboard’s root layout in a provider so all routes share the same cache
- Ensure the Query Client is created once per browser session (not per render)
- Document exactly where this lives (file paths) so the provider does not get duplicated.

Global defaults to configure:

- Disable refetch on window focus
- Allow refetch on reconnect
- Set a reasonable stale time (e.g. ~60 seconds)
- Keep cache around for several minutes (e.g. ~10 minutes)
- Limit retry behavior to avoid noisy failures

---

## Query Key Strategy (Critical)

Define stable, consistent query keys:

- List query:  
  `["requests"]`

- Detail query:  
  `["request", requestId]`

These keys must be used consistently across the app.

---

## List Page Behavior (Requests List)

On the list page:

- Fetch all requests using the list query key
- After data is successfully loaded:
  - Seed the query cache for each individual request
  - Store each request under its corresponding detail query key

Important rules:

- Do not overwrite detail cache entries if they already exist
- Treat list data as a “preview” of detail data
- This step ensures the detail page can render instantly without refetching

---

## Detail Page Behavior (Request Detail)

On the detail page:

- Fetch request data using the detail query key
- Do NOT refetch immediately on mount if cached data exists
- Allow background refetching if data becomes stale
- Render instantly from cache when navigating from the list page

Expected behavior:

- If user clicks from list → detail, page renders immediately
- If user lands directly on detail URL, data is fetched normally
- If backend data changed recently, it refreshes silently in background

---

## Refetch Rules (Important)

- Disable automatic refetch on route change for detail pages
- Disable refetch on window focus globally
- Allow refetch when data becomes stale or when manually triggered
- This avoids the “every click = API call” problem

---

## API Layer Expectations

- Use a shared API helper for all network requests
- Handle JSON parsing and error handling in one place
- Use credentials consistently if cookie-based auth is used
- Do NOT scatter raw fetch logic across components
- Call out the canonical location for this helper (file path) and ensure all list/detail pages use it.

---

## Error & Loading State Guidance

- List pages: show a lightweight loading state while fetching, but keep partial UI visible.
- Detail pages: if cached data exists, render immediately and avoid a blank state.
- Handle errors with clear, user-facing messages and allow retry without a full refresh.

---

## What This Solves

- No duplicate “list → detail” API calls
- No blank loading states when navigating internally
- No need for Redux or global stores for server data
- Cleaner separation between UI state and server state
- Predictable, debuggable data flow

---

## What NOT To Do

- Do NOT use Redux or Zustand to store server data
- Do NOT pass full objects through the router
- Do NOT refetch detail data immediately on navigation if cache exists
- Do NOT couple list and detail components via props

---

## Mental Model for the Agent

- TanStack Query replaces Redux for server data
- Query keys are the cache
- Lists populate the cache
- Detail pages read from the cache
- Refetching is controlled by staleness, not navigation

---

## Expected Outcome

After implementation:

- Navigating between dashboard pages feels instant
- Backend load is reduced
- Code is simpler and more maintainable
- The dashboard behaves like a real application, not a static site

---

If additional entities exist (invoices, clients, projects), repeat the same pattern:

- One list query
- One detail query
- Seed cache from list
- Reuse cache on detail pages
