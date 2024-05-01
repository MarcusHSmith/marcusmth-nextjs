import { HeaderBio } from "../HeaderBio/HeaderBio";
import markdownit from "markdown-it";
import { TagList } from "../TagList/TagList";
import hljs from 'highlight.js' // https://highlightjs.org


export default function PostPage({ frontmatter, content }) {

  const md = markdownit({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre><code class="hljs">' +
                 hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                 '</code></pre>';
        } catch (__) {}
      }
  
      return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });

  return (
    <div className="prose mx-auto">
      <HeaderBio presentation="min" />
      <div className="flex flex-col gap-1">
        <span className="font-bold text-lg">{frontmatter.title}</span>
        <span className="font-light text-xs">
          {new Date(frontmatter.lastUpdated).toDateString()}
        </span>
        <TagList tags={frontmatter.tags} />
        <hr />
      </div>
      <div
        className="pt-4"
        dangerouslySetInnerHTML={{ __html: md().render(content) }}
      />
    </div>
  );
}
