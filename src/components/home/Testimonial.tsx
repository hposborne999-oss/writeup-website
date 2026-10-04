import { Container } from "../Container";

// One client testimonial, presented as a single featured statement rather than
// a "testimonials" section with one card. The dark band echoes the testimonial
// box in the outreach email. Paul Aylott's words are verbatim; the one sentence
// in brighter white is emphasis only.
export function Testimonial() {
  return (
    <section
      id="in-practice"
      className="py-20 lg:py-[104px] bg-petrol text-white scroll-mt-20"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
          {/* Label and quote mark */}
          <div className="flex lg:flex-col items-baseline lg:items-start gap-4 lg:gap-6">
            <span className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[#8ee4ba]/80">
              In practice
            </span>
            <span
              aria-hidden
              className="hidden lg:block font-[Georgia,serif] text-[88px] leading-[0.6] text-[#8ee4ba]"
            >
              &ldquo;
            </span>
          </div>

          <figure className="m-0 max-w-[760px]">
            <blockquote className="m-0 text-[19px] lg:text-[23px] leading-[1.6] text-white/75">
              <p className="m-0 mb-6">
                We&rsquo;re very selective about where technology adds value
                into our valuation process, and WriteUp is proving its worth. It
                is embedded in our quality assurance procedure: the valuer runs
                the audit before the report goes up for a director&rsquo;s
                review, and we keep a copy on file as evidence the check has
                been completed.
              </p>
              <p className="m-0">
                <span className="text-white font-medium">
                  The director review now takes notably less time.
                </span>{" "}
                WriteUp is now a valuable part of our Valuers toolkit, helping
                us to consistently deliver work of the highest quality and
                meeting clients&rsquo; deadlines.
              </p>
            </blockquote>
            <figcaption className="mt-10 pt-6 border-t border-white/10">
              <strong className="block text-white text-[15px] font-bold">
                Paul Aylott
              </strong>
              <span className="block text-white/60 text-[13.5px] mt-0.5">
                Head of Valuation, Glenny Chartered Surveyors
              </span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
