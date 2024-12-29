import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export function Title({ children, className }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <h1
      ref={ref}
      className={cn(
        "font-wide text-3xl uppercase leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl",
        className,
      )}
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
    >
      {children}
    </h1>
  );
}

export function Paragraph({ children, className }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <p
      ref={ref}
      className={cn("text-muted-foreground text-lg sm:text-xl", className)}
      style={{
        opacity: isInView ? 1 : 0,
        transition: "all 2s cubic-bezier(0.17, 0.55, 0.55, 1) 1s",
      }}
    >
      {children}
    </p>
  );
}

export function AnimatedLink({ children, href }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <Link
      ref={ref}
      className="hover:underline"
      href={href}
      style={{
        opacity: isInView ? 1 : 0,
        transition: "all 2s cubic-bezier(0.17, 0.55, 0.55, 1) 2s",
      }}
    >
      {children}
    </Link>
  );
}
