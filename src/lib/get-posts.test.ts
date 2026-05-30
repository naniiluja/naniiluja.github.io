import { describe, expect, it } from 'vitest';
import { getPublishedPostsSorted, type PublishablePost } from './get-posts';

function post(id: string, date: string, draft = false): PublishablePost {
  return { id, data: { date: new Date(date), draft } };
}

describe('getPublishedPostsSorted', () => {
  it('loại bài draft và sắp xếp mới → cũ', () => {
    const input = [
      post('old', '2025-01-01'),
      post('hidden', '2026-12-01', true),
      post('new', '2026-05-01'),
    ];
    const ids = getPublishedPostsSorted(input).map((p) => p.id);
    expect(ids).toEqual(['new', 'old']);
  });

  it('trả mảng rỗng khi tất cả là draft', () => {
    const input = [post('a', '2026-01-01', true)];
    expect(getPublishedPostsSorted(input)).toEqual([]);
  });
});
