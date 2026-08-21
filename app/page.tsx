"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ─── Setup tipografico consigliato ───────────────────────────────────────
 * Questo file presume due famiglie oltre al sans di sistema:
 *   --font-display  → un serif con carattere (es. "Fraunces", ottimo per un
 *                      ente istituzionale: ha peso ma non è freddo).
 *   --font-mono     → un mono per etichette "da documento" (es. "IBM Plex Mono").
 *
 * In app/layout.tsx:
 *
 *   import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
 *   const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
 *   const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-mono" });
 *   const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
 *   // <body className={cn(fraunces.variable, plexMono.variable, inter.variable)}>
 *
 * Se non configuri i font custom, il file funziona comunque: le classi
 * font-serif / font-mono di Tailwind useranno gli stack di sistema.
 * ──────────────────────────────────────────────────────────────────────── */

const RED = "#E32726";
const ORANGE = "#F5A623";
const YELLOW = "#FFD200";
const GREEN = "#3AA845";
const BLUE = "#29A9E1";
const NAVY = "#152036";
const INK = "#2B3346";
const INK_MUTED = "#616B7D";
const PAPER = "#FAFAF8";
const HAIRLINE = "#E4E4DE";
const ARC_COLORS = [RED, ORANGE, YELLOW, GREEN, BLUE];

const DISPLAY = "font-serif"; // sostituito da --font-display se configurato
const MONO = "font-mono"; // sostituito da --font-mono se configurato

// ─── Sigillo: il segno distintivo — un rosone concentrico, non un logo generico ─
const Seal = ({
  className = "",
  spin = false,
}: {
  className?: string;
  spin?: boolean;
}) => {
  const radii = [92, 74, 56, 38];
  return (
    <div className={cn(spin && "motion-safe:animate-[spin_90s_linear_infinite]", className)}>
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

// ─── Hero — video full-bleed, testo overlay, sfumato in basso ─────────────
const Hero = () => (
  <section className="relative h-screen w-full overflow-hidden bg-black">
    {/* VIDEO FULL BLEED */}
    <video
      src="/logo.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 h-full w-full object-cover"
    />

    {/* Overlay scuro per leggibilità del testo sopra il video */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,14,25,.55) 0%, rgba(10,14,25,.25) 35%, rgba(10,14,25,.35) 65%, rgba(10,14,25,.85) 100%)",
      }}
    />

    {/* Glow ambientale, coerente con l'identità del sito */}
    <div className="pointer-events-none absolute inset-0 z-[-1] flex items-center justify-center">
      <div
        className="h-[60%] w-[60%] rounded-full blur-[140px] opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(41,169,225,.9) 0%, rgba(41,169,225,.15) 45%, transparent 80%)",
        }}
      />
    </div>

    {/* CONTENUTO */}
    <div className="relative z-10 mx-auto flex h-full max-w-400 flex-col justify-center px-6 pb-20 sm:pb-28
    lg:px-16 -translate-y-6 sm:-translate-y-10">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0 }}
        className={cn(
          MONO,
          "text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/60"
        )}
      >
        ES.A.AR.CO. Confederazione
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        className={cn(
          DISPLAY,
          "mt-4 max-w-4xl text-[3.25rem] sm:text-7xl lg:text-[5.5rem] font-medium leading-none tracking-tight text-white"
        )}
        style={{ textShadow: "0 2px 30px rgba(0,0,0,.35)" }}
      >
        Il partner <span className="italic font-normal" style={{ color: BLUE }}>ideale</span>
        <br />
        per la tua azienda
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.32 }}
        className="mt-7 max-w-md text-base sm:text-lg leading-relaxed text-white/75"
      >
        Un mondo di servizi all'avanguardia per l'azienda moderna leader di settore.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.44 }}
        className="mt-10 flex flex-wrap items-center gap-8"
      >
        <a
          href="#chi-siamo"
          className="rounded-full px-7 py-3 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: BLUE }}
        >
          Scopri chi siamo
        </a>

        <a
          href="#percorsi"
          className={cn(
            MONO,
            "inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-[12px] uppercase tracking-[0.15em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#152036]"
          )}
        >
          Percorsi formativi →
        </a>
      </motion.div>
    </div>

    {/* SFUMATO IN BASSO — al posto della linea, dissolve l'hero nella sezione successiva */}
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56 z-5"
      style={{
        background: `linear-gradient(180deg, transparent 0%, ${PAPER} 100%)`,
      }}
    />
  </section>
);

// ─── Mission + marquee verticale ─────────────────────────────────────────────
const SETTORI = ["Agricoltura", "Artigianato", "Commercio", "Formazione", "Consulenza", "Rappresentanza"];

interface VerticalMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

