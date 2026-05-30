import { describe, expect, it } from 'vitest';
import { extractUniqueTags, filterPostsByTag, type TaggedPost } from './tags';

function post(id: string, tags: string[]): TaggedPost {
  return { id, data: { tags } };
}

describe('extractUniqueTags', () => {
  it('trả tập tag duy nhất, sắp xếp alphabet (route ổn định)', () => {
    const input = [post('a', ['astro', 'blog']), post('b', ['blog', 'tailwind']), post('c', [])];
    expect(extractUniqueTags(input)).toEqual(['astro', 'blog', 'tailwind']);
  });

  it('trả mảng rỗng khi không bài nào có tag', () => {
    expect(extractUniqueTags([post('a', [])])).toEqual([]);
  });
});

describe('filterPostsByTag', () => {
  it('chỉ trả bài chứa tag chỉ định', () => {
    const input = [post('a', ['astro', 'blog']), post('b', ['tailwind']), post('c', ['astro'])];
    const ids = filterPostsByTag(input, 'astro').map((p) => p.id);
    expect(ids).toEqual(['a', 'c']);
  });

  it('trả rỗng khi không bài nào khớp', () => {
    expect(filterPostsByTag([post('a', ['astro'])], 'khong-ton-tai')).toEqual([]);
  });
});
