/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// Cấu hình Vitest qua getViteConfig của Astro (chuẩn testing.md).
// Helper trong src/lib/ là thuần (nhận data qua tham số) → không cần astro:content.
export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
