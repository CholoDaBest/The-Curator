/**
 * Application-wide constants and configuration.
 */

export const APP_NAME = "Curator.";
export const APP_TAGLINE = "Luxury taste. Logic price.";
export const APP_DESCRIPTION =
    "Discover premium affiliate products with intelligent curation. Find luxury items at accessible prices.";

export const SEARCH_PLACEHOLDER = "Search products or paste a URL...";

export const NAV_LINKS = [
    { label: "Discover", href: "/discover" },
    { label: "Collections", href: "/collections" },
    { label: "Trending", href: "/trending" },
] as const;

export const FOOTER_LINKS = {
    product: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "API", href: "/api" },
    ],
    company: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
    ],
    legal: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
    ],
} as const;

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;
