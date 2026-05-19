import React from "react";
import { FeatureCard, HighlightPanel, PageShell, SectionHeader, SectionDivider } from "@/components/home-style";

const packages = [
	{ name: "GPS Docenti B2 + CLIL", components: ["B2 (3)", "CLIL (3)"], total: 6, color: "#2563eb" },
	{ name: "GPS Docenti C2 + CLIL", components: ["C2 (6)", "CLIL (3)"], total: 9, color: "#7c3aed" },
	{ name: "GPS Docenti Informatica + B2 + CLIL", components: ["Informatica (2)", "B2 (3)", "CLIL (3)"], total: 8, color: "#10b981" },
	{ name: "GPS Docenti Informatica + C1 + CLIL", components: ["Informatica (2)", "C1 (4)", "CLIL (3)"], total: 9, color: "#f59e0b" },
	{ name: "GPS Docenti Informatica + C2 + CLIL", components: ["Informatica (2)", "C2 (6)", "CLIL (3)"], total: 11, color: "#ec4899" },
	{ name: "GPS Docenti Informatica + B2", components: ["Informatica (2)", "B2 (3)"], total: 5, color: "#2563eb" },
	{ name: "GPS Docenti Informatica + C1", components: ["Informatica (2)", "C1 (4)"], total: 6, color: "#10b981" },
	{ name: "GPS Docenti Informatica + C2", components: ["Informatica (2)", "C2 (6)"], total: 8, color: "#7c3aed" },
	{ name: "GPS Docenti Informatica + CLIL", components: ["Informatica (2)", "CLIL (3)"], total: 5, color: "#f97316" },
];

export default function GPSDocenti() {
	return (
		<PageShell
			title="Percorsi GPS per Docenti"
			subtitle="Pacchetti formativi pensati per accrescere il punteggio GPS con certificazioni riconosciute."
			label="GPS Docenti"
			imageUrl="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2670&auto=format&fit=crop"
		>
			<SectionHeader
				title="Formazione che vale punti"
				description="Scegli tra soluzioni per inglese, CLIL, informatica e certificazioni digitali dedicate ai docenti."
			/>

			<section>
				<div className="grid gap-6 md:grid-cols-2">
					<FeatureCard
						title="Aumenta il tuo punteggio"
						description="Pacchetti pensati per offrire il massimo valore GPS secondo le linee guida MIM."
						color="#2563eb"
					/>
					<FeatureCard
						title="Competenza digitale"
						description="Includiamo EIPASS, CLIL e certificazioni linguistiche per profili docenti moderni."
						color="#7c3aed"
					/>
				</div>
			</section>

			<SectionDivider />

			<section>
				<SectionHeader
					title="Componenti dei pacchetti"
					description="I titoli presenti in ciascun pacchetto consentono di raggiungere i punti GPS necessari."
				/>
				<div className="overflow-x-auto rounded-3xl border border-neutral-200 bg-white shadow-sm">
					<table className="w-full min-w-140 border-collapse text-left">
						<thead>
							<tr className="bg-[#f3f4f6]">
								<th className="px-6 py-4 text-sm font-semibold uppercase text-neutral-500">Titolo</th>
								<th className="px-6 py-4 text-sm font-semibold uppercase text-neutral-500 text-center">Punti GPS</th>
							</tr>
						</thead>
						<tbody>
							{[
								{ title: "Certificazione Lingua Inglese B2", points: "3 punti" },
								{ title: "Certificazione Lingua Inglese C1", points: "4 punti" },
								{ title: "Certificazione Lingua Inglese C2", points: "6 punti" },
								{ title: "Corso di Perfezionamento Universitario CLIL", points: "3 punti" },
								{ title: "Certificazioni Informatiche (EIPASS)", points: "2 punti" },
								{ title: "EIPASS DigCompEdu ACCREDIA", points: "1 punto", highlight: true },
							].map((item) => (
								<tr
									key={item.title}
									className={item.highlight ? "bg-[#eef2ff]" : "hover:bg-neutral-50"}
								>
									<td className="border-t border-neutral-200 px-6 py-4 text-neutral-700">{item.title}</td>
									<td className="border-t border-neutral-200 px-6 py-4 text-center font-semibold text-neutral-900">{item.points}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<SectionDivider />

			<section>
				<SectionHeader
					title="Pacchetti disponibili"
					description="Scegli il pacchetto più adatto al tuo profilo e al punteggio che vuoi raggiungere."
				/>
				<div className="grid gap-6 md:grid-cols-2">
					{packages.map((pkg) => (
						<FeatureCard
							key={pkg.name}
							title={pkg.name}
							description={`Componenti: ${pkg.components.join(", ")} — fino a ${pkg.total} punti.`}
							color={pkg.color}
						/>
					))}
				</div>
			</section>

			<SectionDivider />

			<section>
				<HighlightPanel color="#7c3aed">
					<p className="font-semibold text-neutral-900">EIPASS DigCompEdu ACCREDIA</p>
					<p>Una certificazione dedicata ai docenti per convalidare le competenze digitali applicate alla didattica.</p>
					<p className="text-neutral-700">Valore GPS stimato: 1 punto secondo la bozza MIM GPS 2026–2028.</p>
				</HighlightPanel>
			</section>

			<section>
				<HighlightPanel color="#9A7B3A">
					<p className="font-semibold text-neutral-900">Vuoi partire subito?</p>
					<p>Contattaci per una consulenza personalizzata e scegli il pacchetto GPS che fa per te.</p>
					<p className="text-neutral-900">Telefono: <strong>+39 339 121 9689</strong></p>
					<p className="text-neutral-900">Orari: <strong>Lunedì – Venerdì, 9:00 – 18:00</strong></p>
				</HighlightPanel>
			</section>
		</PageShell>
	);
}
