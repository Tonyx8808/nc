import React from "react";
import { HighlightPanel, PageShell, SectionHeader } from "@/components/home-style";

export default function InformaticaDigitale() {
	return (
		<PageShell
			title="Informatica e Competenze Digitali"
			subtitle="Certificazioni informatiche riconosciute per migliorare il tuo profilo professionale e acquisire punti GPS."
			label="Informatica"
			imageUrl="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop"
		>
			<SectionHeader
				title="Perché scegliere EIPASS?"
				description="Una certificazione informatica europea utile per il lavoro, la formazione universitaria e le graduatorie docenti."
			/>

			<section className="space-y-10">
				<div className="grid gap-6 md:grid-cols-2">
					{[
						{
							title: "Riconoscimento Internazionale",
							description: "Certificazione valida a livello europeo.",
						},
						{
							title: "Valida per il Mercato del Lavoro",
							description: "Accresce il profilo professionale.",
						},
						{
							title: "Punteggio GPS",
							description: "Acquisizione di punti per le Graduatorie Provinciali per le Supplenze.",
						},
						{
							title: "Convalida Universitaria",
							description: "Riconoscimento di esami universitari.",
						},
					].map((item) => (
						<div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
							<p className="text-lg font-semibold text-neutral-900 mb-3">{item.title}</p>
							<p className="text-neutral-600">{item.description}</p>
						</div>
					))}
				</div>

				<SectionHeader
					title="Utilizzi delle certificazioni informatiche"
					description="Strumenti che supportano la carriera universitaria, professionale e il punteggio nelle GPS." 
				/>

				<div className="grid gap-6 md:grid-cols-2">
					{[
						"Convalida di esami universitari",
						"Acquisizione di punteggio nelle GPS",
						"Arricchimento del profilo professionale",
						"Accesso a posizioni lavorative specializzate",
						"Miglioramento della competitività nel mercato del lavoro",
					].map((item) => (
						<div key={item} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm text-neutral-600">
							{item}
						</div>
					))}
				</div>

				<HighlightPanel color="#9A7B3A">
					<p className="text-neutral-900 font-semibold">EIPASS DigCompEdu ACCREDIA</p>
					<p className="text-neutral-700 leading-relaxed">
						Certifica ufficialmente le competenze digitali applicate alla didattica, basata sul framework europeo DigCompEdu.
					</p>
					<p className="text-neutral-900 font-semibold">Valore GPS:</p>
					<p className="text-neutral-700">1 punto secondo la bozza MIM GPS 2026–2028.</p>
				</HighlightPanel>

				<div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
					<p className="text-xl font-semibold text-neutral-900 mb-4">Contattaci per saperne di più</p>
					<p className="text-neutral-600">Scopri quale certificazione EIPASS è più adatta al tuo profilo e ai tuoi obiettivi.</p>
					<p className="mt-4 text-neutral-700">Telefono: <strong>+39 339 121 9689</strong></p>
					<p className="text-neutral-700">Orari: <strong>Lunedì – Venerdì, 9:00 – 18:00</strong></p>
				</div>
			</section>
		</PageShell>
	);
}
