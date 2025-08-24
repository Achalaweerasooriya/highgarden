export async function config() { return { runtime: "edge" }; }

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get("placeId");
  const limit = Math.min(parseInt(searchParams.get("limit") || "6", 10), 10);
  const key = process.env.GOOGLE_MAPS_API_KEY;

  if (!key) {
    return new Response(JSON.stringify({ error: "Missing GOOGLE_MAPS_API_KEY" }), { status: 500, headers: { "content-type": "application/json" } });
  }
  if (!placeId) {
    return new Response(JSON.stringify({ error: "Missing placeId" }), { status: 400, headers: { "content-type": "application/json" } });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=rating,user_ratings_total,reviews&key=${key}`;
    const resp = await fetch(url);
    const data = await resp.json();
    const reviews = (data?.result?.reviews || []).slice(0, limit);

    return new Response(JSON.stringify({ reviews }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "s-maxage=1800, stale-while-revalidate=86400",
        "access-control-allow-origin": "*",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Upstream error", details: String(e) }), { status: 500, headers: { "content-type": "application/json" } });
  }
}