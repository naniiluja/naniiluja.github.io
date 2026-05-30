# Tooling (available skills / MCP / subagents — WHEN TO USE)

A catalog of this project's tools, with **when to use** each, so future-session agents can decide. Updated by `/ccf:ccf-updatespec` whenever a new tool is added.

## MCP servers
- **context7** — look up current docs for libraries/frameworks. **Use when:** cần API syntax/best practice/migration của Astro, Tailwind, `@astrojs/*`. How: `resolve-library-id` → `query-docs`.
- **microsoft-learn** — Microsoft/.NET/Azure docs. **Use when:** hiếm — stack này không phải Microsoft; bỏ qua trừ khi đụng dịch vụ Azure.

## Skills
- **ccf:ccf-plan** — tạo plan tuần tự cho feature mới. **Use when:** bắt đầu chi tiết hoá một task/feature (trong plan mode). Trigger: `/ccf:ccf-plan`.
- **ccf:ccf-check** — review conformance/SOLID/spec. **Use when:** sau khi implement một task, trước khi `done`. Trigger: `/ccf:ccf-check`.
- **ccf:ccf-fix** — debug có kỷ luật. **Use when:** có bug cần truy root cause. Trigger: `/ccf:ccf-fix`.
- **ccf:ccf-updatespec** — refresh spec + memory. **Use when:** kết thúc session, ghi lại bài học/known bug. Trigger: `/ccf:ccf-updatespec`.
- **verify** — chạy app thật để xác nhận thay đổi hoạt động. **Use when:** cần xem site render đúng (vd `astro preview`).
- **run** — khởi chạy app project. **Use when:** muốn chạy/screenshot site local.
- **code-review** — review diff tìm bug/cleanup. **Use when:** trước khi đóng một task. Trigger: `/code-review`.

## Subagents (CCF)
- **ccf-implementer** — implement one task from the plan (has MCP). **Use when:** executing a task after /ccf-plan.
- **ccf-spec-checker** — review conformance/SOLID. **Use when:** /ccf-check.
- **ccf-debugger** — investigate one root-cause branch. **Use when:** /ccf-fix needs isolation.
- **ccf-best-practice-researcher** — fetch best practices. **Use when:** grounding a decision.

## System memory vs Spec (WHEN TO write where)
- **Spec** (this file + other rules): project rules that are derivable / belong to the repo. Lower weight (user message).
- **Memory** (`~/.claude/projects/<path>/memory/`): `feedback` anti-mistakes + `user` preferences. Higher weight (system prompt) → Claude repeats fewer mistakes. Updated via `/ccf:ccf-updatespec`. **Do not duplicate** CLAUDE.md content.
