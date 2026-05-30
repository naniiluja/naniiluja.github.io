// Astro 5 glob loader có thể trả post.id kèm đuôi file (vd 'hello-world.md').
// Strip đuôi .md/.mdx để URL/route sạch: /posts/hello-world/ thay vì /posts/hello-world.md/.
export function postSlug(id: string): string {
  return id.replace(/\.(md|mdx)$/, '');
}
