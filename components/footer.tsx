"use client";
import React from "react";
import { OPEN_COOKIE_PREFERENCES_EVENT } from "@/components/cookie-consent";

const NAV_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/dispense", label: "Dispense" },
	{ href: "/download", label: "Download" },
	{ href: "/ccnl", label: "C.C.N.L." },
	{ href: "/patti-federativi", label: "Patti Federativi" },
	{ href: "/iscritti", label: "Iscritti" },
	{ href: "/convenzioni-inps", label: "Convenzioni INPS" },
];

const LEGAL_LINKS = [
	{ href: "/privacy-policy", label: "Privacy Policy" },
	{ href: "/cookie-policy", label: "Cookie Policy" },
	{ href: "/termini-e-condizioni", label: "Termini e Condizioni" },
];

const ATENEI = ["Pegaso", "Mercatorum"];

const ADDRESS = {
	type: "Sede Operativa",
	addr: "Via Po, 58",
	city: "88046 Lamezia Terme (CZ)",
};

const SOCIAL_LINKS = [
	{
		label: "Facebook",
		href: "https://www.facebook.com/p/Esaarco-Confederazione-100064451421987/",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
			</svg>
		),
	},
];

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	const openCookiePreferences = (e: React.MouseEvent) => {
		e.preventDefault();
		window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
	};

	return (
		<footer className="relative bg-esaarco-navy border-t border-white/5 pt-8 pb-4 overflow-hidden">
			{/* Linea arcobaleno brand in alto */}
			<div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-esaarco-red via-esaarco-orange to-esaarco-blue" />

			<div className="max-w-7xl mx-auto px-6">
				{/* Branding header */}
				<div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 pb-4">
					<h2 className="text-4xl md:text-5xl lg:text-6xl leading-[0.85] tracking-tighter font-medium select-none bg-linear-to-r from-esaarco-red via-esaarco-yellow to-esaarco-blue bg-clip-text text-transparent">
						ESAARCO
					</h2>
					<span className="text-base md:text-lg font-normal text-esaarco-blue tracking-tight relative -top-0.5 md:-top-1">
						consulting
					</span>
				</div>

				<div className="w-full h-px bg-white/10" />

				{/* Area contenuti */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6 mt-6">
					{/* Social + Atenei */}
					<div className="lg:col-span-4 flex flex-col justify-between gap-6">
						<div>
							<p className="text-sm text-zinc-400 font-light leading-relaxed max-w-md mb-4">
								Rendendo la formazione universitaria e professionale più
								accessibile, organizzata e sostenibile.
							</p>

							<span className="text-[10px] uppercase tracking-[0.2em] text-esaarco-blue font-medium block mb-2">
								I nostri Social
							</span>
							<div className="flex items-center gap-3">
								{SOCIAL_LINKS.map(({ label, href, icon }) => (
									<a
										key={label}
										href={href}
										aria-label={label}
										className="w-9 h-9 rounded-full border border-white/10 text-zinc-400 flex items-center justify-center hover:border-esaarco-blue/40 hover:text-white transition-colors"
									>
										{icon}
									</a>
								))}
							</div>
						</div>

						<div>
							<span className="text-[10px] uppercase tracking-[0.2em] text-esaarco-blue font-medium block mb-2">
								Atenei Partner
							</span>
							<div className="flex flex-wrap gap-2">
								{ATENEI.map((uni) => (
									<div
										key={uni}
										className="inline-flex items-center gap-2 text-xs tracking-wide text-zinc-400 px-3 py-1.5 border border-white/10 rounded-md hover:border-esaarco-blue/40 hover:text-white transition-colors"
									>
										<span className="w-1.5 h-1.5 rounded-full bg-esaarco-blue" />
										{uni}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Colonne link */}
					<div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:pl-10 w-full">
						<div className="flex flex-col gap-3">
							<span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
								Navigazione
							</span>
							<ul className="flex flex-col gap-2">
								{NAV_LINKS.map(({ href, label }) => (
									<li key={href}>
										<a
											href={href}
											className="text-sm text-zinc-400 hover:text-white transition-colors"
										>
											{label}
										</a>
									</li>
								))}
							</ul>
						</div>

						<div className="flex flex-col gap-3">
							<span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
								Contatti
							</span>
							<div>
								<p className="text-[10px] uppercase tracking-[0.15em] text-zinc-600 mb-1">
									Telefono
								</p>
								<a
									href="tel:0968521173"
									className="text-sm text-zinc-300 hover:text-esaarco-blue transition-colors"
								>
									0968/521173
								</a>
							</div>
							<div>
								<p className="text-[10px] uppercase tracking-[0.15em] text-zinc-600 mb-1">
									Email
								</p>
								<a
									href="mailto:formazione.certificazione@esaarco.info"
									className="text-sm text-zinc-300 hover:text-esaarco-blue transition-colors break-all"
								>
									formazione.certificazione@esaarco.info
								</a>
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
								Legale
							</span>
							<ul className="flex flex-col gap-2">
								{LEGAL_LINKS.map(({ href, label }) => (
									<li key={label}>
										<a
											href={href}
											className="text-sm text-zinc-400 hover:text-white transition-colors"
										>
											{label}
										</a>
									</li>
								))}
								<li>
									<button
										type="button"
										onClick={openCookiePreferences}
										className="text-sm text-zinc-400 hover:text-white transition-colors text-left"
									>
										Gestisci Cookie
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Sede + Copyright */}
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mt-6 pt-4 border-t border-white/5">
					<address className="not-italic">
						<p className="text-[10px] uppercase tracking-[0.15em] text-zinc-600 mb-1">
							{ADDRESS.type}
						</p>
						<p className="text-xs text-zinc-500 leading-relaxed">
							{ADDRESS.addr}
							<br />
							{ADDRESS.city}
						</p>
					</address>

					<p className="text-xs text-zinc-600 font-medium">
						© {currentYear} ESAARCO S.r.l. Tutti i diritti riservati
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;