import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// Reads blog posts from a Notion database. Paste an article into Notion, tick
// "Published", and it appears on the blog (ISR refreshes hourly). If the env
// vars aren't set yet, everything returns empty so the blog just shows its
// empty state — the site never breaks.

const TOKEN = process.env.NOTION_TOKEN || "";
const DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

const notion = TOKEN ? new Client({ auth: TOKEN }) : null;
const n2m = notion ? new NotionToMarkdown({ notionClient: notion }) : null;

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // display, e.g. "15 Jul 2026"
};

export type FullPost = Post & { readTime: string; markdown: string };

/* ── property helpers (Notion's shapes are verbose) ── */
function plainTitle(page: any): string {
  const prop = Object.values(page.properties || {}).find(
    (p: any) => p?.type === "title",
  ) as any;
  return (prop?.title || []).map((t: any) => t.plain_text).join("") || "Untitled";
}
function richText(page: any, name: string): string {
  const p = page.properties?.[name];
  return p?.type === "rich_text"
    ? p.rich_text.map((t: any) => t.plain_text).join("")
    : "";
}
function selectValue(page: any, name: string): string {
  const p = page.properties?.[name];
  return p?.type === "select" ? p.select?.name || "" : "";
}
function dateValue(page: any, name: string): string | null {
  const p = page.properties?.[name];
  return p?.type === "date" ? p.date?.start || null : null;
}

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
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
function readTimeFrom(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function pageToPost(page: any): Post {
  const title = plainTitle(page);
  const explicitSlug = richText(page, "Slug");
  return {
    id: page.id,
    slug: explicitSlug ? slugify(explicitSlug) : slugify(title),
    title,
    excerpt: richText(page, "Excerpt"),
    category: selectValue(page, "Category") || "Notes",
    date: formatDate(dateValue(page, "Date") || page.created_time),
  };
}

/** All published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  if (!notion || !DATABASE_ID) return [];
  try {
    const res = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: "Published", checkbox: { equals: true } },
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });
    return res.results.map(pageToPost);
  } catch (err) {
    console.error("[notion] getPosts failed:", err);
    return [];
  }
}

/** One published post by slug, with its body rendered to markdown. */
export async function getPost(slug: string): Promise<FullPost | null> {
  if (!notion || !n2m || !DATABASE_ID) return null;
  try {
    const res = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: "Published", checkbox: { equals: true } },
    });
    const page = res.results.find((p: any) => pageToPost(p).slug === slug);
    if (!page) return null;

    const mdblocks = await n2m.pageToMarkdown((page as any).id);
    const markdown = n2m.toMarkdownString(mdblocks).parent || "";

    return { ...pageToPost(page), readTime: readTimeFrom(markdown), markdown };
  } catch (err) {
    console.error("[notion] getPost failed:", err);
    return null;
  }
}
