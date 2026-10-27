import Image from "next/image";
import { Button } from "../Button";
import { AuditOverlay } from "./AuditOverlay";

export function Hero() {
  return (
    <header className="pt-24 lg:pt-[120px] pb-16 lg:pb-20 border-b border-rule overflow-hidden">
      <div className="hero-audit-grid">
        {/* Left — copy (aligned to the site container's left edge) */}
        <div className="hero-audit-copy">
          <h1 className="font-serif font-normal text-[36px] sm:text-[46px] lg:text-[length:clamp(36px,calc(5vw_-_25px),47px)] leading-[1.06] tracking-[-0.025em] text-ink mb-7 max-w-[24ch]">
            Faster <em className="italic text-teal">review</em>, fewer
            <br />
            oversights, and
            <br />
            reports that stand up
            <br />
            under scrutiny.
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.55] text-slate-700 max-w-[46ch] mb-12">
            A RICS Tech Network Solution Provider AI review for valuation
            reports, built by a practising MRICS surveyor.
          </p>
          <div className="flex flex-wrap gap-[14px] items-center">
            <Button href="/demo" size="lg">
              Book a demo
            </Button>
            <Button href="/example-audit" variant="secondary" size="lg">
              See a sample audit
            </Button>
          </div>
          {/* RICS Tech Network badge, the file exactly as RICS supplied it
              (guidance Oct 2026: no cropping or recolouring). The file's own
              margin is the required clear space, so the image is pulled left
              by that margin to line the badge up with the buttons. At 450px
              the badge itself is 322 x 97px (258 x 78px on phones), above
              RICS's 200 x 60 minimum. The top margin sets the gap above the
              badge to 48px, matching the text-to-buttons gap and still more
              than the lion's head (RICS's clear space, ~45px here). */}
          <Image
            src="/rics/rics-tech-network-solution-provider.svg"
            alt="RICS Tech Network Solution Provider"
            width={450}
            height={203}
            priority
            className="mt-[6px] -ml-[52px] w-[360px] sm:-mt-[5px] sm:-ml-[65px] sm:w-[450px] max-w-none h-auto"
          />
        </div>

        {/* Right — audit product panel; band bleeds off the right boundary */}
        <div className="hero-audit-stage">
          <AuditOverlay />
        </div>
      </div>
    </header>
  );
}
