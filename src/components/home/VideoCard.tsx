import { Container } from "../Container";

export function VideoCard() {
  return (
    <section className="py-16 lg:py-[88px] bg-paper border-b border-rule">
      <Container>
        <div className="relative bg-petrol rounded-md aspect-video overflow-hidden shadow-[0_30px_60px_-20px_rgba(10,34,38,0.25),0_1px_0_rgba(0,0,0,0.04)]">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 text-white/55 font-mono text-xs tracking-[0.1em] uppercase bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.012),rgba(255,255,255,0.012)_12px,transparent_12px,transparent_24px)]">
            <div className="px-3.5 py-2 border border-dashed border-white/20 rounded-sm">
              Looped product video here · 3–5s
            </div>
            <div className="text-[10px] tracking-[0.05em] normal-case font-sans px-6 max-w-[60ch] text-center">
              An audit running on a sample report — live category checklist tick-off into &ldquo;Found 12 issues&rdquo;
            </div>
          </div>
        </div>
        <div className="flex justify-between items-baseline mt-[18px] text-[13px] text-slate-500 gap-4 flex-wrap">
          <div>An audit on a redacted draft.</div>
          <div className="font-mono text-slate-700">FIG. 01</div>
        </div>
      </Container>
    </section>
  );
}
