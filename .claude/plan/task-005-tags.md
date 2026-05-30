# Task 005 — Tags: index + trang lọc theo tag

- **Vertical slice:** helper + 2 route
- **Depends on:** 004
- **Spec refs:** `.claude/rules/architecture.md`, `.claude/rules/testing.md`
- **Implemented by:** ccf-implementer
- **Gate (must be GREEN before the next slice):** unit test `extractUniqueTags` + `filterPostsByTag` xanh; `npx astro build` → `dist/tags/index.html` và `dist/tags/<tag>/index.html` (tag mẫu, vd `dist/tags/astro/index.html`) tồn tại.

## Goal (one sentence)
Sinh trang `/tags` liệt kê mọi tag và trang `/tags/[tag]` liệt kê bài thuộc tag đó.

## Acceptance criteria (verifiable)
- [ ] `src/lib/tags.ts`: `extractUniqueTags(posts)` (mảng tag duy nhất) + `filterPostsByTag(posts, tag)` (bài chứa tag), kèm test.
- [ ] `src/pages/tags/index.astro`: liệt kê tag → link `/tags/${tag}/`.
- [ ] `src/pages/tags/[tag].astro`: `getStaticPaths` sinh từ `extractUniqueTags`; props = `filterPostsByTag`; lưu ý `decodeURI(Astro.params.tag)` nếu tag có ký tự encode. Link bài trong trang lọc dùng `/posts/${postSlug(post.id)}/` (tái dùng helper task 002).
- [ ] Bài mẫu `hello-world.md` gắn ít nhất 1 tag (vd `astro`) để có route kiểm chứng.

## Test first (write before implementing)
- `src/lib/tags.test.ts`: mock posts với tags chồng nhau → kỳ vọng `extractUniqueTags` trả tập duy nhất; `filterPostsByTag` trả đúng bài. Đỏ trước.

## Files to touch
- `src/lib/tags.ts` + `src/lib/tags.test.ts`.
- `src/pages/tags/index.astro`.
- `src/pages/tags/[tag].astro`.
- `src/content/blog/hello-world.md` — đảm bảo có tag.

## Steps (thin end-to-end slice)
1. Viết failing test `tags.test.ts`.
2. Implement helper + 2 trang tag.
3. `npx vitest run` xanh + `npx astro build` → kiểm `dist/tags/index.html` + `dist/tags/astro/index.html` → `in-review`.
4. `/ccf:ccf-check` → `/code-review` → `/ccf:ccf-updatespec` — `done`.

## Notes / best-practice sources
- Astro 5: dynamic param KHÔNG auto-decode → `decodeURI(Astro.params.tag)` khi cần.
- `getStaticPaths` sinh route tĩnh cho từng tag.
