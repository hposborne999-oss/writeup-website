"use client";

import { useState } from "react";
import { Container } from "../Container";

type Example = {
  id: string;
  numCol: string;
  title: string;
  error: string;
  detail: string;
};

type Bucket = {
  id: string;
  numCol: string;
  title: string;
  summary: string;
  examples: Example[];
};

const buckets: Bucket[] = [
  {
    id: "incon",
    numCol: "01",
    title: "Inconsistencies",
    summary:
      "Figures, dimensions, and calculations that don't reconcile across the report.",
    examples: [
      {
        id: "incon-1",
        numCol: "01.1",
        title: "Capital value mismatch",
        error:
          "Front cover and executive summary both quote a Market Value of £1,750,000. The valuation rationale on page 14 concludes at £1,570,000 — a difference of £180,000 not explained anywhere in the report.",
        detail:
          "The audit reads every value mention in the report — cover, summary, schedule, rationale, conclusion — and flags any figure that doesn't reconcile to the others.",
      },
      {
        id: "incon-2",
        numCol: "01.2",
        title: "Incorrect area schedule",
        error:
          "Area schedule lists Flats 1, 3, 4 and 5. Flat 2 is described in the body text and shown on the floorplan but has been omitted from the schedule. Total floor area understates by 86 sq m and capital value by an estimated £450,000.",
        detail:
          "For many valuation reports, the area schedule is relied upon to arrive at the opinion of value. A unit missed at this stage flows through to the valuation commentary and can produce an incorrect figure. The audit reads the report and the area schedule, and flags any unit that's described but not measured.",
      },
      {
        id: "incon-3",
        numCol: "01.3",
        title: "Yield inconsistencies",
        error:
          "The rationale states a net initial yield of 6.25%. The rent (£185,000) and capital value (£2,800,000) cited, allowing for purchaser's costs of 6.8%, imply a net initial yield of 6.18%. Either the yield, the rent, the value, or the purchaser's costs is misstated.",
        detail:
          "The audit re-tests every quoted yield against the rent, value, and standard purchaser's cost conventions. Any combination that doesn't reconcile is flagged.",
      },
    ],
  },
  {
    id: "rsn",
    numCol: "02",
    title: "Reasoning & judgement",
    summary:
      "Where the valuation justification doesn't support the reported value.",
    examples: [
      {
        id: "rsn-1",
        numCol: "02.1",
        title: "Inconsistent comparable analysis",
        error:
          "Three comparables are tabled with rates ranging from £485 to £540 per sq ft. The subject is valued at £465 per sq ft, below the bottom of the range, but the rationale describes the subject as “consistent with the upper quartile of recent transactions in the area”.",
        detail:
          "The audit reads the comparable analysis and forms a view on how each comparable relates to the subject property. Conclusions that don't follow from the evidence presented are flagged.",
      },
      {
        id: "rsn-2",
        numCol: "02.2",
        title: "Tenant covenant contradiction",
        error:
          "Investment summary describes the tenant as “a strong covenant with audited accounts and a long trading history at the property”. Schedule of leases on page 9 records the tenant entering administration in February 2026.",
        detail:
          "Historic tenant information can carry over from previous reports. The audit reads the report as one document and flags rationale text that contradicts the tenant data elsewhere.",
      },
      {
        id: "rsn-3",
        numCol: "02.3",
        title: "Unexpired term inconsistency",
        error:
          "Body text refers to the property as “long leasehold” and concludes it is “good security for long-term lending”. Lease abstract on page 6 shows 64 years unexpired — below the 80-year threshold of most major mortgage lenders. The rationale does not address how the unexpired term affects mortgageability or value.",
        detail:
          "The audit reads the lease abstract alongside the body's market commentary and flags conclusions that don't account for the term remaining.",
      },
    ],
  },
  {
    id: "req",
    numCol: "03",
    title: "Report-specific requirements",
    summary:
      "Compliance that varies by client and report type.",
    examples: [
      {
        id: "req-1",
        numCol: "03.1",
        title: "Lender-specific clause missing",
        error:
          "The addressee lender's standing valuation instructions require explicit confirmation that the property would let within 90 days of vacant possession at the rental figure quoted. The report quotes a market rent but does not address marketing period.",
        detail:
          "It's a challenge reporting in line with many varying lender requirements. Lender guidance notes can be uploaded to the audit, which then checks each report against those specific requirements alongside the standard checks.",
      },
      {
        id: "req-2",
        numCol: "03.2",
        title: "Client-specific requirements",
        error:
          "This client's standing instructions require comparable evidence to comprise at least 4 sale and 4 rental transactions completed within the last 6 months. The report includes 3 sale transactions, two of which are dated 9 and 11 months prior to the valuation date. The rationale does not address why the criteria has not been met.",
        detail:
          "Many clients have particular criteria for what they want included within the valuation report. Custom client requirements can be uploaded; once selected, the audit checks each report against those specific requirements alongside the standard checks.",
      },
      {
        id: "req-3",
        numCol: "03.3",
        title: "Cladding/EWS1 disclosure missing",
        error:
          "The subject is described as a residential apartment block of 8 storeys, constructed 2008. The report does not address external wall systems or reference an EWS1 form. Most major lenders require explicit comment on EWS1 status for residential buildings above 11 metres.",
        detail:
          "In this situation the audit recognises the building is 8 storeys and flags that an EWS1 form needs to be addressed in the report. Lender requirements vary by building height — the audit knows the relevant thresholds for the addressee and surfaces any required disclosure that's missing before the report is submitted.",
      },
    ],
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
          <span className="eyebrow block mb-[18px]">Section 01</span>
          <h2 className="font-serif text-[36px] lg:text-[44px] font-normal leading-[1.1] tracking-[-0.02em] mb-[18px] max-w-[20ch]">
            What WriteUp looks for.
          </h2>
          <p className="m-0 text-slate-700 text-[16px] lg:text-[17.5px] leading-[1.6] max-w-[62ch]">
            Dimensions, comparables, Red Book logic, maths, lender-specific
            guidance all checked for consistency. Accept, reject, or amend —
            the report stays yours throughout.
          </p>
        </div>

        <div className="rounded-xl border border-rule overflow-hidden bg-white">
          {buckets.map((b, idx) => {
            const isOpen = openId === b.id;
            const isLast = idx === buckets.length - 1;
            const triggerId = `bucket-trigger-${b.id}`;
            const panelId = `bucket-panel-${b.id}`;
            return (
              <div
                key={b.id}
                className={`transition-colors duration-300 [transition-timing-function:var(--ease-out-quart)] ${
                  isLast ? "" : "border-b border-rule"
                } ${isOpen ? "bg-paper" : "bg-white"}`}
              >
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : b.id)}
                  className="group w-full text-left px-6 md:px-10 py-7 grid items-start cursor-pointer gap-y-1.5 gap-x-3 grid-cols-[1fr_28px] md:gap-x-8 md:grid-cols-[60px_1fr_2fr_36px]"
                >
                  <div className="font-mono text-xs text-slate-400 font-medium tracking-[0.04em] col-start-1 row-start-1 md:row-start-1 md:col-start-1 md:pt-1">
                    {b.numCol}
                  </div>
                  <h3
                    className={`text-lg font-semibold tracking-[-0.005em] m-0 transition-colors duration-150 col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1 font-sans ${
                      isOpen ? "text-teal" : "text-ink group-hover:text-teal"
                    }`}
                  >
                    {b.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-slate-700 m-0 col-span-full row-start-3 md:col-span-1 md:col-start-3 md:row-start-1">
                    {b.summary}
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
                      className={`px-6 md:px-10 pb-9 transition-opacity duration-300 [transition-timing-function:var(--ease-out-quart)] ${
                        isOpen ? "opacity-100 delay-150" : "opacity-0"
                      }`}
                    >
                      {b.examples.map((ex, exIdx) => (
                        <div
                          key={ex.id}
                          className={
                            exIdx === 0
                              ? ""
                              : "mt-8 pt-8 border-t border-rule"
                          }
                        >
                          <div className="flex items-baseline gap-3 mb-4">
                            <span className="font-mono text-[11px] text-slate-400 font-medium tracking-[0.04em]">
                              {ex.numCol}
                            </span>
                            <h4 className="text-[17px] font-semibold tracking-[-0.005em] m-0 text-ink font-sans">
                              {ex.title}
                            </h4>
                          </div>
                          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                            <div>
                              <h5 className="font-mono text-[10.5px] font-semibold tracking-[0.14em] uppercase text-slate-500 m-0 mb-3">
                                Error found
                              </h5>
                              <div className="bg-white border-l-2 border-teal py-3.5 px-[18px] text-ink text-[14px] italic leading-[1.65]">
                                {ex.error}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-mono text-[10.5px] font-semibold tracking-[0.14em] uppercase text-slate-500 m-0 mb-3">
                                The detail
                              </h5>
                              <p className="text-slate-700 text-[14.5px] leading-[1.65] m-0">
                                {ex.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
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
