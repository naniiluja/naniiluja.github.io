---
title: MEMORY.md hoạt động như thế nào trong Claude Code
date: 2026-05-31T20:00:00+07:00
description: Memory được load thẳng vào system prompt nên được tuân theo mạnh hơn CLAUDE.md. Bài này phân tích cơ chế Memory của Claude Code - lưu ở đâu, giới hạn, bốn loại, cái gì nên và không nên lưu.
tags:
  - claude-code
  - ai
draft: false
image: /claude-md.png
---

Vừa mới đi chơi về tức thì thì quất bài này luôn. Như đã hứa, mình sẽ lên một bài về MEMORY.md.

Để hiểu rõ hơn thì bạn sẽ cần đọc bài trước: [Tản mạn về CLAUDE.md](/posts/co-che-claude-md/).

## Memory và CLAUDE.md là hai cơ chế hoàn toàn khác nhau

Khác ở chỗ nào? Memory được load thẳng vào bên trong system prompt (vị trí số 11 trong 22 module). Là system prompt nên nó không bị hạ quyền.

Còn CLAUDE.md chỉ là một user message, và bị gắn tín hiệu hạ quyền.

Tức là cùng một lệnh, đặt trong memory sẽ được tuân theo hơn đặt trong CLAUDE.md.

## Trước tiên: Memory lưu ở đâu trên máy

```
~/.claude/projects/{hash-đường-dẫn-project}/memory/
├── MEMORY.md
├── user_profile.md
├── feedback_no_summary.md
└── ...
```

Mỗi project có một hash riêng từ đường dẫn thư mục, nên memory của các project không bị lẫn vào nhau. Và đây chỉ là file markdown bình thường, bạn mở bằng editor bất kỳ, sửa thoải mái.

## Thứ nhất: MEMORY.md chỉ nên làm mục lục

Memory có giới hạn cứng:

- Tối đa **200 dòng**
- Tối đa **25KB**
- Vượt quá thì bị cắt, phần còn lại mất hẳn trong lần load đó

Vì vậy MEMORY.md chỉ nên là mục lục, mỗi dòng trỏ đến file chủ đề riêng:

```md
- [Hồ sơ người dùng](user_profile.md) — Dev C# senior, thích code rõ ràng, không comment trong code
- [Không tóm tắt](feedback_no_summary.md) — Không tổng kết lại cuối câu trả lời
- [Freeze release](project_release_freeze.md) — Không merge PR không quan trọng trước 3/4
```

Các file chủ đề khai báo chi tiết bên trong thì không có giới hạn dòng.

## Thứ hai: Bốn loại Memory

**`feedback`** là loại mạnh nhất. Ghi lại điều đúng/sai và lý do:

```md
---
type: feedback
---

Chỉ sửa đúng phần được yêu cầu.

**Why:** Trước đây sửa thêm gây lỗi mới.
**How to apply:** Mọi thao tác chỉnh sửa code.
```

Phần `Why` quan trọng hơn bạn nghĩ. Không có `Why` thì model chỉ chấp hành cứng nhắc, gặp edge case là bí. Có `Why` thì model hiểu được ý đồ, tự xử lý được những trường hợp không rõ ràng.

Một điểm nữa: phải ghi cả thành công lẫn thất bại. Nhiều người chỉ ghi lại lỗi sai, kết quả là model ngày càng dè dặt và thụ động quá mức vì nó chỉ biết mình hay sai chứ không biết mình đã đúng ở đâu.

**`user`** là hồ sơ người dùng, model sẽ điều chỉnh cách giao tiếp theo.

**`project`** là context của dự án không suy ra được từ code. Lưu ý: dùng ngày tuyệt đối (`2026-04-03`), không dùng "thứ Năm" hay "tuần sau".

**`reference`** là con trỏ đến hệ thống ngoài (Linear, Jira...).

## Thứ ba: Không nên lưu gì

