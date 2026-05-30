# naniiluja — blog tĩnh cá nhân

> Managed by **CCF (Claude Context First)**. Workflow: Explore → Plan → Implement → Commit.
> **STRICTLY SEQUENTIAL**: one task at a time, no parallel feature development.
> Ground every design decision in Context7 + Microsoft Learn.
> Keep this spec always fresh with `/ccf:ccf-updatespec`.

## What this is
`naniiluja` là một blog cá nhân tĩnh, đơn giản (lấy cảm hứng từ borischerny.com), xây bằng **Astro 5.x** +
TypeScript. Bài viết viết bằng **Markdown/MDX** qua **Content Layer API** (`glob()` loader). Có: danh sách +
trang chi tiết bài viết, trang About, tags + trang lọc theo tag, RSS feed và SEO (sitemap + meta). Style bằng
**Tailwind CSS v4** + `@tailwindcss/typography`. Build ra HTML tĩnh, deploy lên **GitHub Pages** (root site)
qua GitHub Actions. Không có backend/DB — toàn bộ là static build.

## Repo layout (monorepo)
- The root folder holds `CLAUDE.md`, `.claude/`, docker files, CI/CD files. **git init at the root**, not in sub-folders.
- **Single-package static site (KHÔNG monorepo).** Astro project nằm ngay ở root: `src/` (pages, layouts,
  components, content, lib), `public/`, `astro.config.mjs`, `package.json`. Không có `be/` hay `fe/` tách riêng.

## Rules (imported — keep this file < 200 lines; detail lives in .claude/rules/)
@.claude/rules/tech-stack.md
@.claude/rules/architecture.md
@.claude/rules/coding-conventions.md
@.claude/rules/logging.md
@.claude/rules/testing.md
@.claude/rules/error-handling.md
@.claude/rules/debugging.md
@.claude/rules/tooling.md
@.claude/rules/git-workflow.md

## Current plan
See `.claude/plan/PLAN.md` for the sequential backlog. Execute **one task at a time**, in order; do not start task N+1 until task N is implemented + tested + checked.
