import { describe, expect, it } from 'vitest';
import { postSlug } from './post-slug';

// Astro 5 glob loader: post.id có thể kèm đuôi .md/.mdx → strip để URL sạch.
describe('postSlug', () => {
  it('strip đuôi .md', () => {
    expect(postSlug('hello-world.md')).toBe('hello-world');
  });

  it('strip đuôi .mdx (kèm thư mục con)', () => {
    expect(postSlug('a/b.mdx')).toBe('a/b');
  });

  it('giữ nguyên id đã sạch (không có đuôi)', () => {
    expect(postSlug('already-clean')).toBe('already-clean');
  });

  it('chỉ strip đuôi cuối, không đụng dấu chấm trong tên', () => {
    expect(postSlug('v1.2.3-notes.md')).toBe('v1.2.3-notes');
  });
});
