# Task 003 — Trang chủ liệt kê danh sách bài viết

- **Vertical slice:** helper + route index
- **Depends on:** 002
- **Spec refs:** `.claude/rules/architecture.md`, `.claude/rules/testing.md`
- **Implemented by:** ccf-implementer
- **Gate (must be GREEN before the next slice):** unit test `getPublishedPostsSorted` xanh; `npx astro build` → `dist/index.html` chứa link tới các bài viết (`href="/posts/..."`).

## Goal (one sentence)
Trang chủ liệt kê các bài đã publish (lọc `draft`), sắp xếp mới→cũ, mỗi bài là link tới trang chi tiết.

## Acceptance criteria (verifiable)
- [ ] `src/lib/get-posts.ts` có `getPublishedPostsSorted(posts)` = lọc `!data.draft` + sort theo `sortPostsByDate` (tái dùng helper task 002).
- [ ] `src/pages/index.astro` gọi `getCollection('blog')` → `getPublishedPostsSorted` → render list (title + `formatDate(date)` + link `/posts/${postSlug(post.id)}/` — tái dùng `formatDate` task 001 + `postSlug` task 002, DRY).
- [ ] Bài có `draft: true` KHÔNG xuất hiện.

## Test first (write before implementing)
- `src/lib/get-posts.test.ts`: mock posts gồm 1 draft + 2 published có ngày khác nhau → kỳ vọng chỉ 2 published, đúng thứ tự mới→cũ. Đỏ trước.

## Files to touch
- `src/lib/get-posts.ts` + `src/lib/get-posts.test.ts`.
- `src/pages/index.astro` — thay nội dung "Hello" bằng danh sách bài.
- `src/components/PostListItem.astro` (tùy chọn) — 1 dòng trong danh sách.

## Steps (thin end-to-end slice)
1. Viết failing test `get-posts.test.ts`.
2. Implement helper + cập nhật `index.astro`.
3. `npx vitest run` xanh + `npx astro build` → `dist/index.html` có link bài → `in-review`.
4. `/ccf:ccf-check` → `/code-review` → `/ccf:ccf-updatespec` — `done`.

## Notes / best-practice sources
- Tái dùng `sortPostsByDate` (task 002) — DRY.
- Helper nhận `posts` qua tham số (không gọi `getCollection` bên trong) để unit-test thuần.
