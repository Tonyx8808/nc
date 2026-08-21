"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  useAccessibility,
  MIN_FONT_SCALE,
  MAX_FONT_SCALE,
  type AccessibilityToggleKey,
} from "@/components/accessibility/accessibility-context";
import { translatePageTo } from "@/components/accessibility/google-translate";

/**
 * components/accessibility/accessibility-panel.tsx
 *
 * Pulsante flottante (in basso a sinistra, per non sovrapporsi
 * all'hamburger del menu in alto a destra) che apre il pannello con
 * tutti i controlli di accessibilità: dimensione testo, contrasto,
 * lettura vocale della pagina e traduzione.
 */

const NAVY = "#1B2740";
const RED = "#E32726";
const ORANGE = "#F5A623";
const YELLOW = "#FFD200";
const GREEN = "#3AA845";
const BLUE = "#29A9E1";

const INK_MUTED = "#616B7D";
const HAIRLINE = "#E4E4DE";

const DISPLAY = "font-serif";
const MONO = "font-mono";

const LANGUAGES: { code: string; label: string }[] = [
  { code: "it", label: "Italiano (originale)" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية" },
  { code: "zh-CN", label: "中文" },
  { code: "ru", label: "Русский" },
];

// ─── Icone ──────────────────────────────────────────────────────────────
const AccessibilityIcon = ({ size = 26 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <circle cx="12" cy="4.2" r="2.1" />
    <path d="M12 7.3c-1.15 0-2.1.93-2.1 2.1v2.75l-3.55 1.2c-.55.19-.84.78-.65 1.32.19.54.79.83 1.33.64L10 14.15v1.9L7.55 20.9c-.28.53-.06 1.18.48 1.45.53.27 1.18.05 1.45-.48L12 17.4l2.52 4.47c.27.53.92.75 1.45.48.54-.27.76-.92.48-1.45L14 16.05v-1.9l2.97 1.16c.54.19 1.14-.1 1.33-.64.19-.54-.1-1.13-.65-1.32L14.1 12.15V9.4c0-1.17-.95-2.1-2.1-2.1z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M18 6 6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

const ResetIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);

const StopIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <rect x="6" y="6" width="12" height="12" rx="1.5" />
  </svg>
);

// ─── Toggle (tema chiaro, per il pannello) ────────────────────────────────
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors"
    style={{ backgroundColor: checked ? BLUE : HAIRLINE }}
  >
    <motion.span
      className="inline-block h-4.5 w-4.5 rounded-full bg-white shadow-sm"
      animate={{ x: checked ? 22 : 3 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
    />
  </button>
);

const ToggleRow = ({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <div className="flex items-start justify-between gap-4 py-3.5" style={{ borderTop: `1px solid ${HAIRLINE}` }}>
    <div>
      <p className="text-sm font-medium" style={{ color: NAVY }}>{label}</p>
      <p className="mt-0.5 text-xs leading-relaxed" style={{ color: INK_MUTED }}>{description}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const TOGGLE_OPTIONS: { key: AccessibilityToggleKey; label: string; description: string }[] = [
  { key: "highContrast", label: "Alto contrasto", description: "Aumenta il contrasto dei colori per una lettura più netta." },
  { key: "grayscale", label: "Scala di grigi", description: "Rimuove i colori, utile in caso di daltonismo o affaticamento visivo." },
  { key: "dyslexiaFont", label: "Font per la leggibilità", description: "Usa un carattere più semplice da leggere." },
  { key: "underlineLinks", label: "Sottolinea i link", description: "Evidenzia tutti i collegamenti del sito." },
  { key: "textSpacing", label: "Spaziatura testo", description: "Aumenta la spaziatura tra lettere, parole e righe." },
  { key: "highlightHeadings", label: "Evidenzia i titoli", description: "Mette in risalto i titoli delle sezioni per orientarsi meglio." },
  { key: "reduceMotion", label: "Riduci le animazioni", description: "Riduce al minimo animazioni e transizioni del sito." },
  { key: "largeCursor", label: "Cursore ingrandito", description: "Aumenta la dimensione del puntatore del mouse." },
];

// ─── Lettura vocale della pagina ────────────────────────────────────────
type ReadState = "idle" | "playing" | "paused";

function splitIntoChunks(text: string, maxLen = 220): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if ((current + " " + sentence).trim().length > maxLen && current) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current = (current + " " + sentence).trim();
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.filter(Boolean);
}

function getItalianVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((v) => v.lang.toLowerCase().startsWith("it"));
}

function useReadAloud() {
  const [state, setState] = useState<ReadState>("idle");
  const pathname = usePathname();

  useEffect(() => {
    // Cambio pagina: interrompe una lettura in corso per evitare di
    // leggere il testo della pagina precedente.
    window.speechSynthesis?.cancel();
    setState("idle");
  }, [pathname]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const start = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const main = document.querySelector("main");
    const rawText = (main ?? document.body).innerText || "";
    const chunks = splitIntoChunks(rawText);
    if (chunks.length === 0) return;

    const voice = getItalianVoice();

    chunks.forEach((chunk, i) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = "it-IT";
      if (voice) utterance.voice = voice;
      utterance.rate = 1;
      if (i === chunks.length - 1) {
        utterance.onend = () => setState("idle");
      }
      window.speechSynthesis.speak(utterance);
    });

    setState("playing");
  };

  const pause = () => {
    window.speechSynthesis?.pause();
    setState("paused");
  };

  const resume = () => {
    window.speechSynthesis?.resume();
    setState("playing");
  };

  const stop = () => {
    window.speechSynthesis?.cancel();
    setState("idle");
  };

  return { state, start, pause, resume, stop };
}

export function AccessibilityPanel() {
  const { settings, increaseFontScale, decreaseFontScale, toggle, reset } = useAccessibility();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("it");
  const readAloud = useReadAloud();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const fontPct = Math.round(settings.fontScale * 100);

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLang(value);
    translatePageTo(value);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Apri il pannello di accessibilità"
        aria-expanded={open}
        className="fixed bottom-6 left-6 z-40 flex h-13 w-13 items-center justify-center rounded-full text-white shadow-[0_10px_30px_-8px_rgba(21,32,54,0.5)] transition-transform hover:scale-105"
        style={{ backgroundColor: NAVY }}
      >
        <AccessibilityIcon />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Pannello di accessibilità"
            className="fixed bottom-24 left-6 z-40 w-[min(360px,calc(100vw-3rem))] max-h-[75vh] overflow-y-auto rounded-3xl bg-white shadow-[0_24px_60px_-16px_rgba(21,32,54,0.35)]"
            style={{ border: `1px solid ${HAIRLINE}` }}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 rounded-t-3xl bg-white/95 px-6 pb-3 pt-5 backdrop-blur-sm" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
              <div>
                <span className={cn(MONO, "text-[10px] uppercase tracking-[0.2em]")} style={{ color: INK_MUTED }}>
                  Accessibilità
                </span>
                <h2 className={cn(DISPLAY, "text-lg font-medium leading-snug")} style={{ color: NAVY }}>
                  Personalizza la lettura
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Chiudi pannello di accessibilità"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
                style={{ color: INK_MUTED }}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-6 pb-6">
              {/* Lettura vocale */}
              <div className="py-4" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
                <p className="text-sm font-medium" style={{ color: NAVY }}>Lettura vocale della pagina</p>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: INK_MUTED }}>
                  Legge ad alta voce il testo della pagina che stai visitando.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  {readAloud.state === "idle" && (
                    <button
                      type="button"
                      onClick={readAloud.start}
                      className={cn(MONO, "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02]")}
                      style={{ backgroundColor: BLUE }}
                    >
                      <PlayIcon />
                      Leggi la pagina
                    </button>
                  )}
                  {readAloud.state === "playing" && (
                    <>
                      <button
                        type="button"
                        onClick={readAloud.pause}
                        className={cn(MONO, "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-white")}
                        style={{ backgroundColor: BLUE }}
                      >
                        <PauseIcon />
                        Pausa
                      </button>
                      <button
                        type="button"
                        onClick={readAloud.stop}
                        className={cn(MONO, "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.12em]")}
                        style={{ borderColor: HAIRLINE, color: NAVY }}
                      >
                        <StopIcon />
                        Stop
                      </button>
                    </>
                  )}
                  {readAloud.state === "paused" && (
                    <>
                      <button
                        type="button"
                        onClick={readAloud.resume}
                        className={cn(MONO, "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-white")}
                        style={{ backgroundColor: BLUE }}
                      >
                        <PlayIcon />
                        Riprendi
                      </button>
                      <button
                        type="button"
                        onClick={readAloud.stop}
                        className={cn(MONO, "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.12em]")}
                        style={{ borderColor: HAIRLINE, color: NAVY }}
                      >
                        <StopIcon />
                        Stop
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Traduzione */}
              <div className="py-4" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
                <p className="text-sm font-medium" style={{ color: NAVY }}>Traduci pagina</p>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: INK_MUTED }}>
                  Traduce il testo della pagina nella lingua scelta.
                </p>
                <select
                  value={lang}
                  onChange={handleLangChange}
                  className={cn(MONO, "mt-3 w-full rounded-xl px-3 py-2.5 text-xs")}
                  style={{ border: `1px solid ${HAIRLINE}`, color: NAVY, backgroundColor: "#fff" }}
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dimensione testo */}
              <div className="py-4" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
                <p className="text-sm font-medium" style={{ color: NAVY }}>Dimensione testo</p>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decreaseFontScale}
                    disabled={settings.fontScale <= MIN_FONT_SCALE}
                    aria-label="Riduci dimensione testo"
                    className={cn(MONO, "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors disabled:opacity-30")}
                    style={{ border: `1px solid ${HAIRLINE}`, color: NAVY }}
                  >
                    A-
                  </button>
                  <span className={cn(MONO, "min-w-11 text-center text-xs")} style={{ color: INK_MUTED }}>
                    {fontPct}%
                  </span>
                  <button
                    type="button"
                    onClick={increaseFontScale}
                    disabled={settings.fontScale >= MAX_FONT_SCALE}
                    aria-label="Aumenta dimensione testo"
                    className={cn(MONO, "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors disabled:opacity-30")}
                    style={{ border: `1px solid ${HAIRLINE}`, color: NAVY }}
                  >
                    A+
                  </button>
                </div>
              </div>

              {TOGGLE_OPTIONS.map((opt) => (
                <ToggleRow
                  key={opt.key}
                  label={opt.label}
                  description={opt.description}
                  checked={settings[opt.key]}
                  onChange={() => toggle(opt.key)}
                />
              ))}

              <button
                type="button"
                onClick={reset}
                className={cn(MONO, "mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] transition-colors")}
                style={{ color: INK_MUTED }}
              >
                <ResetIcon />
                Ripristina impostazioni
              </button>
            </div>

            <div className="flex gap-1.5 px-6 pb-5">
              {[RED, ORANGE, YELLOW, GREEN, BLUE].map((c) => (
                <span key={c} className="h-1 flex-1 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}