import { Container } from "../Container";

export function FounderProse() {
  return (
    <section
      id="from-the-founder"
      className="py-20 lg:py-[104px] bg-white border-b border-rule scroll-mt-20"
    >
      <Container variant="narrow">
        <span className="eyebrow block mb-6">From the founder</span>
        <div className="text-[18px] lg:text-[21px] leading-[1.6] text-ink">
          <p className="text-[22px] lg:text-[26px] font-medium leading-[1.4] tracking-[-0.01em] m-0 mb-[30px] text-ink">
            I&apos;m a practising MRICS valuation surveyor. I write reports most weeks, and like every surveyor, I want to be sure that nothing has slipped through before they leave my desk.
          </p>
          <p className="m-0 mb-[22px]">
            Anyone who writes RICS reports knows the feeling of the final read. Ensuring consistency throughout the report, catching inconsistencies between schedule and body, comparables that don&apos;t quite line up, a Red Book inclusion not worded the way an addressee lender expects — the kind of thing a careful manual QA still misses on the second read. I wanted a second pair of eyes that didn&apos;t get tired.
          </p>
          <p className="m-0">
            WriteUp is a practical layer of support that keeps the valuer in control. Every error is reviewed and accepted by the surveyor. The aim is a to de-risk the surveyors work, speed up the auditing process and to help produce reports that stand up under scrutiny.
          </p>
        </div>
        <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-rule">
          <div className="w-11 h-11 rounded-full bg-petrol text-white flex items-center justify-center text-sm font-semibold">
            HO
          </div>
          <div className="text-[13.5px] text-slate-700">
            <strong className="block text-ink text-[14.5px] font-semibold">
              Harry Osborne
            </strong>
            <span className="text-slate-500">
              MRICS · Founder, WriteUp Limited
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
