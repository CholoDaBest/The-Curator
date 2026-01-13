"use client";

import { motion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_TAGLINE } from "@/lib/constants";
import { SearchHero } from "./SearchHero";

interface HeroProps {
    onSearch?: (query: string) => void;
}

const headlineWords = APP_TAGLINE.split(" ");

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.215, 0.61, 0.355, 1],
        },
    },
};

export function Hero({ onSearch }: HeroProps) {
    return (
        <section
            className={cn(
                "relative min-h-[85vh] flex flex-col items-center justify-center",
                "px-4 sm:px-6 lg:px-8",
                "pt-24 pb-16"
            )}
        >
            {/* Subtle Background Gradient */}
            <div
                className={cn(
                    "absolute inset-0 -z-10",
                    "bg-gradient-to-b from-neutral-50 via-white to-white"
                )}
            />

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl -z-10" />

            {/* Content */}
            <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 mb-8"
                >
                    <span
                        className={cn(
                            "inline-flex items-center gap-1.5",
                            "px-3 py-1.5 rounded-full",
                            "bg-neutral-900 text-white",
                            "text-xs font-medium"
                        )}
                    >
                        <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Discover Premium Dupes
                    </span>
                </motion.div>

                {/* Animated Headline */}
                <motion.h1
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                        "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
                        "font-semibold tracking-tight text-neutral-900",
                        "mb-6"
                    )}
                >
                    {headlineWords.map((word, index) => (
                        <motion.span
                            key={index}
                            variants={wordVariants}
                            className="inline-block mr-[0.25em]"
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className={cn(
                        "text-lg sm:text-xl text-neutral-500",
                        "max-w-2xl mx-auto mb-12"
                    )}
                >
                    Intelligent curation for discerning shoppers. Find luxury looks at
                    accessible prices with our AI-powered dupe discovery engine.
                </motion.p>

                {/* Search Hero Component */}
                <SearchHero onSearch={onSearch} />
            </div>
        </section>
    );
}
