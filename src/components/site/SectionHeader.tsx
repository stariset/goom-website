import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-16 items-end">
      <div>
        <div className="text-mono text-[11px] text-muted-foreground">{eyebrow}</div>
        <h2 className="mt-4 text-display text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      </div>
      {description && <p className="text-base sm:text-lg text-muted-foreground max-w-xl">{description}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className="relative pt-24 sm:pt-36 pb-10 sm:pb-16 overflow-hidden">
      <div className="absolute inset-0 grain-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-mono text-[11px] text-muted-foreground">{eyebrow}</div>
        <h1 className="mt-4 text-display text-4xl sm:text-5xl lg:text-7xl leading-[0.95]">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
