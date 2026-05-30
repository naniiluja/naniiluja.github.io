# Task 001 — Khởi tạo Astro + Tailwind v4 + layout cơ bản

- **Vertical slice:** config + layout + 1 page
- **Depends on:** — (task đầu tiên)
- **Spec refs:** `.claude/rules/tech-stack.md`, `.claude/rules/architecture.md`, `.claude/rules/coding-conventions.md`, `.claude/rules/testing.md`
- **Implemented by:** ccf-implementer + MCP context7
- **Gate (must be GREEN before the next slice):** `npx astro check` pass + `npx astro build` ra `dist/index.html`; unit test helper `formatDate` xanh (`npx vitest run`).

## Goal (one sentence)
Dựng project Astro 5 + TypeScript + Tailwind v4, có một `BaseLayout` và trang chủ tĩnh render "Hello", build ra HTML được.

## Acceptance criteria (verifiable)
- [ ] `npm create astro@latest` đã chạy (TypeScript strict), `package.json` + `astro.config.mjs` tồn tại.
- [ ] Tailwind v4 wired qua `@tailwindcss/vite` trong `astro.config.mjs` `vite.plugins`; `src/styles/global.css` mở đầu `@import "tailwindcss";` và import 1 lần trong `BaseLayout`.
- [ ] `src/layouts/BaseLayout.astro` + `src/pages/index.astro` render được nội dung "Hello".
- [ ] `src/lib/format-date.ts` có hàm `formatDate(date: Date): string`; có `src/lib/format-date.test.ts` (Vitest).
- [ ] `vitest.config.ts` dùng `getViteConfig` từ `astro/config`.

## Test first (write before implementing)
- `src/lib/format-date.test.ts`: **chốt locale `'vi-VN'`**. Kỳ vọng `formatDate(new Date('2026-01-15'))` trả chuỗi `Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }).format(...)` (vd `15 tháng 1, 2026`). Implementer phải khẳng định chuỗi kỳ vọng chính xác từ Node runtime của repo (Intl output có thể khác micro giữa version ICU) rồi khóa cứng trong test. Viết đỏ trước, rồi implement `formatDate`.
- **Lưu ý xác định (chốt):** `formatDate` PHẢI truyền locale tường minh `'vi-VN'` (KHÔNG để mặc định theo locale máy → test flaky trên CI). Locale này là quyết định cuối, không để optional.

## Files to touch
- `astro.config.mjs` — config Astro + Tailwind vite plugin.
- `package.json` — deps: astro, tailwindcss, @tailwindcss/vite, @tailwindcss/typography, vitest.
- `vitest.config.ts` — `getViteConfig`.
- `src/styles/global.css` — `@import "tailwindcss";` + `@plugin "@tailwindcss/typography";`.
- `src/layouts/BaseLayout.astro` — layout chung.
- `src/pages/index.astro` — trang chủ tạm "Hello".
- `src/lib/format-date.ts` + `src/lib/format-date.test.ts`.

## Steps (thin end-to-end slice)
1. Viết failing test `format-date.test.ts`.
2. Implement minimally: scaffold Astro, wire Tailwind v4, BaseLayout + index, `formatDate`.
3. `npx vitest run` xanh + `npx astro check` + `npx astro build` ra `dist/index.html` → mark `in-review`.
4. `/ccf:ccf-check` → `/code-review` → `/ccf:ccf-updatespec` — `done` chỉ set ở đây.

## Notes / best-practice sources
- Astro docs — Tailwind v4 qua `@tailwindcss/vite` (KHÔNG `@astrojs/tailwind` deprecated); `@plugin` typography trong CSS.
- Astro docs — Vitest qua `getViteConfig` từ `astro/config`.
