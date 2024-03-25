import RSS from "rss";
import fs from "fs";
import matter from "gray-matter";

import { loadFullPosts, loadPosts } from "../../lib/load-posts";

async function generateRSSFeed() {
  const feed = new RSS({
    title: "Marcus Smith's Blog",
    generator: "RSS for Node and Next.js",
    feed_url: "https://www.marcusmth.com/feed.xml",
    site_url: "https://www.marcusmth.com/",
    managingEditor: "mhs2121@gmail.com (Marcus Smith)",
    webMaster: "mhs2121@gmail.com (Marcus Smith)",
    copyright: `Copyright ${new Date().getFullYear().toString()}, Marcus Smith`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const posts = await loadFullPosts();

  posts.map((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `https://www.marcusmth.codes/${post.slug}`,
      categories: post.tags || [],
      author: "Marcus Smith",
      date: post.date,
    });
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
