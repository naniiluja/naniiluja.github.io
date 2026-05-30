// Định dạng ngày hiển thị, khóa cứng locale 'vi-VN' để output ổn định trên mọi máy/CI.
const DATE_LOCALE = 'vi-VN';
const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(DATE_LOCALE, DATE_OPTIONS).format(date);
}
