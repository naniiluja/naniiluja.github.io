---
title: 'Tản mạn về CLAUDE.md: nó nằm ở đâu trong mắt Claude Code?'
date: 2026-05-30T22:10:00+07:00
description: Tại sao bạn viết quy tắc trong CLAUDE.md mà agent không thèm theo? Vì bạn chưa biết đoạn text đó nằm ở đâu, được inject thế nào và ưu tiên ra sao. Hôm nay mình phân tích cơ chế đó.
tags:
  - claude-code
  - ai
draft: false
---

Tối nay trời mưa và mình rảnh háng, nên sẽ tản mạn về CLAUDE.md của Claude Code từ những nguồn mà mình tìm hiểu và sưu tầm (turn on the LowG music bae).

Hầu hết mọi người đều viết CLAUDE.md theo kiểu là viết vài quy tắc, xong sau đó thì thấy agent không hề theo những thứ mà mình viết trong đó (tức là không có hiệu quả) và bỏ. Tất nhiên là do bạn không biết đoạn text đó như thế nào trong mắt của Claude Code, nó nằm ở đâu và ưu tiên thế nào chứ gì =))))

Hôm nay mình sẽ phân tích cơ chế đó cho các bạn nha.

## Thứ nhất: CLAUDE.md không nằm trong system prompt

Mọi người thường nghĩ là Claude Code cũng giống như Cursor vậy, kiểu sẽ có cái ô textbox để nhập vào một thứ gọi là "system prompt". Nhưng thực chất ở Claude Code, CLAUDE.md được inject qua hàm `prependUserContext()`:

```js
export function prependUserContext(messages, context): Message[] {
  return [
    createUserMessage({
      content: `<system-reminder>
As you answer the user's questions, you can use the following context:
# claudeMd
${claudeMdContent}

      IMPORTANT: this context may or may not be relevant to your tasks.
      You should not respond to this context unless it is highly relevant to your task.
</system-reminder>`,
      isMeta: true,
    }),
    ...messages,
  ]
}
```

Thì nó chỉ được bọc trong thẻ `<system-reminder>` và được chèn vào đầu hội thoại như là một user message đầu tiên. Và tất nhiên là ưu tiên của nó sẽ thấp hơn system prompt rồi.

Các bạn có thể coi như là system prompt là một mệnh lệnh được khắc sâu trong tim của model giống như là phản xạ tự nhiên như đi đứng vậy, còn user message là những thứ mới được học mà thôi, và nó có thể lờ đi và quên dễ dàng. Và bạn nên chú ý vào câu "this context may or may not be relevant to your tasks", đây chính là tín hiệu giảm quyền ưu tiên một cách tường minh.

Nhưng mà nó lại có một chỉ thị ở đầu là "Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written." Tức nghĩa là nếu ngôn từ trong prompt của bạn đủ mạnh thì CLAUDE.md sẽ được tuân thủ, còn cứ mơ hồ thì nó sẽ dễ bị bỏ qua.

Vì vậy chúng ta đừng viết mấy cái câu kiểu như là "Viết code ngắn gọn" trong CLAUDE.md, mà hãy viết chi tiết lên, ví dụ như "Viết câu trả lời không quá 15 từ" chẳng hạn, hoặc những chỉ thị mà model có thể kiểm chứng được. Chứ nói "Viết code ngắn gọn" model có hiểu "ngắn gọn" là cái éo gì đâu =))). Đến tôi còn không hiểu nữa là một con LLM vô tri.

## Thứ hai: nó duyệt từ thư mục hiện tại lên thư mục root

Nó duyệt từ thư mục Claude Code được mở hiện tại lên thư mục root của hệ thống (tức là `~/.claude`) ấy.

Mỗi cấp thư mục:

```text
├── CLAUDE.md              → Loại Project (có thể version control)
├── .claude/CLAUDE.md      → Loại Project (có thể version control)
├── .claude/rules/*.md     → Loại Project (quét đệ quy)
└── CLAUDE.local.md        → Loại Local (không nên commit)
```

Cộng với hai vị trí global:

```text
~/.claude/CLAUDE.md              → Loại User (chỉ thị cá nhân toàn cục)
~/.claude/rules/*.md             → Loại User
/etc/claude-code/CLAUDE.md       → Loại Managed (chính sách quản trị doanh nghiệp)
```

Source code bị leak đã ghi rõ: "Files are loaded in reverse order of priority, i.e. the latest files are highest priority." "File tải sau có ưu tiên cao hơn", có nghĩa là CLAUDE.md được tải ở thư mục được mở là ưu tiên cao nhất rồi.

Thứ tự tải đầy đủ (từ thấp đến cao):

```text
1. /etc/claude-code/CLAUDE.md             (Managed)
2. /etc/claude-code/.claude/rules/*.md    (Managed)
3. ~/.claude/CLAUDE.md                    (User - cá nhân toàn cục)
4. ~/.claude/rules/*.md                   (User)
5. /repo-root/CLAUDE.md                   (Project)
6. /repo-root/.claude/CLAUDE.md           (Project)
7. /repo-root/.claude/rules/*.md          (Project)
8. /repo-root/src/CLAUDE.md               (Project - gần hơn)
9. /repo-root/src/.claude/rules/*.md      (Project)
10. /repo-root/src/feature/CLAUDE.md      (Project - thư mục hiện tại)
11. /repo-root/src/feature/CLAUDE.local.md (Local - ưu tiên cao nhất)
```

## Thứ ba: CLAUDE.md có thể tham chiếu các file ngoài

Chức năng này Codex không có đâu haha. Tôi đã mò nát cái Codex rồi. Chức năng này sẽ giúp CLAUDE.md hỗ trợ cú pháp `@` để tham chiếu các file khác vào, ví dụ:

```text
# Quy tắc dự án

@./coding-standards.md
@~/global-rules.md
@/etc/team-rules/backend.md
```

Giới hạn bảo mật:

- Chỉ nhúng được file văn bản (whitelist khoảng 80 đuôi file: `.md`, `.txt`, `.json`, `.ts`, `.py`...). File nhị phân bị bỏ qua âm thầm.
- Phát hiện vòng lặp tham chiếu, độ sâu đệ quy tối đa là `MAX_INCLUDE_DEPTH`.
- Chỉ thị `@` chỉ hoạt động trong text node của Markdown, không hoạt động trong code block.
- File nằm ngoài thư mục làm việc cần được phê duyệt qua cấu hình `claudeMdExternalIncludesApproved`.
- File không tồn tại thì bị bỏ qua âm thầm, không báo lỗi.

Cách tổ chức module hoá CLAUDE.md:

```text
@.claude/rules/code-style.md
@.claude/rules/git-conventions.md
@.claude/rules/testing.md
```

Đến đây là tôi mỏi lưng vãi rồi đây. Chill và xem phim đây. Bài viết tiếp theo sẽ nói về MEMORY.md nhé. Nó liên quan rất là mật thiết đối với system prompt và có một chút "xung đột" với CLAUDE.md nên mong các bạn đón xem.

*Ngày 30/5/2026*\
*Quang*
