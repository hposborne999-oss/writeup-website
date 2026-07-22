import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getPost, getPosts } from "@/lib/notion";

export const revalidate = 3600;

type Params = { slug: string };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found — WriteUp" };
  return { title: `${post.title} — The WriteUp Blog`, description: post.excerpt };
}

/* Markdown → styled elements, matching the article design. */
const md = {
  h1: (props: any) => (
    <h2 className="font-serif font-normal text-[28px] lg:text-[32px] leading-[1.15] tracking-[-0.015em] text-ink mt-12 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="font-serif font-normal text-[26px] lg:text-[30px] leading-[1.2] tracking-[-0.01em] text-ink mt-10 mb-4" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="font-semibold text-[19px] text-ink mt-8 mb-3" {...props} />
  ),
  p: (props: any) => (
    <p className="text-[17px] lg:text-[18px] leading-[1.75] text-ink mb-5" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 mb-5 space-y-2 text-[17px] leading-[1.7] text-ink" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-6 mb-5 space-y-2 text-[17px] leading-[1.7] text-ink" {...props} />
  ),
  li: (props: any) => <li className="pl-1" {...props} />,
  a: (props: any) => (
    <a className="text-teal underline underline-offset-2 hover:brightness-110" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-2 border-rule pl-5 italic text-slate-700 my-6" {...props} />
  ),
  strong: (props: any) => <strong className="font-semibold text-ink" {...props} />,
  hr: () => <hr className="border-rule my-8" />,
  img: (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-xl my-6 max-w-full" alt={props.alt || ""} {...props} />
  ),
  code: (props: any) => (
    <code className="bg-slate-100 rounded px-1.5 py-0.5 text-[15px]" {...props} />
  ),
};

export default async function Article({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1 bg-paper">
        <div className="max-w-[820px] mx-auto px-8 py-12 lg:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-slate-500 hover:text-ink transition-colors duration-150"
          >
            <span className="text-teal">←</span> The Blog
          </Link>

          <article className="bg-white rounded-[28px] border border-rule p-8 sm:p-12 lg:p-14 mt-5">
            <div className="text-[13px] text-slate-500 mb-6">
              {post.category} · {post.date} · {post.readTime}
            </div>

            <h1 className="font-serif font-normal text-[34px] sm:text-[42px] lg:text-[50px] leading-[1.06] tracking-[-0.02em] text-ink mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-[19px] lg:text-[21px] leading-[1.5] text-slate-700 mb-10 pb-10 border-b border-rule">
                {post.excerpt}
              </p>
            )}

            <div>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
                {post.markdown}
              </ReactMarkdown>
            </div>
          </article>

          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink hover:text-teal transition-colors duration-150"
            >
              <span className="text-teal">←</span> Back to the Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
