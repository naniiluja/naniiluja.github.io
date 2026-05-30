# Task 007 — Sitemap + SEO meta

- **Vertical slice:** integration + layout meta
- **Depends on:** 006
- **Spec refs:** `.claude/rules/tech-stack.md` (sitemap = `@astrojs/sitemap`), `.claude/rules/architecture.md`
- **Implemented by:** ccf-implementer + MCP context7
- **Gate (must be GREEN before the next slice):** `npx astro build` → `dist/sitemap-index.xml` tồn tại; `<head>` trong `dist/index.html` chứa `<link rel="canonical">`, `<link rel="alternate" type="application/rss+xml">`, và OG tags (`og:title`, `og:description`, `og:type`).

## Goal (one sentence)
Thêm sitemap tự sinh và SEO meta (canonical, Open Graph, RSS discovery) vào BaseLayout.

## Acceptance criteria (verifiable)
- [ ] `astro.config.mjs` thêm `sitemap()` vào `integrations` (`npm install @astrojs/sitemap`, `npx astro add sitemap`).
- [ ] `BaseLayout.astro` nhận props `title`, `description`, `canonicalUrl?` và render: `<meta name="description">`, `<link rel="canonical">`, OG tags, `<link rel="alternate" type="application/rss+xml" href={new URL('rss.xml', Astro.site)}>`.
- [ ] Các trang truyền `title`/`description` phù hợp xuống BaseLayout.

## Test first (write before implementing)
- Slice chủ yếu là integration + meta trong layout (không có helper logic thuần mới) → gate là **artifact build** (sitemap file tồn tại + `<head>` chứa các thẻ). Nếu tách hàm dựng canonical URL thành helper, viết test trước cho hàm đó.

## Files to touch
- `astro.config.mjs` — thêm `sitemap()` integration.
- `src/layouts/BaseLayout.astro` — meta head (canonical, OG, RSS alternate).
- `package.json` — `@astrojs/sitemap`.

## Steps (thin end-to-end slice)
1. (Nếu có helper) viết failing test; nếu không, xác định artifact gate.
2. Thêm sitemap integration + meta head.
3. `npx astro build` → kiểm `dist/sitemap-index.xml` + các thẻ trong `<head>` của `dist/index.html` → `in-review`.
4. `/ccf:ccf-check` → `/code-review` → `/ccf:ccf-updatespec` — `done`.

## Notes / best-practice sources
- `@astrojs/sitemap` cần `site` (đã set ở task 006) → lúc build tự sinh **CẢ HAI** file: `sitemap-index.xml` (index) + `sitemap-0.xml` (danh sách URL thật). Gate kiểm `sitemap-index.xml`; biết rằng `sitemap-0.xml` cũng phải có mặt trong `dist/`.
- Astro không có SEO component built-in → tự render meta trong layout.
- RSS alternate: `<link rel="alternate" type="application/rss+xml" href={new URL('rss.xml', Astro.site)}>` — `Astro.site` lấy từ `site` đã set task 006.
