import MarkdownIt from "markdown-it";

function normalizeMarcusInternalLinks(html: string): string {
  return html.replace(
    /href="https:\/\/www\.marcusmth\.com(\/[^"#?]*?)\/(?=(?:[?#][^"]*)?")/g,
    'href="https://www.marcusmth.com$1'
  );
}

const md = new MarkdownIt({ html: true });

// Lazy-load in-content images for faster page loads (featured images
// already use next/image in PostContent).
md.core.ruler.push("lazy_images", (state) => {
  state.tokens.forEach((token) => {
    if (token.type === "inline" && token.children) {
      token.children.forEach((child) => {
        if (child.type === "image") {
          child.attrSet("loading", "lazy");
          child.attrSet("decoding", "async");
        }
      });
    }
  });
  return false;
});

export function markdownToHtml(markdown: string): string {
  return normalizeMarcusInternalLinks(md.render(markdown));
}
