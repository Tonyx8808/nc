"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PATTI_FEDERATIVI, type PattoFederativo } from "@/lib/patti-data";

/**
 * app/patti-federativi/page.tsx
 *
 * Stessa identità visiva delle altre pagine (vedi globals.css / ccnl,
 * dispense, download):
 *   navy #1B2740   red #E32726   orange #F5A623
 *   yellow #FFD200   green #3AA845   blue #29A9E1   grey #B5B7BA
 *
 * Struttura a due colonne (ispirata a components/feature-showcase.tsx):
 * a sinistra un accordion con un patto per voce, a destra un pannello a
 * tab che mostra l'anteprima del patto selezionato — sincronizzati tra
 * loro. Click sull'anteprima (o "Sfoglia il protocollo") apre il lightbox
 * con tutte le pagine scansionate. Nessun download: solo consultazione.
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

const EyeIcon = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ChevronIcon = ({ direction = "left" }: { direction?: "left" | "right" | "down" }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform:
        direction === "right" ? "rotate(180deg)" : direction === "down" ? "rotate(-90deg)" : undefined,
      transition: "transform .3s ease",
    }}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const DocumentIcon = ({ size = 28 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6" />
  </svg>
);

// ─── Breadcrumb ────────────────────────────────────────────────────────────
const Breadcrumb = () => (
  <nav aria-label="breadcrumb" className={cn(MONO, "flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]")}>
    <Link href="/" className="transition-colors" style={{ color: INK_MUTED }}>
      Home
    </Link>
    <span style={{ color: HAIRLINE }}>/</span>
    <span style={{ color: NAVY }}>Patti Federativi</span>
  </nav>
);

// ─── Accordion voce — un patto per riga, sincronizzato col pannello ───────
const PattoAccordionItem = ({
  patto,
  index,
  active,
  onSelect,
  onPreview,
}: {
  patto: PattoFederativo;
  index: number;
  active: boolean;
  onSelect: () => void;
  onPreview: () => void;
}) => {
  const color = ARC_COLORS[index % ARC_COLORS.length];

  return (
    <div style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <div className="flex items-start gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
          <div>
            <span className={cn(MONO, "block text-[10px] uppercase tracking-[0.15em]")} style={{ color: INK_MUTED }}>
              {patto.partner} — {patto.date}
            </span>
            <span
              className={cn(DISPLAY, "mt-1 block text-lg font-medium leading-snug sm:text-xl")}
              style={{ color: active ? color : NAVY }}
            >
              {patto.title}
            </span>
          </div>
        </div>
        <span className="shrink-0" style={{ color: INK_MUTED }}>
          <ChevronIcon direction={active ? "down" : "right"} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-5">
              <p className="max-w-md text-sm leading-relaxed" style={{ color: INK_MUTED }}>
                {patto.description}
              </p>
              {patto.previewImages.length > 0 && (
                <button
                  type="button"
                  onClick={onPreview}
                  className={cn(
                    MONO,
                    "mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] underline underline-offset-4"
                  )}
                  style={{ color: BLUE }}
                >
                  <EyeIcon size={13} />
                  Sfoglia il protocollo
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Pannello destro: anteprima del patto attivo + tab in basso ──────────
const PattoPanel = ({
  activePatto,
  onOpenLightbox,
}: {
  activePatto: PattoFederativo;
  onOpenLightbox: () => void;
}) => {
  const [errored, setErrored] = useState(false);
  useEffect(() => setErrored(false), [activePatto.slug]);
  const hasPreview = activePatto.previewImages.length > 0 && !errored;

  return (
    <div
      className="relative h-105 w-full overflow-hidden rounded-3xl sm:h-130 lg:h-150"
      style={{ border: `1px solid ${HAIRLINE}`, backgroundColor: PAPER }}
    >
      <button
        type="button"
        onClick={() => hasPreview && onOpenLightbox()}
        disabled={!hasPreview}
        className="group/panel relative block h-full w-full disabled:cursor-default"
      >
        <AnimatePresence mode="wait">
          {hasPreview ? (
            <motion.div
              key={activePatto.slug}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePatto.previewImages[0]}
                alt=""
                onError={() => setErrored(true)}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/panel:scale-[1.03]"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(21,32,54,0) 45%, rgba(21,32,54,.6) 100%)" }}
              />
              <span
                className={cn(
                  MONO,
                  "pointer-events-none absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white"
                )}
                style={{ backgroundColor: "rgba(21,32,54,.72)" }}
              >
                {activePatto.previewImages.length} pagine
              </span>
              <span
                className={cn(
                  MONO,
                  "pointer-events-none absolute left-5 bottom-20 z-10 inline-flex translate-y-2 items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-white opacity-0 transition-all duration-300 group-hover/panel:translate-y-0 group-hover/panel:opacity-100 sm:bottom-24"
                )}
              >
                <EyeIcon size={15} />
                Sfoglia il protocollo
              </span>
            </motion.div>
          ) : (
            <div key="empty" className="flex h-full w-full flex-col items-center justify-center gap-3" style={{ color: HAIRLINE }}>
              <DocumentIcon size={36} />
              <span className={cn(MONO, "text-[10px] uppercase tracking-[0.15em]")} style={{ color: INK_MUTED }}>
                Anteprima non disponibile
              </span>
            </div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

// ─── Pill tab list, sotto il pannello ───────────────────────────────────
const PattoTabList = ({
  activeSlug,
  onSelect,
}: {
  activeSlug: string;
  onSelect: (slug: string) => void;
}) => (
  <div className="mt-5 flex flex-wrap gap-2">
    {PATTI_FEDERATIVI.map((p) => {
      const isActive = p.slug === activeSlug;
      return (
        <button
          key={p.slug}
          type="button"
          onClick={() => onSelect(p.slug)}
          className={cn(
            MONO,
            "rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.12em] transition-colors"
          )}
          style={
            isActive
              ? { backgroundColor: NAVY, borderColor: NAVY, color: "#fff" }
              : { backgroundColor: "transparent", borderColor: HAIRLINE, color: INK_MUTED }
          }
        >
          {p.partner}
        </button>
      );
    })}
  </div>
);

// ─── Lightbox: sfoglia le pagine scansionate ───────────────────────────────
const PreviewLightbox = ({
  patto,
  onClose,
}: {
  patto: PattoFederativo | null;
  onClose: () => void;
}) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [patto]);

  useEffect(() => {
    if (!patto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setPage((p) => Math.min(p + 1, patto.previewImages.length - 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(p - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [patto, onClose]);

  if (!patto) return null;
  const total = patto.previewImages.length;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="relative flex h-full max-h-[85vh] w-full max-w-2xl flex-col"
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between text-white">
            <span className={cn(MONO, "text-[11px] uppercase tracking-[0.2em] text-white/60")}>
              {patto.title}
            </span>
            <button type="button" onClick={onClose} className="text-white/70 transition-colors hover:text-white" aria-label="Chiudi">
              ✕
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden rounded-xl bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                className="relative h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={patto.previewImages[page]}
                  alt={`${patto.title} — pagina ${page + 1}`}
                  className="h-full w-full object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {page > 0 && (
              <button
                type="button"
                onClick={() => setPage((p) => p - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1B2740] shadow-md transition-transform hover:scale-105"
                aria-label="Pagina precedente"
              >
                <ChevronIcon direction="left" />
              </button>
            )}
            {page < total - 1 && (
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1B2740] shadow-md transition-transform hover:scale-105"
                aria-label="Pagina successiva"
              >
                <ChevronIcon direction="right" />
              </button>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center">
            <span className={cn(MONO, "text-[11px] uppercase tracking-[0.15em] text-white/50")}>
              Pagina {page + 1} / {total}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Page ───────────────────────────────────────────────────────────────────
export default function PattiFederativiPage() {
  const [activeSlug, setActiveSlug] = useState(PATTI_FEDERATIVI[0]?.slug ?? "");
  const [lightboxPatto, setLightboxPatto] = useState<PattoFederativo | null>(null);

  const activePatto = useMemo(
    () => PATTI_FEDERATIVI.find((p) => p.slug === activeSlug) ?? PATTI_FEDERATIVI[0],
    [activeSlug]
  );

  const totalPages = useMemo(
    () => PATTI_FEDERATIVI.reduce((sum, p) => sum + p.previewImages.length, 0),
    []
  );

  if (!activePatto) {
    return (
      <main className="bg-white overflow-x-hidden">
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p style={{ color: INK_MUTED }}>Nessun patto federativo disponibile al momento.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-28 -top-10 hidden h-100 w-100 opacity-[0.05] lg:block">
          <Seal className="h-full w-full" />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:py-20 md:grid-cols-12 lg:gap-14">
          {/* Colonna sinistra: intro + accordion */}
          <div className="md:col-span-6">
            <FadeUp>
              <Breadcrumb />
            </FadeUp>

            <FadeUp delay={0.08}>
              <span
                className={cn(MONO, "mt-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em]")}
                style={{ color: BLUE, backgroundColor: `${BLUE}14` }}
              >
                Protocolli di intesa
              </span>
              <h1
                className={cn(DISPLAY, "mt-4 text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl")}
                style={{ color: NAVY }}
              >
                Patti Federativi
              </h1>
              <div className="mt-5 flex gap-1.5 max-w-xs">
                {ARC_COLORS.map((c) => (
                  <span key={c} className="h-1 flex-1 rounded-full" style={{ backgroundColor: c }} />
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.14} className="mt-7 max-w-md">
              <p className="text-base leading-relaxed" style={{ color: INK_MUTED }}>
                La Confederazione ES.A.AR.CO. è firmataria di{" "}
                <strong style={{ color: NAVY }}>numerosi patti federativi</strong> e
                protocolli di intesa, con lo scopo di favorire gli interessi
                collettivi a beneficio dell&apos;interesse comune, creando
                una forma di solidarietà tra le varie categorie
                professionali di riferimento.
              </p>
            </FadeUp>

            <FadeUp delay={0.2} className="mt-6 flex flex-wrap gap-2">
              {[
                `${PATTI_FEDERATIVI.length} protocolli sottoscritti`,
                `${totalPages} pagine consultabili`,
                "Consultazione libera",
              ].map((s) => (
                <span
                  key={s}
                  className={cn(MONO, "rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]")}
                  style={{ backgroundColor: PAPER, color: INK_MUTED, border: `1px solid ${HAIRLINE}` }}
                >
                  {s}
                </span>
              ))}
            </FadeUp>

            <FadeUp delay={0.26} className="mt-10">
              <div style={{ borderTop: `1px solid ${HAIRLINE}` }}>
                {PATTI_FEDERATIVI.map((p, i) => (
                  <PattoAccordionItem
                    key={p.slug}
                    patto={p}
                    index={i}
                    active={p.slug === activeSlug}
                    onSelect={() => setActiveSlug(p.slug)}
                    onPreview={() => setLightboxPatto(p)}
                  />
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Colonna destra: pannello anteprima + tab */}
          <div className="md:col-span-6">
            <FadeUp delay={0.16}>
              <PattoPanel activePatto={activePatto} onOpenLightbox={() => setLightboxPatto(activePatto)} />
              <PattoTabList activeSlug={activeSlug} onSelect={setActiveSlug} />
            </FadeUp>
          </div>
        </div>
      </section>

      <PreviewLightbox patto={lightboxPatto} onClose={() => setLightboxPatto(null)} />
    </main>
  );
}