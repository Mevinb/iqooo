# PATHWISE — website version

A frontend-only website mirror of the PATHWISE mobile prototype. Same sample journey, same copy, same deterministic rules — rebuilt as a responsive static site with **no build step, no backend, no account**.

## Run it

Any static server works. From the repo root:

```bash
cd website
python3 -m http.server 8080
# open http://localhost:8080/
```

Or:

```bash
npx serve website
```

You can also double-click `website/index.html` — everything runs client-side (Google Fonts needs internet; the demo works offline with system fonts).

## What is inside

- `index.html` — shell, meta, font + stylesheet wiring
- `styles.css` — design tokens mirrored from `src/theme.ts` (`#F5F8F7`, `#116B5A`, `#143F35`, …), responsive landing + app layouts
- `app.js` — hash router + demo store + all views. Sample data and rules (`recommend`, `duration`, `fitMessage`, `recommendationReason`, `money`) are ported 1:1 from `src/data/model.ts`

## Routes (hash-based)

| Hash | Screen | Mobile equivalent |
|---|---|---|
| `#/` | Landing + live demo preview | `app/index.tsx` (expanded for desktop) |
| `#/advisor` | Branching chat, typed answers, voice/camera demos | `app/advisor.tsx` |
| `#/home` | Active pathway, next small step | `app/(tabs)/home.tsx` |
| `#/paths` | Your routes / Compare table | `app/(tabs)/paths.tsx` |
| `#/pathway/a` `b` `c` | Milestones, tradeoff, eligibility | `app/pathway/[id].tsx` |
| `#/what-if` | Scenario editor + reversible preview | `app/what-if.tsx` |
| `#/explore` | Search, filters, bookmarks | `app/(tabs)/explore.tsx` |
| `#/opportunity/:id` | Listing detail | `app/opportunity/[id].tsx` |
| `#/next-steps` | 4-task checklist with progress | `app/next-steps.tsx` |
| `#/profile` | Story, priorities, reset | `app/(tabs)/profile.tsx` |
| `#/edit-profile` | Validated form | `app/edit-profile.tsx` |

## Five-minute walkthrough (same as the app)

1. **Explore my options** — answer 5 questions (try “Make time for family” to see adaptive ordering, or type freely).
2. **Compare three routes** — Plan A / B / C with budget fit and a Compare table.
3. **What if my situation changes?** — lower the budget to ₹20,000, preview, then Apply or Keep my current plan.
4. **Explore** — search “Excel”, filter Courses, bookmark one, toggle the bookmark filter.
5. **Next steps + Profile** — complete a task, edit goal/budget/hours, Reset demo to restore Priya.

## Differences from the native app

- Desktop gets a sidebar + top bar; phones get the same 4-tab bottom bar as the app.
- Demo state persists in `localStorage` (key `pathwise-web-v1`) so a refresh keeps your place; **Reset demo** restores the original journey.
- Icons are inline SVG (same Phosphor-style metaphors); Plus Jakarta Sans loads from Google Fonts with system fallback.

## Prototype boundaries

Same as the mobile app: all people, providers, listings, costs and timelines are illustrative. No live AI, recording, emotion analysis, application submission, enrollment, or verified opportunities.
