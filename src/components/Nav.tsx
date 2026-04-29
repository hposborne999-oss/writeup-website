import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./Container";

const navLinks = [
  { href: "/#what-it-catches", label: "Audit" },
  { href: "/#from-the-founder", label: "About" },
  { href: "/#pricing", label: "Pricing" },
];

const SIGN_IN_URL = "https://writeup-app.vercel.app/#ai";
const DEMO_MAILTO =
  "mailto:Harry@usewriteup.co.uk?subject=WriteUp%20demo%20request";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 h-16 flex items-center bg-paper/90 backdrop-blur-md backdrop-saturate-150 border-b border-rule">
      <Container className="flex items-center justify-between w-full">
        <Link href="/" className="inline-flex items-center no-underline">
          <Image
            src="/WriteUp_1.png"
            alt="WriteUp"
            width={5982}
            height={1503}
            priority
            sizes="120px"
            className="h-5 w-auto"
          />
        </Link>
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-medium text-slate-700 hover:text-ink transition-colors duration-150 [transition-timing-function:var(--ease-out-quart)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-[14px]">
          <a
            href={SIGN_IN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-[13.5px] font-medium text-slate-700 hover:text-ink transition-colors duration-150"
          >
            Sign in
          </a>
          <Button href={DEMO_MAILTO}>Request a demo</Button>
        </div>
      </Container>
    </nav>
  );
}
