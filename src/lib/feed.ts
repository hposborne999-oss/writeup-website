import Parser from "rss-parser";
import sanitizeHtml from "sanitize-html";

// Reads blog posts from the Soro RSS feed. Soro auto-publishes articles; the
// blog pulls them (page-level ISR refreshes hourly) and renders them in our
// own design. If the feed is empty/unreachable, everything returns empty so
// the blog just shows its "coming soon" state — the site never breaks.

const FEED_URL =
  "https://app.trysoro.com/api/rss/949c8ce4-5af2-491e-a51f-23aa59da0749";

const parser: Parser<unknown, { contentEncoded?: string }> = new Parser({
  timeout: 8000,
  customFields: { item: [["content:encoded", "contentEncoded"]] },
});

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // "15 Jul 2026"
};
export type FullPost = Post & { readTime: string; contentHtml: string };

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80) || "post"
  );
}
function formatDate(input?: string): string {
  if (!input) return "";
  try {
    return new Date(input).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
function readTimeFrom(html: string): string {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
function clean(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "loading"],
      a: ["href", "name", "target", "rel"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
    },
  });
}

async function fetchItems() {
  try {
    const feed = await parser.parseURL(FEED_URL);
    return feed.items ?? [];
  } catch (err) {
    console.error("[feed] parse failed:", err);
    return [];
  }
}

function itemToPost(item: Parser.Item): Post {
  const title = (item.title || "Untitled").trim();
  const snippet = (item.contentSnippet || "").replace(/\s+/g, " ").trim();
  return {
    slug: slugify(title),
    title,
    excerpt: snippet.length > 200 ? snippet.slice(0, 197).trimEnd() + "…" : snippet,
    category: item.categories?.[0]?.toString().trim() || "Notes",
    date: formatDate(item.isoDate || item.pubDate),
  };
}

/** All published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const items = await fetchItems();
  return items.map(itemToPost);
}

/** One post by slug, with its sanitised HTML body. */
export async function getPost(slug: string): Promise<FullPost | null> {
  const items = await fetchItems();
  const item = items.find((i) => slugify((i.title || "").trim()) === slug) as
    | (Parser.Item & { contentEncoded?: string })
    | undefined;
  if (!item) return null;

  const rawHtml = item.contentEncoded || item.content || "";
  const contentHtml = clean(rawHtml);
  return { ...itemToPost(item), readTime: readTimeFrom(contentHtml), contentHtml };
}
