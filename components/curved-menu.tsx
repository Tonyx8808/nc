"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, AnimatePresence, cubicBezier } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface iNavItem {
	heading: string;
	href: string;
	subheading?: string;
	imgSrc?: string;
}

interface iNavLinkProps extends iNavItem {
	setIsActive: (isActive: boolean) => void;
	index: number;
}

interface iCurvedNavbarProps {
	setIsActive: (isActive: boolean) => void;
	navItems: iNavItem[];
}

interface iHeaderProps {
	navItems?: iNavItem[];
	footer?: React.ReactNode;
}

const MENU_SLIDE_ANIMATION = {
	initial: { x: "calc(100% + 100px)" },
	enter: {
		x: "0",
		transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) },
	},
	exit: {
		x: "calc(100% + 100px)",
		transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) },
	},
};

const defaultNavItems: iNavItem[] = [
	{
		heading: "Home",
		href: "/",
		subheading: "Torna alla home",
		imgSrc: "/images/home.jpg",
	},
	{
		heading: "Chi Siamo",
		href: "/chi-siamo",
		subheading: "Scopri chi siamo",
		imgSrc: "/images/about.jpg",
	},
	{
		heading: "Vantaggi e Assistenza",
		href: "/vantaggi-e-assistenza",
		subheading: "Scopri i nostri vantaggi",
		imgSrc: "/images/vantaggi.jpg",
	},
	{
		heading: "Categorie",
		href: "/categorie",
		subheading: "Visualizza le categorie",
		imgSrc: "/images/services.jpg",
	},
	{
		heading: "Scuola Lavoro",
		href: "/scuola-lavoro",
		subheading: "Scopri il programma",
		imgSrc: "/images/contact.jpg",
	},
];

const DigitalClock: React.FC = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = window.setInterval(() => setTime(new Date()), 1000);
		return () => window.clearInterval(interval);
	}, []);

	return (
		<div className="rounded-3xl border border-white/20 bg-white/10 px-4 py-2 text-right text-white/90">
			<span className="text-lg font-semibold">{time.toLocaleTimeString("it-IT", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			})}</span>
		</div>
	);
};

const CustomFooter: React.FC = () => {
	return (
		<div className="flex w-full flex-col gap-4 text-[10px] leading-relaxed text-white/60 px-5 sm:px-10 md:px-24 py-5 border-t border-white/20">
			<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
				<address className="not-italic space-y-0.5">
					<p>
						<span className="text-white/40 uppercase tracking-widest text-[9px]">Sede Legale</span>
						<br />
						Via Roma, 18 — Torre del Greco (NA)
					</p>
					<p className="pt-1.5">
						<span className="text-white/40 uppercase tracking-widest text-[9px]">Sedi Operative</span>
						<br />
						Via Murelle, 11 — Angri (SA)
						<br />
						Via Brodolini, 26 — Battipaglia (SA)
					</p>
				</address>
				<DigitalClock />
			</div>
		</div>
	);
};

const NavLink: React.FC<iNavLinkProps> = ({
	heading,
	href,
	setIsActive,
	index,
}) => {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const handleMouseMove = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		const rect = ref.current!.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		x.set(mouseX / rect.width - 0.5);
		y.set(mouseY / rect.height - 0.5);
	};

	const handleClick = () => {
		return setIsActive(false);
	};

	const isExternalLink = href.startsWith("http");
	const linkProps = isExternalLink
		? { target: "_blank", rel: "noopener noreferrer" }
		: {};

	return (
		<motion.div
			onClick={handleClick}
			initial="initial"
			whileHover="whileHover"
			className="group relative flex items-center justify-between border-b border-white/30 py-4 transition-colors duration-500 md:py-5 uppercase"
		>
			<Link ref={ref} onMouseMove={handleMouseMove} href={href} {...linkProps}>
				<div className="relative flex items-start">
					<span className="text-white transition-colors duration-500 text-xl font-thin mr-3">
						{index}.
					</span>
					<div className="flex flex-row gap-2">
						<motion.span
							variants={{
								initial: { x: 0 },
								whileHover: { x: -16 },
							}}
							transition={{
								type: "spring",
								staggerChildren: 0.075,
								delayChildren: 0.25,
							}}
							className="relative z-10 block text-xl font-extralight text-white transition-colors duration-500 md:text-2xl"
						>
							{heading.split("").map((letter, i) => {
								return (
									<motion.span
										key={i}
										variants={{
											initial: { x: 0 },
											whileHover: { x: 16 },
										}}
										transition={{ type: "spring" }}
										className="inline-block"
										style={letter === " " ? { minWidth: "0.35em" } : {}}
									>
										{letter === " " ? "\u00A0" : letter}
									</motion.span>
								);
							})}
						</motion.span>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

const Curve: React.FC = () => {
	const initialPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${window.innerHeight} Q-100 ${window.innerHeight / 2} 100 0`;
	const targetPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`;

	const curve = {
		initial: { d: initialPath },
		enter: {
			d: targetPath,
			transition: { duration: 1, ease: cubicBezier(0.76, 0, 0.24, 1) },
		},
		exit: {
			d: initialPath,
			transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) },
		},
	};

	return (
		<svg
			className="absolute top-0 w-25 h-full"
			style={{ fill: "#000000", left: "-99px" }}
		>
			<motion.path
				variants={curve as any}
				initial="initial"
				animate="enter"
				exit="exit"
			/>
		</svg>
	);
};

