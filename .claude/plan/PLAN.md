# Implementation Plan — naniiluja (blog tĩnh Astro)

> **Execution rule: STRICTLY SEQUENTIAL + VERTICAL SLICES.** Do exactly one task at a time, in order.
> Each task is a thin tracer-bullet that crosses all the layers it touches (content schema + helper + route + layout/UI) — NOT a horizontal "all-schema-then-all-routes" phase — so integration is proven early.
> Do not start task N+1 until task N's **gate is GREEN** (implemented + tested + checked via `/ccf:ccf-check`).
> The `in-progress`/`in-review` status is read by the session-start hook to re-load context after compact — keep status up to date.

## Milestones
- **M1 — Khung site render được:** task 001–002.
- **M2 — Blog đọc được đầy đủ:** task 003–005.
- **M3 — Phân phối + SEO + deploy:** task 006–008.

## Task backlog (in execution order)
| # | Slice | Layers | Gate (tests green) | Depends on | Status |
|---|-------|--------|--------------------|-----------|--------|
| 001 | Khởi tạo Astro + Tailwind v4 + layout cơ bản, render trang chủ "Hello" tĩnh | config + layout + 1 page | `astro check` pass + `astro build` ra `dist/index.html`; unit test `formatDate` xanh | — | done |
| 002 | Content collection (zod schema) + bài mẫu + trang chi tiết `posts/[id].astro` render Markdown qua `prose` (+ helper `postSlug` strip đuôi file) | content schema + route `[id]` + layout post + helper | unit test `sortPostsByDate` + `postSlug` xanh; `dist/posts/hello-world/index.html` tồn tại và chứa `class="...prose..."` | 001 | done |
| 003 | Trang chủ liệt kê danh sách bài (sort mới→cũ, lọc draft) | helper + route index | unit test `getPublishedPostsSorted` xanh; `dist/index.html` chứa link tới các bài | 002 | done |
| 004 | Trang About tĩnh + trang 404 tĩnh + nav link | 2 page + layout | `dist/about/index.html` + `dist/404.html` tồn tại; `dist/index.html` chứa `href="/about"` | 003 | done |
| 005 | Tags: helper trích tag, trang `/tags` (index) + `/tags/[tag]` (lọc) | helper + 2 route | unit test `extractUniqueTags` + `filterPostsByTag` xanh; `dist/tags/index.html` + `dist/tags/<tag>/index.html` tồn tại | 004 | done |
| 006 | RSS feed + `astro.config` `site` (root site URL) | endpoint + config | unit test `buildRssItems` xanh; `dist/rss.xml` tồn tại với URL tuyệt đối đúng | 005 | done |
| 007 | Sitemap (`@astrojs/sitemap`) + SEO meta (canonical, OG, RSS discovery) trong BaseLayout | integration + layout meta | `dist/sitemap-index.xml` tồn tại; `<head>` trong `dist/index.html` có canonical + RSS alternate + OG | 006 | done |
| 008 | CI/CD GitHub Actions deploy GitHub Pages (root site) | CI workflow | `astro build` ra `dist/` local; `.github/workflows/deploy.yml` parse hợp lệ + chứa `withastro/action@v6` và `permissions: pages: write, id-token: write` | 007 | done |

> Status: `todo` / `in-progress` / `in-review` / `done` / `blocked`. Lifecycle: `todo → in-progress → in-review → done`. `ccf-implementer` marks `in-review` when code+test are complete; only `/ccf:ccf-updatespec` writes `done` after `/ccf:ccf-check` + `/code-review` pass.
> Per-task detail in `task-NNN-*.md`.
