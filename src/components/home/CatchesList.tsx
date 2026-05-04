"use client";

import { useState } from "react";
import { Container } from "../Container";

type Catch = {
  id: string;
  numCol: string;
  title: string;
  summary: string;
  example: string;
  why: string;
};

const catches: Catch[] = [
  {
    id: "nar",
    numCol: "01",
    title: "Body ↔ figure contradictions",
    summary:
      "Statements in the report commentary that conflict with the capital value, yield, or rental evidence cited.",
    example:
      "Body text describes the property as “in good repair throughout”, while the rationale states a £50,000 retention.",
    why: "Internal contradictions within the report are hard to spot. The audit reads and conceptualises the entire report and is able to spot these errors.",
  },
  {
    id: "rsn",
    numCol: "02",
    title: "Gaps in valuation reasoning",
    summary:
      "Commentary that lacks a clear logical thread from comparable evidence to the valuation conclusion.",
    example:
      "The comparable schedule contained three C3 transactions. However, the rationale mentions yield information from investment transactions. There were no investment comparable evidence provided in the comparable schedule.",
    why: "A clear thread from evidence to conclusion is what distinguishes a defensible valuation. The audit helps illuminate any gaps in rationale.",
  },
  {
    id: "dim",
    numCol: "03",
    title: "Mismatched floor areas",
    summary:
      "Sq m and sq ft inconsistencies between the schedule, body text, and valuation rationale.",
    example:
      "Schedule cites 1,240 sq ft. Rationale paragraph references 112.6 sq m. Correct conversion is 115.2 sq m.",
    why: "Inconsistent and incorrect floor area schedules are difficult to catch and can have a huge impact on certain valuations. The AI goes through and checks all area schedules and ensures it is consistent through the valuation and the report.",
  },
  {
    id: "comp",
    numCol: "04",
    title: "Inconsistent comparables",
    summary:
      "Comparables referenced in body text that differ from those tabled or weighted in the valuation evidence.",
    example:
      "Comparable one was mentioned to be of better specification and a larger size than the subject property. However, the subject was valued lower than this comparable. This needs more explanation in your valuation justification.",
    why: "It is important that the notes on comparable transactions are consistent throughout the report, and that the valuation justification represents the analysis of comparable evidence.",
  },
  {
    id: "mth",
    numCol: "05",
    title: "Mathematical errors",
    summary:
      "Arithmetic inconsistencies in capital values, GIA/NIA ratios, and rate-per-sq-ft derivations.",
    example:
      "The capital value of £1,240,000 at £620 per sq ft implies a floor area of 2,000 sq ft — but the report states the NIA as 1,950 sq ft. Either the floor area, the rate, or the valuation figure is incorrect.",
    why: "Arithmetic mistakes survive nearly all manual checks because they look correct in isolation. WriteUp checks all mathematical calculations are correct and consistent throughout the whole report.",
  },
  {
    id: "ldr",
    numCol: "06",
    title: "Lender-specific guidance violations",
    summary:
      "Deviations from the addressee lender's panel requirements, standing instructions, or bespoke valuation mandate.",
    example:
      "Addressee lender requires confirmation of the percentage of ex-local authority ownership within the block. This is not addressed in the report.",
    why: "Lender-specific guidance is the most likely thing to be missed by surveyors working across multiple panels — and the most likely to trigger a returned instruction. The lender guidance for a particular lender is reviewed when auditing reports.",
  },
];

export function CatchesList() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="what-it-catches"
      className="py-20 lg:py-24 border-b border-rule scroll-mt-20"
    >
      <Container>
        <div className="mb-12">
          <span className="eyebrow block mb-[18px]">Section 01 · Examples</span>
          <h2 className="font-serif text-[36px] lg:text-[44px] font-normal leading-[1.1] tracking-[-0.02em] mb-[18px] max-w-[20ch]">
            What WriteUp looks for.
          </h2>
          <p className="m-0 text-slate-700 text-[16px] lg:text-[17.5px] leading-[1.6] max-w-[62ch]">
            Below are some examples of errors caught by the AI audit.
          </p>
        </div>

        <div className="rounded-xl border border-rule overflow-hidden bg-white">
          {catches.map((c, idx) => {
            const isOpen = openId === c.id;
            const isLast = idx === catches.length - 1;
            const triggerId = `catch-trigger-${c.id}`;
            const panelId = `catch-panel-${c.id}`;
            return (
              <div
                key={c.id}
                className={`transition-colors duration-300 [transition-timing-function:var(--ease-out-quart)] ${
                  isLast ? "" : "border-b border-rule"
                } ${isOpen ? "bg-paper" : "bg-white"}`}
              >
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : c.id)}
                  className="group w-full text-left px-6 md:px-10 py-7 grid items-start cursor-pointer gap-y-1.5 gap-x-3 grid-cols-[1fr_28px] md:gap-x-8 md:grid-cols-[60px_1fr_2fr_36px]"
                >
                  <div className="font-mono text-xs text-slate-400 font-medium tracking-[0.04em] col-start-1 row-start-1 md:row-start-1 md:col-start-1 md:pt-1">
                    {c.numCol}
                  </div>
                  <h3
                    className={`text-lg font-semibold tracking-[-0.005em] m-0 transition-colors duration-150 col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1 font-sans ${
                      isOpen ? "text-teal" : "text-ink group-hover:text-teal"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-slate-700 m-0 col-span-full row-start-3 md:col-span-1 md:col-start-3 md:row-start-1">
                    {c.summary}
                  </p>
                  <div
                    aria-hidden
                    className={`w-7 h-7 rounded-full border flex items-center justify-center text-base font-light leading-none self-start transition-all duration-300 [transition-timing-function:var(--ease-out-quart)] col-start-2 row-start-1 md:col-start-4 md:row-start-1 ${
                      isOpen
                        ? "bg-ink text-white border-ink rotate-45"
                        : "bg-white text-slate-500 border-rule group-hover:border-ink group-hover:text-ink"
                    }`}
                  >
                    +
                  </div>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={`grid transition-[grid-template-rows] duration-500 [transition-timing-function:var(--ease-emphasis)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`grid gap-8 px-6 md:px-10 pb-9 md:grid-cols-2 md:gap-10 transition-opacity duration-300 [transition-timing-function:var(--ease-out-quart)] ${
                        isOpen ? "opacity-100 delay-150" : "opacity-0"
                      }`}
                    >
                      <div>
                        <h4 className="font-mono text-[10.5px] font-semibold tracking-[0.14em] uppercase text-slate-500 m-0 mb-3">
                          Error found
                        </h4>
                        <div className="bg-white border-l-2 border-teal py-3.5 px-[18px] text-ink text-[14px] italic leading-[1.65]">
                          {c.example}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-mono text-[10.5px] font-semibold tracking-[0.14em] uppercase text-slate-500 m-0 mb-3">
                          The detail
                        </h4>
                        <p className="text-slate-700 text-[14.5px] leading-[1.65] m-0">
                          {c.why}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
