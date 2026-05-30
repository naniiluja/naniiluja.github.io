import { describe, it, expect } from 'vitest';
import { resolveTheme, nextTheme } from './theme';

describe('resolveTheme', () => {
  // EP/BVA: chỉ 'light' mới ra light; mọi giá trị khác (null, rỗng, lạ, 'dark') → mặc định 'dark'.
  it("trả 'dark' khi không có giá trị lưu (null)", () => {
    expect(resolveTheme(null)).toBe('dark');
  });

  it("trả 'light' khi lưu đúng 'light'", () => {
    expect(resolveTheme('light')).toBe('light');
  });

  it("trả 'dark' khi lưu 'dark'", () => {
    expect(resolveTheme('dark')).toBe('dark');
  });

  it("trả 'dark' với giá trị lạ", () => {
    expect(resolveTheme('xyz')).toBe('dark');
  });

  it("trả 'dark' với chuỗi rỗng (BVA)", () => {
    expect(resolveTheme('')).toBe('dark');
  });
});

describe('nextTheme (cũng là nhãn nút = chế độ sẽ chuyển sang)', () => {
  it("'dark' → 'light'", () => {
    expect(nextTheme('dark')).toBe('light');
  });

  it("'light' → 'dark'", () => {
    expect(nextTheme('light')).toBe('dark');
  });
});
