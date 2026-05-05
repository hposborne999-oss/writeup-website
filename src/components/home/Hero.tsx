import { Button } from "../Button";
import { Container } from "../Container";

export function Hero() {
  return (
    <header className="pt-24 lg:pt-[120px] pb-16 lg:pb-20 border-b border-rule">
      <Container>
        <h1 className="font-serif font-normal text-[44px] sm:text-[60px] lg:text-[76px] leading-[1.02] tracking-[-0.025em] text-ink mb-7 max-w-[22ch]">
          You didn&apos;t{" "}
          <em className="italic text-teal">qualify</em>
          <br />
          to proofread.
        </h1>
        <p className="text-[17px] lg:text-[19.5px] leading-[1.55] text-slate-700 max-w-[62ch] mb-10">
          WriteUp is an AI audit tool built for valuation surveyors. It
          checks your work before you do. Faster review, fewer oversights,
          and reports that stand up under scrutiny.
        </p>
        <div className="flex flex-wrap gap-[14px] items-center">
          <Button
            href="mailto:Harry@usewriteup.co.uk?subject=WriteUp%20demo%20request"
            size="lg"
          >
            Request a demo
          </Button>
          <Button href="#from-the-founder" variant="secondary" size="lg">
            About WriteUp
          </Button>
        </div>
      </Container>
    </header>
  );
}
