// Helper thuần cho tags — nhận posts qua tham số (KHÔNG import astro:content).
export interface TaggedPost {
  id: string;
  data: { tags: string[] };
}

// Trích tập tag duy nhất từ mọi bài, sắp xếp alphabet để route /tags/[tag] sinh ổn định.
export function extractUniqueTags(posts: readonly TaggedPost[]): string[] {
  const set = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) set.add(tag);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

// Lọc bài chứa tag chỉ định (giữ thứ tự đầu vào).
export function filterPostsByTag<T extends TaggedPost>(posts: readonly T[], tag: string): T[] {
  return posts.filter((post) => post.data.tags.includes(tag));
}
