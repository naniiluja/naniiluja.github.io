---
paths: ["src/**", "astro.config.*", "package.json", "vitest.config.*"]
---
# Tech Stack

Philosophy: prefer the **most stable, most widely-supported, least-buggy** stack — mainstream, avoid bleeding-edge. For each library, pick the most popular / best-maintained option.

## Chosen stack
- Language: **TypeScript** (strict)
- SSG: **Astro 5.x** (Node-based)
- Styling: **Tailwind CSS v4** + `@tailwindcss/typography`
- Content: **Markdown / MDX** qua Astro **Content Layer API** (`glob()` loader)
- Test: **Vitest** (cấu hình qua `getViteConfig` từ `astro/config`)
- Hosting: **GitHub Pages** (root site `username.github.io`, không cần `base`), deploy bằng GitHub Actions

## Core libraries (one fixed choice per concern)
- MDX integration = `@astrojs/mdx@^4` (dòng v4 cho Astro 5; **KHÔNG** v6 — v6 yêu cầu `astro@^6`). Đăng ký trong `astro.config` `integrations: [mdx(), sitemap()]`; glob loader nhận `{md,mdx}`.
- RSS feed = `@astrojs/rss` (endpoint `src/pages/rss.xml.js`, cần `site` trong `astro.config`)
- Sitemap = `@astrojs/sitemap` (cần `site`)
- Tailwind = `@tailwindcss/vite` (đăng ký trong `astro.config` `vite.plugins`) — **KHÔNG** dùng `@astrojs/tailwind` (đã deprecated từ Astro 5.2)
- Frontmatter validation = `zod` (qua `astro:content` `defineCollection` + `z`). **Import `z` từ `astro/zod`** và `glob` từ `astro/loaders` (KHÔNG import `z` từ package `zod` trực tiếp — tương thích schema nội bộ Astro).
- CI deploy = `actions/checkout@v6` + `withastro/action@v6` + `actions/deploy-pages@v5` (lý do bump v4→v5: docs official Astro deploy GitHub Pages hiện dùng `deploy-pages@v5`, verified qua Context7 — task 008)

## Tailwind v4 note (tránh drift sang config v3)
- Plugin đăng ký qua `@plugin "@tailwindcss/typography"` trong file CSS entry (vd `src/styles/global.css` mở đầu bằng `@import "tailwindcss";`), **KHÔNG** dùng `tailwind.config.js` kiểu v3 (`require(...)` trong `plugins: []`).
- Áp `prose` lên container chứa `<Content />` ở trang bài viết (vd `class="prose prose-slate dark:prose-invert"`).

## Rules
- Do not add a new library outside the list above without comparing best practices via Context7 and updating this file.
- Pin versions in the lockfile; major upgrades require a recorded reason.
