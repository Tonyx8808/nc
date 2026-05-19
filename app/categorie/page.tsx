import React from "react";
import Link from "next/link";
import { PageShell, SectionHeader } from "@/components/home-style";

export default function Categorie() {
	const categories = [
		{
			title: "Orientamento & Valutazione CFU",
			href: "/categorie/orientamento-cfu",
			description: "Servizio di valutazione gratuita del piano di studi per le università partner.",
		},
		{
			title: "Informatica e Competenze Digitali",
			href: "/categorie/informatica-digitale",
			description: "Certificazioni informatiche riconosciute EIPASS per il mercato del lavoro.",
		},
		{
			title: "Lingue Straniere",
			href: "/categorie/lingue-straniere",
			description: "Certificazioni di lingua inglese a vari livelli QCER.",
		},
	];

	return (
		<PageShell
			title="Categorie di Servizio"
			subtitle="Esplora i percorsi pensati per orientarti, aggiornarti e migliorare il tuo profilo professionale."
			label="Categorie"
			imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2670&auto=format&fit=crop"
		>
			<SectionHeader
				title="Scegli il percorso giusto"
				description="Naviga tra le categorie dei nostri servizi e scopri le soluzioni più adatte ai tuoi obiettivi formativi e professionali."
			/>

			<div className="grid gap-6 md:grid-cols-3">
				{categories.map((category) => (
					<Link key={category.href} href={category.href} className="block">
						<div className="group rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#9A7B3A]/30 hover:shadow-lg">
							<h3 className="text-xl font-semibold text-neutral-900 mb-3">{category.title}</h3>
							<p className="text-neutral-600 mb-5">{category.description}</p>
							<span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9A7B3A]">Scopri →</span>
						</div>
					</Link>
				))}
			</div>
		</PageShell>
	);
}
