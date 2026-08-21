import Link from "next/link";
import React from "react";

// Palette brand ES.A.AR.CO. (dal logo)
export const NAVY = "#1B2740";
export const NAVY_LIGHT = "#3D4D6B";
export const BLUE = "#29A9E1";
export const BLUE_LIGHT = "#7BCBEF";
export const RED = "#E32726";
export const ORANGE = "#F5A623";
export const YELLOW = "#FFD200";
export const GREEN = "#3AA845";

// Ordine cromatico degli archi del logo, usato per accenti ciclici sulle card
export const ARC_COLORS = [RED, ORANGE, YELLOW, GREEN, BLUE];

export const PageShell = ({
  title,
  subtitle,
  label,
  imageUrl,
  ctaText,
  ctaHref,
  children,
}: {
  title: string;
  subtitle: string;
  label: string;
  imageUrl: string;
  ctaText?: string;
  ctaHref?: string;
  children: React.ReactNode;
}) => {
  return (
    <main className="bg-white">
      <section className="relative flex h-[60vh] sm:h-[70vh] md:h-[80vh] min-h-80 items-center justify-center overflow-hidden bg-[#0F1826]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(41,169,225,0.18),transparent_35%),linear-gradient(180deg,rgba(15,24,38,0.88),rgba(15,24,38,0.96))]" />
        <div className="relative z-10 px-4 sm:px-6 text-center text-white max-w-5xl w-full">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-4 rounded-full border border-white/15 bg-white/5 px-4 sm:px-5 py-2 backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold" style={{ color: BLUE_LIGHT }}>
              {label}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            {title}
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-neutral-200 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          {ctaText && ctaHref ? (
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={ctaHref}
                className="rounded-full px-8 sm:px-10 py-3 sm:py-4 text-sm uppercase tracking-[0.3em] font-semibold text-white transition"
                style={{ backgroundColor: BLUE }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1F8CBB")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BLUE)}
              >
                {ctaText}
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">{children}</div>
    </main>
  );
};

export const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="mb-10">
    <div className="flex items-center gap-1.5 mb-4">
      {ARC_COLORS.map((c) => (
        <div key={c} className="h-1 w-6 rounded-full" style={{ backgroundColor: c }} />
      ))}
    </div>
    <h2 className="text-3xl md:text-4xl font-semibold text-[#1B2740] leading-tight">{title}</h2>
    {description ? (
      <p className="mt-4 text-neutral-600 max-w-3xl leading-relaxed">{description}</p>
    ) : null}
  </div>
);

export const SectionDivider = () => (
  <div className="flex items-center gap-1.5 my-8 justify-center">
    <div className="h-px flex-1 bg-neutral-200" />
    {ARC_COLORS.map((c) => (
      <div key={c} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c }} />
    ))}
    <div className="h-px flex-1 bg-neutral-200" />
  </div>
);

export const FeatureCard = ({
  title,
  description,
  color,
}: {
  title: string;
  description: string;
  color: string;
}) => (
  <div
    className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    style={{ borderTopWidth: 3, borderTopColor: color }}
  >
    <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: NAVY }}>
      {title}
    </p>
    <p className="mt-3 text-neutral-600 leading-relaxed text-sm">{description}</p>
  </div>
);

export const HighlightPanel = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => (
  <div className="rounded-3xl border-l-4 bg-neutral-50 p-6" style={{ borderColor: color }}>
    <div className="space-y-4 text-neutral-700">{children}</div>
  </div>
);