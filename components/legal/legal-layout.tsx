"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * components/legal/legal-layout.tsx
 *
 * Layout condiviso dalle pagine legali (Privacy Policy, Cookie Policy,
 * Termini e Condizioni): stessa identità visiva del resto del sito
 * (Sigillo, navy/serif/mono, colori ad arco), ma in formato testo lungo
 * a colonna singola, pensato per essere letto.
 */

const NAVY = "#1B2740";
const RED = "#E32726";
const ORANGE = "#F5A623";
const YELLOW = "#FFD200";
const GREEN = "#3AA845";
const BLUE = "#29A9E1";
const ARC_COLORS = [RED, ORANGE, YELLOW, GREEN, BLUE];

const INK_MUTED = "#616B7D";
const HAIRLINE = "#E4E4DE";

const DISPLAY = "font-serif";
const MONO = "font-mono";

const Seal = ({ className = "" }: { className?: string }) => {
  const radii = [92, 74, 56, 38];
  return (
    <div className={className}>
      <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
        {radii.map((r, i) => (
          <circle key={r} cx={100} cy={100} r={r} stroke={ARC_COLORS[i]} strokeWidth={2} opacity={0.85} />
        ))}
        <circle cx={100} cy={100} r={20} stroke={BLUE} strokeWidth={2} opacity={0.85} />
        <circle cx={100} cy={100} r={3.5} fill={NAVY} />
      </svg>
    </div>
  );
};

const FadeUp = ({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const Breadcrumb = ({ label }: { label: string }) => (
  <nav aria-label="breadcrumb" className={cn(MONO, "flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]")}>
    <Link href="/" className="transition-colors" style={{ color: INK_MUTED }}>
      Home
    </Link>
    <span style={{ color: HAIRLINE }}>/</span>
    <span style={{ color: NAVY }}>{label}</span>
  </nav>
);

export function LegalLayout({
  eyebrow,
  title,
  updatedAt,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      <section className="relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="pointer-events-none absolute -right-28 -top-10 hidden h-100 w-100 opacity-[0.05] lg:block">
          <Seal className="h-full w-full" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6">
          <FadeUp>
            <Breadcrumb label={title} />
          </FadeUp>

          <FadeUp delay={0.06}>
            <span
              className={cn(MONO, "mt-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em]")}
              style={{ color: BLUE, backgroundColor: `${BLUE}14` }}
            >
              {eyebrow}
            </span>
            <h1
              className={cn(DISPLAY, "mt-4 text-4xl font-medium leading-tight sm:text-5xl")}
              style={{ color: NAVY }}
            >
              {title}
            </h1>
            <div className="mt-5 flex gap-1.5 max-w-xs">
              {ARC_COLORS.map((c) => (
                <span key={c} className="h-1 flex-1 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className={cn(MONO, "mt-5 text-[11px] uppercase tracking-[0.12em]")} style={{ color: INK_MUTED }}>
              Ultimo aggiornamento: {updatedAt}
            </p>
          </FadeUp>

          {intro && (
            <FadeUp delay={0.12} className="mt-8">
              <p className="text-base leading-relaxed" style={{ color: INK_MUTED }}>
                {intro}
              </p>
            </FadeUp>
          )}

          <div className="mt-12 space-y-10">{children}</div>
        </div>
      </section>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <FadeUp className="pt-8" style={{ borderTop: `1px solid ${HAIRLINE}` } as React.CSSProperties}>
      <h2 className={cn(DISPLAY, "text-xl font-medium leading-snug sm:text-2xl")} style={{ color: NAVY }}>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base" style={{ color: INK_MUTED }}>
        {children}
      </div>
    </FadeUp>
  );
}