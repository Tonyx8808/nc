"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAVY = "#152036";
const BLUE = "#29A9E1";
const RED = "#E32726";
const ORANGE = "#F5A623";
const YELLOW = "#FFD200";
const GREEN = "#3AA845";
const INK_MUTED = "#616B7D";
const PAPER = "#FAFAF8";
const HAIRLINE = "#E4E4DE";
const ARC_COLORS = [RED, ORANGE, YELLOW, GREEN, BLUE];

const DISPLAY = "font-serif";
const MONO = "font-mono";

// Durata di ogni slide in autoplay (ms)
const AUTOPLAY_MS = 6500;

const TESTIMONIALS = [
  {
    quote:
      "Grazie a ES.A.AR.CO. ho ottenuto la certificazione HACCP in tempi brevissimi. Il personale è stato disponibile e professionale dall'inizio alla fine.",
    author: "Michele R.",
    role: "Titolare di un'impresa alimentare",
    city: "Lamezia Terme",
  },
  {
    quote:
      "Il corso ECM organizzato dalla sede è stato eccellente: relatori qualificati, materiale aggiornato e piattaforma digitale intuitiva. Tornerò sicuramente.",
    author: "Maria G.",
    role: "Medico di Medicina Generale",
    city: "Catanzaro",
  },
  {
    quote:
      "Ho rinnovato il CCNL per i miei dipendenti con il supporto dell'ufficio contrattuale. Competenti, rapidi e senza burocrazia inutile.",
    author: "Salvatore M.",
    role: "Titolare di un'impresa artigiana",
    city: "Cosenza",
  },
  {
    quote:
      "Come infermiera, avevo bisogno dei crediti ECM obbligatori. ES.A.AR.CO. ha reso tutto semplice: ho completato il percorso online senza stress.",
    author: "Francesca L.",
    role: "Infermiera professionale",
    city: "Reggio Calabria",
  },
  {
    quote:
      "Il corso sulla sicurezza sul lavoro (D.Lgs. 81/08) è stato chiaro e completo. I miei dipendenti sono ora in regola e più consapevoli dei rischi.",
    author: "Giuseppe A.",
    role: "Responsabile produzione",
    city: "Vibo Valentia",
  },
  {
    quote:
      "Finalmente un ente serio che risponde al telefono e ti segue passo per passo. Ho ottenuto i crediti formativi per l'Ordine degli Ingegneri senza difficoltà.",
    author: "Stefania D.",
    role: "Ingegnera civile",
    city: "Crotone",
  },
  {
    quote:
      "Iscritto da due anni, utilizzo la piattaforma per scaricare dispense e modulistica. Sempre aggiornata e facile da navigare.",
    author: "Carmine V.",
    role: "Consulente del lavoro",
    city: "Napoli",
  },
  {
    quote:
      "Ho partecipato a un convegno ECM in presenza nella loro sala corsi: organizzazione impeccabile, ottimo catering e molto networking con colleghi del settore.",
    author: "Alessandra P.",
    role: "Farmacista",
    city: "Palermo",
  },
  {
    quote:
      "Il supporto per la gestione dei contratti collettivi è stato fondamentale per la mia piccola impresa. Risparmio tempo e sono sempre in regola.",
    author: "Rocco F.",
    role: "Imprenditore agricolo",
    city: "Foggia",
  },
  {
    quote:
      "Professionalità e cortesia in ogni interazione. La formazione sulla sicurezza per i preposti era esattamente ciò di cui avevo bisogno.",
    author: "Valentina C.",
    role: "Preposta alla sicurezza",
    city: "Bari",
  },
];

// Varianti di transizione per il crossfade + slide del contenuto principale
const contentVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 24 : -24,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -24 : 24,
    filter: "blur(4px)",
  }),
};