const VerticalMarquee = ({
  children,
  speed = 24,
  reverse = false,
  pauseOnHover = false,
  className,
}: VerticalMarqueeProps) => (
  <div
    className={cn("group flex flex-col overflow-hidden", className)}
    style={{ "--duration": `${speed}s` } as React.CSSProperties}
  >
    {[0, 1].map((i) => (
      <div
        key={i}
        aria-hidden={i === 1}
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "direction-[reverse]",
          pauseOnHover && "group-hover:paused"
        )}
      >
        {children}
      </div>
    ))}
  </div>
);

const Mission = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = marqueeRef.current;
    if (!container) return;

    let frame: number;

    const updateOpacity = () => {
      const items = container.querySelectorAll<HTMLElement>(".marquee-item");
      const containerRect = container.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalized = Math.min(distance / maxDistance, 1);
        item.style.opacity = (1 - normalized * 0.75).toString();
      });

      frame = requestAnimationFrame(updateOpacity);
    };

    frame = requestAnimationFrame(updateOpacity);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="py-20 sm:py-28" style={{ backgroundColor: PAPER }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <FadeUp className="max-w-xl">
            <h2 className={cn(DISPLAY, "text-2xl sm:text-3xl md:text-4xl font-medium leading-snug")} style={{ color: NAVY }}>
              Rappresenta e tutela gli interessi delle imprese agricole,
              artigiane e commercianti
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div
              ref={marqueeRef}
              className="relative h-95 sm:h-110 lg:h-125 flex items-center justify-center"
            >
              <VerticalMarquee speed={22} className="h-full">
                {SETTORI.map((settore, idx) => (
                  <div
                    key={`${settore}-${idx}`}
                    className="marquee-item flex items-center gap-4 py-5 sm:py-6"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: ARC_COLORS[idx % ARC_COLORS.length] }}
                    />
                    <span className={cn(DISPLAY, "text-3xl sm:text-4xl lg:text-5xl italic font-normal tracking-tight")} style={{ color: NAVY }}>
                      {settore}
                    </span>
                  </div>
                ))}
              </VerticalMarquee>

              <div className="pointer-events-none absolute top-0 left-0 right-0 h-28 z-10" style={{ background: `linear-gradient(to bottom, ${PAPER}, ${PAPER}B0, transparent)` }} />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 z-10" style={{ background: `linear-gradient(to top, ${PAPER}, ${PAPER}B0, transparent)` }} />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

// ─── Chi siamo ──────────────────────────────────────────────────────────────
const SERVIZI = [
  {
    title: "Formazione",
    desc: "Corsi professionali e aggiornamenti continui in medicina (ECM).",
  },
  {
    title: "Consulenza",
    desc: "Assistenza per le piccole e medie imprese, sicurezza sul lavoro e servizi fiscali.",
  },
  {
    title: "Certificazioni",
    desc: "Supporto per certificazioni linguistiche e professionali.",
  },
];

