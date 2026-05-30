---
paths: ["src/**", "*.{ts,mjs,js,astro}"]
---
# Coding Conventions

## Formatting (verifiable)
- Indentation: Use 2-space indentation.
- Formatter: `npx prettier --write .` — đã cấu hình `.prettierrc.json` (`plugins: ["prettier-plugin-astro"]`, `singleQuote`, `printWidth: 100`, override parser `astro` cho `*.astro`). Chạy `npx prettier --check "src/**/*.{ts,astro,css}"` trước commit; thiếu plugin thì prettier không parse `.astro`.
- Linter / type check: `npx astro check` must pass.

## Naming
- Files `.ts` (helper) + `src/pages/*.astro` (route) + bài viết `.md`/`.mdx`: **kebab-case** (vd `post-helpers.ts`, `about.astro`, `hello-world.md`; filename bài = `post.id`).
- **Component & layout `.astro`** (`src/components/`, `src/layouts/`): **PascalCase** theo chuẩn cộng đồng Astro (vd `BaseLayout.astro`, `PostListItem.astro`). Đây là ngoại lệ có chủ đích — import quen thuộc, khớp tên component khi dùng trong template.
- Variables/functions: camelCase.
- Constants: UPPER_SNAKE_CASE.

## File structure
- A file is at most ~200 lines; split if it exceeds.
- Import order: node/built-in → external → `astro:*` (vd `astro:content`) → alias nội bộ (`~/`, `@/`) → relative.

## General rules
- No dead code / unused imports.
- Comments must match the existing codebase's language (tiếng Việt cho ghi chú, identifier giữ tiếng Anh).
