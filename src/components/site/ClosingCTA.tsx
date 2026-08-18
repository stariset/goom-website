import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * Shared closing CTA section used at the bottom of every page.
 * 
 * Redesign: An editorial, high-contrast split layout featuring
 * massive typography and a premium interactive pill button.
 */
export function ClosingCTA() {
  return (
    <section className="relative border-t border-border/40 bg-surface/20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[400px] bg-[var(--lime)] opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
          
          {/* Left: Big Typography */}
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Accepting New Projects
                </span>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <h2 className="text-display text-4xl sm:text-5xl lg:text-7xl leading-[0.9] tracking-tighter">
                Let's build<br />
                <span className="text-muted-foreground italic font-light">the next one.</span>
              </h2>
            </Reveal>
          </div>

          {/* Right: Big Button & Info */}
          <div className="flex flex-col lg:items-end justify-end gap-8 w-full lg:w-[320px]">
            <Reveal delay={200}>
              <p className="text-sm sm:text-base text-muted-foreground lg:text-right leading-relaxed max-w-sm">
                We partner with ambitious teams to engineer high-performance systems. No fluff, just elite engineering.
              </p>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="flex flex-col gap-5 w-full lg:items-end">
                <Link
                  to="/contact"
                  className="group relative flex items-center justify-between gap-6 rounded-full bg-foreground text-background pl-6 pr-2 py-2 text-sm sm:text-base font-medium overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(200,255,0,0.15)] hover:bg-[var(--lime)] hover:text-foreground w-full sm:w-auto"
                >
                  <span className="relative z-10 whitespace-nowrap">Start a project</span>
                  <div className="relative z-10 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/10 group-hover:bg-foreground group-hover:text-[var(--lime)] transition-colors duration-500 shrink-0">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-out" />
                  </div>
                </Link>

                <div className="flex items-center gap-5 text-mono text-[10px] text-muted-foreground">
                  <a href="mailto:hello@goom.et" className="flex items-center gap-2 hover:text-foreground transition-colors group">
                    <Mail className="h-3 w-3 group-hover:-rotate-12 transition-transform" /> hello@goom.et
                  </a>
                  <Link to="/capabilities" className="hover:text-foreground transition-colors hover:underline underline-offset-4">
                    See capabilities
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
