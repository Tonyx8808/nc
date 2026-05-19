"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();
	const footerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("footer-visible");
					}
				});
			},
			{ threshold: 0.1 }
		);

		const animatedEls = footerRef.current?.querySelectorAll(".footer-animate");
		animatedEls?.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

				.footer-root {
					font-family: 'DM Sans', sans-serif;
					background: #0a0a0a;
					position: relative;
					overflow: hidden;
				}

				.footer-root::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					height: 1px;
					background: linear-gradient(90deg, transparent, #b8975a 30%, #e8c97a 50%, #b8975a 70%, transparent);
				}

				.footer-noise {
					position: absolute;
					inset: 0;
					opacity: 0.025;
					background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
					pointer-events: none;
				}

				.footer-glow {
					position: absolute;
					width: 600px;
					height: 600px;
					border-radius: 50%;
					background: radial-gradient(circle, rgba(184,151,90,0.06) 0%, transparent 70%);
					top: -100px;
					right: -100px;
					pointer-events: none;
				}

				.footer-serif {
					font-family: 'Cormorant Garamond', Georgia, serif;
				}

				.footer-brand-name {
					font-family: 'Cormorant Garamond', Georgia, serif;
					font-size: 2.25rem;
					font-weight: 300;
					letter-spacing: 0.05em;
					color: #fff;
					line-height: 1;
				}

				.footer-brand-name span {
					font-style: italic;
					color: #c9a96e;
				}

				.footer-tagline {
					font-family: 'Cormorant Garamond', Georgia, serif;
					font-style: italic;
					font-size: 0.95rem;
					color: rgba(255,255,255,0.45);
					line-height: 1.6;
					letter-spacing: 0.01em;
				}

				.footer-label {
					font-size: 0.65rem;
					font-weight: 500;
					letter-spacing: 0.2em;
					text-transform: uppercase;
					color: #b8975a;
					margin-bottom: 1.25rem;
					display: block;
				}

				.footer-nav-link {
					display: block;
					font-size: 0.875rem;
					font-weight: 300;
					color: rgba(255,255,255,0.5);
					text-decoration: none;
					padding: 0.3rem 0;
					transition: color 0.3s ease, transform 0.3s ease;
					position: relative;
				}

				.footer-nav-link::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					width: 0;
					height: 1px;
					background: #c9a96e;
					transition: width 0.35s ease;
				}

				.footer-nav-link:hover {
					color: #fff;
					transform: translateX(4px);
				}

				.footer-nav-link:hover::after {
					width: 20px;
				}

				.footer-contact-link {
					font-size: 1.05rem;
					font-weight: 300;
					color: rgba(255,255,255,0.75);
					text-decoration: none;
					transition: color 0.3s ease;
					letter-spacing: 0.02em;
				}

				.footer-contact-link:hover {
					color: #c9a96e;
				}

				.footer-gold-rule {
					width: 32px;
					height: 1px;
					background: linear-gradient(90deg, #b8975a, #e8c97a);
					margin-bottom: 1.25rem;
				}

				.footer-address {
					font-style: normal;
					font-size: 0.8rem;
					line-height: 1.8;
					color: rgba(255,255,255,0.4);
					font-weight: 300;
				}

				.footer-address strong {
					font-size: 0.65rem;
					font-weight: 500;
					letter-spacing: 0.15em;
					text-transform: uppercase;
					color: rgba(255,255,255,0.25);
					display: block;
					margin-bottom: 0.3rem;
				}

				.footer-divider {
					border: none;
					height: 1px;
					background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent);
					margin: 0;
				}

				.footer-bottom-link {
					font-size: 0.7rem;
					color: rgba(255,255,255,0.3);
					text-decoration: none;
					letter-spacing: 0.08em;
					transition: color 0.3s ease;
				}

				.footer-bottom-link:hover {
					color: #c9a96e;
				}

				.footer-animate {
					opacity: 0;
					transform: translateY(20px);
					transition: opacity 0.7s ease, transform 0.7s ease;
				}

				.footer-animate.footer-visible {
					opacity: 1;
					transform: translateY(0);
				}

				.footer-animate:nth-child(1) { transition-delay: 0.05s; }
				.footer-animate:nth-child(2) { transition-delay: 0.15s; }
				.footer-animate:nth-child(3) { transition-delay: 0.25s; }
				.footer-animate:nth-child(4) { transition-delay: 0.35s; }

				.footer-diamond {
					display: inline-block;
					width: 4px;
					height: 4px;
					background: #c9a96e;
					transform: rotate(45deg);
					margin: 0 0.75rem;
					opacity: 0.6;
					vertical-align: middle;
				}

				.footer-uni-badge {
					display: inline-flex;
					align-items: center;
					gap: 0.5rem;
					font-size: 0.72rem;
					letter-spacing: 0.08em;
					color: rgba(255,255,255,0.3);
					font-weight: 400;
					padding: 0.35rem 0.75rem;
					border: 1px solid rgba(255,255,255,0.07);
					border-radius: 2px;
					transition: border-color 0.3s, color 0.3s;
				}

				.footer-uni-badge:hover {
					border-color: rgba(184,151,90,0.3);
					color: rgba(255,255,255,0.6);
				}

				.footer-uni-dot {
					width: 5px;
					height: 5px;
					border-radius: 50%;
					background: #c9a96e;
					opacity: 0.6;
					flex-shrink: 0;
				}

				/* ── Responsive layout ── */
				.footer-content-wrapper {
					max-width: 1280px;
					margin: 0 auto;
					padding: 2.5rem 1.25rem 0;
				}
				.footer-top-grid {
					display: grid;
					grid-template-columns: 1fr;
					gap: 2rem;
					margin-bottom: 2.5rem;
				}
				.footer-brand-col {
					padding-right: 0;
				}
				.footer-addresses-grid {
					display: grid;
					grid-template-columns: 1fr;
					gap: 1.25rem;
					margin-bottom: 2rem;
					padding-top: 1.5rem;
					border-top: 1px solid rgba(255,255,255,0.06);
				}
				.footer-bottom-inner {
					max-width: 1280px;
					margin: 0 auto;
					padding: 1.25rem;
					display: flex;
					flex-direction: column;
					gap: 0.75rem;
				}
				.footer-bottom-links {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					gap: 1rem;
				}
				@media (min-width: 640px) {
					.footer-top-grid {
						grid-template-columns: repeat(2, 1fr);
						gap: 2.5rem;
						margin-bottom: 3rem;
					}
					.footer-addresses-grid {
						grid-template-columns: repeat(2, 1fr);
						gap: 1.5rem;
					}
				}
				@media (min-width: 1024px) {
					.footer-content-wrapper {
						padding: 5rem 2rem 0;
					}
					.footer-top-grid {
						grid-template-columns: 1.6fr 1fr 1fr 1.1fr;
						gap: 3rem;
						margin-bottom: 4rem;
					}
					.footer-brand-col {
						padding-right: 2rem;
					}
					.footer-addresses-grid {
						grid-template-columns: repeat(3, 1fr);
						gap: 2rem;
						margin-bottom: 3rem;
						padding-top: 2.5rem;
					}
					.footer-bottom-inner {
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						padding: 1.5rem 2rem;
					}
					.footer-bottom-links {
						gap: 2rem;
					}
				}
			`}</style>

			<footer ref={footerRef} className="footer-root">
				<div className="footer-noise" />
				<div className="footer-glow" />

				{/* Main content */}
				<div className="footer-content-wrapper">

					{/* Top row: Brand + columns */}
					<div className="footer-top-grid">

						{/* Brand column */}
						<div className="footer-animate footer-brand-col">
							<div style={{ marginBottom: '1.5rem' }}>
								<div className="footer-brand-name">
									NC <span>Consulting</span>
								</div>
								<div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #b8975a, transparent)', margin: '1rem 0' }} />
								<p className="footer-tagline">
									Rendendo la formazione universitaria e professionale più accessibile, organizzata e sostenibile.
								</p>
							</div>

							{/* University partners */}
							<div style={{ marginTop: '2rem' }}>
								<span className="footer-label" style={{ marginBottom: '0.875rem' }}>Atenei Partner</span>
								<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
									{['Pegaso', 'Mercatorum', 'San Raffaele'].map((uni) => (
										<div key={uni} className="footer-uni-badge">
											<div className="footer-uni-dot" />
											{uni}
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Navigation */}
						<div className="footer-animate">
							<div className="footer-gold-rule" />
							<span className="footer-label">Navigazione</span>
							<nav style={{ display: 'flex', flexDirection: 'column' }}>
								{[
									{ href: '/', label: 'Home' },
									{ href: '/chi-siamo', label: 'Chi Siamo' },
									{ href: '/vantaggi-e-assistenza', label: 'Vantaggi e Assistenza' },
									{ href: '/categorie', label: 'Categorie' },
									{ href: '/scuola-lavoro', label: 'Scuola Lavoro' },
								].map(({ href, label }) => (
									<Link key={href} href={href} className="footer-nav-link">{label}</Link>
								))}
							</nav>
						</div>

						{/* Services */}
						<div className="footer-animate">
							<div className="footer-gold-rule" />
							<span className="footer-label">Servizi</span>
							<nav style={{ display: 'flex', flexDirection: 'column' }}>
								{[
									{ href: '/categorie/orientamento-cfu', label: 'Orientamento & CFU' },
									{ href: '/categorie/informatica-digitale', label: 'Informatica e Digitale' },
									{ href: '/categorie/lingue-straniere', label: 'Lingue Straniere' },
									{ href: '/scuola-lavoro/gps-docenti', label: 'Percorsi GPS' },
								].map(({ href, label }) => (
									<Link key={href} href={href} className="footer-nav-link">{label}</Link>
								))}
							</nav>
						</div>

						{/* Contacts */}
						<div className="footer-animate">
							<div className="footer-gold-rule" />
							<span className="footer-label">Contatti</span>
							<div style={{ marginBottom: '1.5rem' }}>
								<p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.5rem' }}>Telefono</p>
								<a href="tel:+393391219689" className="footer-contact-link">
									+39 339 121 9689
								</a>
							</div>
							<div>
								<p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.5rem' }}>Orari</p>
								<p style={{ fontSize: '0.875rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.02em' }}>
									Lun–Ven<br />
									<span style={{ color: 'rgba(255,255,255,0.7)' }}>9:00 – 18:00</span>
								</p>
							</div>
						</div>
					</div>

					{/* Addresses */}
					<div className="footer-addresses-grid">
						{[
							{ type: 'Sede Legale', addr: 'Via Roma, 18', city: 'Torre del Greco (NA) 80059' },
							{ type: 'Sede Operativa', addr: 'Via Murelle, 11', city: 'Angri (SA) 84012' },
							{ type: 'Sede Operativa', addr: 'Via Brodolini, 26', city: 'Battipaglia (SA) 84091' },
						].map(({ type, addr, city }) => (
							<address key={city} className="footer-address">
								<strong>{type}</strong>
								{addr}<br />{city}
							</address>
						))}
					</div>
				</div>

				{/* Bottom bar */}
				<div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.4)' }}>
					<div className="footer-bottom-inner">
						<p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em', fontWeight: 300 }}>
							© {currentYear} NC Consulting S.r.l.
							<span className="footer-diamond" />
							Tutti i diritti riservati
						</p>
						<div className="footer-bottom-links">
							{['Privacy Policy', 'Cookie Policy', 'Termini e Condizioni'].map((item, i) => (
								<React.Fragment key={item}>
									{i > 0 && <span style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.1)', display: 'inline-block' }} />}
									<a href="#" className="footer-bottom-link">{item}</a>
								</React.Fragment>
							))}
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;