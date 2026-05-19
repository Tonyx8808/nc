import Link from "next/link";
import React from "react";

export const GOLD = "#9A7B3A";
export const GOLD_LIGHT = "#C4A054";

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
      <section className="relative flex h-[60vh] sm:h-[70vh] md:h-[80vh] min-h-80 items-center justify-center overflow-hidden bg-[#080806]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,214,138,0.15),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.88),rgba(0,0,0,0.95))]" />
        <div className="relative z-10 px-4 sm:px-6 text-center text-white max-w-5xl w-full">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-4 rounded-full border border-white/15 bg-white/5 px-4 sm:px-5 py-2 backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold" style={{ color: GOLD_LIGHT }}>
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
                href=""
                className="rounded-full bg-[#9A7B3A] px-8 sm:px-10 py-3 sm:py-4 text-sm uppercase tracking-[0.3em] font-semibold text-white transition hover:bg-[#7a6028]"
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
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-10" style={{ backgroundColor: GOLD }} />
      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
    </div>
    <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">{title}</h2>
    {description ? (
      <p className="mt-4 text-neutral-600 max-w-3xl leading-relaxed">{description}</p>
    ) : null}
  </div>
);

export const SectionDivider = () => (
  <div className="flex items-center gap-3 my-8">
    <div className="h-px flex-1 bg-neutral-200" />
    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
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
  <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <p className="text-sm font-semibold uppercase tracking-[0.25em]" style={{ color }}>
      {title}
    </p>
    <p className="mt-4 text-neutral-700 leading-relaxed">{description}</p>
  </div>
);

export const HighlightPanel = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => (
  <div className="rounded-3xl border-l-4 border-current bg-neutral-50 p-6" style={{ color }}>
    <div className="space-y-4 text-neutral-700">{children}</div>
  </div>
);