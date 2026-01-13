"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50",
                "backdrop-blur-md bg-white/70",
                "border-b border-neutral-200/50",
                "shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            )}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl font-semibold text-neutral-900 tracking-tight"
                    >
                        {APP_NAME}
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium text-neutral-600",
                                        "hover:text-neutral-900 transition-colors duration-200"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                            Sign in
                        </Button>
                        <Button size="sm">Get Started</Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={cn(
                            "md:hidden flex items-center justify-center",
                            "w-10 h-10 rounded-lg",
                            "text-neutral-600 hover:bg-neutral-100",
                            "transition-colors duration-200"
                        )}
                    >
                        {isMenuOpen ? (
                            <X className="w-5 h-5" strokeWidth={1.5} />
                        ) : (
                            <Menu className="w-5 h-5" strokeWidth={1.5} />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen ? (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden py-4 border-t border-neutral-200/50"
                    >
                        <ul className="flex flex-col gap-2">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={cn(
                                            "block px-4 py-2 rounded-lg",
                                            "text-sm font-medium text-neutral-600",
                                            "hover:bg-neutral-100 hover:text-neutral-900",
                                            "transition-colors duration-200"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 px-4 flex flex-col gap-2">
                            <Button variant="outline" className="w-full">
                                Sign in
                            </Button>
                            <Button className="w-full">Get Started</Button>
                        </div>
                    </motion.div>
                ) : null}
            </nav>
        </motion.header>
    );
}
