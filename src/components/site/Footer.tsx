import { Link } from "@tanstack/react-router";
import { SocialRow } from "./Socials";
import { FullLogo } from "./Brand";

export function Footer() {
  return (
    <footer className="border-t hairline bg-foreground text-background relative overflow-hidden">
      <span className="pointer-events-none absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-[var(--lime)] opacity-10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-10">
          <div>
            <Link to="/" className="inline-block">
              <FullLogo tone="invert" className="h-7 w-auto" />
            </Link>

            <p className="mt-5 text-sm text-background/60 max-w-sm leading-relaxed">
              A small software engineering studio. We take on the hard parts and stay until they run quietly.
            </p>
            <div className="mt-6">
              <SocialRow
                tone="dark"
                size="md"
                links={{
                  twitter: "goomet",
                  github: "goom",
                  linkedin: "company/goom",
                  site: "mailto:hello@goom.et",
                }}
              />
            </div>
          </div>

          <FooterCol
            title="Studio"
            links={[
              { label: "Services", to: "/services" },
              { label: "Capabilities", to: "/capabilities" },
              { label: "Process", to: "/process" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "Team", to: "/team" },
              { label: "Careers", to: "/careers" },
            ]}
          />

          <FooterCol
            title="About"
            links={[
              { label: "Overview", to: "/about" },
              { label: "Story", to: "/about/story" },
              { label: "Values", to: "/about/values" },
              { label: "Manifesto", to: "/about/manifesto" },
              { label: "Press", to: "/about/press" },
            ]}
          />
          <FooterCol
            title="Get in touch"
            links={[
              { label: "Contact", to: "/contact" },
            ]}
          />
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-mono text-[11px] text-background/50">
          <div>© {new Date().getFullYear()} Goom. All rights reserved.</div>
          <div>SOFTWARE ENGINEERING STUDIO · REMOTE-FIRST</div>

        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <div className="text-mono text-[11px] text-background/50">{title.toUpperCase()}</div>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.to + l.label}>
            <Link
              to={l.to}
              className="group text-sm text-background/80 hover:text-background transition-colors inline-flex items-center gap-1.5"
            >
              <span className="h-px w-0 bg-[var(--lime)] transition-all duration-300 group-hover:w-3" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
