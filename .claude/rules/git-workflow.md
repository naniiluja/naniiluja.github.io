# Git Workflow

## Most important rule
- **Do NOT commit/push unless the user explicitly asks.** Every git operation must be confirmed first.

## Commit attribution (harness-enforced)
- Attribution is enforced by `.claude/settings.json` `attribution` (`{ "commit": "...", "pr": "..." }`), per `code.claude.com/docs/en/settings`. Harness-level settings are deterministic and **supersede** this narrative — settings win over prose. (`attribution` replaces the deprecated `includeCoAuthoredBy`.)
- Hiện `attribution.commit` và `attribution.pr` = `""` (KHÔNG gắn trailer Claude, theo lựa chọn người dùng). Do đó **KHÔNG** thêm trailer Co-Authored-By bằng tay.

<!-- Project mới, lịch sử git mỏng (0 commit). Các convention dưới đây là ĐỀ XUẤT chuẩn để người dùng
     xác nhận/điều chỉnh khi bắt đầu commit thật — không suy ra từ history. -->

## When asked to commit
- If on the default branch (`main`/`master`): create a new branch first.
- Commit messages follow Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `style:`, `refactor:`, `test:`.
- One logical change per commit; don't bundle unrelated work.

## Branch & PR
- Branch naming convention: `feat/<slug>`, `fix/<slug>` (vd `feat/tags-page`, `fix/rss-date`).
- PR rules: PR nhỏ, một slice / PR; mô tả gồm acceptance criteria của task tương ứng trong `.claude/plan/`.

## Monorepo
- Single-package: git lives at the root only.
