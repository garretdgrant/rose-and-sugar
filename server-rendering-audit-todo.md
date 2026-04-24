# Next.js Server Rendering Audit TODO

Generated: 2026-03-23

Scope: audit with targeted follow-up updates tracked in place.

## Summary

- The app shell is still more client-heavy than it needs to be because [src/components/Navbar.tsx](src/components/Navbar.tsx) remains a client component, but the app-wide `QueryProvider` wrapper has been moved down to only the route branches that use React Query.
- Several routes are already server-first or close to it: `/`, `/about`, `/classes`, `/classes/previous-classes`, `/contact`, `/kind-cookie-program`, `/privacy-policy`, `/corporate-team-building`, `/cookies/order-custom-sugar-cookies`, `/classes/[slug]`, `/classes/thank-you`, `/sugar-cookie-recipe`, and `/sweet-bakes/pre-designed/[slug]`.
- The biggest remaining optimization opportunities are routes where a large page shell is client-rendered only for:
  - `mounted` animation state
  - React Query fetching plus large static hero/marketing sections
  - browser form handling mixed with static page content

## Cross-Route Findings

### High-impact shared issues

- [x] Move `QueryProvider` lower than the full app if possible.
  - Updated state: [src/app/layout.tsx](src/app/layout.tsx) no longer wraps the full app in [src/components/QueryProvider.tsx](src/components/QueryProvider.tsx).
  - Implemented on 2026-03-23 by moving `QueryProvider` to the route branches that actually use React Query: `/`, `/classes`, `/classes/previous-classes`, `/classes/locations`, `/cookies/signature-sugar-cookie-sets`, and `/cookies/signature-sugar-cookie-sets/[slug]`.
  - Why it matters: React Query is only needed on a subset of routes/components (`FeaturedShop`, classes listings, signature sets, product detail cache paths). The previous placement expanded the client runtime surface for every page.

- [ ] Audit whether `Navbar` can be split into a smaller client island.
  - Audit result on 2026-03-23: partially, but not cleanly without changing header behavior. [src/components/Navbar.tsx](src/components/Navbar.tsx) still needs client execution for scroll state, desktop dropdown state, mobile menu state, focus return, and body-scroll locking.
  - Implemented follow-up: moved [src/components/CartCompletionWatcher.tsx](src/components/CartCompletionWatcher.tsx) out of `Navbar` and into [src/app/layout.tsx](src/app/layout.tsx) so the cart-completion side effect is no longer coupled to the header itself.
  - Why it matters: some behavior is unavoidable client-side, but the whole site header is currently a client boundary. The remaining bigger reduction would require either replacing the scroll-reactive header behavior with a static server-rendered shell or redesigning menu interactions around smaller client leaves.

- [x] Remove `mounted` animation state where it is the only reason a route or major section is client-side.
  - Affected files:
    - [src/app/about/page.tsx](src/app/about/page.tsx)
    - [src/components/ClientClasses.tsx](src/components/ClientClasses.tsx)
    - [src/components/ClientPreviousClasses.tsx](src/components/ClientPreviousClasses.tsx)
    - [src/app/classes/locations/ClassLocationsClient.tsx](src/app/classes/locations/ClassLocationsClient.tsx)
    - [src/components/ContactPageClient.tsx](src/components/ContactPageClient.tsx)
    - [src/app/kind-cookie-program/KindCookieProgramClient.tsx](src/app/kind-cookie-program/KindCookieProgramClient.tsx)
    - [src/components/classes/ClassLocationHero.tsx](src/components/classes/ClassLocationHero.tsx)
    - [src/app/cookies/thank-you/page.tsx](src/app/cookies/thank-you/page.tsx)
  - Implemented on 2026-03-23 by replacing mount-gated entrance effects with CSS animation utilities. `/about`, [src/components/classes/ClassLocationHero.tsx](src/components/classes/ClassLocationHero.tsx), [src/app/classes/locations/ClassLocationsClient.tsx](src/app/classes/locations/ClassLocationsClient.tsx), and `/cookies/thank-you` no longer need `mounted` bootstrapping just to reveal static markup.
  - Follow-up nuance: [src/components/ClientClasses.tsx](src/components/ClientClasses.tsx), [src/components/ClientPreviousClasses.tsx](src/components/ClientPreviousClasses.tsx), [src/components/ContactPageClient.tsx](src/components/ContactPageClient.tsx), and [src/app/kind-cookie-program/KindCookieProgramClient.tsx](src/app/kind-cookie-program/KindCookieProgramClient.tsx) still remain client components for React Query or form handling, but the `mounted` effect is no longer part of that boundary.

