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
      "“Body text describes the property as ‘in good repair throughout’ while the rationale applies a £45,000 capital deduction for end-of-life services.”",
    why: "Internal contradictions read worst on review — they suggest the report wasn’t read end-to-end before sign-off.",
  },
  {
    id: "rsn",
    numCol: "02",
    title: "Gaps in valuation reasoning",
    summary:
      "Commentary that lacks a clear logical thread from comparable evidence to the valuation conclusion.",
    example:
      "“Three comparables tabled and weighted, but the rationale jumps from an evidenced rental tone of £42 per sq ft to a capital value of £1.82m without articulating the yield applied or how the comparables informed the conclusion.”",
    why: "A clear thread from evidence to conclusion is what distinguishes a defensible valuation from one that reads as opinion. The reasoning gap is the issue that survives manual QA but fails on challenge.",
  },
  {
    id: "dim",
    numCol: "03",
    title: "Mismatched floor areas",
    summary:
      "Sq m and sq ft inconsistencies between the schedule, body text, and valuation rationale.",
    example:
      "“Schedule cites 1,240 sq ft. Rationale paragraph references 112.6 sq m. Correct conversion is 115.2 sq m — a 2.3% drift propagating into the £/sq m derivation.”",
    why: "Floor area drift is the single most common cause of capital-value variance, and one of the first things a panel manager checks on a returned report.",
  },
  {
    id: "comp",
    numCol: "04",
    title: "Inconsistent comparables",
    summary:
      "Comparables referenced in body text that differ from those tabled or weighted in the valuation evidence.",
    example:
      "“Three comparables tabled in §6. Two are referenced by address in the rationale; the third paragraph reference (45 Wickham Rd) appears nowhere in the table.”",
    why: "Unreferenced comparables undermine the audit trail, weaken the methodology section, and are a common point of challenge in lender review.",
  },
  {
    id: "rb",
    numCol: "05",
    title: "Missing Red Book requirements",
    summary:
      "Mandatory inclusions absent or partially addressed under current Red Book Global Standards.",
    example:
      "“AVM not engaged statement absent. Conflict of interest declaration is present but does not address the addressee lender’s preferred form of words.”",
    why: "Red Book gaps are the most common reason a report is returned for amendment, regardless of how sound the valuation rationale itself may be.",
  },
  {
    id: "mth",
    numCol: "06",
    title: "Mathematical errors",
    summary:
      "Arithmetic inconsistencies in capital values, GIA/NIA ratios, and rate-per-sq-ft derivations.",
    example:
      "“Capital value derived as £1,240,000 at £620 per sq ft on a stated NIA of 1,950 sq ft. Implied area: 2,000 sq ft. NIA understated or rate misstated.”",
    why: "Arithmetic mistakes survive nearly all manual checks because they look correct in isolation. WriteUp checks the relationships, not just the numbers.",
  },
  {
    id: "ldr",
    numCol: "07",
    title: "Lender-specific guidance violations",
    summary:
      "Deviations from the addressee lender’s panel requirements, standing instructions, or bespoke valuation mandate.",
    example:
      "“Addressee lender requires a 12-month rental forecast for HMO properties valued above £500k. Forecast is not present in the rationale or appendices.”",
    why: "Lender-specific guidance is the most likely thing to be missed by surveyors working across multiple panels — and the most likely to trigger a returned instruction.",
  },
];

export function CatchesList() {
  return (
    <section
      id="what-it-catches"
      className="py-20 lg:py-24 border-b border-rule scroll-mt-20"
    >
      <Container>
        <div className="mb-12">
          <span className="eyebrow block mb-[18px]">Section 01 · Scope</span>
          <h2 className="font-serif text-[36px] lg:text-[44px] font-normal leading-[1.1] tracking-[-0.02em] mb-[18px] max-w-[18ch]">
            What WriteUp checks before your report leaves your desk.
          </h2>
          <p className="m-0 text-slate-700 text-[16px] lg:text-[17.5px] leading-[1.6] max-w-[60ch]">
            Some of the checks WriteUp runs on every audit. Each flag is a question for the surveyor, never a correction — surfaced with the exact text found and a brief rationale; the report stays yours, and your name stays on it.
          </p>
        </div>
        <div className="border-t border-rule">
          {catches.map((c) => (
            <details
              key={c.id}
              className="group border-b border-rule open:bg-white transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)]"
            >
              <summary className="grid items-start py-7 cursor-pointer gap-y-1.5 gap-x-3 grid-cols-[1fr_28px] md:gap-x-8 md:grid-cols-[80px_1fr_2fr_36px]">
                <div className="font-mono text-xs text-slate-400 font-medium tracking-[0.04em] col-start-1 row-start-1 md:row-start-1 md:col-start-1 md:pt-1">
                  {c.numCol}
                </div>
                <h3 className="text-lg font-semibold text-ink tracking-[-0.005em] m-0 transition-colors duration-150 group-hover:text-teal col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1 font-sans">
                  {c.title}
                </h3>
                <p className="text-[15px] leading-[1.6] text-slate-700 m-0 col-span-full row-start-3 md:col-span-1 md:col-start-3 md:row-start-1">
                  {c.summary}
                </p>
                <div
                  aria-hidden
                  className="w-7 h-7 rounded-full border border-rule bg-paper flex items-center justify-center text-slate-500 text-base font-light leading-none self-start transition-all duration-200 [transition-timing-function:var(--ease-out-quart)] group-hover:border-ink group-hover:text-ink group-open:bg-ink group-open:text-white group-open:border-ink group-open:rotate-45 col-start-2 row-start-1 md:col-start-4 md:row-start-1"
                >
                  +
                </div>
              </summary>
              <div className="grid gap-6 pb-6 md:grid-cols-2 md:gap-10 md:pl-28 md:pb-8 md:pt-1 motion-safe:animate-[disclosure-fade_0.3s_var(--ease-out-quart)]">
                <div>
                  <h4 className="font-mono text-[10.5px] font-semibold tracking-[0.14em] uppercase text-slate-500 m-0 mb-3">
                    Example flag
                  </h4>
                  <div className="bg-paper border-l-2 border-teal py-3.5 px-[18px] text-ink text-sm italic leading-[1.65]">
                    {c.example}
                  </div>
                </div>
                <div>
                  <h4 className="font-mono text-[10.5px] font-semibold tracking-[0.14em] uppercase text-slate-500 m-0 mb-3">
                    Why it matters
                  </h4>
                  <p className="text-slate-700 text-[14.5px] leading-[1.65] m-0">
                    {c.why}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
