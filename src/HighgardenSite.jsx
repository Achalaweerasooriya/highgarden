// Highgarden Hideaway – Single-File Website (React + Tailwind + Vercel env + Serverless Reviews)
// Notes:
// • Edit ONLY the CONTENT object or your .env.* variables. Everything else auto-wires.
// • Env vars (Vite): VITE_MEDIUM_FEED_URL, VITE_PERADENIYA_PLACE_ID, VITE_GAMPOLA_PLACE_ID,
//   VITE_WHATSAPP_PHONE, VITE_WHATSAPP_TEXT, VITE_OG_IMAGE, VITE_FAVICON_URL.
// • Add the included serverless function under /api/reviews.js and set GOOGLE_MAPS_API_KEY in Vercel (server env).
// • Replace Cloudinary/YouTube links below when ready.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  ExternalLink,
  ArrowRight,
  Youtube,
  Image as ImageIcon,
  Calendar,
  Globe2,
  Hotel,
  BookOpen,
  Instagram,
  Facebook,
  Loader2,
} from "lucide-react";

// =============== ENV HELPERS ===============
const E = import.meta.env || {};
const env = (key, fallback = "") => (E && E[key] !== undefined && E[key] !== "" ? E[key] : fallback);

// Dummy but sensible defaults you can override via .env
const ENV_DEFAULTS = {
  MEDIUM_FEED_URL: "https://medium.com/feed/@yourMediumHandle",
  PERADENIYA_PLACE_ID: "DUMMY_PLACE_ID_PERADENIYA",
  GAMPOLA_PLACE_ID: "DUMMY_PLACE_ID_GAMPOLA",
  WHATSAPP_PHONE: "+94770000000",
  WHATSAPP_TEXT: "Hello! I'd like to check availability at Highgarden Hideaway.",
  OG_IMAGE: "https://res.cloudinary.com/demo/image/upload/v1690000000/highgarden/og-image.jpg",
  FAVICON_URL: "",
};

