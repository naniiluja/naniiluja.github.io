# Error Handling

## Taxonomy
- Distinguish **expected business errors** (frontmatter thiếu/sai kiểu — bắt bởi zod schema) from **system errors** (bug helper, lỗi build).
- Static site: lỗi nội dung = **build error** (fail-fast), không có lỗi runtime hướng người dùng ngoài trang 404 tĩnh.

## Verifiable rules
- **No silent catch.** Một error bắt được phải log (kèm ngữ cảnh) hoặc re-throw với context.
- Validate frontmatter qua zod schema (`astro:content`) — **fail sớm** ở build, không để dữ liệu sai lọt vào trang.
- Wrap errors with context when crossing a boundary; don't swallow the original stack trace.

## Error format
- Standard error shape: build fail-fast — zod validation lỗi làm `astro build` dừng với thông báo rõ **field nào sai ở file bài viết nào**.
- Error mapping: không có HTTP status (static). Lỗi nội dung = build error; trang không tồn tại = trang 404 tĩnh tại `src/pages/404.astro`.
