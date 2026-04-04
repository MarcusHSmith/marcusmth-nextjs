import md from "markdown-it";

function normalizeMarcusInternalLinks(html: string): string {
  return html.replace(
    /href="https:\/\/www\.marcusmth\.com(\/[^"#?]*?)\/(?=["#?]?")/g,
    'href="https://www.marcusmth.com$1'
  );
}

export function markdownToHtml(markdown: string): string {
  return normalizeMarcusInternalLinks(md().render(markdown));
}
