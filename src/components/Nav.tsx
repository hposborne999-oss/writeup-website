import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./Container";

const navLinks = [
  { href: "/#what-it-catches", label: "Audit" },
  { href: "/#from-the-founder", label: "About" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

const SIGN_IN_URL = "https://writeup-app.vercel.app/#audit";

// "dark" is the app's petrol nav bar (#0A2226, slate-400 links that turn
// white on hover) for pages that show the product, e.g. /example-audit.
const tones = {
  light: {
    bar: "bg-paper/90 backdrop-blur-md backdrop-saturate-150 border-b border-rule",
    logo: "/WriteUp_1.png",
    link: "text-slate-700 hover:text-ink",
    cta: "primary",
  },
  dark: {
    bar: "bg-petrol border-b border-white/[0.04]",
    logo: "/WriteUp_white.png",
    link: "text-slate-400 hover:text-white",
    cta: "inverse",
  },
} as const;

export function Nav({ tone = "light" }: { tone?: keyof typeof tones }) {
  const t = tones[tone];
  return (
    <nav className={`sticky top-0 z-50 h-16 flex items-center ${t.bar}`}>
      <Container className="flex items-center justify-between w-full">
        <Link href="/" className="inline-flex items-center no-underline">
          <Image
            src={t.logo}
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
              className={`text-[13.5px] font-medium ${t.link} transition-colors duration-150 [transition-timing-function:var(--ease-out-quart)]`}
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
            className={`hidden sm:inline-block text-[13.5px] font-medium ${t.link} transition-colors duration-150`}
          >
            Sign in
          </a>
          <Button href="/demo" variant={t.cta}>
            Book a demo
          </Button>
        </div>
      </Container>
    </nav>
  );
}
