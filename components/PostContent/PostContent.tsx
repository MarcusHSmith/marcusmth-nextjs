import { HeaderBio } from "../HeaderBio/HeaderBio";
import md from "markdown-it";
import { TagList } from "../TagList/TagList";

export default function PostPage({ frontmatter, content }) {
  return (
    <div className="max-w-4xl mx-auto">
      <HeaderBio presentation="min" />
      {frontmatter.featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={`/images/${frontmatter.featuredImage.src}`}
            alt={frontmatter.title}
            className="w-full h-64 object-cover"
          />
        </div>
      )}
      
      <div className="prose">
        <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <span className="mr-4">
            {new Date(frontmatter.lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <TagList tags={frontmatter.tags} />
        </div>
        <hr className="mb-8" />
        <div
          dangerouslySetInnerHTML={{ __html: md().render(content) }}
        />
      </div>
    </div>
  );
}
