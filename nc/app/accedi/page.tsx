"use client";
import React, { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ripple,
  TechOrbitDisplay,
  BoxReveal,
  SpotlightInput,
  BottomGradient,
} from "@/components/ui/animated-sign-in";


/**
 * app/accedi/page.tsx
 *
 * Tema chiaro. Colonna sinistra: Ripple + orbite colorate + wordmark
 * ES.A.AR.CO. in gradiente rosso→arancio→giallo→verde→blu.
 * Colonna destra: form password con BoxReveal, SpotlightInput e
 * BottomGradient — stesso stile del prompt 21st.dev, adattato.
 * Niente Google login, niente email: solo password unica → /api/login.
 */

const RED = "#E32726";
const ORANGE = "#F5A623";
const YELLOW = "#FFD200";
const GREEN = "#3AA845";
const BLUE = "#29A9E1";
const NAVY = "#1B2740";
const ARC_COLORS = [RED, ORANGE, YELLOW, GREEN, BLUE];
const INK_MUTED = "#616B7D";

function AccediInner() {
  useEffect (() =>{
    sessionStorage.removeItem("userToken")
  }, []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dispense";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Password non valida.");
        setShake((s) => s + 1);
        return;
      }
      sessionStorage.setItem("userToken", data.token);
      router.push(redirectTo);
    } catch {
      setError("Impossibile contattare il server. Riprova più tardi.");
      setShake((s) => s + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="flex min-h-[100dvh] max-lg:justify-center"
      style={{
        background: "radial-gradient(circle at 30% 20%, #FFFFFF, #F4F5F7 70%)",
      }}
    >
      {/* ── Colonna sinistra ── */}
      <section className="relative hidden w-1/2 flex-col justify-center border-r border-black/[0.06] lg:flex">
        <Ripple
          mainCircleSize={120}
          numCircles={9}
          color={BLUE}
          className="opacity-60"
        />
        <TechOrbitDisplay
          arcColors={ARC_COLORS}
          text="ES.A.AR.CO."
          subtitle="Confederazione Esercenti Agricoltura Artigianato Commercio"
        />
      </section>

      {/* ── Colonna destra ── */}
      <section className="flex w-1/2 flex-col items-center justify-center px-10 max-lg:w-full max-lg:px-[8%]">
        <motion.div
          key={shake}
          animate={
            shake > 0
              ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
              : { x: 0 }
          }
          transition={{ duration: 0.45 }}
          className="w-full max-w-sm"
        >
          {/* Wordmark mobile */}
          <div className="mb-6 flex items-baseline gap-2 lg:hidden">
            <span
              className="font-serif text-2xl font-medium"
              style={{
                background: `linear-gradient(90deg, ${RED}, ${ORANGE}, ${YELLOW}, ${GREEN}, ${BLUE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ES.A.AR.CO.
            </span>
          </div>

          <BoxReveal boxColor="#E4E4DE" duration={0.35}>
            <h2 className="text-3xl font-bold text-neutral-800">
              Bentornato
            </h2>
          </BoxReveal>

          <BoxReveal boxColor="#E4E4DE" duration={0.35} className="mt-2 pb-3">
            <p className="max-w-sm text-sm" style={{ color: INK_MUTED }}>
              Inserisci la password consegnata presso la nostra sede all&apos;iscrizione.
            </p>
          </BoxReveal>

          <form onSubmit={handleLogin} className="mt-2 flex flex-col gap-4">
            {/* Barra colori brand */}
            <BoxReveal boxColor="#E4E4DE" duration={0.3} width="100%">
              <div className="flex h-1 w-full gap-1 rounded-full overflow-hidden mb-1">
                {ARC_COLORS.map((c) => (
                  <span key={c} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
            </BoxReveal>

            <BoxReveal boxColor="#E4E4DE" duration={0.3} width="100%">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <SpotlightInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Inserisci la password"
                    value={password}
                    required
                    autoFocus
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    spotlightColor={BLUE}
                    style={{
                      background: "#F4F5F7",
                      color: NAVY,
                      height: 48,
                    }}
                    className="placeholder:text-neutral-400 text-neutral-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                    tabIndex={-1}
                  >
                    {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-xs text-red-500"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </BoxReveal>

            <BoxReveal boxColor="#E4E4DE" duration={0.3} width="100%" className="overflow-visible">
              <button
                type="submit"
                disabled={loading}
                className="group/btn relative flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 font-medium text-neutral-800 shadow-sm transition hover:from-zinc-200 hover:to-zinc-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Verifica in corso…" : "Accedi →"}
                <BottomGradient />
              </button>
            </BoxReveal>
          </form>
        </motion.div>
      </section>
    </main>
  );
}

export default function AccediPage() {
  return (
    <Suspense fallback={null}>
      <AccediInner />
    </Suspense>
  );
}