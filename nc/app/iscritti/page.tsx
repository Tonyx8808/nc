"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ISCRITTI_AGGIORNATO_AL,
  ISCRITTI_TOTALE,
  ISCRITTI_PER_CATEGORIA,
  ISCRITTI_PER_REGIONE,
  type DatoIscritti,
} from "@/lib/iscritti-data";

/**
 * app/iscritti/page.tsx
 *
 * Stessa identità visiva delle altre pagine (vedi globals.css / ccnl,
 * dispense, download, patti-federativi):
 *   navy #1B2740   red #E32726   orange #F5A623
 *   yellow #FFD200   green #3AA845   blue #29A9E1   grey #B5B7BA
 *
 * Riepilogo iscritti con conteggio animato e grafici a barre (categorie e
 * regioni), costruiti a mano in SVG/CSS per restare coerenti con il resto
 * del sito, senza introdurre librerie di charting esterne.
 */

const NAVY = "#1B2740";
const RED = "#E32726";
const ORANGE = "#F5A623";
const YELLOW = "#FFD200";
const GREEN = "#3AA845";
const BLUE = "#29A9E1";
const ARC_COLORS = [RED, ORANGE, YELLOW, GREEN, BLUE];

const INK_MUTED = "#616B7D";
const PAPER = "#FAFAF8";
const HAIRLINE = "#E4E4DE";

const DISPLAY = "font-serif";
const MONO = "font-mono";

// ─── Sigillo — stesso rosone concentrico delle altre pagine ───────────────
const Seal = ({ className = "" }: { className?: string }) => {
  const radii = [92, 74, 56, 38];
  return (
    <div className={className}>
      <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
        {radii.map((r, i) => (
          <motion.circle
            key={r}
            cx={100}
            cy={100}
            r={r}
            stroke={ARC_COLORS[i]}
            strokeWidth={2}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.85 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
          />
        ))}
        <motion.circle
          cx={100}
          cy={100}
          r={20}
          stroke={BLUE}
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
        />
        <circle cx={100} cy={100} r={3.5} fill={NAVY} />
      </svg>
    </div>
  );
};

const FadeUp = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// ─── Breadcrumb ────────────────────────────────────────────────────────────
const Breadcrumb = () => (
  <nav aria-label="breadcrumb" className={cn(MONO, "flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]")}>
    <Link href="/" className="transition-colors" style={{ color: INK_MUTED }}>
      Home
    </Link>
    <span style={{ color: HAIRLINE }}>/</span>
    <span style={{ color: NAVY }}>Iscritti</span>
  </nav>
);

