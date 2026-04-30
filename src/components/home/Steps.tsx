import { Container } from "../Container";

const steps = [
  {
    num: "STEP 01",
    title: "Upload the draft",
    desc: "Word document or PDF. Processed in a private workspace — never stored, never used to train models.",
  },
  {
    num: "STEP 02",
    title: "Audit runs in 1–2 minutes",
    desc: "Dimensions, comparables, Red Book, logic, maths, lender-specific guidance — each surfaced with the source text.",
  },
  {
    num: "STEP 03",
    title: "You review and accept",
    desc: "Every flag is presented for your judgement. Accept, reject, or amend — the report stays yours throughout.",
  },
];

export function Steps() {
  return (
    <section className="bg-white">
      <Container>
        <div className="pt-20 lg:pt-24 pb-12 lg:pb-14">
          <span className="eyebrow block mb-[18px]">Section 02 · Process</span>
          <h2 className="font-serif text-[36px] lg:text-[44px] font-normal leading-[1.1] tracking-[-0.02em] m-0 max-w-[18ch]">
            One pass before sign off.
          </h2>
        </div>
      </Container>
      <div className="border-t border-b border-rule">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`py-10 md:py-14 md:px-8 first:md:pl-0 last:md:pr-0 ${
                  i < steps.length - 1
                    ? "border-b md:border-b-0 md:border-r border-rule"
                    : ""
                }`}
              >
                <div className="font-mono text-[11px] font-medium text-slate-400 tracking-[0.14em]">
                  {step.num}
                </div>
                <h3 className="text-[17px] font-semibold mt-4 mb-3 text-ink">
                  {step.title}
                </h3>
                <p className="m-0 text-slate-700 text-[14.5px] leading-[1.65] max-w-[36ch]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
