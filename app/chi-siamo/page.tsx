import React from "react";
import { HighlightPanel, PageShell, SectionHeader } from "@/components/home-style";

export default function ChiSiamo() {
	return (
		<PageShell
			title="Chi Siamo"
			subtitle="Scopri il modello NC Consulting basato su ascolto, orientamento e percorsi personalizzati."
			label="Chi Siamo"
			imageUrl="https://images.unsplash.com/photo-1532619187603-3c8d30bf5c23?q=80&w=2670&auto=format&fit=crop"
		>
			<SectionHeader
				title="La nostra missione"
				description="Rendiamo la formazione universitaria e professionale più accessibile, organizzata e sostenibile."
			/>

			<section className="space-y-12">
				<div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
					<p className="text-neutral-700 leading-relaxed">
						<strong>NC Consulting S.r.l.</strong> nasce per rendere la formazione universitaria e professionale più accessibile, organizzata e realmente sostenibile.
					</p>
					<p className="text-neutral-700 leading-relaxed mt-4">
						Affianchiamo studenti, professionisti e aziende con percorsi formativi su misura, tutor dedicati e servizi di orientamento dedicato.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					{[
						{ title: "Pegaso", color: "#2563eb" },
						{ title: "Mercatorum", color: "#10b981" },
						{ title: "San Raffaele Roma", color: "#ef4444" },
					].map((item) => (
						<div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
							<p className="text-lg font-semibold text-neutral-900 mb-2">Università Telematica {item.title}</p>
							<p className="text-sm uppercase tracking-[0.25em] font-semibold" style={{ color: item.color }}>Telematica riconosciuta MIM</p>
						</div>
					))}
				</div>

				<div className="space-y-6">
					{[
						{
							title: "Ascolto",
							description: "Comprendiamo il profilo, i bisogni e gli obiettivi dello studente o del professionista.",
							color: "#2563eb",
						},
						{
							title: "Orientamento Dedicato",
							description: "Identifichiamo il percorso più adatto in base al profilo e agli obiettivi personali.",
							color: "#10b981",
						},
						{
							title: "Costruzione del Percorso",
							description: "Tutor dedicati, assistenza didattica e spazi studio per accompagnare ogni step.",
							color: "#7c3aed",
						},
					].map((item) => (
						<div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
							<p className="text-lg font-semibold text-neutral-900 mb-2" style={{ color: item.color }}>{item.title}</p>
							<p className="text-neutral-600">{item.description}</p>
						</div>
					))}
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{[
						{
							title: "Studenti",
							description: "Piani formativi su misura, corsi di laurea online e certificazioni professionali riconosciute.",
							color: "#3b82f6",
						},
						{
							title: "Imprese",
							description: "Formazione aziendale, sviluppo competenze tecniche e certificazioni per il team.",
							color: "#10b981",
						},
						{
							title: "Professionisti",
							description: "Master specialistici, certificazioni informatiche e lingue straniere per crescita professionale.",
							color: "#7c3aed",
						},
						{
							title: "Docenti",
							description: "Percorsi GPS, certificazioni CLIL e aggiornamento professionale conforme alle normative MIM.",
							color: "#f59e0b",
						},
					].map((item) => (
						<div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
							<p className="text-lg font-semibold text-neutral-900 mb-2" style={{ color: item.color }}>{item.title}</p>
							<p className="text-neutral-600">{item.description}</p>
						</div>
					))}
				</div>

				<HighlightPanel color="#9A7B3A">
					<p className="text-neutral-900 font-semibold">La nostra offerta completa</p>
					<p className="text-neutral-700 leading-relaxed">
						Corsi di laurea, master, certificazioni informatiche, lingue straniere e percorsi CLIL per docenti.
					</p>
					<p className="text-neutral-700">Orientamento e convalida CFU con un approccio chiaro e trasparente.</p>
				</HighlightPanel>
			</section>
		</PageShell>
	);
}
