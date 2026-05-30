// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Root site GitHub Pages (username.github.io) → KHÔNG cần `base`. Cần cho RSS + sitemap.
  site: 'https://naniiluja.github.io',
  // mdx wired để bài .mdx (glob nhận {md,mdx}) render được; sitemap cần `site`.
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
