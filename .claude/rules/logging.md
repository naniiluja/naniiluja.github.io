# Logging (static site — tối giản)

Blog tĩnh build-time, **không có request runtime** nên không có correlation-ID/tracing kiểu server. Giữ phần này tối giản; chỉ áp dụng khi viết build script hoặc helper cần debug.

## Áp dụng
- Logging library: `console` (chỉ khi cần debug build script / helper).
- Where logs go: stdout của `astro build` / `vitest` / CI log.
- Event-name prefix khi cần phân biệt bước build: `[build.<bước>]` (vd `[build.rss]`, `[build.tags]`).

## Rules
- `error`: build/script fail. `warn`: bất thường nhưng xử lý được (vd bài thiếu field optional). `info`: mốc đáng chú ý. `debug`: chi tiết phát triển.
- Không log secrets/PII.
- Không thêm logging library runtime (pino/winston...) — thừa cho static site.
