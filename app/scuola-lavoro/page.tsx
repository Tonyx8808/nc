import React from "react";
import Link from "next/link";
import { FeatureCard, HighlightPanel, PageShell, SectionHeader, SectionDivider } from "@/components/home-style";

export default function ScuolaLavoro() {
	return (
		<PageShell
			title="Scuola e Lavoro"
			subtitle="Un progetto che accompagna studenti, neo-diplomati e neo-laureati nel passaggio dalla scuola al lavoro."
			label="Scuola Lavoro"
			imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2670&auto=format&fit=crop"
		>
			<SectionHeader
				title="Un supporto concreto per ogni tappa"
				description="Offriamo orientamento, formazione personalizzata e collegamento con il territorio per facilitare l’inserimento professionale." 
			/>

			<section>
				<div className="grid gap-6 md:grid-cols-3">
					<FeatureCard
						title="Orientamento completo"
						description="Supporto in ogni fase del percorso, dalla scelta iniziale all’inserimento lavorativo."
						color="#2563eb"
					/>
					<FeatureCard
						title="Percorsi formativi ad hoc"
						description="Strutturiamo soluzioni su misura per le tue competenze e il tuo obiettivo."
						color="#10b981"
					/>
					<FeatureCard
						title="Connessione con il territorio"
						description="Collaboriamo con aziende, enti e servizi per l’impiego per creare opportunità reali."
						color="#7c3aed"
					/>
				</div>
			</section>

			<SectionDivider />

			<section>
				<SectionHeader
					title="Per chi è pensato"
					description="Il progetto è studiato per chi cerca una transizione sicura e guidata verso il lavoro."
				/>
				<div className="grid gap-6 md:grid-cols-2">
					<FeatureCard
						title="Studenti"
						description="Ideale per chi deve scegliere il percorso di studi e costruire un progetto formativo chiaro."
						color="#2563eb"
					/>
					<FeatureCard
						title="Neo-Diplomati"
						description="Supportiamo la fase post-diploma con orientamento e percorsi verso il lavoro o l’università."
						color="#f59e0b"
					/>
					<FeatureCard
						title="Neo-Laureati"
						description="Accompagniamo il primo ingresso nel mondo professionale con strumenti concreti e consulenza."
						color="#7c3aed"
					/>
					<FeatureCard
						title="Professionisti"
						description="Offriamo riqualificazione e percorsi di carriera per chi vuole cambiare settore."
						color="#f97316"
					/>
				</div>
			</section>

			<SectionDivider />

			<section>
				<SectionHeader
					title="Il percorso in 3 passi"
					description="Dall’ascolto all’azione, seguiamo ogni fase con attenzione e concretezza."
				/>
				<div className="grid gap-6 md:grid-cols-3">
					<FeatureCard
						title="1. Ascolto"
						description="Analizziamo il profilo e gli obiettivi di ogni persona o gruppo."
						color="#2563eb"
					/>
					<FeatureCard
						title="2. Orientamento"
						description="Definiamo il percorso più adatto con strumenti personalizzati."
						color="#10b981"
					/>
					<FeatureCard
						title="3. Azione"
						description="Avviamo il percorso formativo e seguiamo l’inserimento nel mondo del lavoro."
						color="#7c3aed"
					/>
				</div>
			</section>

			<SectionDivider />

			<section>
				<SectionHeader
					title="Percorsi GPS per docenti"
					description="Trova il pacchetto ideale per incrementare il punteggio nelle Graduatorie Provinciali per le Supplenze."
				/>
				<HighlightPanel color="#2563eb">
					<p className="font-semibold text-neutral-900">Pacchetti mirati per docenti</p>
					<p>Formazione specializzata per GPS, CLIL, inglese e informatica. Soluzioni pensate per garantire valore reale e riconoscimento.</p>
					<Link href="/scuola-lavoro/gps-docenti" className="inline-block text-sm font-semibold text-[#2563eb] hover:underline">
						Scopri i percorsi GPS per docenti →
					</Link>
				</HighlightPanel>
			</section>

			<section>
				<HighlightPanel color="#9A7B3A">
					<p className="font-semibold text-neutral-900">Vuoi iniziare subito?</p>
					<p>Contattaci per una consulenza personalizzata e scopri come costruire il tuo percorso con NC Consulting.</p>
					<p className="text-neutral-900">Telefono: <strong>+39 339 121 9689</strong></p>
					<p className="text-neutral-900">Orari: <strong>Lunedì – Venerdì, 9:00 – 18:00</strong></p>
				</HighlightPanel>
			</section>
		</PageShell>
	);
}
