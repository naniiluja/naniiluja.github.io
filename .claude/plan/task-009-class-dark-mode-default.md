# Task 009 — Bật class-based dark mode + helper thuần + mặc định tối (KHÔNG có nút)

> Status: **todo** · Predecessor: 008 · Milestone: M4

## Goal
Chuyển cơ chế dark mode từ media-query (`prefers-color-scheme`, phụ thuộc OS) sang **class-based** của
Tailwind v4, đặt **mặc định khách mới = tối** (bất kể OS) và **chống FOUC**. Slice mỏng nhất chứng minh
wiring end-to-end — CHƯA có nút bấm (nút ở task 010).

## Spec references
- `.claude/rules/tech-stack.md` — Tailwind v4, không thêm lib mới; tránh drift về config v3.
- `.claude/rules/architecture.md` — helper thuần trong `src/lib/`, test bằng Vitest, không phụ thuộc Astro runtime/IO.
- `.claude/rules/testing.md` — viết test (red) trước khi implement.
- `.claude/rules/error-handling.md` — no silent catch (fallback tường minh, không catch rỗng).
- Best practice: Tailwind v4 dark-mode docs (Context7) — `@custom-variant dark (&:where(.dark, .dark *));` + inline head script chống FOUC.

## Files to touch
- `src/styles/global.css` — thêm `@custom-variant dark (&:where(.dark, .dark *));` (sau `@import`/`@plugin`).
- `src/lib/theme.ts` (mới) — helper thuần:
  - `resolveTheme(stored: string | null): 'dark' | 'light'` — `'light'` chỉ khi `stored === 'light'`; còn lại (`null`/`''`/lạ) → `'dark'`.
  - `nextTheme(current: 'dark' | 'light'): 'dark' | 'light'` — đảo chế độ.
- `src/lib/theme.test.ts` (mới, viết TRƯỚC).
- `src/layouts/BaseLayout.astro` — thêm `<script is:inline>` trong `<head>` (đặt ngay sau `<meta name="viewport">`,
  GIỮ `is:inline`):
  ```js
  try {
    document.documentElement.classList.toggle('dark', localStorage.theme !== 'light');
  } catch {
    document.documentElement.classList.add('dark'); // fallback tường minh về dark
  }
  ```

## Test written first (red)
- `resolveTheme(null) === 'dark'`
- `resolveTheme('light') === 'light'`
- `resolveTheme('dark') === 'dark'`
- `resolveTheme('xyz') === 'dark'` (giá trị lạ)
- `resolveTheme('') === 'dark'` (BVA rỗng)
- `nextTheme('dark') === 'light'`
- `nextTheme('light') === 'dark'`

## Acceptance criteria (Gate — GREEN trước khi sang 010)
- `npx vitest run` xanh (gồm `theme.test.ts`).
- `npx astro check` pass.
- `npx astro build` ra `dist/`; `dist/index.html` chứa inline script toggle `.dark` trong `<head>`.
- Preview với localStorage trống → nền **tối** bất kể OS; không nhấp nháy sang sáng khi tải.

## Notes
- KHÔNG sửa các class `dark:` đang có ở markup — chúng tự rebind theo class `.dark` sau khi thêm `@custom-variant`.
- Agent gợi ý: `ccf-implementer` (có Context7 tra Tailwind v4 nếu cần).
