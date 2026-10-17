import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";

// The branded sample audit as a PDF (public/sample-audit/). Deliberately has no
// visit tracker: the outreach link tracking lives only on /example-audit.

const PDF = "/sample-audit/writeup-sample-audit-unit-4-riverside-industrial-estate.pdf";
const PDF_NAME = "WriteUp sample audit - Unit 4 Riverside Industrial Estate.pdf";

export const metadata: Metadata = {
  title: "Sample audit",
  description:
    "A full audit of a hypothetical industrial investment valuation, exactly as a user sees it.",
};

export default function SampleAuditPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="pt-16 lg:pt-[72px] pb-24 border-b border-rule">
          <Container>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
              <div className="max-w-[640px]">
                <h1 className="font-serif font-normal text-[34px] sm:text-[40px] lg:text-[46px] leading-[1.04] tracking-[-0.02em] text-ink mb-4">
                  Sample audit
                </h1>
                <p className="text-[17px] lg:text-[18px] leading-[1.55] text-slate-700 m-0">
                  A full audit of a hypothetical industrial investment
                  valuation, exactly as a user sees it.
                </p>
              </div>
              <a
                href={PDF}
                download={PDF_NAME}
                className="inline-flex items-center justify-center font-semibold rounded-lg h-[46px] px-6 text-[14.5px] bg-transparent text-ink border border-rule hover:bg-white hover:border-ink transition-colors duration-150 no-underline shrink-0"
              >
                Download the PDF
              </a>
            </div>

            <div className="rounded-xl border border-rule bg-white overflow-hidden shadow-[0_20px_50px_-30px_rgba(10,34,38,0.25)]">
              <object
                data={`${PDF}#view=FitH&navpanes=0`}
                type="application/pdf"
                aria-label="WriteUp sample audit, Unit 4 Riverside Industrial Estate"
                className="block w-full h-[80vh] min-h-[560px]"
              >
                <div className="p-8 text-center text-slate-700 text-[15px]">
                  <p className="m-0 mb-5">Your browser can&rsquo;t show the PDF here.</p>
                  <a
                    href={PDF}
                    className="inline-flex items-center justify-center font-semibold rounded-lg h-[38px] px-[18px] text-[13.5px] bg-transparent text-ink border border-rule hover:bg-white hover:border-ink transition-colors duration-150 no-underline"
                  >
                    Open the sample audit
                  </a>
                </div>
              </object>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
