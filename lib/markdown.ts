import MarkdownIt from "markdown-it";

function normalizeMarcusInternalLinks(html: string): string {
  return html.replace(
    /href="https:\/\/www\.marcusmth\.com(\/[^"#?]*?)\/(?=(?:[?#][^"]*)?")/g,
    'href="https://www.marcusmth.com$1'
  );
}

const md = new MarkdownIt({ html: true });

// Defer below-the-fold in-content images. The first image in the document is
// left eager: it may sit above the fold and lazy-loading it could hurt LCP.
// (Featured images are rendered separately via next/image in PostContent, so
// this only affects images inside the post body, including raw-HTML <img> tags
// which markdown-it exposes as html_inline/html_block tokens.)
// Note: this follows the standard best practice; it is not a measured LCP
// improvement — confirm with field data (e.g. Vercel Speed Insights) before
// claiming a Core Web Vitals win.
md.core.ruler.push("lazy_images", (state) => {
  let seenFirstImage = false;

  const markFirstImageEager = () => {
    seenFirstImage = true;
  };

  // Applies loading/decoding to one markdown image token.
  const handleMarkdownImage = (child: {
    attrGet: (name: string) => string | null;
    attrSet: (name: string, value: string) => void;
  }) => {
    if (!seenFirstImage) {
      markFirstImageEager();
      child.attrSet("loading", "eager");
    } else if (!child.attrGet("loading")) {
      child.attrSet("loading", "lazy");
    }
    child.attrSet("decoding", "async");
  };

  // Applies loading/decoding to raw-HTML <img> tags inside a token's content.
  const handleRawHtmlImages = (token: { content: string }) => {
    token.content = token.content.replace(
      /<img(?=[\s/>])[^>]*>/gi,
      (tag) => {
        if (/\bloading\s*=/.test(tag)) return tag;
        if (!seenFirstImage) {
          markFirstImageEager();
          return tag.replace(/<img/i, '<img loading="eager"');
        }
        return tag.replace(/<img/i, '<img loading="lazy" decoding="async"');
      }
    );
  };

  state.tokens.forEach((token) => {
    if (token.type === "inline" && token.children) {
      token.children.forEach((child) => {
        if (child.type === "image") {
          handleMarkdownImage(child);
        } else if (child.type === "html_inline") {
          handleRawHtmlImages(child);
        }
      });
    } else if (token.type === "html_block") {
      handleRawHtmlImages(token);
    }
  });
  return false;
});

export function markdownToHtml(markdown: string): string {
  return normalizeMarcusInternalLinks(md.render(markdown));
}
