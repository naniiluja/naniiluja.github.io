# Debugging (disciplined, no rushing)

Mandatory process when investigating a bug (used by `/ccf:ccf-fix`):
1. **Reproduce** — reconstruct the bug from symptom/input/environment before touching code.
2. **Trace step by step** — đọc thông báo lỗi của `astro build` / `astro check` / `vitest`; lần theo file + dòng.
3. **Kiểm tra output build** (thay cho "query DB" — static site không có DB) — so output HTML trong `dist/` với kỳ vọng, từng trang một.
4. **Isolate with evidence** — narrow the suspect area với file:line / build error / nội dung `dist/`, không đoán mò.
5. **Failing test** — write a test reproducing the bug (red) first (ưu tiên helper thuần trong `src/lib/`).
6. **Minimal fix** — fix only within scope, no side refactor.

> Never guess and fix on the spot before you have evidence.

## Known bugs (updated by /ccf:ccf-updatespec)
Chưa có (project mới).