- [ ] Remove render-time impurity from components that still call `Date.now()` or `Math.random()`.
  - Affected files:
    - [src/components/ClientClasses.tsx](src/components/ClientClasses.tsx)
    - [src/components/ClientPreviousClasses.tsx](src/components/ClientPreviousClasses.tsx)
    - [src/components/FeaturedShop.tsx](src/components/FeaturedShop.tsx)
    - [src/app/cookies/thank-you/page.tsx](src/app/cookies/thank-you/page.tsx)
  - Why it matters: these patterns block purity-related linting and make server/client boundaries harder to tighten safely.

## Route Audit

| Route                                                    | Current boundary                                  | Priority | Audit result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------- | ------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                                      | Server page with client islands                   | Medium   | Good overall after recent cleanup. Remaining client-heavy pieces are [src/components/FeaturedShop.tsx](src/components/FeaturedShop.tsx) and [src/components/Gallery.tsx](src/components/Gallery.tsx). `FeaturedShop` still mixes static shell, query fetching, and cart actions in one large client component. `Gallery` needs client logic for the modal, but the header/grid shell could still be split further if desired.                                                               |
| `/about`                                                 | Server page                                       | None     | [src/app/about/page.tsx](src/app/about/page.tsx) is now server-rendered, owns route metadata again, and uses CSS-only motion. No meaningful server-rendering follow-up remains for this route.                                                                                                                                                                                                                                                                                              |
| `/classes`                                               | Server page with query/cart island                | Medium   | [src/app/classes/page.tsx](src/app/classes/page.tsx) now renders a server marketing shell, while [src/components/ClientClasses.tsx](src/components/ClientClasses.tsx) is limited to the query-driven class grid, waitlist modal, and cart-adjacent behavior. Good improvement; further work would be inside the list island itself, not the full route shell.                                                                                                                               |
| `/classes/[slug]`                                        | Server page with client booking leaf              | Low      | [src/app/classes/[slug]/page.tsx](src/app/classes/[slug]/page.tsx) is mostly server-first already. The main client boundary is [src/components/ProductDetailClient.tsx](src/components/ProductDetailClient.tsx), which is appropriate for quantity/cart interaction. Minor follow-up only if you want to shrink that booking widget further.                                                                                                                                                |
| `/classes/el-dorado-hills-sugar-cookie-decorating-class` | Server page with shared client hero               | Medium   | Server page is good, but [src/components/classes/ClassLocationHero.tsx](src/components/classes/ClassLocationHero.tsx) is client-only for `mounted` animation state. Shared fix would improve this route and the other city pages.                                                                                                                                                                                                                                                           |
| `/classes/folsom-sugar-cookie-decorating-class`          | Server page with shared client hero               | Medium   | Same issue as above: route is server, shared [src/components/classes/ClassLocationHero.tsx](src/components/classes/ClassLocationHero.tsx) is an avoidable client boundary.                                                                                                                                                                                                                                                                                                                  |
| `/classes/loomis-sugar-cookie-decorating-class`          | Server page with shared client hero               | Medium   | Same issue as above: route is server, shared [src/components/classes/ClassLocationHero.tsx](src/components/classes/ClassLocationHero.tsx) is an avoidable client boundary.                                                                                                                                                                                                                                                                                                                  |
| `/classes/roseville-sugar-cookie-decorating-class`       | Server page with shared client hero               | Medium   | Same issue as above: route is server, shared [src/components/classes/ClassLocationHero.tsx](src/components/classes/ClassLocationHero.tsx) is an avoidable client boundary.                                                                                                                                                                                                                                                                                                                  |
| `/classes/sacramento-sugar-cookie-decorating-class`      | Server page with shared client hero               | Medium   | Same issue as above: route is server, shared [src/components/classes/ClassLocationHero.tsx](src/components/classes/ClassLocationHero.tsx) is an avoidable client boundary.                                                                                                                                                                                                                                                                                                                  |
| `/classes/locations`                                     | Server page with featured-shop island             | Medium   | [src/app/classes/locations/ClassLocationsClient.tsx](src/app/classes/locations/ClassLocationsClient.tsx) is now server-rendered and wraps only the nested `FeaturedShop` branch in `QueryProvider`. Remaining client work is isolated to `FeaturedShop`.                                                                                                                                                                                                                                    |
| `/classes/previous-classes`                              | Server page with query/cart island                | Medium   | [src/app/classes/previous-classes/page.tsx](src/app/classes/previous-classes/page.tsx) now renders a server marketing shell, while [src/components/ClientPreviousClasses.tsx](src/components/ClientPreviousClasses.tsx) is limited to the past-classes query grid and product-card interactions.                                                                                                                                                                                            |
| `/classes/thank-you`                                     | Server page                                       | None     | [src/app/classes/thank-you/page.tsx](src/app/classes/thank-you/page.tsx) is already server-rendered and simple. No server-rendering action needed.                                                                                                                                                                                                                                                                                                                                          |
| `/contact`                                               | Server page with form island                      | Medium   | [src/app/contact/page.tsx](src/app/contact/page.tsx) now owns the hero and contact-info shell on the server, while [src/components/ContactPageClient.tsx](src/components/ContactPageClient.tsx) is limited to the inquiry form. This route now matches the intended server-shell/form-island pattern.                                                                                                                                                                                       |
| `/cookies/order-custom-sugar-cookies`                    | Server page with form island                      | Low      | Recently improved. [src/app/cookies/order-custom-sugar-cookies/page.tsx](src/app/cookies/order-custom-sugar-cookies/page.tsx) now owns metadata/schema/static sections, and [src/app/cookies/order-custom-sugar-cookies/CustomOrderClient.tsx](src/app/cookies/order-custom-sugar-cookies/CustomOrderClient.tsx) is limited to the multi-step form. This is the target pattern for other routes.                                                                                            |
| `/cookies/signature-sugar-cookie-sets`                   | Server wrapper around filter/search client page   | High     | [src/app/cookies/signature-sugar-cookie-sets/page.tsx](src/app/cookies/signature-sugar-cookie-sets/page.tsx) renders [src/components/ShopifyPreDesignedClient.tsx](src/components/ShopifyPreDesignedClient.tsx). The filter/search/query interactions are legitimately client-side, but the hero, FAQ, and much of the layout are static and could move to the server.                                                                                                                      |
| `/cookies/signature-sugar-cookie-sets/[slug]`            | Server wrapper around large client product detail | High     | [src/app/cookies/signature-sugar-cookie-sets/[slug]/page.tsx](src/app/cookies/signature-sugar-cookie-sets/[slug]/page.tsx) defers almost everything to [src/components/PredesignedCookieDetailClient.tsx](src/components/PredesignedCookieDetailClient.tsx), including data fetching, schema, and static editorial markup. Strong candidate for a server product page with a small cart/add-to-cart client leaf.                                                                            |
| `/cookies/thank-you`                                     | Server page                                       | None     | [src/app/cookies/thank-you/page.tsx](src/app/cookies/thank-you/page.tsx) is now server-rendered, uses deterministic decorative data, and no longer needs client bootstrapping for page-load motion.                                                                                                                                                                                                                                                                                         |
| `/corporate-team-building`                               | Server page                                       | Low      | [src/app/corporate-team-building/page.tsx](src/app/corporate-team-building/page.tsx) is server-rendered and mostly static. No meaningful server-rendering issue surfaced from the route boundary audit.                                                                                                                                                                                                                                                                                     |
| `/kind-cookie-program`                                   | Server page with nomination form island           | Medium   | [src/app/kind-cookie-program/page.tsx](src/app/kind-cookie-program/page.tsx) now renders the hero, explainer sections, and supporting content on the server, while [src/app/kind-cookie-program/KindCookieProgramClient.tsx](src/app/kind-cookie-program/KindCookieProgramClient.tsx) is limited to the nomination form and submission flow.                                                                                                                                                |
| `/privacy-policy`                                        | Server page                                       | None     | [src/app/privacy-policy/page.tsx](src/app/privacy-policy/page.tsx) is already a straightforward server page. No action needed for server rendering.                                                                                                                                                                                                                                                                                                                                         |
| `/private-cookie-classes-folsom-sacramento`              | Server wrapper around unnecessary client page     | Highest  | [src/app/private-cookie-classes-folsom-sacramento/page.tsx](src/app/private-cookie-classes-folsom-sacramento/page.tsx) renders [src/app/private-cookie-classes-folsom-sacramento/PrivateCookieClassesClient.tsx](src/app/private-cookie-classes-folsom-sacramento/PrivateCookieClassesClient.tsx), but that file currently has no real client need. It is marked `use client` while using `const mounted = true;`. This is the clearest whole-page server conversion candidate in the repo. |
| `/sugar-cookie-recipe`                                   | Server page with small cart CTA leaf              | Low      | [src/app/sugar-cookie-recipe/page.tsx](src/app/sugar-cookie-recipe/page.tsx) is already server-first. The interactive piece is [src/components/shop/RecipeAddToCartButton.tsx](src/components/shop/RecipeAddToCartButton.tsx), which is an appropriate small client leaf.                                                                                                                                                                                                                   |
| `/sweet-bakes/pre-designed/[slug]`                       | Server page                                       | Low      | [src/app/sweet-bakes/pre-designed/[slug]/page.tsx](src/app/sweet-bakes/pre-designed/[slug]/page.tsx) is already server-rendered. No server-rendering action needed from this audit.                                                                                                                                                                                                                                                                                                         |

