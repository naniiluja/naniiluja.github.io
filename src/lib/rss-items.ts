import { getPublishedPostsSorted } from './get-posts';
import { postSlug } from './post-slug';

// Bài nguồn cho RSS — nhận qua tham số để unit-test thuần.
// Có đủ field draft + date để tái dùng getPublishedPostsSorted (lọc draft + sort mới→cũ).
export interface RssSourcePost {
  id: string;
  data: { title: string; description: string; date: Date; draft: boolean };
}

// Item RSS theo shape @astrojs/rss mong đợi.
export interface RssItem {
  title: string;
  description: string;
  pubDate: Date;
  link: string;
}

// Dựng danh sách item RSS: loại draft + sort mới→cũ (tái dùng getPublishedPostsSorted — DRY,
// nhất quán thứ tự với trang chủ), link = /posts/<slug>/ (postSlug strip đuôi file).
export function buildRssItems(posts: readonly RssSourcePost[]): RssItem[] {
  return getPublishedPostsSorted(posts).map((post) => ({
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.date,
    link: `/posts/${postSlug(post.id)}/`,
  }));
}
