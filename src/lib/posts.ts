// Blog post data. PLACEHOLDER content for now — this is the data layer the
// blog pages render from. When Soro is connected, this source is swapped for
// Soro's output (API / MDX / etc.); the page components stay the same.

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // display string, e.g. "15 Jul 2026"
  readTime: string; // e.g. "5 min read"
  body: string[]; // paragraphs
};

export const posts: Post[] = [
  {
    slug: "five-errors-valuation-reports",
    title: "The five errors we see most often in valuation reports",
    excerpt:
      "The same handful of mistakes account for most of what a second read catches. Here's what to look for, and why they slip through.",
    category: "Practice",
    date: "15 Jul 2026",
    readTime: "5 min read",
    body: [
      "Placeholder article. Real posts will be published here once the content pipeline is connected. The layout, typography and reading width are what's on show for now.",
      "A final read is where most oversights are caught, and where most are missed. After hours on an instruction, the eye stops seeing the figures it has already checked, and the small inconsistencies — a value that shifts between sections, an area that doesn't reconcile with the schedule — are exactly the sort of thing a fresh pass picks up.",
      "This piece would walk through the recurring five, with an example of each and a note on why they tend to survive to sign-off.",
    ],
  },
  {
    slug: "red-book-2026-update",
    title: "What the 2026 Red Book update changes for your reporting",
    excerpt:
      "The clauses worth re-reading before your next instruction, in plain terms.",
    category: "Red Book",
    date: "08 Jul 2026",
    readTime: "6 min read",
    body: [
      "Placeholder article — content to follow once the pipeline is live.",
      "The intent here is a plain-English summary of the changes that actually affect day-to-day reporting, rather than a clause-by-clause restatement.",
    ],
  },
  {
    slug: "cutting-review-time",
    title: "Cutting report review time without cutting corners",
    excerpt:
      "Where the hours actually go on a final read — and which parts a machine can take.",
    category: "Practice",
    date: "01 Jul 2026",
    readTime: "4 min read",
    body: [
      "Placeholder article — content to follow.",
      "The argument: the goal isn't to review less, it's to spend the review time on judgement rather than on cross-checking figures a tool can check faster.",
    ],
  },
  {
    slug: "ews1-cladding-lenders",
    title: "EWS1 and cladding: what lenders now expect to see",
    excerpt:
      "Height thresholds, the disclosures that get queried, and how to stay ahead of them.",
    category: "Compliance",
    date: "24 Jun 2026",
    readTime: "5 min read",
    body: [
      "Placeholder article — content to follow.",
      "A practical note on the disclosures that most often trigger a lender query, and how to pre-empt them.",
    ],
  },
  {
    slug: "comparable-evidence-inconsistencies",
    title: "Comparable evidence: the inconsistencies that slip through",
    excerpt:
      "Rates that don't reconcile with the conclusion, and how to catch them before sign-off.",
    category: "Guides",
    date: "17 Jun 2026",
    readTime: "7 min read",
    body: [
      "Placeholder article — content to follow.",
      "How to sense-check that the comparables actually support the figure the report concludes at.",
    ],
  },
  {
    slug: "where-ai-fits-qa",
    title: "Where AI fits in a surveyor's QA process",
    excerpt:
      "A second read that supports judgement rather than replacing it.",
    category: "Product",
    date: "10 Jun 2026",
    readTime: "3 min read",
    body: [
      "Placeholder article — content to follow.",
      "The role we think AI should play in review: a tireless second pair of eyes that flags, while the surveyor decides.",
    ],
  },
];
