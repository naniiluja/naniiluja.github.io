# Testing (verification-first)

Philosophy: **write a failing test FIRST** before implementing/fixing — this is the single highest-leverage thing to let Claude verify its own work.

## Rules
- Each task: write a test reproducing the acceptance criteria (red) → implement → test green.
- Bug fix: write a test reproducing the bug (red) first, then fix.
- A task's acceptance criteria = concrete tests, not vague descriptions.

## Tooling & location
- Test framework: Vitest (cấu hình qua `getViteConfig` từ `astro/config` trong `vitest.config.ts`).
- Run command: `npx vitest run` (và `npx astro check` cho type check).
- Tests live in: cạnh source dưới dạng `src/**/*.test.ts` — ưu tiên test **helper thuần** trong `src/lib/` (sort bài, filter tag, build RSS items, format date). Không cố render `.astro` trong unit test; verify trang qua artifact `dist/` sau `astro build`.

## Coverage
- Coverage target: core helper paths (sort bài, filter tag, build RSS items, format date) phải có test trước khi đánh dấu task `done`.
- Core business paths must have tests before marking a task `done`.
