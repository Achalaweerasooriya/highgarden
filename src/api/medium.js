export default async function handler(req, res) {
  try {
    const feedUrl = process.env.VITE_MEDIUM_FEED_URL || "https://medium.com/feed/@highgardenhideaway";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate"); // cache 1hr on Vercel Edge
    res.status(200).json(data);
  } catch (error) {
    console.error("Medium fetch error:", error);
    res.status(500).json({ error: "Failed to fetch Medium feed" });
  }
}
