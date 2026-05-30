# Task 004 — Trang About + nav link + trang 404

- **Vertical slice:** 2 page (about + 404) + layout (nav)
- **Depends on:** 003
- **Spec refs:** `.claude/rules/architecture.md`, `.claude/rules/coding-conventions.md`, `.claude/rules/error-handling.md` (404 tĩnh tại `src/pages/404.astro`)
- **Implemented by:** ccf-implementer
- **Gate (must be GREEN before the next slice):** `npx astro build` → `dist/about/index.html` **và** `dist/404.html` tồn tại; `dist/index.html` chứa `href="/about"`.

## Goal (one sentence)
Thêm trang About tĩnh, trang 404 tĩnh (yêu cầu spec error-handling), và một nav link trong BaseLayout.

## Acceptance criteria (verifiable)
- [ ] `src/pages/about.astro` render nội dung giới thiệu tĩnh (tiếng Việt), dùng `BaseLayout`.
- [ ] `src/pages/404.astro` (yêu cầu `.claude/rules/error-handling.md`) dùng `BaseLayout`, có thông điệp "Không tìm thấy trang" + link về `/`. Build ra `dist/404.html` (Astro auto-map `404.astro` → `404.html`).
- [ ] `BaseLayout` (hoặc một `Nav` component) có link `href="/"` và `href="/about"`.
- [ ] Build ra `dist/about/index.html` và `dist/404.html`.

## Test first (write before implementing)
- Slice này thuần presentational, không có helper logic mới → gate là **artifact build** (file tồn tại + index chứa nav link), không bắt buộc unit test mới. Nếu tách `Nav` thành helper sinh link, viết test cho helper đó trước.

## Files to touch
- `src/pages/about.astro` — trang About.
- `src/pages/404.astro` — trang 404 tĩnh.
- `src/layouts/BaseLayout.astro` — thêm nav (`/`, `/about`).
- `src/components/Nav.astro` (tùy chọn).

## Steps (thin end-to-end slice)
1. (Nếu có helper) viết failing test; nếu không, xác định artifact gate.
2. Implement About + 404 + nav.
3. `npx astro build` → kiểm `dist/about/index.html` + `dist/404.html` + `href="/about"` trong `dist/index.html` → `in-review`.
4. `/ccf:ccf-check` → `/code-review` → `/ccf:ccf-updatespec` — `done`.

## Notes / best-practice sources
- Astro routing file-based: `src/pages/about.astro` → `/about`; `src/pages/404.astro` → `dist/404.html` (GitHub Pages tự dùng `404.html` cho trang lỗi).
