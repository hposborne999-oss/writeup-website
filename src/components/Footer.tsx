import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

type FooterLink = {
  href: string;
  label: string;
  external?: true;
};

const productLinks: FooterLink[] = [
  { href: "/#what-it-catches", label: "Audit" },
  { href: "/#pricing", label: "Pricing" },
  {
    href: "https://writeup-app.vercel.app/#ai",
    label: "Sign in",
    external: true,
  },
];

const companyLinks: FooterLink[] = [
  { href: "/#from-the-founder", label: "About" },
  {
    href: "mailto:hello@usewriteup.co.uk?subject=WriteUp%20enquiry",
    label: "Contact",
    external: true,
  },
];

const colHeading =
  "text-[11px] font-semibold uppercase tracking-[0.12em] mb-4 font-mono text-ink";
const linkClass =
  "block text-[14px] py-[5px] text-slate-700 hover:text-ink transition-colors duration-150 [transition-timing-function:var(--ease-out-quart)] no-underline";

export function Footer() {
  return (
    <footer className="bg-paper pt-16 pb-9 mt-auto">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr] gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center no-underline">
              <Image
                src="/WriteUp_1.png"
                alt="WriteUp"
                width={5982}
                height={1503}
                sizes="140px"
                className="h-6 w-auto"
              />
            </Link>
            <p className="mt-[14px] text-[14px] leading-[1.65] text-slate-700 max-w-[42ch]">
              A RICS Tech Partner AI audit tool for RICS reports. Built by a practising MRICS Chartered Surveyor.
            </p>
          </div>
          <div>
            <h4 className={colHeading}>Product</h4>
            {productLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              )
            )}
          </div>
          <div>
            <h4 className={colHeading}>Company</h4>
            {companyLinks.map((link) =>
              link.external ? (
                <a key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
        <div className="border-t border-rule pt-6 flex flex-wrap justify-between gap-4 text-[12.5px] text-slate-500 font-mono">
          <div>
            WriteUp Limited · Company No. 17089556 · Registered in England &amp; Wales
          </div>
          <a
            href="mailto:hello@usewriteup.co.uk"
            className="hover:text-ink transition-colors duration-150"
          >
            hello@usewriteup.co.uk
          </a>
        </div>
      </Container>
    </footer>
  );
}
