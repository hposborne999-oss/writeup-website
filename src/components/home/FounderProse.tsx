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
          <p className="m-0 mb-[22px]">
            &ldquo;As a practising MRICS valuation surveyor, I know how long
            it can take to get reports ready to leave your desk. I started
            using AI in my own practice to speed up my QA process by flagging
            any errors and inconsistencies.
          </p>
          <p className="m-0">
            I realised it would be useful for others, so I built WriteUp to
            create a second pair of eyes. A practical layer of support that
            keeps the surveyor in control, de-risking their reports, and
            giving back time to spend on more valuable work.&rdquo;
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
              MRICS · Founder, WriteUp
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
