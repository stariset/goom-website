import { Github, Linkedin, Twitter, Globe } from "lucide-react";

export type Social = {
  twitter?: string;
  github?: string;
  linkedin?: string;
  site?: string;
};

const map = [
  { key: "twitter" as const, icon: Twitter, prefix: "https://twitter.com/", label: "Twitter" },
  { key: "github" as const, icon: Github, prefix: "https://github.com/", label: "GitHub" },
  { key: "linkedin" as const, icon: Linkedin, prefix: "https://linkedin.com/in/", label: "LinkedIn" },
  { key: "site" as const, icon: Globe, prefix: "", label: "Website" },
];

export function SocialRow({
  links,
  size = "sm",
  tone = "light",
}: {
  links: Social;
  size?: "sm" | "md";
  tone?: "light" | "dark";
}) {
  const dim = size === "md" ? "h-9 w-9" : "h-8 w-8";
  const icon = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  const surface =
    tone === "dark"
      ? "bg-background/10 text-background hover:bg-[var(--lime)] hover:text-[var(--ink)]"
      : "hairline text-muted-foreground hover:bg-foreground hover:text-background hover:border-transparent";

  return (
    <div className="flex items-center gap-2">
      {map.map(({ key, icon: Icon, prefix, label }) => {
        const handle = links[key];
        if (!handle) return null;
        const href = key === "site" ? handle : `${prefix}${handle.replace(/^@/, "")}`;
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className={`grid place-items-center rounded-full ${dim} ${surface} transition-all duration-300 hover:-translate-y-0.5`}
          >
            <Icon className={icon} />
          </a>
        );
      })}
    </div>
  );
}
