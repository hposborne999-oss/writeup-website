import { Button } from "../Button";
import { Container } from "../Container";

type Tier = {
  tier: string;
  audience: string;
  features: string;
  amountPrefix?: string;
  amount: string;
  amountSuffix?: string;
  cta: { label: string; href: string; variant: "primary" | "secondary" };
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    tier: "Solo",
    audience: "For individual surveyors.",
    features:
      "1 seat, includes 20 report audits a month, full access to the AI Audit features.",
    amount: "£199",
    amountSuffix: " / mo",
    cta: {
      label: "Book a demo",
      href: "/demo",
      variant: "secondary",
    },
  },
  {
    tier: "Practice",
    audience: "For valuation teams.",
    features:
      "Up to 5 seats, includes 100 report audits a month, full access to the AI Audit features. Extra audits £6 each.",
    amount: "£599",
    amountSuffix: " / mo",
    cta: {
      label: "Book a demo",
      href: "/demo",
      variant: "primary",
    },
    featured: true,
  },
  {
    tier: "Firm",
    audience: "For larger valuation firms.",
    features:
      "Up to 15 seats, includes 250 report audits a month, full access to the AI Audit features. Extra audits £6 each.",
    amountPrefix: "from ",
    amount: "£1,499",
    amountSuffix: " / mo",
    cta: {
      label: "Talk to us",
      href: "mailto:Harry@usewriteup.co.uk?subject=WriteUp%20Firm%20enquiry",
      variant: "secondary",
    },
  },
  {
    tier: "Enterprise",
    audience: "For panel managers and large valuation firms.",
    features:
      "Unlimited seats, custom volume, dedicated onboarding.",
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
          <h2 className="font-serif text-[30px] lg:text-[36px] font-normal leading-[1.1] tracking-[-0.02em] mb-[18px] max-w-[24ch]">
            Priced to earn its place
            <br />
            in your process.
          </h2>
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
              <div className="text-[14.5px] leading-[1.55]">
                <div className="text-ink font-medium">{t.audience}</div>
                <div className="text-slate-700 mt-0.5">{t.features}</div>
              </div>
              <div>
                <div className="text-[22px] font-semibold tabular-nums tracking-[-0.01em]">
                  {t.amountPrefix && (
                    <small className="text-[13px] text-slate-500 font-medium">
                      {t.amountPrefix}
                    </small>
                  )}
                  {t.amount}
                  {t.amountSuffix && (
                    <small className="text-[13px] text-slate-500 font-medium">
                      {t.amountSuffix}
                    </small>
                  )}
                </div>
              </div>
              <div className="md:justify-self-end">
                <Button href={t.cta.href} variant={t.cta.variant}>
                  {t.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-slate-500 text-[13px] leading-[1.55]">
          Solo and Practice can be paid annually: twelve months for the price
          of ten. With a 30-day money-back guarantee.
        </p>
      </Container>
    </section>
  );
}
