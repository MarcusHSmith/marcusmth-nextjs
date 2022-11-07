import { HeaderBio } from "../HeaderBio/HeaderBio";
import md from 'markdown-it';

export default function PostPage({ frontmatter, content }) {
    return (
      <div className='prose mx-auto'>
        <HeaderBio presenation='min'/>
        <div className='flex flex-col'>
          <span>{frontmatter.title}</span>
          <span>{new Date(frontmatter.lastUpdated).toDateString()}</span>
          {frontmatter.tags.map((t) => {
            return (
              <div key={t} className='bg-blue-500 w-min rounded-lg'>
                <span className='text-white p-2'>{t}</span>
              </div>
            )
          })}
        </div>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </div>
    );
  }