# Task 002 — Content collection + trang chi tiết bài viết

- **Vertical slice:** content schema + route `[id]` + layout post
- **Depends on:** 001
- **Spec refs:** `.claude/rules/architecture.md` (Content Layer, `post.id`, `render()`), `.claude/rules/tech-stack.md`, `.claude/rules/error-handling.md` (zod fail-fast), `.claude/rules/testing.md`
- **Implemented by:** ccf-implementer + MCP context7
- **Gate (must be GREEN before the next slice):** unit test `sortPostsByDate` xanh; `npx astro build` ra `dist/posts/hello-world/index.html` và file đó chứa `class="...prose..."` (typography áp dụng).

## Goal (one sentence)
Định nghĩa collection `blog` (zod schema) với 1 bài mẫu `hello-world`, và trang `posts/[id].astro` render Markdown qua `prose`.

## Acceptance criteria (verifiable)
- [ ] `src/content.config.ts` định nghĩa collection `blog` bằng `defineCollection`. Import: `defineCollection` từ `astro:content`, `glob` từ **`astro/loaders`**, `z` từ **`astro/zod`** (KHÔNG import `z` từ package `zod` trực tiếp — đảm bảo tương thích schema nội bộ Astro).
- [ ] Loader: `glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' })` — pattern `[^_]*` loại file mở đầu `_` (draft theo convention file). Schema zod: `title: z.string()`, `date: z.coerce.date()`, `description: z.string()`, `tags: z.array(z.string()).default([])`, `draft: z.boolean().default(false)`.
- [ ] `src/content/blog/hello-world.md` (frontmatter hợp lệ, nội dung tiếng Việt) tồn tại.
- [ ] **Slug sạch (QUAN TRỌNG):** trong Astro 5 glob loader, `post.id` có thể **bao gồm đuôi file** (vd `hello-world.md`) tùy version, làm URL/route sai. Trong `[id].astro`, route phải sinh ra `/posts/hello-world/` (KHÔNG `/posts/hello-world.md/`). Cách xử lý: ở `getStaticPaths` log/kiểm `post.id` thực tế khi build; nếu id chứa đuôi, dùng `id.replace(/\.(md|mdx)$/, '')` làm param và tạo helper thuần `postSlug(id)` trong `src/lib/` có test. Link nội bộ (home list, RSS) cũng dùng `postSlug(post.id)` để nhất quán.
- [ ] `src/pages/posts/[id].astro`: `getStaticPaths` map param theo slug sạch; render qua `const { Content } = await render(post)` (import `render` từ `astro:content`), KHÔNG `post.render()`; bọc `<Content />` trong container `class="prose prose-slate dark:prose-invert"`.
- [ ] **Chốt quy ước draft (tránh leak URL draft):** có HAI cơ chế, phân vai rõ — (a) **filename mở đầu `_`** → bị glob pattern loại, **KHÔNG bao giờ load** (không có entry, không có route). (b) **frontmatter `draft: true`** → vẫn load (vào `getCollection`) nhưng bị **lọc khỏi mọi listing** (home/RSS/tags). Để KHÔNG leak trang draft, `getStaticPaths` của `[id].astro` PHẢI lọc `posts.filter(p => !p.data.draft)` trước khi sinh route → bài `draft: true` không có trang `/posts/<id>/`. Bài mẫu `hello-world.md` để `draft: false`.
- [ ] `src/lib/sort-posts.ts` có `sortPostsByDate(posts)` (mới→cũ) + test.
- [ ] `src/lib/post-slug.ts` có `postSlug(id: string): string` (strip `.md`/`.mdx`) + test.

## Test first (write before implementing)
- `src/lib/sort-posts.test.ts`: cho mảng post mock (data.date khác nhau, kèm 1 cặp ngày bằng nhau để chốt tie-break ổn định) → kỳ vọng thứ tự giảm dần theo ngày. Đỏ trước, rồi implement.
- `src/lib/post-slug.test.ts`: `postSlug('hello-world.md')` → `'hello-world'`; `postSlug('a/b.mdx')` → `'a/b'`; `postSlug('already-clean')` → `'already-clean'`. Đỏ trước.

## Files to touch
- `src/content.config.ts` — schema collection (`glob` từ `astro/loaders`, `z` từ `astro/zod`).
- `src/content/blog/hello-world.md` — bài mẫu (tiếng Việt).
- `src/pages/posts/[id].astro` — trang chi tiết.
- `src/layouts/PostLayout.astro` (hoặc dùng BaseLayout + prose) — layout bài viết.
- `src/lib/sort-posts.ts` + `src/lib/sort-posts.test.ts`.
- `src/lib/post-slug.ts` + `src/lib/post-slug.test.ts`.

## Steps (thin end-to-end slice)
1. Viết failing test `sort-posts.test.ts`.
2. Implement: content.config.ts + bài mẫu + trang `[id]` + prose.
3. `npx vitest run` xanh + `npx astro build` → kiểm `dist/posts/hello-world/index.html` có `prose` → `in-review`.
4. `/ccf:ccf-check` → `/code-review` → `/ccf:ccf-updatespec` — `done`.

## Notes / best-practice sources
- Astro 5 Content Layer API: `src/content.config.ts`, `glob()` loader, `render(entry)`, `post.id` (KHÔNG `slug`).
- Tailwind v4 typography: `prose` lên container chứa `<Content />`.
