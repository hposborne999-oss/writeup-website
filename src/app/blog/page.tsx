import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "The WriteUp Blog",
  description:
    "Practical writing on review, the Red Book, and the craft of valuation — from a practising MRICS surveyor.",
};

// Softened / desaturated deep green — calmer than the hero band's teal-green.
const FEATURE_BG =
  "linear-gradient(158deg,#1b3330 0%,#122423 55%,#0d1e1d 100%)";

export default function BlogIndex() {
  const [featured, ...rest] = posts;

  return (
    <>
      <Nav />
      <main className="flex-1 bg-paper">
        <div className="max-w-[1120px] mx-auto px-8">
          {/* Header */}
          <header className="pt-16 lg:pt-[76px] pb-11">
            <h1 className="font-serif font-normal text-[46px] sm:text-[56px] lg:text-[68px] leading-[1.02] tracking-[-0.02em] text-ink mb-4">
              The WriteUp Blog
            </h1>
            <p className="text-[17px] lg:text-[18px] leading-[1.6] text-slate-700 max-w-[52ch]">
              A few of our thoughts on the industry, formed as blog posts.
            </p>
          </header>

          {posts.length === 0 ? (
            <div className="pb-28 lg:pb-40">
              <p className="text-[16px] text-slate-500">
                The first posts are on their way — check back soon.
              </p>
            </div>
          ) : (
            <>
          {/* Featured — soft petrol card */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-[28px] p-8 sm:p-12 lg:p-[52px] mb-7 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(10,34,38,0.5)]"
            style={{ background: FEATURE_BG }}
          >
            <div className="text-[13px] text-white/60 mb-5">
              {featured.category} · {featured.date} · {featured.readTime}
            </div>
            <h2 className="font-serif font-normal text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.1] tracking-[-0.015em] mb-4 max-w-[22ch]">
              {featured.title}
            </h2>
            <p className="text-[16px] lg:text-[17px] leading-[1.6] text-white/75 max-w-[60ch] mb-7">
              {featured.excerpt}
            </p>
            <span className="inline-flex items-center gap-2 border border-white/45 rounded-full px-5 py-3 text-[14px] font-medium transition-colors duration-200 group-hover:bg-white/10">
              Read the article
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>

          {/* Grid of soft cards */}
          <div className="grid md:grid-cols-2 gap-6 pb-24">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col bg-white rounded-[22px] p-8 lg:p-9 min-h-[228px] border border-rule shadow-[0_4px_20px_-14px_rgba(10,34,38,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-38px_rgba(10,34,38,0.3)]"
              >
                <div className="text-[12.5px] text-slate-500 mb-4">
                  {p.category} · {p.readTime}
                </div>
                <h3 className="font-serif font-normal text-[25px] lg:text-[28px] leading-[1.12] tracking-[-0.01em] text-ink mb-3">
                  {p.title}
                </h3>
                <p className="text-[14.5px] lg:text-[15px] leading-[1.6] text-slate-700 m-0">
                  {p.excerpt}
                </p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-teal">
                  Read
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
