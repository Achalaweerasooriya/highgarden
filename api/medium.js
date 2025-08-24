import Parser from "rss-parser";

const parser = new Parser();

export default async function handler(req, res) {
  try {
    // Change username if needed
    const feedUrl = "https://medium.com/feed/@highgardenhideaway";

    // Parse Medium RSS feed
    const feed = await parser.parseURL(feedUrl);

    // Map posts into a clean JSON
    const posts = feed.items.slice(0, 6).map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      author: item.creator || item.author || "Unknown",
      thumbnail: item.thumbnail || null, // sometimes Medium has images in content:encoded instead
    }));

    // Cache results for 1 hour on Vercel Edge
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json({ items: posts });
  } catch (error) {
    console.error("Medium fetch error:", error);
    res.status(500).json({ error: "Failed to fetch Medium feed" });
  }
}
