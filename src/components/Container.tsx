import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  variant?: "content" | "narrow";
  className?: string;
};

export function Container({
  children,
  variant = "content",
  className = "",
}: ContainerProps) {
  const maxWidth = variant === "narrow" ? "max-w-[760px]" : "max-w-[1080px]";
  return (
    <div className={`${maxWidth} mx-auto px-8 ${className}`}>{children}</div>
  );
}
