import { Button } from "../Button";
import { AuditOverlay } from "./AuditOverlay";

export function Hero() {
  return (
    <header className="pt-24 lg:pt-[120px] pb-16 lg:pb-20 border-b border-rule overflow-hidden">
      <div className="hero-audit-grid">
        {/* Left — copy (aligned to the site container's left edge) */}
        <div className="hero-audit-copy">
          <h1 className="hero-h1 text-[36px] sm:text-[46px] leading-[1.06] text-ink mb-7 max-w-[24ch]">
            Faster <em className="hero-em text-teal">review</em>, fewer
            <br />
            oversights, and
            <br />
            reports that stand up
            <br />
            under scrutiny.
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.55] text-slate-700 max-w-[46ch] mb-10">
            A RICS Tech Partner AI review for valuation reports, built by a
            practising MRICS surveyor.
          </p>
          <div className="flex flex-wrap gap-[14px] items-center">
            <Button href="/demo" size="lg">
              Book a demo
            </Button>
            <Button href="#from-the-founder" variant="secondary" size="lg">
              About WriteUp
            </Button>
          </div>
        </div>

        {/* Right — audit product panel; band bleeds off the right boundary */}
        <div className="hero-audit-stage">
          <AuditOverlay />
        </div>
      </div>
    </header>
  );
}
