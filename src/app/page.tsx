import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { VideoCard } from "@/components/home/VideoCard";
import { CatchesList } from "@/components/home/CatchesList";
import { FounderProse } from "@/components/home/FounderProse";
import { Testimonial } from "@/components/home/Testimonial";
import { Pricing } from "@/components/home/Pricing";
import { CtaBand } from "@/components/home/CtaBand";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <VideoCard />
        <CatchesList />
        <FounderProse />
        <Testimonial />
        <Pricing />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
