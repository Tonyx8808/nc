"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DOWNLOAD_DOCS } from "@/lib/download-data";

/**
 * app/download/page.tsx
 *
 * Stessa identità visiva delle altre pagine (vedi globals.css / ccnl/page.tsx
 * / dispense/page.tsx):
 *   navy #1B2740   red #E32726   orange #F5A623
 *   yellow #FFD200   green #3AA845   blue #29A9E1   grey #B5B7BA
 *
 * Modulistica e documenti operativi: i PDF stanno in public/download/ e il
 * download è diretto, nessun login richiesto.
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

const DownloadIcon = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v12" />
    <path d="M7 10l5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
);

// ─── Breadcrumb ────────────────────────────────────────────────────────────
const Breadcrumb = () => (
  <nav aria-label="breadcrumb" className={cn(MONO, "flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]")}>
    <Link href="/" className="transition-colors" style={{ color: INK_MUTED }}>
      Home
    </Link>
    <span style={{ color: HAIRLINE }}>/</span>
    <span style={{ color: NAVY }}>Download</span>
  </nav>
);

// ─── Header descrittivo ─────────────────────────────────────────────────────
const DownloadHeader = () => (
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
          Download
        </h1>
        <div className="mt-5 flex gap-1.5 max-w-xs">
          {ARC_COLORS.map((c) => (
            <span key={c} className="h-1 flex-1 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
      </FadeUp>

      <FadeUp delay={0.16} className="mt-9 max-w-3xl space-y-5">
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: INK_MUTED }}>
          In questa sezione trovi la{" "}
          <strong style={{ color: NAVY }}>modulistica e i documenti operativi</strong>{" "}
          della Confederazione: verbali, registri, test di verifica e
          materiali a supporto della gestione dei corsi presso le sedi
          territoriali.
        </p>
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: INK_MUTED }}>
          Scarica gratuitamente il documento che ti serve, sempre aggiornato
          all&apos;ultima versione disponibile.
        </p>
      </FadeUp>
    </div>
  </section>
);

// ─── Griglia documenti ──────────────────────────────────────────────────────
const DownloadGrid = () => (
  <section className="relative py-16 sm:py-20" style={{ backgroundColor: PAPER }}>
    <div className="mx-auto max-w-7xl px-6">
      <FadeUp className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className={cn(MONO, "text-[11px] uppercase tracking-[0.25em]")} style={{ color: INK_MUTED }}>
            Modulistica e documenti
          </span>
          <h2 className={cn(DISPLAY, "mt-2 text-2xl sm:text-3xl font-medium leading-tight")} style={{ color: NAVY }}>
            Tutti i download
          </h2>
        </div>
        <span className="text-sm" style={{ color: INK_MUTED }}>
          {DOWNLOAD_DOCS.length} documenti disponibili
        </span>
      </FadeUp>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DOWNLOAD_DOCS.map((d, i) => {
          const color = ARC_COLORS[i % ARC_COLORS.length];
          return (
            <FadeUp key={d.slug} delay={Math.min(i * 0.04, 0.3)}>
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-7 transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(21,32,54,0.18)]"
                style={{ border: `1px solid ${HAIRLINE}` }}
              >
                <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: color }} />

                <span
                  className={cn(
                    MONO,
                    "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
                  )}
                  style={{ color, backgroundColor: `${color}14` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                  Documento
                </span>

                <h3 className={cn(DISPLAY, "mt-5 text-xl font-medium leading-snug")} style={{ color: NAVY }}>
                  {d.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: INK_MUTED }}>
                  {d.description}
                </p>

                <a
                  href={d.file}
                  download
                  className={cn(
                    MONO,
                    "mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.12em] transition-colors"
                  )}
                  style={{ borderColor: HAIRLINE, color: NAVY }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = NAVY;
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.borderColor = NAVY;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = NAVY;
                    (e.currentTarget as HTMLElement).style.borderColor = HAIRLINE;
                  }}
                >
                  <DownloadIcon />
                  Download Gratis
                </a>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── Page ───────────────────────────────────────────────────────────────────
export default function DownloadPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      <DownloadHeader />
      <DownloadGrid />
    </main>
  );
}