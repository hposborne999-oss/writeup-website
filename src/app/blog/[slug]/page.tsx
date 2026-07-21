import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
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
      <main className="flex-1 bg-[#f0eee7]">
        <div className="max-w-[820px] mx-auto px-8 py-12 lg:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-slate-500 hover:text-ink transition-colors duration-150"
          >
            <span className="text-teal">←</span> The Blog
          </Link>

          {/* Reading surface */}
          <article className="bg-white rounded-[28px] p-8 sm:p-12 lg:p-14 mt-5">
            <div className="text-[13px] text-slate-500 mb-6">
              {post.category} · {post.date} · {post.readTime}
            </div>

            <h1 className="font-serif font-normal text-[34px] sm:text-[42px] lg:text-[50px] leading-[1.06] tracking-[-0.02em] text-ink mb-6">
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
