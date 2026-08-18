/**
 * BRAND CONFIGURATION
 * 
 * Central hub for brand variables. Use this file to easily swap out
 * logos, change the company name, or update contact links.
 * 
 * ==========================================
 * NOTE: HOW TO CHANGE FONTS AND COLORS
 * ==========================================
 * To ensure maximum performance and compatibility with Tailwind CSS,
 * brand colors and typography are managed via CSS variables in:
 * 
 *    👉 `src/styles.css`
 * 
 * Look at the top of `src/styles.css` to change the `--font-display` 
 * and `--font-sans` variables. Look inside the `:root` block to change 
 * core colors like `--background`, `--foreground`, and `--lime`.
 */

export const brandConfig = {
  // Brand Identity
  companyName: "Goom",
  legalName: "Goom Engineering Studio",
  tagline: "Software Engineering Studio",
  
  // Logos (Paths should point to files in the public/ folder)
  logos: {
    // The standalone icon mark (e.g. for navbars, favicons, avatars)
    mark: "/logo/mark and iconAsset 3.svg",
    
    // The main wordmark (e.g. for standard branding)
    wordmark: "/logo/mainAsset 2.svg",
    
    // The full logo (e.g. for the footer)
    full: "/logo/fullAsset 1.svg",
  },
  
  // Contact & Socials
  contact: {
    email: "hello@goom.et",
  },
  socials: {
    github: "https://github.com/goom",
    twitter: "https://twitter.com/goom",
    linkedin: "https://linkedin.com/company/goom",
  }
} as const;
