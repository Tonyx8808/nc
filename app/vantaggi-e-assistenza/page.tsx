import React from "react";
import { HighlightPanel, PageShell, SectionHeader } from "@/components/home-style";

export default function VantaggiAssistenza() {
	return (
		<PageShell
			title="Vantaggi e Assistenza"
			subtitle="Scopri i vantaggi di un supporto completo per orientamento, tutoraggio e assistenza didattica."
			label="Assistenza"
			imageUrl="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=2670&auto=format&fit=crop"
		>
			<SectionHeader
				title="Perché scegliere NC Consulting?"
				description="NC Consulting offre un riferimento unico per tutto il percorso formativo: orientamento mirato, supporto organizzativo, tutor dedicati e assistenza didattica costante."
			/>

			<section className="space-y-12">
				<div>
					<h3 className="text-2xl font-semibold text-neutral-900 mb-4">Offerta Diversificata</h3>
					<ul className="grid gap-4 text-neutral-600 md:grid-cols-2">
						<li className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">Corsi di laurea, master e certificazioni online riconosciuti dal MIM</li>
						<li className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">Università: Pegaso, Mercatorum, San Raffaele di Roma</li>
						<li className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">Master Sanitari</li>
						<li className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">Certificazioni informatiche <strong>EIPASS</strong></li>
						<li className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">Certificazioni di Lingue Straniere</li>
					</ul>
				</div>

				<div>
					<h3 className="text-2xl font-semibold text-neutral-900 mb-4">Risparmio Economico</h3>
					<ul className="grid gap-4 md:grid-cols-3 text-neutral-600">
						<li className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">Agevolazioni economiche sulla retta annuale</li>
						<li className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">Convenzione Pubblica Amministrazione</li>
						<li className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">Possibilità di pagamento dilazionato (rateizzazione)</li>
					</ul>
				</div>

				<div>
					<h3 className="text-2xl font-semibold text-neutral-900 mb-4">Servizi Inclusi</h3>
					<ul className="space-y-3 text-neutral-600">
						<li>Orientamento nella scelta del percorso universitario</li>
						<li>Verifica preventiva di titoli ed esami già sostenuti (convalide)</li>
						<li>Valutazione dei CFU per l'accesso alle classi di concorso</li>
					</ul>
				</div>

				<HighlightPanel color="#9A7B3A">
					<h3 className="text-2xl font-semibold text-neutral-900">Assistenza dedicata</h3>
					<p>Presa in carico completa della pratica di iscrizione, monitoraggio periodico e tutor dedicato con supporto gratuito e continuativo.</p>
					<p className="font-semibold text-neutral-900">Costi trasparenti: nessun tesseramento o abbonamento, zero costi extra.</p>
					<p className="mt-4">Telefono: <strong>+39 339 121 9689</strong></p>
					<p>Orari: <strong>Lunedì – Venerdì, 9:00 – 18:00</strong></p>
				</HighlightPanel>
			</section>
		</PageShell>
	);
}