## Shared Component Hotspots

### Highest priority shared candidates

- [ ] [src/app/private-cookie-classes-folsom-sacramento/PrivateCookieClassesClient.tsx](src/app/private-cookie-classes-folsom-sacramento/PrivateCookieClassesClient.tsx)
  - Current issue: marked `use client` but does not actually use client hooks or browser APIs.
  - Best next step: convert entire component to a server component and keep the route server-only.

- [x] [src/app/about/page.tsx](src/app/about/page.tsx)
  - Completed on 2026-03-23. The route is server-rendered again, metadata lives on the page, and the motion is CSS-only.

- [x] [src/components/ClientClasses.tsx](src/components/ClientClasses.tsx)
  - Completed on 2026-03-23. The static route shell moved to the server, and this component is now the class-list/waitlist island.

- [x] [src/components/ClientPreviousClasses.tsx](src/components/ClientPreviousClasses.tsx)
  - Completed on 2026-03-23. The static route shell moved to the server, and this component is now the past-classes grid island.

- [x] [src/components/ContactPageClient.tsx](src/components/ContactPageClient.tsx)
  - Completed on 2026-03-23. The route shell moved to the server, and this component is now the inquiry form only.

- [x] [src/app/kind-cookie-program/KindCookieProgramClient.tsx](src/app/kind-cookie-program/KindCookieProgramClient.tsx)
  - Completed on 2026-03-23. The route shell moved to the server, and this component is now the nomination form only.

