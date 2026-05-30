import { describe, expect, it } from 'vitest';
import { sortPostsByDate, type PostLike } from './sort-posts';

function post(id: string, date: string): PostLike {
  return { id, data: { date: new Date(date) } };
}

describe('sortPostsByDate', () => {
  it('sắp xếp mới → cũ theo data.date', () => {
    const input = [post('a', '2025-01-01'), post('c', '2026-05-01'), post('b', '2025-12-31')];
    const ids = sortPostsByDate(input).map((p) => p.id);
    expect(ids).toEqual(['c', 'b', 'a']);
  });

  it('không mutate mảng gốc', () => {
    const input = [post('a', '2025-01-01'), post('b', '2026-01-01')];
    const before = input.map((p) => p.id);
    sortPostsByDate(input);
    expect(input.map((p) => p.id)).toEqual(before);
  });

  it('tie-break ổn định khi ngày bằng nhau (giữ thứ tự ban đầu)', () => {
    const input = [post('x', '2026-01-01'), post('y', '2026-01-01')];
    expect(sortPostsByDate(input).map((p) => p.id)).toEqual(['x', 'y']);
  });
});
