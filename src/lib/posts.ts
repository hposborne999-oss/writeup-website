// Blog post data. The blog ships live with no content for now — posts will
// be published here once the content pipeline (Soro) is connected. The page
// components render from this array, so nothing else needs to change when it
// is populated. Sample layout data lives in the preview mock + git history.

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // display string, e.g. "15 Jul 2026"
  readTime: string; // e.g. "5 min read"
  body: string[]; // paragraphs
};

export const posts: Post[] = [];