// Blocco: video grande full-bleed a sinistra + testo a destra (stile "case study")
const SalaVideoBlock = ({
  src,
  index,
  eyebrow,
  title,
  desc,
  tags,
  onExpand,
}: {
  src: string;
  index: string;
  eyebrow: string;
  title: string;
  desc: string;
  tags: string[];
  onExpand: () => void;
}) => (
  <FadeUp>
    <div
      className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]"
      style={{ backgroundColor: NAVY }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* VIDEO — grande, non rimpicciolito */}
        <button
          type="button"
          onClick={onExpand}
          aria-label="Ingrandisci video"
          className="group relative col-span-1 h-85 w-full cursor-zoom-in overflow-hidden sm:h-110 lg:col-span-6 lg:h-140 xl:col-span-5"
        >
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,.08) 0%, transparent 30%, transparent 70%, rgba(0,0,0,.25) 100%)",
            }}
          />
          <span
            className={cn(
              MONO,
              "absolute bottom-4 left-4 z-10 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white"
            )}
            style={{ backgroundColor: "rgba(21,32,54,.7)" }}
          >
            {index}
          </span>
          <div
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white backdrop-blur-sm transition-transform duration-300 group-hover:rotate-45"
            style={{ backgroundColor: "rgba(21,32,54,.55)" }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>
        </button>

        {/* TESTO — a destra */}
        <div className="col-span-1 flex flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 lg:col-span-6 lg:px-12 xl:col-span-7 xl:px-16">
          <span className={cn(MONO, "text-[11px] uppercase tracking-[0.25em] text-white/50")}>
            {eyebrow}
          </span>
          <h3
            className={cn(DISPLAY, "mt-3 text-3xl font-medium leading-tight text-white sm:text-4xl")}
          >
            {title}
          </h3>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
            {desc}
          </p>

          {tags.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    MONO,
                    "rounded-full border border-white/15 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/70"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </FadeUp>
);

const ChiSiamo = () => {
  const [lightbox, setLightbox] = useState(false);

  return (
    <section id="chi-siamo" className="relative bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-16 hidden h-105 w-105 opacity-[0.05] lg:block">
        <Seal className="h-full w-full" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4 lg:row-span-full">
          <div className="lg:sticky lg:top-28">
            <h2
              className={cn(DISPLAY, "text-3xl sm:text-4xl font-medium leading-tight")}
              style={{ color: NAVY }}
            >
              Chi siamo
            </h2>
            <div
              className="mt-6 rounded-2xl p-6 text-white"
              style={{ background: `linear-gradient(135deg, ${NAVY}, #22314D)` }}
            >
              <p className="text-sm leading-relaxed text-white/85">
                Un&apos;organizzazione datoriale al fianco di imprese, artigiani,
                commercianti, professionisti e lavoratori autonomi.
              </p>
              <div className="mt-5 flex gap-1.5">
                {ARC_COLORS.map((c) => (
                  <span key={c} className="h-1 flex-1 rounded-full" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 lg:col-start-5 space-y-10">
          <FadeUp>
            <p className="text-neutral-800 text-lg sm:text-xl leading-relaxed">
              <span
                className={cn(DISPLAY, "float-left mr-2 text-6xl leading-[0.85] font-medium")}
                style={{ color: BLUE }}
              >
                E
              </span>
              S.A.AR.CO. Confederazione è un&apos;organizzazione datoriale che
              rappresenta e tutela imprese, artigiani, commercianti, professionisti
              e lavoratori autonomi. Opera per promuovere lo sviluppo delle attività
              economiche attraverso servizi di consulenza, rappresentanza sindacale,
              formazione e assistenza alle imprese.
            </p>
          </FadeUp>

          <div className="h-px w-full clear-both" style={{ backgroundColor: HAIRLINE }} />

          <FadeUp delay={0.1}>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: INK_MUTED }}>
              La Confederazione favorisce il dialogo tra imprese e istituzioni,
              supportando gli associati nella gestione degli aspetti contrattuali,
              normativi e organizzativi. Attraverso la stipula di Contratti Collettivi
              Nazionali di Lavoro (CCNL), la promozione di enti bilaterali e
              l&apos;offerta di servizi qualificati, contribuisce a valorizzare il
              tessuto imprenditoriale e professionale italiano.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: INK_MUTED }}>
              L&apos;obiettivo di ES.A.AR.CO. Confederazione è offrire strumenti
              concreti per la crescita, la competitività e la tutela delle imprese,
              accompagnando gli associati con competenza, affidabilità e attenzione
              all&apos;evoluzione del mercato.
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: INK_MUTED }}>
              Sede territoriale della confederazione datoriale{" "}
              <a
                href="https://esaarco.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
                style={{ color: BLUE }}
              >
                Confederazione ESAARCO
              </a>
              , attiva nella formazione professionale, nei servizi per le imprese e
              nella gestione di eventi formativi ECM in collaborazione con enti come
              Efei{" "}
              <a
                href="https://efeiecm.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
                style={{ color: BLUE }}
              >
                EFEI ECM
              </a>
              .
            </p>
          </FadeUp>
        </div>

        {/* ── Blocco video full-width, video grande + testo a destra ── */}
        <div className="lg:col-span-12">
          <SalaVideoBlock
            src="/sala.mp4"
            index="01"
            eyebrow="La nostra sede"
            title="Sala corsi e convegni"
            desc="Uno spazio pensato per la formazione professionale e gli eventi ECM: dotato di impianto audio e postazioni per relatori, ospita corsi, convegni e sessioni di aggiornamento in collaborazione con enti accreditati."
            tags={["FORMAZIONE ECM", "CONVEGNI", "AGGIORNAMENTO PROFESSIONALE"]}
            onExpand={() => setLightbox(true)}
          />
        </div>

        <div className="lg:col-span-8 lg:col-start-5 space-y-10">
          <div className="h-px w-full" style={{ backgroundColor: HAIRLINE }} />

          {/* Servizi principali */}
          <FadeUp delay={0.3}>
            <h3 className={cn(DISPLAY, "text-xl sm:text-2xl font-medium leading-snug")} style={{ color: NAVY }}>
              Servizi Principali
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {SERVIZI.map((s, i) => (
                <div key={s.title} className="flex flex-col gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: ARC_COLORS[i % ARC_COLORS.length] }}
                  />
                  <h4 className="text-base font-semibold" style={{ color: NAVY }}>
                    {s.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: INK_MUTED }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-6 cursor-zoom-out backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(false)}
          >
            <motion.div
              className="relative h-[75vh] w-full max-w-3xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src="/sala.mp4"
                controls
                autoPlay
                loop
                playsInline
                className="h-full w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ─── Percorsi formativi — griglia di card ────────────────────────────────────
const PERCORSI = [
  {
    code: "SIC",
    title: "Formazione normata D.Lgs. 81/08 e s.m.i.",
    subtitle: "Salute e sicurezza sui luoghi di lavoro",
    desc: "Percorsi formativi normati dal D.lgs. 81/08, dal D.Lgs 106/09 e s.m.i. e dagli Accordi Stato-Regioni in qualità di Soggetto Formatore accreditato Ope Legis in tutte le Regioni d'Italia. L'erogazione di tale formazione viene effettuata dalle sedi Es.A.AR.CO. di tutta Italia.",
  },
  {
    code: "HACCP",
    title: "HACCP",
    subtitle: "Percorsi formativi per alimentaristi",
    desc: "Percorsi in e-learning per l'igiene alimentare (HACCP), percorsi per titolari e responsabili dell'industria alimentare, percorsi per operatori del settore alimentare che manipolano o non manipolano alimenti svolti direttamente dall'organismo accreditato.",
  },
  {
    code: "CFP",
    title: "Crediti Formativi Professionali",
    subtitle: "Ingegneri, Architetti, Geometri, Periti, Avvocati, Commercialisti",
    desc: "Grazie all'accreditamento ottenuto presso i vari ordini e/o collegi professionali, i professionisti che frequentano i corsi accreditati possono conseguire i CFP.",
  },
  {
    code: "ECM",
    title: "Educazione Continua in Medicina",
    subtitle: "Provider ECM Cod. 5829 — Ministero della Salute (A.Ge.Na.S.)",
    desc: "Rilascio dei crediti ECM obbligatori per tutte le professioni mediche in modalità e-learning, residenziale e blended learning, su piattaforma LMS con protocolli Scorm 2.0. Percorsi accreditati specifici per la Medicina del Lavoro.",
  },
];

const Percorsi = () => (
  <section
    id="percorsi"
    className="relative overflow-hidden py-24 sm:py-32"
    style={{ backgroundColor: PAPER }}
  >
    {/* Arco decorativo di sfondo, eco del Sigillo */}
    <div className="pointer-events-none absolute -left-40 top-0 h-130 w-130 opacity-[0.05]">
      <Seal className="h-full w-full" />
    </div>

    <div className="relative mx-auto max-w-6xl px-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <FadeUp className="max-w-xl">
          <span
            className={cn(MONO, "text-[11px] uppercase tracking-[0.25em]")}
            style={{ color: INK_MUTED }}
          >
            Accreditamenti e formazione
          </span>
          <h1
            className={cn(DISPLAY, "mt-3 text-3xl sm:text-4xl md:text-5xl font-medium leading-tight")}
            style={{ color: NAVY }}
          >
            Percorsi formativi
          </h1>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed sm:text-right" style={{ color: INK_MUTED }}>
            Quattro aree di accreditamento, per rispondere agli obblighi normativi di imprese e professionisti.
          </p>
        </FadeUp>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {PERCORSI.map((p, i) => {
          const color = ARC_COLORS[i % ARC_COLORS.length];
          return (
            <FadeUp key={p.code} delay={i * 0.06}>
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-7 sm:p-8 transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(21,32,54,0.18)]"
                style={{ border: `1px solid ${HAIRLINE}` }}
              >
                {/* barra colore in alto */}
                <span
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: color }}
                />

                <div className="flex items-start justify-between gap-4">
                  <span
                    className={cn(DISPLAY, "text-4xl font-medium leading-none")}
                    style={{ color: HAIRLINE }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      MONO,
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
                    )}
                    style={{ color, backgroundColor: `${color}14` }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                    {p.code}
                  </span>
                </div>

                <h4
                  className={cn(DISPLAY, "mt-6 text-xl sm:text-2xl font-medium leading-snug")}
                  style={{ color: NAVY }}
                >
                  {p.title}
                </h4>
                <p className="mt-1.5 text-sm font-medium" style={{ color: INK_MUTED }}>
                  {p.subtitle}
                </p>

                <div className="mt-4 h-px w-full" style={{ backgroundColor: HAIRLINE }} />

                <p className="mt-4 flex-1 text-sm leading-relaxed" style={{ color: INK_MUTED }}>
                  {p.desc}
                </p>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── Page ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="bg-white overflow-x-hidden">
      <Hero />
      <Mission />
      <ChiSiamo />
      <Percorsi />
    </main>
  );
}