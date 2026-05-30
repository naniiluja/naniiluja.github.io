# Task 006 — RSS feed + set `site` trong astro.config

- **Vertical slice:** endpoint + config
- **Depends on:** 005
- **Spec refs:** `.claude/rules/tech-stack.md` (RSS = `@astrojs/rss`, cần `site`), `.claude/rules/testing.md`
- **Implemented by:** ccf-implementer + MCP context7
- **Gate (must be GREEN before the next slice):** unit test `buildRssItems` xanh; `npx astro build` → `dist/rss.xml` tồn tại với URL tuyệt đối đúng (vì `site` đã set).

## Goal (one sentence)
Set `site` (root site URL) trong `astro.config` và sinh RSS feed tại `/rss.xml` từ các bài đã publish.

## Acceptance criteria (verifiable)
- [ ] `astro.config.mjs` có `site: 'https://naniiluja.github.io'` (root site, KHÔNG `base` — username GitHub đã xác nhận: `naniiluja`).
- [ ] `src/lib/rss-items.ts`: `buildRssItems(posts)` trả mảng item `{ title, pubDate, description, link }` — `link = '/posts/' + postSlug(post.id) + '/'` (tái dùng `postSlug` task 002 — DRY, tránh `/posts/<id>.md/`), `pubDate = post.data.date`, lọc `!data.draft`, kèm test.
- [ ] `src/pages/rss.xml.js`: dùng `@astrojs/rss` `rss({ title, description, site: context.site, items: buildRssItems(...) })`.
- [ ] `npm install @astrojs/rss`.

## Test first (write before implementing)
- `src/lib/rss-items.test.ts`: mock posts (1 draft + published) → kỳ vọng item array chỉ chứa published, link đúng dạng `/posts/<id>/`, `pubDate` = `data.date`. Đỏ trước.

## Files to touch
- `astro.config.mjs` — thêm `site`.
- `src/lib/rss-items.ts` + `src/lib/rss-items.test.ts`.
- `src/pages/rss.xml.js` — endpoint RSS.
- `package.json` — `@astrojs/rss`.

## Steps (thin end-to-end slice)
1. Viết failing test `rss-items.test.ts`.
2. Set `site`, implement `buildRssItems` + endpoint.
3. `npx vitest run` xanh + `npx astro build` → kiểm `dist/rss.xml` có URL tuyệt đối → `in-review`.
4. `/ccf:ccf-check` → `/code-review` → `/ccf:ccf-updatespec` — `done`.

## Notes / best-practice sources
- `@astrojs/rss`: endpoint export `GET(context)`; `context.site` `undefined` nếu `site` chưa set → set `site` ở task này (điều kiện cho RSS + sitemap task 007). KHÔNG dùng `pagesGlobToRssItems()` (legacy cho non-collection) — dùng `getCollection('blog')` + `buildRssItems`.
- Link dùng `postSlug(post.id)` (Astro 5 KHÔNG có `slug`); helper `postSlug` từ task 002 đảm bảo strip đuôi `.md`/`.mdx`.