export default function DiconoDiNoi() {
  const [[active, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [isHovering, setIsHovering] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const paginate = useCallback((newDirection: number) => {
    setSlide(([prev]) => {
      const next =
        (prev + newDirection + TESTIMONIALS.length) % TESTIMONIALS.length;
      return [next, newDirection];
    });
    setProgressKey((k) => k + 1);
  }, []);

  const goTo = useCallback((index: number) => {
    setSlide(([prev]) => [index, index > prev ? 1 : -1]);
    setProgressKey((k) => k + 1);
  }, []);

  // Autoplay: avanza automaticamente, si mette in pausa su hover/focus
  useEffect(() => {
    if (isHovering) return;

    timerRef.current = setInterval(() => {
      paginate(1);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering, progressKey, paginate]);

  const current = TESTIMONIALS[active];
  const color = ARC_COLORS[active % ARC_COLORS.length];

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32 border-t"
      style={{ backgroundColor: PAPER, borderColor: HAIRLINE }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Glow ambientale morbido, coerente con l'hero */}
      <motion.div
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full blur-[120px]"
        animate={{ backgroundColor: `${color}22` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span
              className={cn(MONO, "text-[11px] uppercase tracking-[0.25em]")}
              style={{ color: INK_MUTED }}
            >
              Testimonianze
            </span>
            <h2
              className={cn(
                DISPLAY,
                "mt-2 text-3xl sm:text-4xl md:text-5xl font-medium leading-tight"
              )}
              style={{ color: NAVY }}
            >
              Dicono di noi
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed sm:text-right"
            style={{ color: INK_MUTED }}
          >
            Le esperienze di chi ha già scelto ES.A.AR.CO.
          </p>
        </div>

        {/* Barra colori brand, con transizione di opacità sul segmento attivo */}
        <div className="mb-12 flex h-0.5 w-full gap-1 overflow-hidden rounded-full">
          {ARC_COLORS.map((c, i) => (
            <motion.span
              key={c}
              className="flex-1"
              animate={{ opacity: i === active % ARC_COLORS.length ? 1 : 0.35 }}
              transition={{ duration: 0.4 }}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Testimonianza */}
        <div className="relative flex items-start gap-6 sm:gap-10 min-h-[280px] sm:min-h-[240px]">
          {/* Numero grande + virgolette decorative, sempre presenti */}
          <div className="relative shrink-0">
            <Quote
              className="absolute -left-1 -top-2 h-8 w-8 opacity-[0.12] sm:h-10 sm:w-10"
              style={{ color }}
              fill={color}
            />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.span
                key={active}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  DISPLAY,
                  "block select-none text-[80px] sm:text-[110px] font-medium leading-none"
                )}
                style={{ color }}
              >
                {String(active + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex-1 pt-3 sm:pt-5 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote
                  className={cn(
                    DISPLAY,
                    "text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed tracking-tight"
                  )}
                  style={{ color: NAVY }}
                >
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {current.author
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: NAVY }}>
                      {current.author}
                    </p>
                    <p className="text-sm" style={{ color: INK_MUTED }}>
                      {current.role}
                      <span className="mx-1.5 opacity-30">/</span>
                      {current.city}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigazione */}
        <div className="mt-14 flex items-center justify-between">
          {/* Trattini con barra di progresso autoplay */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {TESTIMONIALS.map((_, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className="group relative py-4"
                    aria-label={`Vai alla testimonianza ${index + 1}`}
                  >
                    <span
                      className="relative block h-px overflow-hidden rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: isActive ? 40 : 20,
                        backgroundColor: `${NAVY}22`,
                      }}
                    >
                      {isActive && (
                        <motion.span
                          key={progressKey}
                          className="absolute inset-y-0 left-0 block h-full"
                          style={{ backgroundColor: color }}
                          initial={{ width: "0%" }}
                          animate={{ width: isHovering ? "0%" : "100%" }}
                          transition={
                            isHovering
                              ? { duration: 0.2 }
                              : { duration: AUTOPLAY_MS / 1000, ease: "linear" }
                          }
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            <span
              className={cn(MONO, "text-xs uppercase tracking-widest")}
              style={{ color: INK_MUTED }}
            >
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(TESTIMONIALS.length).padStart(2, "0")}
            </span>
          </div>

          {/* Frecce */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => paginate(-1)}
              className="rounded-full p-2 transition-all duration-300"
              style={{ color: `${NAVY}60` }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = NAVY)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = `${NAVY}60`)
              }
              aria-label="Precedente"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="rounded-full p-2 transition-all duration-300"
              style={{ color: `${NAVY}60` }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = NAVY)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = `${NAVY}60`)
              }
              aria-label="Successiva"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}