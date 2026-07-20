import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { posts } from "@/lib/posts";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Not found — WriteUp" };
  return {
    title: `${post.title} — The WriteUp Blog`,
    description: post.excerpt,
  };
}

export default async function Article({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <article className="py-14 lg:py-20">
          <Container variant="narrow">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-ink transition-colors duration-150 mb-12"
            >
              <span className="text-teal">←</span> The Blog
            </Link>

            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 mb-6 font-mono text-[11px] tracking-[0.1em] uppercase text-slate-500">
              <span className="text-teal">{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="font-serif font-normal text-[36px] lg:text-[52px] leading-[1.06] tracking-[-0.02em] text-ink mb-6">
              {post.title}
            </h1>

            <p className="text-[19px] lg:text-[21px] leading-[1.5] text-slate-700 mb-10 pb-10 border-b border-rule">
              {post.excerpt}
            </p>

            <div className="text-[17px] lg:text-[18px] leading-[1.75] text-ink space-y-6">
              {post.body.map((para, i) => (
                <p key={i} className="m-0">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-rule">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink hover:text-teal transition-colors duration-150"
              >
                <span className="text-teal">←</span> Back to the Blog
              </Link>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
