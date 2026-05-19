import React from "react";
import { HighlightPanel, PageShell, SectionHeader } from "@/components/home-style";

export default function OrientamentoCFU() {
	return (
		<PageShell
			title="Orientamento & Valutazione CFU"
			subtitle="Valutiamo gratuitamente il tuo piano di studi e prepariamo la convalida ufficiale dell'ateneo."
			label="Orientamento"
			imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2670&auto=format&fit=crop"
		>
			<SectionHeader
				title="Procedura per ogni ateneo"
				description="Seguiamo il processo di convalida CFU con i moduli, la documentazione e gli step necessari per Pegaso, Mercatorum e San Raffaele."
			/>

			<section className="space-y-10">
				<div className="grid gap-6 md:grid-cols-3">
					<div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
						<p className="text-xl font-semibold text-[#3b82f6] mb-4">Università Pegaso</p>
						<ul className="space-y-3 text-neutral-600">
							<li>Modulo riconoscimento CFU/convalida esami</li>
							<li>Certificazioni informatiche o linguistiche</li>
							<li>Titolo accademico con esami, codici SSD e CFU</li>
							<li>Codice fiscale e autocertificazioni firmate a mano</li>
						</ul>
					</div>
					<div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
						<p className="text-xl font-semibold text-[#10b981] mb-4">Università Mercatorum</p>
						<ul className="space-y-3 text-neutral-600">
							<li>Titolo accademico con esami, SSD e CFU</li>
							<li>Modulo riconoscimento CFU specifico Mercatorum</li>
							<li>Attestato di servizio per esonero tirocinio</li>
							<li>Codice fiscale e autocertificazioni firmate a mano</li>
						</ul>
					</div>
					<div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
						<p className="text-xl font-semibold text-[#ef4444] mb-4">Università San Raffaele Roma</p>
						<ul className="space-y-3 text-neutral-600">
							<li>Modulo riconoscimento CFU specifico San Raffaele</li>
							<li>Modulo abilità lavorative e formative</li>
							<li>Attestato di servizio con mansione</li>
							<li>CV lavorativo e autocertificazioni firmate a mano</li>
						</ul>
					</div>
				</div>

				<HighlightPanel color="#9A7B3A">
					<p className="text-neutral-900 font-semibold">Nota importante</p>
					<p className="text-neutral-700 leading-relaxed">
						Tutte le autocertificazioni devono essere firmate a mano per essere valide ai fini dell'ateneo.
					</p>
				</HighlightPanel>

				<div className="grid gap-6 md:grid-cols-2">
					<div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
						<p className="font-semibold text-neutral-900 mb-3">Percorso incerto?</p>
						<p className="text-neutral-600">Orientamento gratuito con un'orientatrice dedicata: 339 121 9689, lun-ven 9:00–18:00.</p>
					</div>
					<div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
						<p className="font-semibold text-neutral-900 mb-3">Esami già sostenuti?</p>
						<p className="text-neutral-600">Possibile convalida per trasferimento, passaggio di corso o rinuncia.</p>
					</div>
				</div>

				<div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
					<p className="font-semibold text-neutral-900 mb-3">Accesso laurea magistrale</p>
					<p className="text-neutral-600">Verifica dei requisiti curriculari e degli obblighi formativi aggiuntivi (OFA).</p>
				</div>

				<div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
					<p className="font-semibold text-neutral-900 mb-3">Trasferimento da altro ateneo</p>
					<p className="text-neutral-600">Supporto per trasferimento a Pegaso, Mercatorum o San Raffaele.</p>
				</div>
			</section>
		</PageShell>
	);
}
