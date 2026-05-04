import { Button } from "../Button";
import { Container } from "../Container";

export function CtaBand() {
  return (
    <section className="py-24 lg:py-[120px] text-center border-b border-rule">
      <Container variant="narrow">
        <h2 className="font-serif italic font-normal text-[36px] lg:text-[54px] leading-[1.1] tracking-[-0.02em] mb-5 text-ink">
          Try it on your own work.
        </h2>
        <p className="m-0 mx-auto mb-9 text-slate-700 text-[16px] lg:text-[18px] max-w-[54ch]">
          Book a demo with the founder, run your reports through it live, and
          decide for yourself.
        </p>
        <Button
          href="mailto:Harry@usewriteup.co.uk?subject=WriteUp%20demo%20request"
          size="lg"
        >
          Book a demo
        </Button>
      </Container>
    </section>
  );
}
