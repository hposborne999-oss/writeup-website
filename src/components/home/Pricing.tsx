import { Button } from "../Button";
import { Container } from "../Container";

type Tier = {
  tier: string;
  desc: string;
  amount: string;
  amountSuffix?: string;
  cta: { label: string; href: string; variant: "primary" | "secondary" };
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    tier: "Solo",
    desc: "For individual registered valuers. Personal phrase library, email support.",
    amount: "£89",
    amountSuffix: " / mo",
    cta: {
      label: "Request a demo",
      href: "mailto:Harry@usewriteup.co.uk?subject=WriteUp%20Solo%20demo%20request",
      variant: "secondary",
    },
  },
  {
    tier: "Team",
    desc: "For valuation teams and lender-side QA. 5 seats, shared phrase library, priority support.",
    amount: "£299",
    amountSuffix: " / mo",
    cta: {
      label: "Request a demo",
      href: "mailto:Harry@usewriteup.co.uk?subject=WriteUp%20Team%20demo%20request",
      variant: "primary",
    },
    featured: true,
  },
  {
    tier: "Enterprise",
    desc: "For panel managers and lender QA programmes. Unlimited seats, custom volume, dedicated onboarding.",
    amount: "Custom",
    cta: {
      label: "Talk to us",
      href: "mailto:Harry@usewriteup.co.uk?subject=WriteUp%20Enterprise%20enquiry",
      variant: "secondary",
    },
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 lg:py-24 bg-paper border-b border-rule scroll-mt-20"
    >
      <Container>
        <div className="mb-12">
          <span className="eyebrow block mb-[18px]">Section 03 · Pricing</span>
          <h2 className="font-serif text-[36px] lg:text-[44px] font-normal leading-[1.1] tracking-[-0.02em] mb-[18px] max-w-[18ch]">
            Three tiers.
          </h2>
          <p className="m-0 text-slate-700 text-[16px] lg:text-[17.5px] leading-[1.6] max-w-[60ch]">
            30-day money-back guarantee. Currently invite-only — request a demo to see WriteUp in action.
          </p>
        </div>
        <div className="bg-white border border-rule rounded-md overflow-hidden">
          {tiers.map((t, i) => (
            <div
              key={t.tier}
              className={`grid grid-cols-1 md:grid-cols-[200px_1fr_180px_200px] gap-3 md:gap-6 px-6 md:px-8 py-7 items-start md:items-center ${
                i < tiers.length - 1 ? "border-b border-rule" : ""
              } ${t.featured ? "bg-paper" : ""}`}
            >
              <div className="font-mono text-[11.5px] font-semibold tracking-[0.14em] uppercase text-ink">
                {t.tier}
              </div>
              <div className="text-slate-700 text-[14.5px] leading-[1.55]">
                {t.desc}
              </div>
              <div className="text-[22px] font-semibold tabular-nums tracking-[-0.01em]">
                {t.amount}
                {t.amountSuffix && (
                  <small className="text-[13px] text-slate-500 font-medium">
                    {t.amountSuffix}
                  </small>
                )}
              </div>
              <div className="md:justify-self-end">
                <Button href={t.cta.href} variant={t.cta.variant}>
                  {t.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
