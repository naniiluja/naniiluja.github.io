import { sortPostsByDate, type PostLike } from './sort-posts';

// Mở rộng PostLike với cờ draft (cho lọc bài chưa publish).
export interface PublishablePost extends PostLike {
  data: PostLike['data'] & { draft: boolean };
}

// Lấy bài đã publish (loại draft), sắp xếp mới → cũ. Tái dùng sortPostsByDate (DRY).
// Nhận posts qua tham số để unit-test thuần (KHÔNG gọi getCollection bên trong).
export function getPublishedPostsSorted<T extends PublishablePost>(posts: readonly T[]): T[] {
  return sortPostsByDate(posts.filter((post) => !post.data.draft));
}
