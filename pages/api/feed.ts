import RSS from "rss";

import { loadFullPosts } from "../../lib/load-posts";

async function generateRSSFeed() {
  const feed = new RSS({
    title: "Marcus Smith's Blog",
    generator: "RSS for Node and Next.js",
    feed_url: "https://www.marcusmth.com/api/feed",
    site_url: "https://www.marcusmth.com/",
    managingEditor: "mhs2121@gmail.com (Marcus Smith)",
    webMaster: "mhs2121@gmail.com (Marcus Smith)",
    copyright: `Copyright ${new Date().getFullYear().toString()}, Marcus Smith`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
    custom_namespaces: {
      media: "http://search.yahoo.com/mrss/",
      content: "http://purl.org/rss/1.0/modules/content/",
    },
  });

  const posts = await loadFullPosts();

  posts.map((post) => {
    const customElements: any[] = [
      {
        "content:encoded": {
          _cdata: post.content,
        },
      },
    ];

    // Add cover image if available
    if (post.frontmatter.featuredImage?.src) {
      const imageUrl = `https://www.marcusmth.com/images/${post.frontmatter.featuredImage.src}`;

      // Add media:content for better compatibility
      customElements.push({
        "media:content": {
          _attr: {
            url: imageUrl,
            type: "image/jpeg",
            medium: "image",
          },
        },
      });

      // Add media:thumbnail for additional compatibility
      customElements.push({
        "media:thumbnail": {
          _attr: {
            url: imageUrl,
          },
        },
      });
    }

    const itemData: any = {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `https://www.marcusmth.com/${post.slug}`,
      categories: post.frontmatter.tags || [],
      author: "Marcus Smith",
      date: post.frontmatter.lastUpdated,
      custom_elements: customElements,
    };

    feed.item(itemData);
  });

  return feed;
}

export default async function feed(req, res) {
  const feed = await generateRSSFeed();
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.end(feed.xml({ indent: true }));

  return undefined;
}
