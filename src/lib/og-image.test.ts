import { describe, it, expect } from 'vitest';
import { resolveOgImage, DEFAULT_OG_IMAGE } from './og-image';

// resolveOgImage: chọn ảnh OG cho trang/bài — dùng image truyền vào, fallback DEFAULT khi thiếu.
// Helper thuần (nhận tham số) để unit-test, KHÔNG đụng Astro runtime. Việc absolutize
// (new URL(..., Astro.site)) vẫn để ở layout vì cần Astro.site.
describe('resolveOgImage', () => {
  it('dùng image khi có khai báo', () => {
    expect(resolveOgImage('/cover-2.png')).toBe('/cover-2.png');
  });
  it('fallback DEFAULT khi undefined', () => {
    expect(resolveOgImage(undefined)).toBe(DEFAULT_OG_IMAGE);
  });
  it('fallback DEFAULT khi chuỗi rỗng (coi như không khai báo)', () => {
    expect(resolveOgImage('')).toBe(DEFAULT_OG_IMAGE);
  });
  it('fallback DEFAULT khi chỉ toàn khoảng trắng', () => {
    expect(resolveOgImage('   ')).toBe(DEFAULT_OG_IMAGE);
  });
});
