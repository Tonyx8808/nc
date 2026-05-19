"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageShell, SectionHeader } from "@/components/home-style";
import { courseCatalog, CourseKey } from "@/lib/courses";

export default function Categorie() {
	const router = useRouter();

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

	const addToCart = (courseId: CourseKey) => {
		if (typeof window !== "undefined") {
			window.localStorage.setItem("nc-cart-course", courseId);
		}
		router.push("/carrello");
	};

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

			<SectionHeader
				title="I nostri corsi"
				description="Scegli uno dei corsi già disponibili e prosegui con l'acquisto interno al sito."
			/>

			<div className="grid gap-6 lg:grid-cols-3">
				{Object.entries(courseCatalog).map(([courseId, course]) => (
					<div key={courseId} className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
						<h3 className="text-xl font-semibold text-neutral-900 mb-3">{course.title}</h3>
						<p className="text-xs uppercase tracking-[0.25em] text-[#9A7B3A] mb-2">{course.category}</p>
						<p className="text-neutral-600 mb-4">{course.description}</p>
						<div className="flex justify-end pt-4 border-t border-neutral-100">
							<button
								onClick={() => addToCart(courseId as CourseKey)}
								className="rounded-full bg-[#9A7B3A] px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#7a6028]"
							>
								Aggiungi al carrello
							</button>
						</div>
					</div>
				))}
			</div>
		</PageShell>
	);
}
