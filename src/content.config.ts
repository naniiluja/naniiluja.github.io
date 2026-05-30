// Astro 5 Content Layer: file ở src/content.config.ts (KHÔNG src/content/config.ts).
// glob từ 'astro/loaders', z từ 'astro/zod' (KHÔNG package 'zod' trực tiếp — tương thích schema nội bộ Astro).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // Pattern [^_]*: file mở đầu '_' bị loại (draft theo convention filename) → không bao giờ load.
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Ảnh share (OG image) cho bài, đường dẫn tuyệt đối từ /public (vd '/claude-md.png'). Optional:
    // bài không khai báo thì BaseLayout dùng ảnh OG mặc định chung của site.
    // regex bắt buộc bắt đầu bằng '/' → chặn chuỗi rác làm vỡ new URL(...) lúc build (fail sớm, rõ field).
    image: z
      .string()
      .regex(/^\/\S+$/, "image phải là path tuyệt đối bắt đầu bằng '/' (vd /cover.png)")
      .optional(),
  }),
});

export const collections = { blog };
