import { describe, expect, it } from 'vitest';
import { formatDate } from './format-date';

// Locale chốt cứng 'vi-VN' để output ổn định, không phụ thuộc locale máy/CI.
describe('formatDate', () => {
  it('định dạng ngày theo locale vi-VN (day numeric, month long, year numeric)', () => {
    expect(formatDate(new Date('2026-01-15'))).toBe('15 tháng 1, 2026');
  });

  it('định dạng tháng 12 đúng', () => {
    expect(formatDate(new Date('2025-12-31'))).toBe('31 tháng 12, 2025');
  });
});
