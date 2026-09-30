import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { ExampleAuditView } from "@/components/example-audit/ExampleAuditView";
import { AuditVisitBeacon } from "@/components/example-audit/AuditVisitBeacon";

// Hidden landing page for the outreach email. Not in the nav, no sitemap
// entry, and noindex/nofollow below — reachable only by the link in the email.

// The page's one call to action (Harry went live with this, 30 Sep 2026).
const CTA = { label: "Book a demo", href: "/demo" };

export const metadata: Metadata = {
  title: "An example WriteUp audit",
  description:
    "A residential valuation report, audited by WriteUp. Names, addresses and client details have been changed.",
  robots: { index: false, follow: false },
};

export default function ExampleAuditPage() {
  return (
    <>
      <Nav tone="dark" />
      <main className="flex-1 bg-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-12 sm:pt-16 pb-20 sm:pb-24">
          <header className="mb-8 sm:mb-10">
            <h1 className="font-sans font-semibold text-[30px] sm:text-[40px] leading-[1.1] tracking-[-0.025em] text-ink mb-4">
              An example WriteUp audit
            </h1>
            <p className="text-[16px] sm:text-[17px] leading-[1.6] text-slate-700 max-w-[62ch]">
              A residential valuation report, audited by WriteUp. Names,
              addresses and client details have been changed. Click any finding
              to see why it was raised.
            </p>
          </header>

          <ExampleAuditView />

          <div className="mt-10 sm:mt-12 flex justify-center">
            <Button href={CTA.href} variant="teal" size="lg">
              {CTA.label}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <AuditVisitBeacon />
    </>
  );
}
