import { Button } from "../Button";
import { Container } from "../Container";

export function Hero() {
  return (
    <header className="pt-24 lg:pt-[120px] pb-16 lg:pb-20 border-b border-rule">
      <Container>
        <div className="flex items-center gap-[10px] mb-8 font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-slate-500">
          <span aria-hidden className="w-6 h-px bg-slate-400" />
          <span>RICS Tech Partner</span>
        </div>
        <h1 className="font-serif font-normal text-[44px] sm:text-[60px] lg:text-[76px] leading-[1.02] tracking-[-0.025em] text-ink mb-7 max-w-[18ch]">
          Catch what careful eyes <em className="italic text-teal">miss</em>
        </h1>
        <p className="text-[17px] lg:text-[19.5px] leading-[1.55] text-slate-700 max-w-[62ch] mb-10">
          WriteUp is a RICS Tech Partner AI audit tool for RICS reports.
          Built by a practising MRICS Chartered Surveyor, it reviews finished
          reports for the kinds of errors a careful manual QA still misses —
          quietly, in 1–2 minutes, and entirely on the surveyor&apos;s terms.
        </p>
        <div className="flex flex-wrap gap-[14px] items-center">
          <Button
            href="mailto:Harry@usewriteup.co.uk?subject=WriteUp%20demo%20request"
            size="lg"
          >
            Request a demo
          </Button>
          <Button href="#what-it-catches" variant="secondary" size="lg">
            Read the brief
          </Button>
          <span className="ml-1 hidden sm:inline-block text-[13px] text-slate-500">
            <span className="text-slate-400">·</span> 30-day money-back guarantee
          </span>
        </div>
      </Container>
    </header>
  );
}
