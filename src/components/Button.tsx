import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "default" | "lg";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
};

const base =
  "inline-flex items-center justify-center font-semibold rounded-lg cursor-pointer transition-colors duration-150 [transition-timing-function:var(--ease-out-quart)] no-underline";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-petrol",
  secondary:
    "bg-transparent text-ink border border-rule hover:bg-white hover:border-ink",
};

const sizes: Record<Size, string> = {
  default: "h-[38px] px-[18px] text-[13.5px]",
  lg: "h-[46px] px-6 text-[14.5px]",
};

export function Button({
  children,
  variant = "primary",
  size = "default",
  href,
  className = "",
}: ButtonProps) {
  const styles = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const isHttpExternal = href.startsWith("http");
    const isMailto = href.startsWith("mailto:");
    if (isHttpExternal) {
      return (
        <a
          href={href}
          className={styles}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    if (isMailto) {
      return (
        <a href={href} className={styles}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={styles}>
      {children}
    </button>
  );
}
