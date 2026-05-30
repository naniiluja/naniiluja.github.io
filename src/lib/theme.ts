// Helper thuần cho theme sáng/tối. Không phụ thuộc DOM/Astro để unit-test bằng Vitest.
// Quy ước: 2 chế độ 'dark' | 'light'; mặc định là 'dark' (khách mới luôn tối, bất kể OS).

export type Theme = 'dark' | 'light';

/**
 * Map giá trị lưu trong localStorage sang theme hiệu lực.
 * Chỉ 'light' mới ra sáng; mọi giá trị khác (null/rỗng/lạ) → mặc định 'dark'.
 */
export function resolveTheme(stored: string | null): Theme {
  return stored === 'light' ? 'light' : 'dark';
}

/**
 * Đảo chế độ — cũng chính là NHÃN nút toggle (nhãn = chế độ sẽ chuyển sang).
 * Một nguồn sự thật cho cả hành vi toggle lẫn nhãn hiển thị.
 */
export function nextTheme(current: Theme): Theme {
  return current === 'dark' ? 'light' : 'dark';
}