const CurvedNavbar: React.FC<
	iCurvedNavbarProps & { footer?: React.ReactNode }
> = ({ setIsActive, navItems, footer }) => {
	return (
		<motion.div
			variants={MENU_SLIDE_ANIMATION}
			initial="initial"
			animate="enter"
			exit="exit"
			className="h-dvh w-screen max-w-screen-sm fixed right-0 top-0 z-40 bg-black/80 backdrop-blur-sm"
		>
			<div className="h-full pt-11 flex flex-col justify-between">
				<div className="flex flex-col text-5xl gap-3 mt-0 px-5 sm:px-10 md:px-24">
					{/* Logo — width/height set on the wrapper; Image fills it with auto dimensions */}
					<div className="mb-8 relative w-37.5 h-auto">
						<Image
							src="/logo.png"
							alt="NC Consulting Logo"
							width={150}
							height={150}
							style={{ width: "150px", height: "auto" }}
							className="object-contain"
						/>
					</div>

					<div className="text-white border-b border-white/30 uppercase text-sm mb-0">
						<p>Navigazione</p>
					</div>
					<section className="bg-transparent mt-0">
						<div className="mx-auto max-w-7xl">
							{navItems.map((item, index) => {
								return (
									<NavLink
										key={item.href}
										{...item}
										setIsActive={setIsActive}
										index={index + 1}
									/>
								);
							})}
						</div>
					</section>
				</div>
				{footer}
			</div>
			<Curve />
		</motion.div>
	);
};

const Header: React.FC<iHeaderProps> = ({
	navItems = defaultNavItems,
	footer = <CustomFooter />,
}) => {
	const [isActive, setIsActive] = useState(false);
	const openAudioRef = useRef<HTMLAudioElement | null>(null);
	const closeAudioRef = useRef<HTMLAudioElement | null>(null);

	const handleClick = () => {
		if (isActive) {
			closeAudioRef.current?.play();
		} else {
			openAudioRef.current?.play();
		}
		setIsActive(!isActive);
	};

	return (
		<>
			<div className="relative">
				<div
					onClick={handleClick}
					className="fixed -right-1 top-0 md:-right-1 m-5 z-50 w-12 h-12 rounded-none flex items-center justify-center cursor-pointer bg-[#080806] border border-white/20"
				>
					<div className="relative w-8 h-6 flex flex-col justify-between items-center">
						<span
							className={`block h-0.5 w-7 transition-all duration-300 ${isActive ? "rotate-45 translate-y-2 bg-[#E8D5A3]" : "bg-[#C4A054]"}`}
						></span>
						<span
							className={`block h-0.5 w-7 transition-all duration-300 ${isActive ? "opacity-0 bg-[#E8D5A3]" : "bg-[#C4A054]"}`}
						></span>
						<span
							className={`block h-0.5 w-7 transition-all duration-300 ${isActive ? "-rotate-45 -translate-y-3 bg-[#E8D5A3]" : "bg-[#C4A054]"}`}
						></span>
					</div>
				</div>
			</div>

			<AnimatePresence mode="wait">
				{isActive && (
					<CurvedNavbar
						setIsActive={setIsActive}
						navItems={navItems}
						footer={footer}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default Header;