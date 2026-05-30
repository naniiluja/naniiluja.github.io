// Kiểu tối giản cho các helper thuần — chỉ phụ thuộc field cần dùng, KHÔNG import astro:content
// để unit-test được bằng mock data (architecture.md).
export interface PostLike {
  id: string;
  data: { date: Date };
}

// Sắp xếp bài mới → cũ theo data.date. Không mutate mảng gốc; tie-break ổn định
// (Array.prototype.sort trong V8 là stable → ngày bằng nhau giữ thứ tự ban đầu).
export function sortPostsByDate<T extends PostLike>(posts: readonly T[]): T[] {
  return [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
