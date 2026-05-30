// Ảnh OG mặc định chung cho site khi trang/bài không khai báo image riêng (path từ /public).
export const DEFAULT_OG_IMAGE = '/claude-md.png';

// Chọn ảnh OG: dùng image khai báo, fallback DEFAULT khi thiếu/rỗng/toàn khoảng trắng.
// Helper thuần — unit-test được, KHÔNG đụng Astro runtime. Layout tự absolutize bằng
// new URL(resolveOgImage(image), Astro.site).
export function resolveOgImage(image?: string): string {
  const trimmed = image?.trim();
  return trimmed ? trimmed : DEFAULT_OG_IMAGE;
}
