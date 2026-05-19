"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GOLD = "#9A7B3A";
const GOLD_LIGHT = "#C4A054";
const GOLD_PALE = "#E8D5A3";

const IMG_PADDING = 12;

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      className="sticky z-0 overflow-hidden rounded-2xl"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)",
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({
  subheading,
  heading,
}: {
  subheading: string;
  heading: string;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{ y, opacity }}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center px-6 text-white"
    >
      <div
        className="mb-5 px-4 py-1.5 rounded-full"
        style={{
          backgroundColor: "rgba(154,123,58,0.25)",
          border: "0.5px solid rgba(196,160,84,0.5)",
          backdropFilter: "blur(8px)",
        }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.45em] font-semibold"
          style={{ color: GOLD_PALE }}
        >
          {subheading}
        </p>
      </div>
      <p
        className="text-center text-4xl font-bold md:text-6xl lg:text-7xl leading-tight"
        style={{ textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)" }}
      >
        {heading}
      </p>
    </motion.div>
  );
};

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: React.ReactNode;
}) => (
  <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
    <div className="relative h-[150vh]">
      <StickyImage imgUrl={imgUrl} />
      <OverlayCopy heading={heading} subheading={subheading} />
    </div>
    {children}
  </div>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
const AnimatedWord = ({ word, delay }: { word: string; delay: number }) => (
  <span className="inline-block overflow-hidden">
    <motion.span
      className="inline-block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay }}
    >
      {word}
    </motion.span>
  </span>
);

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080806] py-20">

      {/* Sfondo: parallax mouse + Ken Burns */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 35, damping: 18 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2670&auto=format&fit=crop)`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
          animate={{ scale: [1.0, 1.08, 1.0], x: [0, -15, 0], y: [0, -8, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Particelle fluttuanti oro */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-10 rounded-full pointer-events-none"
          style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            backgroundColor: i % 4 === 0 ? GOLD_LIGHT : GOLD,
            left: `${5 + (i * 5.3) % 90}%`,
            top: `${10 + (i * 7.1) % 80}%`,
          }}
          animate={{
            y: [0, -(20 + (i % 5) * 14), 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 4), 0],
            opacity: [0.15, 0.65, 0.15],
          }}
          transition={{
            duration: 4 + (i % 5) * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i * 0.37) % 3,
          }}
        />
      ))}

      {/* Overlay multistrato */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(8,6,2,0.65) 50%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* Griglia decorativa sottile */}
      <div
        className="absolute inset-0 z-10 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Cerchi oro concentrici animati */}
      {[
        { size: 600, dur: 40, opacity: 0.07 },
        { size: 900, dur: 60, opacity: 0.045 },
        { size: 1200, dur: 80, opacity: 0.025 },
      ].map(({ size, dur, opacity }, i) => (
        <motion.div
          key={size}
          className="absolute z-10 rounded-full pointer-events-none"
          style={{
            width: size,
            height: size,
            border: `0.5px solid ${GOLD}`,
          }}
          initial={{ scale: 0.6, opacity: 0, rotate: 0 }}
          animate={{ scale: 1, opacity, rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            scale: { duration: 2 + i * 0.3, ease: "easeOut", delay: i * 0.15 },
            opacity: { duration: 2 + i * 0.3, ease: "easeOut", delay: i * 0.15 },
            rotate: { duration: dur, repeat: Infinity, ease: "linear" },
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: 4, height: 4, backgroundColor: GOLD, opacity: 0.5 }}
          />
        </motion.div>
      ))}

      {/* Linee diagonali decorative */}
      <svg
        className="absolute inset-0 z-10 w-full h-full pointer-events-none opacity-[0.08]"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="100%" x2="35%" y2="0" stroke={GOLD} strokeWidth="0.8" />
        <line x1="100%" y1="0" x2="65%" y2="100%" stroke={GOLD} strokeWidth="0.8" />
      </svg>

      {/* Contenuto */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-4 mb-8"
        >
          <motion.div
            className="h-px"
            style={{ backgroundColor: GOLD }}
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.55em] font-light"
            style={{ color: GOLD_LIGHT }}
          >
            NC Consulting
          </span>
          <motion.div
            className="h-px"
            style={{ backgroundColor: GOLD }}
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        {/* Titolo animato parola per parola */}
        <h1
          className="font-bold leading-[0.92] text-white tracking-tight select-none"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
        >
          <span className="block">
            <AnimatedWord word="Il tuo" delay={0.3} />
          </span>
          <span className="block" style={{ color: GOLD }}>
            <AnimatedWord word="futuro" delay={0.48} />
          </span>
          <span className="block text-white">
            <AnimatedWord word="universitario" delay={0.66} />
          </span>
          <span
            className="block"
            style={{ color: GOLD_PALE, fontStyle: "italic", fontWeight: 300 }}
          >
            <AnimatedWord word="inizia qui." delay={0.84} />
          </span>
        </h1>

        {/* Separatore oro animato */}
        <motion.div
          className="mx-auto my-6"
          style={{
            height: "1px",
            backgroundColor: GOLD,
            transformOrigin: "center",
            maxWidth: "480px",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.5 }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 1.1 }}
        />

        {/* Sottotitolo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-lg mx-auto text-neutral-400 text-base md:text-lg leading-relaxed mb-8"
        >
          Orientamento, tutoraggio e percorsi formativi su misura per studenti,
          docenti e professionisti.
        </motion.p>

        {/* CTA buttons — FIX: href corretti + secondo bottone aggiunto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="/vantaggi-e-assistenza"
            className="group relative px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white overflow-hidden transition-all duration-300"
            style={{ backgroundColor: GOLD }}
          >
            <span className="relative z-10">Scopri i vantaggi</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "#7a6028" }}
            />
          </a>
          <a
            href="/categorie"
            className="px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white border transition-colors duration-300 hover:bg-white/10"
            style={{ borderColor: "rgba(255,255,255,0.25)" }}
          >
            Categorie →
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
    
    </section>
  );
};

// ─── Section content ──────────────────────────────────────────────────────────
const SectionDivider = () => (
  <div className="flex items-center gap-3 my-6">
    <div className="h-px w-8" style={{ backgroundColor: GOLD }} />
    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: GOLD }} />
    <div className="h-px flex-1" style={{ backgroundColor: GOLD, opacity: 0.15 }} />
  </div>
);

const ChiSiamoContent = () => (
  <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 px-4 sm:px-6 py-12 md:py-24">
    <div className="md:col-span-4 space-y-2">
      <p className="text-[10px] uppercase tracking-[0.4em] font-light" style={{ color: GOLD }}>
        La nostra storia
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Chi Siamo</h2>
      <SectionDivider />
      <div className="flex gap-4 sm:gap-8 pt-2">
        {[["3", "Università"], ["10+", "Anni"], ["1000+", "Studenti"]].map(([n, l]) => (
          <div key={l}>
            <p className="text-2xl font-bold" style={{ color: GOLD }}>{n}</p>
            <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">{l}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="md:col-span-8 space-y-5 text-neutral-600 text-lg leading-relaxed">
      <p>
        NC Consulting nasce per rendere la formazione universitaria e professionale
        più <span className="text-neutral-900 font-medium">accessibile, organizzata e sostenibile</span>.
        Negli anni abbiamo consolidato collaborazioni con{" "}
        <span className="font-semibold text-neutral-800">Pegaso, Mercatorum e San Raffaele</span>,
        costruendo un modello basato su chiarezza e qualità del servizio.
      </p>
      <p>
        Il nostro valore è nel metodo: partiamo dall'ascolto, definiamo l'obiettivo
        e costruiamo un percorso concreto. Orientamento dedicato, tutoraggio costante
        e assistenza didattica in spazi studio organizzati.
      </p>
      <p>
        Affianchiamo anche imprese e professionisti con piani formativi su misura,
        docenti qualificati e certificazioni di lingua inglese.
      </p>
    </div>
  </div>
);

const ScuolaLavoroContent = () => (
  <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 px-4 sm:px-6 py-12 md:py-24">
    <div className="md:col-span-4 space-y-2">
      <p className="text-[10px] uppercase tracking-[0.4em] font-light" style={{ color: GOLD }}>
        Studio e professione
      </p>
      <h2 className="text-4xl font-bold text-neutral-900">Scuola Lavoro</h2>
      <SectionDivider />
      <p className="text-sm text-neutral-400 leading-relaxed italic">
        "Il ponte tra studio e professione"
      </p>
    </div>
    <div className="md:col-span-8 space-y-5">
      <p className="text-neutral-600 text-lg leading-relaxed">
        Accompagniamo studenti, neo-diplomati e neo-laureati nel passaggio al
        mondo del lavoro con un'attenzione particolare alla scelta consapevole
        del percorso formativo più adatto alle proprie attitudini.
      </p>
      <div className="space-y-3">
        {[
          ["Orientamento", "In tutte le fasi del percorso, dalla scelta al primo impiego"],
          ["Percorsi ad hoc", "Strutturati per raggiungere il massimo del risultato"],
          ["Rete territoriale", "Connessioni con aziende, enti e servizi per l'impiego"],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="flex gap-4 p-4 rounded-lg bg-neutral-50 border border-neutral-100"
          >
            <div className="w-1 rounded-full shrink-0" style={{ backgroundColor: GOLD }} />
            <div>
              <p className="font-semibold text-neutral-800 text-base">{title}</p>
              <p className="text-sm text-neutral-500 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GPSContent = () => (
  <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 px-4 sm:px-6 py-12 md:py-24">
    <div className="md:col-span-4 space-y-2">
      <p
        className="text-[10px] uppercase tracking-[0.35em] font-light leading-relaxed"
        style={{ color: GOLD }}
      >
        Graduatorie Provinciali per le Supplenze
      </p>
      <h2 className="text-4xl font-bold text-neutral-900">Percorsi GPS</h2>
      <SectionDivider />
      <p className="text-sm text-neutral-400 leading-relaxed">
        Programmi riconosciuti dal Ministero per il punteggio in graduatoria.
      </p>
    </div>
    <div className="md:col-span-8 space-y-5">
      <p className="text-neutral-600 text-lg leading-relaxed">
        Percorsi validi ai fini delle GPS per supportare i docenti
        nell'acquisizione di competenze specialistiche. Organizzazione flessibile,
        conciliabile con gli impegni lavorativi, per completare il percorso
        senza rinunciare alla propria professione.
      </p>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3">
        {["Corsi singoli", "Master", "Corsi biennali", "Certificazioni linguistiche"].map((item) => (
          <div
            key={item}
            className="px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg border border-neutral-200 bg-white"
          >
            <span className="mr-2 text-xs" style={{ color: GOLD }}>◆</span>
            {item}
          </div>
        ))}
      </div>
      <a
        href="/categorie"
        className="inline-flex items-center gap-3 mt-2 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-opacity hover:opacity-80"
        style={{ backgroundColor: GOLD }}
      >
        Scopri i corsi <span>→</span>
      </a>
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="bg-white relative">
      <Hero />

      {/* Chi Siamo */}
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2670&auto=format&fit=crop"
        subheading="La nostra storia"
        heading="Chi Siamo"
      >
        <ChiSiamoContent />
      </TextParallaxContent>

      {/* Percorsi GPS */}
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=2574&auto=format&fit=crop"
        subheading="Graduatorie Provinciali per le Supplenze"
        heading="Percorsi GPS"
      >
        <GPSContent />
      </TextParallaxContent>
    </main>
  );
}