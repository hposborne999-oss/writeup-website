import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { CalEmbed } from "@/components/CalEmbed";

export const metadata: Metadata = {
  title: "Book a demo with the founder — WriteUp",
  description:
    "Book a 30-minute call with WriteUp's founder, a practising MRICS surveyor. Bring a recent report and see what the review catches, live.",
};

export default function DemoPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="pt-16 lg:pt-[72px] pb-24 border-b border-rule">
          <Container>
            <div className="max-w-[640px] mb-10">
              <h1 className="font-serif font-normal text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.04] tracking-[-0.02em] text-ink">
                Book a WriteUp Demo
              </h1>
            </div>

            <div className="rounded-xl border border-rule bg-white overflow-hidden shadow-[0_20px_50px_-30px_rgba(10,34,38,0.25)]">
              <CalEmbed />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