// =============== CONTENT (EDIT ME OR USE ENV) ===============
const CONTENT = {
  brand: {
    groupName: "Highgarden Hideaway",
    tagline: "Modern stays with island soul",
    colors: {
      background: "#0b0b0b",
      text: "#f5f5f5",
      gold: "#D4AF37",
      goldSoft: "#C1A35B",
      accent: "#111111",
    },
    whatsapp: {
      phoneIntl: env("VITE_WHATSAPP_PHONE", ENV_DEFAULTS.WHATSAPP_PHONE),
      prefilled: env("VITE_WHATSAPP_TEXT", ENV_DEFAULTS.WHATSAPP_TEXT),
    },
    contact: {
      phone: "+94 77 000 0000",
      email: "stay@highgardenhideaway.com",
      address: "Kandy & Gampola, Sri Lanka",
    },
    socials: {
      instagram: "https://instagram.com/yourhandle",
      facebook: "https://facebook.com/yourpage",
    },
  },

  properties: [
    {
      key: "peradeniya",
      name: "Highgarden Hideaway Bungalow",
      short: "Peradeniya, Kandy",
      description:
        "A chic hillside bungalow minutes from the Royal Botanical Gardens. Minimalist interiors, veranda sunsets, and quick access to Kandy’s heritage core.",
      bookingLink: "https://www.booking.com/hotel/placeholder-bungalow.html",
      map: {
        lat: 7.2715,
        lng: 80.5920,
        placeQuery: "Highgarden Hideaway Bungalow Peradeniya",
      },
      highlights: [
        "3 ensuite bedrooms",
        "Garden-view veranda",
        "Chef-on-call",
        "5 min to Botanical Gardens",
      ],
      gallery: {
        images: [
          "https://res.cloudinary.com/demo/image/upload/v1690000000/highgarden/peradeniya-1.jpg",
          "https://res.cloudinary.com/demo/image/upload/v1690000000/highgarden/peradeniya-2.jpg",
          "https://res.cloudinary.com/demo/image/upload/v1690000000/highgarden/peradeniya-3.jpg",
        ],
        videos: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"],
      },
    },
    {
      key: "gampola",
      name: "Highgarden Hideaway Villas",
      short: "3 Suites Villa, Gampola",
      description:
        "A private 3-suite villa wrapped in mist and tea country views. Perfect for families and small groups seeking calm with quick day-trips around Kandy.",
      bookingLink: "https://www.booking.com/hotel/placeholder-villas.html",
      map: {
        lat: 7.1642,
        lng: 80.5696,
        placeQuery: "Highgarden Hideaway Villas Gampola",
      },
      highlights: [
        "3 master suites",
        "Infinity-edge splash pool",
        "BBQ & outdoor dining",
        "Tea trails nearby",
      ],
      gallery: {
        images: [
          "https://res.cloudinary.com/demo/image/upload/v1690000000/highgarden/gampola-1.jpg",
          "https://res.cloudinary.com/demo/image/upload/v1690000000/highgarden/gampola-2.jpg",
          "https://res.cloudinary.com/demo/image/upload/v1690000000/highgarden/gampola-3.jpg",
        ],
        videos: ["https://www.youtube.com/watch?v=ysz5S6PUM-U"],
      },
    },
  ],

  sriLanka: {
    blurb:
      "Sri Lanka is a burst of color and culture: emerald tea lands, golden beaches, and cities that hum with history. Stay with us and day-trip to temples, waterfalls, and wildlife.",
  },

  travelVideos: [
    "https://www.youtube.com/watch?v=3Z9wZ0hBq3c",
    "https://www.youtube.com/watch?v=4xDzrJKXOOY",
    "https://www.youtube.com/watch?v=zvCpVYQ-2lI",
  ],

  blogs: {
    mediumFeedUrl: env("VITE_MEDIUM_FEED_URL", ENV_DEFAULTS.MEDIUM_FEED_URL),
    rssToJson: "https://api.rss2json.com/v1/api.json?rss_url=",
    maxPosts: 6,
  },

  google: {
    placeIds: {
      peradeniya: env("VITE_PERADENIYA_PLACE_ID", ENV_DEFAULTS.PERADENIYA_PLACE_ID),
      gampola: env("VITE_GAMPOLA_PLACE_ID", ENV_DEFAULTS.GAMPOLA_PLACE_ID),
    },
    reviewsToShow: 6,
  },
};
// =============== END CONTENT ===============

// Utilities
const goldGrad = (angle = 90) => ({
  backgroundImage: `linear-gradient(${angle}deg, ${CONTENT.brand.colors.gold}, ${CONTENT.brand.colors.goldSoft})`,
});

function injectHeadAssets() {
  // Fonts: Playfair Display (headings) + Inter (body)
  const preconnect1 = document.createElement("link");
  preconnect1.rel = "preconnect";
  preconnect1.href = "https://fonts.googleapis.com";
  const preconnect2 = document.createElement("link");
  preconnect2.rel = "preconnect";
  preconnect2.href = "https://fonts.gstatic.com";
  preconnect2.crossOrigin = "";
  const fonts = document.createElement("link");
  fonts.rel = "stylesheet";
  fonts.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Playfair+Display:wght@600;800&display=swap";
  const ogImage = env("VITE_OG_IMAGE", ENV_DEFAULTS.OG_IMAGE);
  const metaOg = [
    ["og:title", `${CONTENT.brand.groupName} — Luxury stays in Kandy & Gampola`],
    ["og:description", CONTENT.sriLanka.blurb],
    ["og:image", ogImage],
    ["twitter:card", "summary_large_image"],
  ];
  metaOg.forEach(([p, c]) => {
    const m = document.createElement("meta");
    m.setAttribute("property", p);
    m.content = c;
    document.head.appendChild(m);
  });
  const faviconUrl = env("VITE_FAVICON_URL", "");
  const linkIcon = document.createElement("link");
  linkIcon.rel = "icon";
  linkIcon.href =
    faviconUrl ||
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='32' r='28' fill='%23D4AF37'/><text x='32' y='39' font-size='26' text-anchor='middle' fill='%230b0b0b' font-family='Arial'>H</text></svg>";
  document.head.append(preconnect1, preconnect2, fonts, linkIcon);
}

