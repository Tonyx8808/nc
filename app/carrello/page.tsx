"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { courseCatalog, CourseKey } from "@/lib/courses";

export default function CarrelloPage() {
  const [courseKey, setCourseKey] = useState<CourseKey | null>(null);

  useEffect(() => {
    const value = window.localStorage.getItem("nc-cart-course");
    if (value && value in courseCatalog) {
      setCourseKey(value as CourseKey);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const queryCourse = params.get("course");
    if (queryCourse && queryCourse in courseCatalog) {
      setCourseKey(queryCourse as CourseKey);
      window.localStorage.setItem("nc-cart-course", queryCourse);
      return;
    }

    setCourseKey(null);
  }, []);

  const course = useMemo(
    () => (courseKey ? courseCatalog[courseKey] : null),
    [courseKey],
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    // Simula una chiamata di pagamento
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSuccess(`Pagamento effettuato con successo per ${course?.title ?? "il tuo corso"}. Grazie!`);
  };

  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Pagamento ordine</h1>
        <p className="text-neutral-600 mb-2">Rivedi i dettagli del carrello e completa il pagamento.</p>
        {course ? (
          <>
            <p className="text-neutral-700 mb-6">Corso selezionato: <strong>{course.title}</strong></p>
            <form onSubmit={onSubmit} className="space-y-4 bg-neutral-50 p-6 rounded-lg border">
          <div>
            <label className="block text-sm font-medium text-neutral-700">Nome completo</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">Numero carta</label>
            <input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric" className="mt-1 w-full rounded-md border px-3 py-2" placeholder="4242 4242 4242 4242" required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Scadenza (MM/AA)</label>
              <input value={expiry} onChange={(e) => setExpiry(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" placeholder="05/26" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">CVC</label>
              <input value={cvc} onChange={(e) => setCvc(e.target.value)} inputMode="numeric" className="mt-1 w-full rounded-md border px-3 py-2" placeholder="123" required />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="text-sm text-neutral-500">Totale</p>
              <p className="text-xl font-semibold">{course.price}</p>
            </div>
            <button type="submit" disabled={loading} className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md font-semibold">
              {loading ? "Processando..." : "Paga ora"}
            </button>
          </div>
        </form>

        {success && (
          <div className="mt-6 rounded-md bg-green-50 border border-green-200 p-4 text-green-800">
            {success}
          </div>
        )}
          </>
        ) : (
          <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 text-neutral-700">
            <p className="mb-4">Nessun corso selezionato. Torna alle categorie e aggiungi un corso al carrello.</p>
            <Link href="/categorie" className="inline-flex rounded-full bg-[#9A7B3A] px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#7a6028]">
              Vai alle categorie
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
