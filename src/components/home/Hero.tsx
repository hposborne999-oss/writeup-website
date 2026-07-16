import { Button } from "../Button";
import { Container } from "../Container";
import { AuditOverlay } from "./AuditOverlay";

export function Hero() {
  return (
    <header className="pt-24 lg:pt-[120px] pb-16 lg:pb-20 border-b border-rule">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          {/* Left — copy */}
          <div>
            <h1 className="font-serif font-normal text-[44px] sm:text-[56px] lg:text-[62px] leading-[1.03] tracking-[-0.025em] text-ink mb-7 max-w-[20ch]">
              RICS Tech Partner AI{" "}
              <em className="italic text-teal">review</em> for valuation
              reports.
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.55] text-slate-700 max-w-[48ch] mb-10">
              Built by a practising MRICS surveyor. Faster review, fewer
              oversights, and reports that stand up under scrutiny.
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

          {/* Right — audit product panel on the textured band */}
          <div className="min-w-0">
            <AuditOverlay />
          </div>
        </div>
      </Container>
    </header>
  );
}
