# Task 010 — Nút toggle text trong Nav (chuyển + lưu localStorage)

> Status: **todo** · Predecessor: 009 · Milestone: M4

## Goal
Thêm **nút text** trong thanh Nav để người đọc tự chuyển sáng↔tối; lưu lựa chọn vào `localStorage` và áp
lại khi quay lại. Dựng trên cơ chế class-based của task 009.

## Spec references
- `.claude/rules/architecture.md` — helper thuần testable trong `src/lib/`; gần zero-JS (biện minh: tính năng cần JS, giữ tối thiểu).
- `.claude/rules/testing.md` — viết test (red) trước.
- `.claude/rules/coding-conventions.md` — ghi chú tiếng Việt, identifier tiếng Anh; PascalCase cho component.

## Files to touch
- `src/lib/theme.ts` — tái dùng `nextTheme` làm CẢ hành vi toggle LẪN nhãn nút (nhãn = chế độ **sẽ chuyển
  sang** = `nextTheme(theme)`). *(Quyết định review: KHÔNG thêm `toggleLabel` — nó chỉ là alias thuần của
  `nextTheme`; bỏ để tránh API trùng. Một nguồn sự thật.)*
- `src/components/Nav.astro` — thêm `<button>` text cuối nav + `<script>` click handler.

## HARD REQUIREMENTS (shipped == tested)
- Click handler PHẢI import + gọi `nextTheme` từ `src/lib/theme.ts` — KHÔNG viết lại logic boolean inline.
- Luồng click: đọc `document.documentElement.classList.contains('dark')` → `nextTheme(current)` →
  set/bỏ class `.dark` → ghi `localStorage.theme` → set nhãn nút = `nextTheme(themeMới)`. Gom set-class +
  set-label vào MỘT hàm `render(theme)` (dùng cả lúc load lẫn sau click — tránh lặp).
- **Tránh flicker nhãn:** gọi `render(current())` trong cùng pass đồng bộ khi load.
- **No-JS fallback (review):** `<button>` có nhãn tĩnh `light` sẵn trong markup (mặc định tối → chế độ sẽ
  chuyển sang là light) để khách no-JS / trước hydrate vẫn thấy chữ, không phải phần tử rỗng.
- `<script>` Nav chỉ import từ `src/lib/theme.ts`; KHÔNG import `astro:content`/runtime Astro.

## Test written first (red)
- (Logic nhãn = `nextTheme` đã được test ở task 009; không cần test riêng cho alias.)

## Acceptance criteria (Gate — GREEN để đóng task)
- `npx vitest run` xanh (gồm `toggleLabel`).
- `npx astro check` pass.
- `dist/index.html` chứa `<button>` toggle trong vùng nav + script set `localStorage.theme`.
- Verify thủ công (`astro preview`): bấm nút → nền + nhãn đổi; reload giữ lựa chọn; xoá localStorage + reload → về tối.

## Notes
- Agent gợi ý: `ccf-implementer`; xác minh UI bằng skill `verify`/`run` (astro preview + screenshot).