function useMediumPosts({ feedUrl, rssToJson, max = 6 }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!feedUrl) {
      setLoading(false);
      return;
    }
    const url = `${rssToJson}${encodeURIComponent(feedUrl)}`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const items = data?.items || [];
        const cleaned = items.slice(0, max).map((x) => ({
          title: x.title,
          link: x.link,
          pubDate: x.pubDate,
          thumbnail: x.thumbnail,
          author: x.author,
        }));
        setPosts(cleaned);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [feedUrl, rssToJson, max]);
  return { posts, loading };
}

// Client fetches reviews from our serverless function (no API key exposed)
function useServerReviews({ placeId, limit = 6 }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function run() {
      if (!placeId || placeId.startsWith("DUMMY_")) {
        setLoading(false);
        setReviews([]);
        return;
      }
      try {
        const res = await fetch(`/api/reviews?placeId=${encodeURIComponent(placeId)}&limit=${limit}`);
        const data = await res.json();
        setReviews(Array.isArray(data?.reviews) ? data.reviews.slice(0, limit) : []);
      } catch (e) {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [placeId, limit]);
  return { reviews, loading };
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-['Playfair Display']" style={{ color: CONTENT.brand.colors.text }}>
          <span className="inline-block" style={goldGrad(135)}>
            <span className="bg-clip-text text-transparent">{title}</span>
          </span>
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm md:text-base opacity-80 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function Nav() {
  const items = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Properties", href: "#properties" },
    { label: "Gallery", href: "#gallery" },
    { label: "Videos", href: "#videos" },
    { label: "Reviews", href: "#reviews" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/70 border-b border-white/10 font-['Inter']">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-8">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full" style={goldGrad(45)} />
          <div className="font-semibold tracking-wide" style={{ color: CONTENT.brand.colors.text }}>
            {CONTENT.brand.groupName}
          </div>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {items.map((i) => (
            <a key={i.href} href={i.href} className="text-sm hover:opacity-80" style={{ color: CONTENT.brand.colors.text }}>
              {i.label}
            </a>
          ))}
          <a
            href={`https://wa.me/${CONTENT.brand.whatsapp.phoneIntl.replace(/[^\d+]/g, "")}?text=${encodeURIComponent(
              CONTENT.brand.whatsapp.prefilled
            )}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ ...goldGrad(90), color: "#0b0b0b" }}
          >
            WhatsApp
            <ArrowRight size={16} />
          </a>
        </div>
      </nav>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden" style={{ background: CONTENT.brand.colors.background }}>
      <div className="absolute inset-0 opacity-20" style={goldGrad(45)} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-36 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black leading-tight font-['Playfair Display']"
          style={{ color: CONTENT.brand.colors.text }}
        >
          {CONTENT.brand.groupName}
          <span className="block text-lg md:text-2xl mt-3 font-normal opacity-80 font-['Inter']">
            {CONTENT.brand.tagline}
          </span>
        </motion.h1>
        <div className="mt-8 flex flex-wrap gap-3">
          {CONTENT.properties.map((p) => (
            <a
              key={p.key}
              href={p.bookingLink}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border border-white/20 hover:border-white/40 transition font-['Inter']"
              style={{ color: CONTENT.brand.colors.text }}
            >
              <Hotel size={16} /> Book {p.name}
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-32 right-0 left-0 h-64 blur-3xl opacity-40" style={goldGrad(0)} />
    </section>
  );
}

function About() {
  return (
    <Section id="about" title="About Highgarden Hideaway" subtitle={CONTENT.sriLanka.blurb}>
      <div className="grid md:grid-cols-3 gap-6">
        {CONTENT.properties.map((p) => (
          <motion.div key={p.key} whileHover={{ y: -4 }} className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
            <div className="aspect-video bg-black/60 flex items-center justify-center">
              <ImageIcon className="opacity-40" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold font-['Playfair Display']" style={{ color: CONTENT.brand.colors.text }}>
                {p.name}
              </h3>
              <p className="text-sm mt-1 opacity-80 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
                {p.short}
              </p>
              <p className="text-sm mt-3 opacity-80 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.highlights.map((h, idx) => (
                  <span key={idx} className="text-xs rounded-full px-3 py-1 border border-white/15 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
                    {h}
                  </span>
                ))}
              </div>
              <a href={p.bookingLink} target="_blank" className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold font-['Inter']" style={{ ...goldGrad(90), color: "#0b0b0b" }}>
                Book on Booking.com <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function PropertyMaps() {
  const mapUrl = (p) => `https://www.google.com/maps?q=${p.map.lat},${p.map.lng}&z=15&output=embed`;
  return (
    <Section id="properties" title="Where We Are" subtitle="Peradeniya (Kandy) & Gampola">
      <div className="grid md:grid-cols-2 gap-6">
        {CONTENT.properties.map((p) => (
          <div key={p.key} className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
            <div className="p-5 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold font-['Playfair Display']" style={{ color: CONTENT.brand.colors.text }}>
                  {p.name}
                </h3>
                <p className="text-sm opacity-80 flex items-center gap-2 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
                  <MapPin size={16} /> {p.short}
                </p>
              </div>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.map.placeQuery)}`} target="_blank" className="text-xs underline opacity-80 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
                Open in Maps
              </a>
            </div>
            <iframe title={`Map of ${p.name}`} src={mapUrl(p)} loading="lazy" className="w-full h-72" style={{ border: 0 }} allowFullScreen />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Gallery() {
  const allImages = CONTENT.properties.flatMap((p) => p.gallery.images.map((src) => ({ src, prop: p.name })));
  return (
    <Section id="gallery" title="Image Gallery" subtitle="A peek into our spaces">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {allImages.map((img, i) => (
          <motion.a href={img.src} key={i} target="_blank" whileHover={{ scale: 1.02 }} className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/30 flex items-center justify-center">
            <img src={img.src} alt={img.prop} className="w-full h-full object-cover" />
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

function Videos() {
  const allVideos = CONTENT.properties.flatMap((p) => p.gallery.videos.map((u) => ({ url: u, label: p.name })));
  return (
    <Section id="videos" title="Stay Videos" subtitle="Walkthroughs & moments">
      <div className="grid md:grid-cols-2 gap-6">
        {allVideos.map((v, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
            <div className="aspect-video">
              <iframe className="w-full h-full" src={v.url.replace("watch?v=", "embed/")} title={`Video ${i}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <div className="p-4 flex items-center gap-2 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
              <Youtube size={16} /> {v.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TravelMarquee() {
  return (
    <div className="py-12 border-y border-white/10" style={{ background: CONTENT.brand.colors.accent }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-4 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
          <Globe2 size={18} />
          <h3 className="font-semibold tracking-wide">Sri Lanka travel inspiration</h3>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-[scroll_40s_linear_infinite] will-change-transform">
            {CONTENT.travelVideos.concat(CONTENT.travelVideos).map((url, i) => (
              <a key={i} href={url} target="_blank" className="min-w-[320px] md:min-w-[420px] rounded-xl overflow-hidden border border-white/10 bg-black/40">
                <div className="aspect-video">
                  <iframe className="w-full h-full" src={url.replace("watch?v=", "embed/")} title={`Sri Lanka travel ${i}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </a>
            ))}
          </div>
        </div>
        <style>{"\n          @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }\n        "}</style>
      </div>
    </div>
  );
}

function Reviews() {
  const r1 = useServerReviews({ placeId: CONTENT.google.placeIds.peradeniya, limit: CONTENT.google.reviewsToShow });
  const r2 = useServerReviews({ placeId: CONTENT.google.placeIds.gampola, limit: CONTENT.google.reviewsToShow });
  const loading = r1.loading || r2.loading;
  const reviews = [...(r1.reviews || []), ...(r2.reviews || [])];
  return (
    <Section id="reviews" title="Guest Reviews" subtitle="What our guests loved">
      {loading ? (
        <div className="flex items-center gap-3 opacity-80 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
          <Loader2 className="animate-spin" size={18} /> Loading reviews…
        </div>
      ) : reviews.length === 0 ? (
        <p className="opacity-80 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
          Reviews will appear here once your place IDs & server key are set.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-2xl p-5 border border-white/10 bg-black/40">
              <div className="flex items-center gap-2 mb-2" style={{ color: CONTENT.brand.colors.text }}>
                {Array.from({ length: Math.round(r.rating || 5) }).map((_, idx) => (
                  <Star key={idx} size={16} style={{ color: CONTENT.brand.colors.gold }} />
                ))}
              </div>
              <p className="text-sm opacity-90 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>{r.text}</p>
              <div className="mt-3 text-xs opacity-70 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
                — {r.author_name || "Guest"}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

function Blog() {
  const { posts, loading } = useMediumPosts({
    feedUrl: CONTENT.blogs.mediumFeedUrl,
    rssToJson: CONTENT.blogs.rssToJson,
    max: CONTENT.blogs.maxPosts,
  });
  return (
    <Section id="blog" title="From Our Blog" subtitle="Stories, guides & updates">
      {loading ? (
        <div className="flex items-center gap-3 opacity-80 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
          <Loader2 className="animate-spin" size={18} /> Loading posts…
        </div>
      ) : posts.length === 0 ? (
        <p className="opacity-80 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
          Connect your Medium feed to show posts here.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <a key={i} href={p.link} target="_blank" className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 hover:border-white/30 transition">
              <div className="aspect-[16/10] bg-black/60">
                {p.thumbnail ? (
                  <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-40">
                    <BookOpen />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="text-xs opacity-70 flex items-center gap-2 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
                  <Calendar size={14} /> {new Date(p.pubDate).toLocaleDateString()}
                </div>
                <h4 className="mt-2 font-semibold leading-snug font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
                  {p.title}
                </h4>
                <div className="mt-3 text-xs underline opacity-80 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
                  Read on Medium
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contact & Booking" subtitle="We’d love to host you in Kandy & Gampola">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-2xl p-6 border border-white/10 bg-black/40">
          <h4 className="font-semibold font-['Playfair Display']" style={{ color: CONTENT.brand.colors.text }}>
            Direct Contacts
          </h4>
          <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
            <div className="flex items-center gap-2"><Phone size={16}/> {CONTENT.brand.contact.phone}</div>
            <div className="flex items-center gap-2"><Mail size={16}/> {CONTENT.brand.contact.email}</div>
            <div className="flex items-center gap-2 sm:col-span-2"><MapPin size={16}/> {CONTENT.brand.contact.address}</div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {CONTENT.properties.map((p) => (
              <a key={p.key} href={p.bookingLink} target="_blank" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border border-white/20 hover:border-white/40 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}>
                Book {p.name} <ExternalLink size={14}/>
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-6 border border-white/10 bg-black/40">
          <h4 className="font-semibold font-['Playfair Display']" style={{ color: CONTENT.brand.colors.text }}>
            Follow
          </h4>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a href={CONTENT.brand.socials.instagram} target="_blank" className="flex items-center gap-2 opacity-90 hover:opacity-100 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}><Instagram size={16}/> Instagram</a>
            <a href={CONTENT.brand.socials.facebook} target="_blank" className="flex items-center gap-2 opacity-90 hover:opacity-100 font-['Inter']" style={{ color: CONTENT.brand.colors.text }}><Facebook size={16}/> Facebook</a>
          </div>
          <a
            href={`https://wa.me/${CONTENT.brand.whatsapp.phoneIntl.replace(/[^\d+]/g, "")}?text=${encodeURIComponent(CONTENT.brand.whatsapp.prefilled)}`}
            target="_blank"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 w-full text-sm font-semibold font-['Inter']"
            style={{...goldGrad(90), color: "#0b0b0b"}}
          >
            Message us on WhatsApp <ArrowRight size={16}/>
          </a>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full" style={goldGrad(45)} />
          <div className="text-sm font-['Inter']" style={{color: CONTENT.brand.colors.text}}>
            © {new Date().getFullYear()} {CONTENT.brand.groupName}
          </div>
        </div>
        <div className="text-xs opacity-70 font-['Inter']" style={{color: CONTENT.brand.colors.text}}>
          Built with love in Sri Lanka • Luxury stays, modern vibes
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${CONTENT.brand.whatsapp.phoneIntl.replace(/[^\d+]/g, "")}?text=${encodeURIComponent(CONTENT.brand.whatsapp.prefilled)}`}
      target="_blank"
      className="fixed bottom-5 right-5 rounded-full shadow-lg p-4 border border-white/10"
      style={{ background: CONTENT.brand.colors.gold, color: "#0b0b0b" }}
      aria-label="WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.62-6.003C.122 5.281 5.403 0 12.057 0c3.181 0 6.167 1.24 8.413 3.488A11.84 11.84 0 0124 11.945c-.003 6.654-5.284 11.935-11.938 11.935a11.9 11.9 0 01-6.004-1.62L.057 24zM6.6 20.013c1.738.995 3.278 1.591 5.392 1.593 5.448.003 9.886-4.431 9.889-9.88.002-5.462-4.415-9.885-9.881-9.888-5.45-.003-9.885 4.43-9.888 9.878-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.741-.985zm11.387-5.464c-.074-.123-.272-.198-.57-.347-.297-.149-1.758-.868-2.03-.967-.272-.099-.47-.148-.669.15-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.508l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.412z"/></svg>
    </a>
  );
}

export default function HighgardenSite() {
  useEffect(() => {
    document.documentElement.style.setProperty("--bg", CONTENT.brand.colors.background);
    document.body.style.background = CONTENT.brand.colors.background;
    document.body.style.color = CONTENT.brand.colors.text;
    injectHeadAssets();
  }, []);

  return (
    <div style={{ background: CONTENT.brand.colors.background }}>
      <Nav />
      <Hero />
      <About />
      <PropertyMaps />
      <Gallery />
      <Videos />
      <TravelMarquee />
      <Reviews />
      <Blog />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
/* =============================================================
   .env.example (create in project root)
   ---------------------------------------------------------------
   VITE_MEDIUM_FEED_URL=https://medium.com/feed/@yourMediumHandle
   VITE_PERADENIYA_PLACE_ID=YOUR_GOOGLE_PLACE_ID_BUNGALOW
   VITE_GAMPOLA_PLACE_ID=YOUR_GOOGLE_PLACE_ID_VILLAS
   VITE_WHATSAPP_PHONE=+94770000000
   VITE_WHATSAPP_TEXT=Hello! I'd like to check availability at Highgarden Hideaway.
   VITE_OG_IMAGE=https://your-cdn/og-image.jpg
   VITE_FAVICON_URL=https://your-cdn/favicon.png

   # Server-side only (no VITE prefix):
   GOOGLE_MAPS_API_KEY=YOUR_SERVER_PLACES_API_KEY
   ============================================================= */
