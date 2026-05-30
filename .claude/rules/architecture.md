---
paths: ["src/**", "astro.config.*"]
---
# Architecture

## Layering & boundaries
- `content (Markdown/MDX)` → `content collection schema (zod)` → `pages (routing / getStaticPaths)` → `layouts / components` → `static HTML output (dist/)`.

## Dependency direction
- Dependencies flow one way only: `pages → content collection + helper thuần`.
- Business logic (helper thuần) does NOT depend on Astro runtime/IO directly — đặt trong `src/lib/` để test được bằng Vitest mà không cần render Astro.

## Design patterns
- Backend: không có (static site, không runtime server).
- Frontend: component-based Astro (layout chung + component tái dùng). **KHÔNG** client-side JS trừ khi thực sự cần (đúng tinh thần blog tĩnh, gần zero-JS).

## Where things go
- `src/content/blog/*.md(x)` — bài viết.
- `src/content.config.ts` — định nghĩa collection (`defineCollection` + `glob()` loader + zod schema). Astro 5: file ở `src/content.config.ts`, KHÔNG phải `src/content/config.ts`.
- `src/pages/` — routes. Trang bài viết: `src/pages/posts/[id].astro`, dùng `post.id` (Astro 5 **KHÔNG** có `slug`); render qua `render(entry)` (import từ `astro:content`), **KHÔNG** `entry.render()`.
- `src/layouts/` — layout (vd `BaseLayout.astro` chứa `<head>` meta).
- `src/components/` — component tái dùng.
- `src/lib/` — helper thuần (sort bài, filter tags, format date, build RSS items) — nơi đặt logic để test.

## Verifiable rules
- Each module has one clear responsibility (Single Responsibility).
- No circular imports between layers.
- Helper trong `src/lib/` không import `astro:content` ở mức gọi `getCollection` — nhận data qua tham số để unit-test thuần (mock data), tránh phụ thuộc virtual module khi test.
