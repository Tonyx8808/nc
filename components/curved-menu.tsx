"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, AnimatePresence, cubicBezier } from "framer-motion";
import Link from "next/link";

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
	},
	{
		heading: "Dispense",
		href: "/dispense",
		subheading: "Scarica le dispense",
	},
	{
		heading: "Download",
		href: "/download",
		subheading: "Area download",
	},
	{
		heading: "ccnl",
		href: "/ccnl",
		subheading: "Contratti collettivi",
	},
	{
		heading: "Patti Federativi",
		href: "/patti-federativi",
		subheading: "Scopri i patti federativi",
	},
	{
		heading: "Iscritti",
		href: "/iscritti",
		subheading: "Area iscritti",
	},
	{
		heading: "Convenzioni INPS",
		href: "/convenzioni-inps",
		subheading: "Scopri le convenzioni",
	},
];

const DigitalClock: React.FC = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = window.setInterval(() => setTime(new Date()), 1000);
		return () => window.clearInterval(interval);
	}, []);

	return (
		<div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-right text-white/90">
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
		<div className="flex w-full flex-col gap-4 text-[10px] leading-relaxed text-zinc-400 px-5 sm:px-10 md:px-24 py-5 border-t border-white/10">
			<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
				<address className="not-italic space-y-0.5">
					<p>
						<span className="text-zinc-600 uppercase tracking-widest text-[9px]">Sede Operativa</span>
						<br />
						Via Po, 58 — 88046 Lamezia Terme (CZ)
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
			className="group relative flex items-center justify-between border-b border-white/10 py-4 transition-colors duration-500 hover:border-esaarco-blue/40 md:py-5 uppercase"
		>
			<Link ref={ref} onMouseMove={handleMouseMove} href={href} {...linkProps}>
				<div className="relative flex items-start">
					<span className="text-esaarco-blue/70 transition-colors duration-500 text-xl font-thin mr-3">
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
			style={{ fill: "var(--esaarco-navy)", left: "-99px" }}
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
			className="h-dvh w-screen max-w-screen-sm fixed right-0 top-0 z-40 bg-esaarco-navy/95 backdrop-blur-sm"
		>
			{/* Linea arcobaleno brand in alto — stessa del footer */}
			<div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-esaarco-red via-esaarco-orange to-esaarco-blue z-10" />

			<div className="h-full pt-11 flex flex-col justify-between">
				<div className="flex flex-col text-5xl gap-3 mt-0 px-5 sm:px-10 md:px-24">
					{/* Brand */}
					<div className="mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-2">
						<h2 className="text-4xl md:text-5xl lg:text-6xl leading-[0.85] tracking-tighter font-medium select-none bg-linear-to-r from-esaarco-red via-esaarco-yellow to-esaarco-blue bg-clip-text text-transparent">
							ESAARCO
						</h2>
						<span className="text-base md:text-lg font-normal text-esaarco-blue tracking-tight relative -top-0.5 md:-top-1">
							consulting
						</span>
					</div>

					<div className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-medium border-b border-white/10 pb-2 mb-0">
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
					className="fixed -right-1 top-0 md:-right-1 m-5 z-50 w-12 h-12 rounded-none flex items-center justify-center cursor-pointer bg-esaarco-navy border border-white/15"
				>
					<div className="relative w-8 h-6 flex flex-col justify-between items-center">
						<span
							className={`block h-0.5 w-7 transition-all duration-300 ${isActive ? "rotate-45 translate-y-2 bg-esaarco-blue" : "bg-white"}`}
						></span>
						<span
							className={`block h-0.5 w-7 transition-all duration-300 ${isActive ? "opacity-0 bg-esaarco-blue" : "bg-white"}`}
						></span>
						<span
							className={`block h-0.5 w-7 transition-all duration-300 ${isActive ? "-rotate-45 -translate-y-3 bg-esaarco-blue" : "bg-white"}`}
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