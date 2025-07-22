import md from "markdown-it";

export function markdownToHtml(markdown: string): string {
  return md().render(markdown);
}
