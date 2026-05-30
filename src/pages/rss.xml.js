// RSS feed endpoint. Cần `site` trong astro.config (đã set) để link tuyệt đối.
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { buildRssItems } from '../lib/rss-items';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'naniiluja',
    description: 'Blog cá nhân của naniiluja',
    site: context.site,
    items: buildRssItems(posts),
    customData: `<language>vi-VN</language>`,
  });
}
