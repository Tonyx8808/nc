import React from "react";
import { HighlightPanel, PageShell, SectionHeader } from "@/components/home-style";

export default function LingueStraniere() {
	return (
		<PageShell
			title="Lingue Straniere"
			subtitle="Certificazioni linguistiche QCER per rafforzare il tuo curriculum e incrementare il punteggio GPS."
			label="Lingue"
			imageUrl="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=2670&auto=format&fit=crop"
		>
			<SectionHeader
				title="Livelli di certificazione"
				description="Scegli un percorso linguistico con valore GPS e riconoscimento per l'università e la scuola."
			/>

			<section className="space-y-12">
				<div className="grid gap-6 md:grid-cols-3">
					{[
						{ level: "B2", points: "3 punti", label: "Utente Indipendente", color: "#2563eb" },
						{ level: "C1", points: "4 punti", label: "Utente Competente", color: "#059669" },
						{ level: "C2", points: "6 punti", label: "Padronanza della Lingua", color: "#7c3aed" },
					].map((item) => (
						<div key={item.level} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
							<p className="text-2xl font-semibold text-neutral-900 mb-2">{item.level}</p>
							<p className="text-sm uppercase tracking-[0.25em] font-semibold" style={{ color: item.color }}>
								{item.points}
							</p>
							<p className="mt-4 text-neutral-600">{item.label}</p>
						</div>
					))}
				</div>

				<SectionHeader
					title="Utilizzi delle certificazioni linguistiche"
					description="Strumenti importanti per convalide universitarie, punti GPS e percorsi CLIL."
				/>

				<div className="grid gap-6 md:grid-cols-2">
					{[
						"Convalida di prove universitarie",
						"Incremento del punteggio GPS",
						"Supporto per percorsi CLIL",
						"Miglioramento del profilo professionale",
					].map((item) => (
						<div key={item} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm text-neutral-600">
							{item}
						</div>
					))}
				</div>

				<HighlightPanel color="#9A7B3A">
					<p className="text-neutral-900 font-semibold">Supporto completo</p>
					<p className="text-neutral-700 leading-relaxed">
						Le certificazioni linguistiche sono integrate nel percorso formativo per docenti e studenti, con focus su qualità e riconoscimento.
					</p>
				</HighlightPanel>

				<div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
					<p className="text-xl font-semibold text-neutral-900 mb-4">Inizia subito</p>
					<p className="text-neutral-600">Scopri quale livello QCER è più adatto al tuo profilo e raggiungi i tuoi obiettivi linguistici.</p>
					<p className="mt-4 text-neutral-700">Telefono: <strong>+39 339 121 9689</strong></p>
					<p className="text-neutral-700">Orari: <strong>Lunedì – Venerdì, 9:00 – 18:00</strong></p>
				</div>
			</section>
		</PageShell>
	);
}
