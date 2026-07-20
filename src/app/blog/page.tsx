import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "The WriteUp Blog",
  description:
    "Practical writing on review, the Red Book, and the craft of valuation — from a practising MRICS surveyor.",
};

export default function BlogIndex() {
  const [featured, ...rest] = posts;

  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="pb-24">
          <Container>
            {/* Page header */}
            <div className="pt-16 lg:pt-[72px] pb-10">
              <h1 className="font-serif font-normal text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.02em] text-ink mb-4 max-w-[20ch]">
                The WriteUp Blog
              </h1>
              <p className="text-[17px] lg:text-[18px] leading-[1.55] text-slate-700 max-w-[56ch]">
                Practical writing on review, the Red Book, and the craft of
                valuation — from a practising surveyor.
              </p>
            </div>

            {/* Featured */}
            <Link
              href={`/blog/${featured.slug}`}
              className="group block border-t border-rule pt-10 pb-11"
            >
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 mb-4 font-mono text-[11px] tracking-[0.1em] uppercase text-slate-500">
                <span className="text-teal">{featured.category}</span>
                <span>{featured.date}</span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="font-serif font-normal text-[32px] lg:text-[46px] leading-[1.08] tracking-[-0.02em] text-ink mb-4 max-w-[20ch] transition-colors duration-200 group-hover:text-teal">
                {featured.title}
              </h2>
              <p className="text-[16.5px] lg:text-[17.5px] leading-[1.6] text-slate-700 max-w-[64ch] mb-[18px]">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink">
                Read the article
                <span className="text-teal transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>

            {/* List */}
            <div>
              {rest.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-[170px_1fr_40px] gap-y-2 md:gap-8 items-baseline py-[26px] border-t border-rule last:border-b border-rule"
                >
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-slate-500 leading-[1.6]">
                    <span className="block text-teal">{p.category}</span>
                    {p.date} · {p.readTime}
                  </div>
                  <div>
                    <h3 className="font-serif font-normal text-[23px] lg:text-[25px] leading-[1.15] tracking-[-0.01em] text-ink mb-1.5 transition-colors duration-200 group-hover:text-teal">
                      {p.title}
                    </h3>
                    <p className="text-[14.5px] lg:text-[15px] leading-[1.5] text-slate-700 m-0 max-w-[70ch]">
                      {p.excerpt}
                    </p>
                  </div>
                  <span className="hidden md:block justify-self-end text-slate-400 transition-all duration-200 group-hover:text-teal group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
