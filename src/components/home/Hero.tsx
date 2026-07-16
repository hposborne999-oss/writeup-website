import { Button } from "../Button";
import { AuditOverlay } from "./AuditOverlay";

export function Hero() {
  return (
    <header className="pt-24 lg:pt-[120px] pb-16 lg:pb-20 border-b border-rule overflow-hidden">
      <div className="hero-audit-grid">
        {/* Left — copy (aligned to the site container's left edge) */}
        <div className="hero-audit-copy">
          <h1 className="font-serif font-normal text-[44px] sm:text-[54px] lg:text-[62px] leading-[1.03] tracking-[-0.025em] text-ink mb-7 max-w-[18ch]">
            Faster <em className="italic text-teal">review</em>, fewer
            oversights, and reports that stand up under scrutiny.
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.55] text-slate-700 max-w-[46ch] mb-10">
            A RICS Tech Partner AI review for valuation reports, built by a
            practising MRICS surveyor.
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
        </div>

        {/* Right — audit product panel; band bleeds off the right boundary */}
        <div className="hero-audit-stage">
          <AuditOverlay />
        </div>
      </div>
    </header>
  );
}
