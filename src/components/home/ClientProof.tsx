import Image from "next/image";
import Link from "next/link";
import { Container } from "../Container";

// Client proof, high on the page: the two firms' logos and the one line that
// says most, linking down to the full quotes in "In practice". The logo files
// are white (for the petrol band), so they're darkened here with a filter.

const LOGOS = [
  { src: "/clients/glenny.svg", alt: "Glenny", width: 122, height: 17 },
  {
    src: "/clients/rees-richards-blyth.png",
    alt: "Rees Richards & Blyth",
    width: 136,
    height: 54,
  },
];

export function ClientProof() {
  return (
    <section className="bg-white py-12 lg:py-14 border-b border-rule">
      <Container>
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16 md:items-center">
          <div>
            <span className="font-mono text-[10.5px] font-medium tracking-[0.16em] uppercase text-slate-500">
              In use at
            </span>
            <div className="mt-5 flex items-center gap-10">
              {LOGOS.map((logo) => (
                <Image
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="brightness-0 opacity-75"
                  style={{ width: logo.width, height: logo.height }}
                />
              ))}
            </div>
          </div>

          <figure className="m-0 md:pl-16 md:border-l border-rule">
            <blockquote className="m-0 font-serif text-[24px] lg:text-[28px] leading-[1.25] tracking-[-0.01em] text-ink">
              &ldquo;I have reduced my review time by approximately half.&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-[13.5px] text-slate-500">
              <span className="text-ink font-semibold">Dylan Williams MRICS</span>
              , Director, Rees Richards &amp; Blyth
              <Link
                href="#in-practice"
                className="ml-3 font-medium text-teal hover:text-ink transition-colors duration-150"
              >
                Read more &rarr;
              </Link>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
