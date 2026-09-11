"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * components/cookie-consent.tsx
 *
 * Banner cookie con opzione "Accetta tutti" / "Rifiuta" / "Personalizza".
 * Le preferenze si salvano in localStorage (chiave sotto) e restano
 * valide finché l'utente non le cambia da /cookie-policy o dal link
 * "Gestisci Cookie" nel footer (che riapre questo banner tramite un
 * CustomEvent — vedi OPEN_EVENT più sotto).
 *
 * Da montare una sola volta, in app/layout.tsx, dentro <body>:
 *
 *   import { CookieConsent } from "@/components/cookie-consent";
 *   ...
 *   <body>
 *     {children}
 *     <CookieConsent />
 *   </body>
 */

const STORAGE_KEY = "esaarco-cookie-consent";
export const OPEN_COOKIE_PREFERENCES_EVENT = "esaarco:open-cookie-preferences";

const NAVY = "#1B2740";
const RED = "#E32726";
const ORANGE = "#F5A623";
const BLUE = "#29A9E1";

const MONO = "font-mono";

interface ConsentState {
  necessary: true;
  stats: boolean;
  marketing: boolean;
  updatedAt: string;
}

function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function writeConsent(consent: ConsentState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // localStorage non disponibile (privacy mode, ecc.): il banner
    // ricomparirà al prossimo giro, non è un problema bloccante.
  }
}

// ─── Toggle ─────────────────────────────────────────────────────────────
const Toggle = ({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={cn(
      "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
      disabled && "cursor-not-allowed opacity-50"
    )}
    style={{ backgroundColor: checked ? BLUE : "rgba(255,255,255,0.15)" }}
  >
    <motion.span
      className="inline-block h-4.5 w-4.5 rounded-full bg-white"
      animate={{ x: checked ? 22 : 3 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
    />
  </button>
);

// ─── Riga categoria (nel pannello "Personalizza") ─────────────────────────
const CategoryRow = ({
  title,
  description,
  checked,
  onChange,
  locked = false,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  locked?: boolean;
}) => (
  <div className="flex items-start justify-between gap-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
    <div>
      <p className="text-sm font-medium text-white">
        {title}
        {locked && <span className="ml-2 text-[10px] uppercase tracking-widest text-white/40">Sempre attivi</span>}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-white/60">{description}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} disabled={locked} />
  </div>
);

// ─── Cookie Consent ─────────────────────────────────────────────────────
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [stats, setStats] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      setStats(existing.stats);
      setMarketing(existing.marketing);
    } else {
      const timer = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const onOpen = () => {
      const existing = readConsent();
      if (existing) {
        setStats(existing.stats);
        setMarketing(existing.marketing);
      }
      setCustomizing(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, onOpen);
  }, []);

  const save = (nextStats: boolean, nextMarketing: boolean) => {
    writeConsent({
      necessary: true,
      stats: nextStats,
      marketing: nextMarketing,
      updatedAt: new Date().toISOString(),
    });
    setVisible(false);
    setCustomizing(false);
  };

  const acceptAll = () => save(true, true);
  const rejectAll = () => {
    setStats(false);
    setMarketing(false);
    save(false, false);
  };
  const savePreferences = () => save(stats, marketing);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-100 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl shadow-[0_24px_60px_-16px_rgba(0,0,0,0.5)]"
            style={{ background: `linear-gradient(135deg, ${NAVY}, #24314C)` }}
          >
            <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: `linear-gradient(90deg, ${RED}, ${ORANGE}, ${BLUE})` }} />

            <div className="p-6 sm:p-7">
              {!customizing ? (
                <>
                  <span className={cn(MONO, "text-[10px] uppercase tracking-[0.2em] text-white/50")}>
                    Cookie
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    Utilizziamo cookie tecnici necessari al funzionamento del
                    sito e, solo con il tuo consenso, cookie di statistica e
                    marketing per migliorare i nostri servizi. Consulta la{" "}
                    <Link href="/cookie-policy" className="underline underline-offset-4" style={{ color: BLUE }}>
                      Cookie Policy
                    </Link>{" "}
                    per maggiori informazioni.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={acceptAll}
                      className={cn(MONO, "rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02]")}
                      style={{ backgroundColor: BLUE }}
                    >
                      Accetta tutti
                    </button>
                    <button
                      type="button"
                      onClick={rejectAll}
                      className={cn(MONO, "rounded-full border border-white/25 px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-white hover:text-white")}
                    >
                      Rifiuta
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomizing(true)}
                      className={cn(MONO, "rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-white/60 underline underline-offset-4 transition-colors hover:text-white")}
                    >
                      Personalizza
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className={cn(MONO, "text-[10px] uppercase tracking-[0.2em] text-white/50")}>
                    Personalizza cookie
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">
                    Scegli quali categorie di cookie autorizzare. Puoi
                    cambiare idea in qualsiasi momento dalla Cookie Policy.
                  </p>

                  <div className="mt-2">
                    <CategoryRow
                      title="Necessari"
                      description="Indispensabili per il funzionamento del sito (es. sicurezza, salvataggio delle preferenze cookie)."
                      checked={true}
                      onChange={() => {}}
                      locked
                    />
                    <CategoryRow
                      title="Statistiche"
                      description="Ci aiutano a capire come viene usato il sito, in forma aggregata e anonima."
                      checked={stats}
                      onChange={setStats}
                    />
                    <CategoryRow
                      title="Marketing"
                      description="Utilizzati per mostrare contenuti e comunicazioni più rilevanti."
                      checked={marketing}
                      onChange={setMarketing}
                    />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={savePreferences}
                      className={cn(MONO, "rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02]")}
                      style={{ backgroundColor: BLUE }}
                    >
                      Salva preferenze
                    </button>
                    <button
                      type="button"
                      onClick={acceptAll}
                      className={cn(MONO, "rounded-full border border-white/25 px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-white hover:text-white")}
                    >
                      Accetta tutti
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomizing(false)}
                      className={cn(MONO, "rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-white/60 underline underline-offset-4 transition-colors hover:text-white")}
                    >
                      Indietro
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}