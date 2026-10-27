import Image from "next/image";
import { Container } from "../Container";

// Client testimonials, side by side on the petrol band. Each quote's key line
// is pulled out in the display serif; the full quote follows word for word.
// Glenny first, as Harry asked. Attributions sit level across the columns.
// Each firm's logo sits under its attribution, in white, sized by eye so the two
// marks carry the same weight (one is long and flat, the other stacked).

type Quote = {
  pull: string;
  paragraphs: string[];
  name: string;
  role: string;
  logo: { src: string; alt: string; width: number; height: number };
};

const QUOTES: Quote[] = [
  {
    pull: "The director review now takes notably less time.",
    paragraphs: [
      "We’re very selective about where technology adds value into our valuation process, and WriteUp is proving its worth. It is embedded in our quality assurance procedure: the valuer runs the audit before the report goes up for a director’s review, and we keep a copy on file as evidence the check has been completed.",
      "The director review now takes notably less time. WriteUp is now a valuable part of our Valuers toolkit, helping us to consistently deliver work of the highest quality and meeting clients’ deadlines.",
    ],
    name: "Paul Aylott MRICS",
    role: "Head of Valuation, Glenny Chartered Surveyors",
    logo: { src: "/clients/glenny.svg", alt: "Glenny", width: 122, height: 17 },
  },
  {
    pull: "I have reduced my review time by approximately half.",
    paragraphs: [
      "Our valuation team uses WriteUp to review every report. It identifies inconsistencies and errors, providing greater confidence in the reports we ultimately sign off. It has also become a valuable tool for supporting the professional development of junior surveyors joining the team.",
      "As one of the principal signatories responsible for reviewing reports, I have reduced my review time by approximately half. Over the course of a year, this represents a significant efficiency saving and enables me to focus on other important areas of the business. WriteUp has been an invaluable addition to our review process.",
    ],
    name: "Dylan Williams MRICS",
    role: "Director, Rees Richards & Blyth",
    logo: {
      src: "/clients/rees-richards-blyth.png",
      alt: "Rees Richards & Blyth",
      width: 136,
      height: 54,
    },
  },
];

export function Testimonial() {
  return (
    <section
      id="in-practice"
      className="py-20 lg:py-[104px] bg-petrol text-white scroll-mt-20"
    >
      <Container>
        <span className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[#8ee4ba]/80">
          In practice
        </span>

        <div className="mt-10 lg:mt-12 grid gap-14 md:grid-cols-2 md:gap-12 lg:gap-20">
          {QUOTES.map((q) => (
            <figure key={q.name} className="m-0 flex flex-col">
              <span
                aria-hidden
                className="font-[Georgia,serif] text-[72px] leading-[0.6] text-[#8ee4ba] mb-5"
              >
                &ldquo;
              </span>
              <p className="font-serif font-normal text-[25px] lg:text-[30px] leading-[1.2] tracking-[-0.01em] text-white m-0 mb-6">
                {q.pull}
              </p>
              <blockquote className="m-0 flex-1 text-[15.5px] lg:text-[16px] leading-[1.65] text-white/70">
                {q.paragraphs.map((para, i) => (
                  <p key={i} className={i < q.paragraphs.length - 1 ? "m-0 mb-4" : "m-0"}>
                    {para}
                  </p>
                ))}
              </blockquote>
              <figcaption className="mt-8 pt-5 border-t border-white/10">
                <strong className="block text-white text-[15px] font-bold">
                  {q.name}
                </strong>
                <span className="block text-white/60 text-[13.5px] mt-0.5">
                  {q.role}
                </span>
                <div className="mt-6 h-[54px] flex items-start">
                  <Image
                    src={q.logo.src}
                    alt={q.logo.alt}
                    width={q.logo.width}
                    height={q.logo.height}
                    className="opacity-85"
                    style={{ width: q.logo.width, height: q.logo.height }}
                  />
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
