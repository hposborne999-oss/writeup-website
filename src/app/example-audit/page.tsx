import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { ExampleAuditView } from "@/components/example-audit/ExampleAuditView";
import { AuditVisitBeacon } from "@/components/example-audit/AuditVisitBeacon";

// Hidden landing page for the outreach email. Not in the nav, no sitemap
// entry, and noindex/nofollow below — reachable only by the link in the email.

// The page's calls to action, at the top and the bottom (Harry went live with
// "Book a demo", 30 Sep 2026; top button added 27 Oct 2026; free account
// added 10 Nov 2026). The free account link goes to the app's sign-in page,
// which has the "Create a free account" button (3 audits a month, no card).
const CTA = { label: "Book a demo", href: "/demo" };
const FREE = {
  label: "Create free account",
  href: "https://writeup-app.vercel.app/#audit",
  note: "Want to see what it finds on your own reports? We have a free account with three audits a month.",
};

function Ctas({ align }: { align: "end" | "center" }) {
  const row = align === "end" ? "md:justify-end" : "justify-center";
  const text = align === "end" ? "md:text-right" : "text-center";
  return (
    <div className={`flex flex-col gap-3 ${align === "end" ? "md:items-end" : "items-center"}`}>
      <div className={`flex flex-wrap gap-3 ${row}`}>
        <Button href={CTA.href} variant="teal" size="lg">
          {CTA.label}
        </Button>
        <Button href={FREE.href} variant="secondary" size="lg">
          {FREE.label}
        </Button>
      </div>
      <p className={`text-[14px] leading-[1.5] text-slate-600 max-w-[42ch] ${text}`}>
        {FREE.note}
      </p>
    </div>
  );
}

export const metadata: Metadata = {
  title: "An example WriteUp audit",
  description:
    "A hypothetical lender valuation of a mixed-use building, audited by WriteUp.",
  robots: { index: false, follow: false },
};

export default function ExampleAuditPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-12 sm:pt-16 pb-20 sm:pb-24">
          <header className="mb-8 sm:mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-sans font-semibold text-[30px] sm:text-[40px] leading-[1.1] tracking-[-0.025em] text-ink mb-4">
                An example WriteUp audit
              </h1>
              <p className="text-[16px] sm:text-[17px] leading-[1.6] text-slate-700 max-w-[62ch]">
                A hypothetical lender valuation of a mixed-use building,
                audited by WriteUp. Click a unit or a finding to see the
                detail.
              </p>
            </div>
            <div className="shrink-0">
              <Ctas align="end" />
            </div>
          </header>

          <ExampleAuditView />

          <div className="mt-10 sm:mt-12">
            <Ctas align="center" />
          </div>
        </div>
      </main>
      <Footer />
      <AuditVisitBeacon />
    </>
  );
}
