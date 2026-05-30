import { describe, expect, it } from 'vitest';
import { buildRssItems, type RssSourcePost } from './rss-items';

function post(id: string, date: string, draft = false): RssSourcePost {
  return {
    id,
    data: { title: `Tiêu đề ${id}`, description: `Mô tả ${id}`, date: new Date(date), draft },
  };
}

describe('buildRssItems', () => {
  it('loại draft, link đúng dạng /posts/<slug>/, pubDate = data.date', () => {
    const items = buildRssItems([
      post('hello-world.md', '2026-01-15'),
      post('an.mdx', '2026-02-01', true),
    ]);
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({
      title: 'Tiêu đề hello-world.md',
      description: 'Mô tả hello-world.md',
      pubDate: new Date('2026-01-15'),
      link: '/posts/hello-world/',
    });
  });

  it('strip đuôi .mdx trong link', () => {
    const items = buildRssItems([post('ghi-chu.mdx', '2026-03-01')]);
    expect(items[0].link).toBe('/posts/ghi-chu/');
  });

  it('sắp xếp item mới → cũ (nhất quán với trang chủ)', () => {
    const items = buildRssItems([
      post('cu', '2025-01-01'),
      post('moi', '2026-05-01'),
      post('giua', '2025-12-01'),
    ]);
    expect(items.map((i) => i.title)).toEqual(['Tiêu đề moi', 'Tiêu đề giua', 'Tiêu đề cu']);
  });
});