- [ ] [src/components/ShopifyPreDesignedClient.tsx](src/components/ShopifyPreDesignedClient.tsx)
  - Current issue: query fetching, filters, FAQ schema, hero, and layout all live in one client component.
  - Best next step: move static shell and FAQ/schema to the server; keep search/filter/grid controls client-side.

- [ ] [src/components/PredesignedCookieDetailClient.tsx](src/components/PredesignedCookieDetailClient.tsx)
  - Current issue: data fetch, schema, breadcrumbs, editorial copy, and cart UI all live in one client component.
  - Best next step: fetch product server-side and render static product detail markup on the server; keep cart/add-to-cart controls as a small client leaf.

### Medium priority shared candidates

- [x] [src/app/classes/locations/ClassLocationsClient.tsx](src/app/classes/locations/ClassLocationsClient.tsx)
  - Completed on 2026-03-23. The component is server-rendered, and `FeaturedShop` remains as the nested client island.

- [x] [src/components/classes/ClassLocationHero.tsx](src/components/classes/ClassLocationHero.tsx)
  - Completed on 2026-03-23. The hero is now a server component with CSS-only motion.

- [ ] [src/components/FeaturedShop.tsx](src/components/FeaturedShop.tsx)
  - Current issue: query fetching, waitlist modal state, cart actions, and large static section structure are combined.
  - Best next step: server-render section shell and headings; client-render product cards/waitlist/cart interactions only.

- [ ] [src/components/Gallery.tsx](src/components/Gallery.tsx)
  - Current issue: modal interaction requires client, but the section header and most grid rendering are static.
  - Best next step: consider a server gallery shell with a smaller client modal/trigger layer if the complexity is worth it.

## Suggested Work Order

1. Convert the obvious no-hook client page:
   - `/private-cookie-classes-folsom-sacramento`
2. Split remaining large data-driven client shells:
   - `/cookies/signature-sugar-cookie-sets`
   - `/cookies/signature-sugar-cookie-sets/[slug]`
   - refine `FeaturedShop` itself
3. Revisit global client surface:
   - `QueryProvider`
   - `Navbar`

## Validation Notes

- Follow-up implementation completed for the `QueryProvider` checklist item on 2026-03-23.
- Validation for that follow-up: `pnpm exec eslint src/app/layout.tsx src/app/page.tsx src/app/classes/page.tsx src/app/classes/previous-classes/page.tsx src/app/classes/locations/page.tsx src/app/cookies/signature-sugar-cookie-sets/page.tsx src/app/cookies/signature-sugar-cookie-sets/[slug]/page.tsx`
- Validation for that follow-up: `pnpm build`
