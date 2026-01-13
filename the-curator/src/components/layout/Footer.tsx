"use client";

import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

const shopLinks = [
    { label: "New Arrivals", href: "#" },
    { label: "Best Sellers", href: "#" },
    { label: "Furniture", href: "#" },
    { label: "Fashion", href: "#" },
];

const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
];

const socialLinks = [
    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
    { label: "Twitter", href: "https://twitter.com", icon: Twitter },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={cn(
                "border-t border-neutral-200/50",
                "bg-white"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="text-xl font-semibold text-neutral-900 tracking-tight"
                        >
                            {APP_NAME}
                        </Link>
                        <p className="mt-3 text-sm text-neutral-500 max-w-xs">
                            {APP_TAGLINE}
                        </p>
                        {/* Social Icons */}
                        <div className="mt-6 flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={cn(
                                        "flex items-center justify-center",
                                        "w-10 h-10 rounded-full",
                                        "bg-neutral-100 hover:bg-neutral-200",
                                        "text-neutral-600 hover:text-neutral-900",
                                        "transition-all duration-200"
                                    )}
                                >
                                    <social.icon className="w-4 h-4" strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div>
                        <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                            Shop
                        </h4>
                        <ul className="space-y-3">
                            {shopLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-sm text-neutral-500",
                                            "hover:text-neutral-900 transition-colors duration-200"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-sm text-neutral-500",
                                            "hover:text-neutral-900 transition-colors duration-200"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                            Stay Updated
                        </h4>
                        <p className="text-sm text-neutral-500 mb-4">
                            Get the latest dupes delivered to your inbox.
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={cn(
                                    "flex-1 px-4 py-2 rounded-lg",
                                    "text-sm text-neutral-900",
                                    "border border-neutral-200/50",
                                    "bg-neutral-50",
                                    "placeholder:text-neutral-400",
                                    "focus:outline-none focus:ring-2 focus:ring-black/5"
                                )}
                            />
                            <button
                                type="submit"
                                className={cn(
                                    "px-4 py-2 rounded-lg",
                                    "text-sm font-medium text-white",
                                    "bg-neutral-900 hover:bg-neutral-800",
                                    "transition-colors duration-200"
                                )}
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-16 pt-8 border-t border-neutral-200/50">
                    <p className="text-sm text-neutral-400 text-center">
                        © {currentYear} The Curator. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
