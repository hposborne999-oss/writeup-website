import Parser from "rss-parser";
import sanitizeHtml from "sanitize-html";

// Reads blog posts from the Soro RSS feed. Soro auto-publishes articles; the
// blog pulls them (page-level ISR refreshes hourly) and renders them in our
// own design. If the feed is empty/unreachable, everything returns empty so
// the blog just shows its "coming soon" state — the site never breaks.

const FEED_URL =
  "https://app.trysoro.com/api/rss/949c8ce4-5af2-491e-a51f-23aa59da0749";

// Posts to keep off the site even if Soro publishes them (weak/off-brand).
// Match on the generated slug — add a line to hide another.
const HIDDEN_SLUGS = new Set<string>([
  "red-book-compliance-checklist-for-valuers",
]);

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
// RICS retired "RICS Tech Partner" on 22 Oct 2026; the approved term is
// "RICS Tech Network Solution Provider" and the old one is now a prohibited
// claim. Soro's older posts still use it, so swap it on the way in.
function currentRicsWording(text: string): string {
  return text.replace(/RICS Tech Partner/g, "RICS Tech Network Solution Provider");
}

function clean(html: string): string {
  return sanitizeHtml(currentRicsWording(html), {
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

// Download with fetch, then parse the text. Soro started answering
// rss-parser's own downloader with 403 (Oct 2026) while plain requests still
// get the feed, which left the blog empty. Soro also refuses bursts of
// requests (403, retry after 30s), and every post page needs the feed, so the
// download is cached for an hour and shared by all pages instead of being
// fetched once per page.
async function fetchItems() {
  try {
    const res = await fetch(FEED_URL, {
      headers: { Accept: "application/rss+xml, application/xml" },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Status code ${res.status}`);
    const feed = await parser.parseString(await res.text());
    return feed.items ?? [];
  } catch (err) {
    console.error("[feed] parse failed:", err);
    return [];
  }
}

function itemToPost(item: Parser.Item): Post {
  const rawTitle = (item.title || "Untitled").trim();
  const title = currentRicsWording(rawTitle);
  const snippet = currentRicsWording(
    (item.contentSnippet || "").replace(/\s+/g, " ").trim(),
  );
  return {
    // Slug from the original title so post URLs never change.
    slug: slugify(rawTitle),
    title,
    excerpt: snippet.length > 200 ? snippet.slice(0, 197).trimEnd() + "…" : snippet,
    category: item.categories?.[0]?.toString().trim() || "Notes",
    date: formatDate(item.isoDate || item.pubDate),
  };
}

/** All published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const items = await fetchItems();
  return items.map(itemToPost).filter((p) => !HIDDEN_SLUGS.has(p.slug));
}

/** One post by slug, with its sanitised HTML body. */
export async function getPost(slug: string): Promise<FullPost | null> {
  if (HIDDEN_SLUGS.has(slug)) return null;
  const items = await fetchItems();
  const item = items.find((i) => slugify((i.title || "").trim()) === slug) as
    | (Parser.Item & { contentEncoded?: string })
    | undefined;
  if (!item) return null;

  const rawHtml = item.contentEncoded || item.content || "";
  const contentHtml = clean(rawHtml);
  return { ...itemToPost(item), readTime: readTimeFrom(contentHtml), contentHtml };
}