// ─── Numero animato (count-up) ──────────────────────────────────────────
const CountUp = ({ value, className = "" }: { value: number; className?: string }) => {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  return (
    <motion.span
      className={className}
      onViewportEnter={() => {
        if (started) return;
        setStarted(true);
        const duration = 1400;
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
      viewport={{ once: true }}
    >
      {display.toLocaleString("it-IT")}
    </motion.span>
  );
};

// ─── Header + numero totale ─────────────────────────────────────────────
const IscrittiHeader = () => (
  <section className="relative overflow-hidden bg-white pb-16 pt-14 sm:pb-20 sm:pt-20">
    <div className="pointer-events-none absolute -right-28 -top-10 hidden h-100 w-100 opacity-[0.05] lg:block">
      <Seal className="h-full w-full" />
    </div>

    <div className="relative mx-auto max-w-7xl px-6">
      <FadeUp>
        <Breadcrumb />
      </FadeUp>

      <FadeUp delay={0.08}>
        <h1
          className={cn(DISPLAY, "mt-6 text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl")}
          style={{ color: NAVY }}
        >
          Iscritti
        </h1>
        <div className="mt-5 flex gap-1.5 max-w-xs">
          {ARC_COLORS.map((c) => (
            <span key={c} className="h-1 flex-1 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
      </FadeUp>

      <FadeUp delay={0.16} className="mt-9 max-w-3xl">
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: INK_MUTED }}>
          Iscritti alla Confederazione ES.A.AR.CO. al{" "}
          <strong style={{ color: NAVY }}>{ISCRITTI_AGGIORNATO_AL}</strong>:
          il riepilogo nazionale suddiviso per categoria di appartenenza e
          per regione.
        </p>
      </FadeUp>

      {/* Numero totale */}
      <FadeUp delay={0.24} className="mt-10 max-w-3xl">
        <div
          className="rounded-2xl p-7 text-white sm:p-9"
          style={{ background: `linear-gradient(135deg, ${NAVY}, #24314C)` }}
        >
          <span className={cn(MONO, "text-[11px] uppercase tracking-[0.25em] text-white/50")}>
            Riepilogo nazionale
          </span>
          <div className="mt-3 flex items-baseline gap-3">
            <CountUp
              value={ISCRITTI_TOTALE}
              className={cn(DISPLAY, "text-5xl font-medium leading-none sm:text-6xl")}
            />
            <span className="text-sm text-white/70 sm:text-base">iscritti complessivi</span>
          </div>
          <div className="mt-5 flex gap-1.5">
            {ARC_COLORS.map((c) => (
              <span key={c} className="h-1 flex-1 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  </section>
);

// ─── Grafico a barre orizzontali ────────────────────────────────────────
const BarChart = ({
  data,
  totale,
  columns = 1,
}: {
  data: DatoIscritti[];
  totale: number;
  columns?: 1 | 2;
}) => {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className={cn("grid grid-cols-1 gap-x-10", columns === 2 && "lg:grid-cols-2")}>
      {data.map((d, i) => {
        const color = ARC_COLORS[i % ARC_COLORS.length];
        const pctOfMax = (d.value / max) * 100;
        const pctOfTotal = ((d.value / totale) * 100).toFixed(1);

        return (
          <FadeUp key={d.label} delay={Math.min(i * 0.02, 0.3)} className="py-2.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium" style={{ color: NAVY }}>
                {d.label}
              </span>
              <span className={cn(MONO, "shrink-0 text-xs")} style={{ color: INK_MUTED }}>
                {d.value.toLocaleString("it-IT")}{" "}
                <span style={{ color: HAIRLINE }}>·</span> {pctOfTotal}%
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: HAIRLINE }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${pctOfMax}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: Math.min(i * 0.03, 0.4) }}
              />
            </div>
          </FadeUp>
        );
      })}
    </div>
  );
};

// ─── Sezione ─────────────────────────────────────────────────────────────
const StatSection = ({
  eyebrow,
  title,
  children,
  alt = false,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  alt?: boolean;
}) => (
  <section className="relative py-16 sm:py-20" style={{ backgroundColor: alt ? PAPER : "#fff" }}>
    <div className="mx-auto max-w-7xl px-6">
      <FadeUp className="mb-10">
        <span className={cn(MONO, "text-[11px] uppercase tracking-[0.25em]")} style={{ color: INK_MUTED }}>
          {eyebrow}
        </span>
        <h2 className={cn(DISPLAY, "mt-2 text-2xl sm:text-3xl font-medium leading-tight")} style={{ color: NAVY }}>
          {title}
        </h2>
      </FadeUp>
      {children}
    </div>
  </section>
);

// ─── Page ───────────────────────────────────────────────────────────────────
export default function IscrittiPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      <IscrittiHeader />

      <StatSection eyebrow="Categorie di appartenenza" title="Iscritti per categoria" alt>
        <BarChart data={ISCRITTI_PER_CATEGORIA} totale={ISCRITTI_TOTALE} />
      </StatSection>

      <StatSection eyebrow="Distribuzione territoriale" title="Iscritti per regione">
        <BarChart data={ISCRITTI_PER_REGIONE} totale={ISCRITTI_TOTALE} columns={2} />
      </StatSection>
    </main>
  );
}