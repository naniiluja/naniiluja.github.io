# Task 008 — CI/CD deploy GitHub Pages

- **Vertical slice:** CI workflow
- **Depends on:** 007
- **Spec refs:** `.claude/rules/tech-stack.md` (deploy `withastro/action@v6`), `.claude/rules/git-workflow.md`
- **Implemented by:** ccf-implementer + MCP context7
- **Gate (must be GREEN before the next slice):** `npx astro build` ra `dist/` local; `.github/workflows/deploy.yml` parse hợp lệ (vd `actionlint` hoặc `act -n` dry-run) và chứa `withastro/action@v6` + `permissions: pages: write, id-token: write`.

## Goal (one sentence)
Thêm GitHub Actions workflow build + deploy site lên GitHub Pages (root site) mỗi khi push `main`.

## Acceptance criteria (verifiable)
- [ ] `.github/workflows/deploy.yml`: trigger `push: branches: [main]` + `workflow_dispatch`.
- [ ] `permissions:` gồm `contents: read`, `pages: write`, `id-token: write`.
- [ ] Job `build` dùng `actions/checkout@v6` + `withastro/action@v6`; job `deploy` dùng `actions/deploy-pages@v5` với block `environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }` (block `environment` BẮT BUỘC — thiếu thì OIDC token scope sai và deploy fail permissions).
- [ ] `concurrency: { group: pages, cancel-in-progress: false }`.
- [ ] YAML parse hợp lệ (actionlint / `act -n`).
- [ ] **BẮT BUỘC — vá spec drift:** `.claude/rules/tech-stack.md` hiện pin `actions/deploy-pages@v4`. Khi implement task này phải **cập nhật `tech-stack.md` lên `actions/deploy-pages@v5`** (đã verify qua Context7, lý do: docs official Astro hiện dùng v5) — theo luật "không đổi version mà không ghi lý do vào tech-stack.md". KHÔNG để workflow dùng v5 còn spec ghi v4 (drift âm thầm). (Sửa rule file này nằm NGOÀI plan mode → làm trong bước implement task 008, không phải lúc duyệt plan.)

## Test first (write before implementing)
- Không có code app/helper → gate là **YAML hợp lệ + chứa các khóa bắt buộc** + `astro build` local ra `dist/`. Kiểm bằng actionlint/`act -n` và đọc nội dung file.

## Files to touch
- `.github/workflows/deploy.yml` — workflow deploy.
- (README/ghi chú) — nhắc bật **Settings → Pages → Source = GitHub Actions** trên GitHub.

## Steps (thin end-to-end slice)
1. Xác định gate (YAML valid + chứa permissions/action bắt buộc).
2. Viết workflow theo mẫu official Astro (`withastro/action@v6`).
3. `npx astro build` local + validate YAML → `in-review`.
4. `/ccf:ccf-check` → `/code-review` → `/ccf:ccf-updatespec` — `done`.

## Notes / best-practice sources
- Astro docs — deploy GitHub Pages: cần `id-token: write` (OIDC), nếu thiếu deploy fail.
- Root site (`username.github.io`) → KHÔNG cần `base`; `site = https://naniiluja.github.io` đã set ở task 006.
- `withastro/action@v6` tự detect Node (mặc định Node 22), install, build — không cần khai báo build script tay.
- **Version chốt (verified Context7, 2026):** `actions/checkout@v6`, `withastro/action@v6`, `actions/deploy-pages@v5`. (Plan cũ ghi `deploy-pages@v4` → đã sửa thành v5.)