- Pattern code, kiến trúc, đường dẫn file
- Git history
- Bước fix bug đã có trong code
- Nội dung đã có trong CLAUDE.md
- Tiến độ task tạm thời

Lý do chung của mấy thứ này: đều suy ra được từ nơi khác. `git log`, `git blame`, đọc code là ra hết. Memory chỉ nên lưu thứ không tồn tại ở bất kỳ đâu ngoài đầu bạn.

Memory có giá trị nhất khi lưu những thứ không thể suy ra được từ nơi khác.

Ví dụ nên lưu: _"PR #142 tưởng đơn giản nhưng lại break production vì một edge case trong timezone"_ vì:

- `git log` không kể cho bạn nghe
- Lần sau model biết để cẩn thận hơn với vấn đề timezone
- Đây là kiến thức rút ra từ kinh nghiệm thực tế

Giống như hồi xưa học ngữ văn vậy, không cần ghi lại mọi thứ mà chỉ highlight những câu quan trọng, những câu cô giáo nói phải đánh dấu ý =))

## Thứ tư: Memory tự động "cũ"

Hệ thống tự tính xem file memory bao nhiêu ngày tuổi. Từ 2 ngày trở lên, model nhận thêm cảnh báo:

> _"This memory is N days old. Memories are point-in-time observations, not live state — verify against current code before asserting as fact."_

Cơ chế này giúp model không tin mù vào memory cũ. Nó vẫn dùng, nhưng sẽ đi verify lại trước. Cụ thể là: nếu memory đề cập đường dẫn file thì model sẽ check xem file đó còn tồn tại không, đề cập tên function thì grep trước. "Memory nói X tồn tại" không có nghĩa là X vẫn còn đó.

Vì vậy đừng lưu thông tin gắn với dòng code cụ thể kiểu _"hàm X ở dòng 42"_. File thay đổi là thông tin đó lỗi thời ngay. Thay vào đó viết kiểu _"project dùng middleware pattern để xử lý auth, entry point ở main.go"_, mô tả ý đồ thay vì vị trí cụ thể.

## Thứ năm: Auto Memory

Background agent tự quét cuộc trò chuyện và trích xuất thông tin đáng lưu, kể cả khi bạn không chủ động yêu cầu. Nó chỉ chạy khi lượt đó bạn chưa tự lưu memory thủ công, và feature `extractMemories` đang bật.

Vì vậy trong thư mục memory của bạn có thể có những file bạn không nhớ là mình đã tạo, đó là do background agent tự trích xuất từ các cuộc trò chuyện trước.

## Thứ sáu: Reset sau `/compact` hoặc `/clear`

Memory được load lại từ đầu sau hai lệnh này. Vì vậy nếu bạn vừa sửa file memory bằng editor, chạy `/compact` là có hiệu lực ngay, không cần khởi động lại.

## Cuối cùng: Phối hợp Memory và CLAUDE.md

Đừng lặp lại nội dung. Dùng `feedback` trong memory để tăng cường quy tắc trong CLAUDE.md hay bị bỏ qua. Hai lớp chồng nhau thì hiệu quả hơn viết hai lần cùng một câu.

---

Hôm nay cũng làm quả pizza khá no, bụng căng nên buồn ngủ rồi -.-

Thôi thì tạm biệt các bạn (cho dù éo ai xem cả). Tất nhiên mình phân tích những thứ này là để tạo ra một workflow có thể ứng dụng chúng một cách tốt nhất, cho nên bạn hãy checkout nó nhé.

Nó chính là: [github.com/naniiluja/ccf](https://github.com/naniiluja/ccf). Mới có 7 sao thôi nên mong các bạn ủng hộ. Mình sẽ lên bài chi tiết về các chức năng và ứng dụng của nó sau. Xịn lắm, kiểu như là một người không hề biết code nhưng workflow này sẽ khiến bạn viết code chất lượng như một dev thực thụ vậy kaka. Tức là ngang cả mình luôn ^^^

_31/5/2026, Quang_
