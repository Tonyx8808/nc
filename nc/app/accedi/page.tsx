"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * app/accedi/page.tsx
 *
 * Pagina di accesso con codice. Chiama la propria API Next.js (route.ts)
 * che verifica il codice e restituisce un token JWT, salvato in
 * localStorage sotto la chiave "userToken" — la stessa chiave letta da
 * lib/protected-download.ts.
 */

const NAVY = "#1B2740";
const INK_MUTED = "#616B7D";
const HAIRLINE = "#E4E4DE";
const RED = "#E32726";

const MONO = "font-mono";
const DISPLAY = "font-serif";

function AccediForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dispense";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
           const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Errore durante l'accesso.");
        setLoading(false);
        return;
      }

      localStorage.setItem("userToken", data.token);
      router.push(redirectTo);
    } catch (err) {
      setError("Impossibile contattare il server. Riprova più tardi.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl p-9 text-center"
        style={{ border: `1px solid ${HAIRLINE}`, boxShadow: "0 20px 50px -20px rgba(21,32,54,0.18)" }}
      >
        <h1 className={cn(DISPLAY, "text-2xl font-medium")} style={{ color: NAVY }}>
          Area riservata
        </h1>
        <p className="mt-2 text-sm" style={{ color: INK_MUTED }}>
          Inserisci il codice di accesso ricevuto per scaricare dispense e documenti.
        </p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={8}
          placeholder="es. a1b2c3d4"
          autoComplete="off"
          required
          className={cn(MONO, "mt-7 w-full rounded-xl px-4 py-3 text-center text-lg tracking-[0.15em] outline-none")}
          style={{ border: `1px solid ${HAIRLINE}`, color: NAVY }}
        />

        {error && (
          <p className="mt-3 text-sm" style={{ color: RED }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={cn(MONO, "mt-6 w-full rounded-xl py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity disabled:opacity-60")}
          style={{ backgroundColor: NAVY }}
        >
          {loading ? "Verifica in corso..." : "Accedi"}
        </button>
      </form>
    </main>
  );
}

export default function AccediPage() {
  return (
    <Suspense fallback={null}>
      <AccediForm />
    </Suspense>
  );
}