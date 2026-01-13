import Image from "next/image";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: "About",
    description:
        "The Curator uses AI to find luxury-quality products at accessible prices.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-16">
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <h1
                    className={cn(
                        "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
                        "font-light text-neutral-900",
                        "leading-tight"
                    )}
                >
                    We believe style shouldn&apos;t
                    <br />
                    cost a fortune.
                </h1>
                <p className="mt-8 text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto">
                    {APP_NAME} is on a mission to democratize luxury. By leveraging
                    cutting-edge AI, we find designer-quality products at a fraction of
                    the price.
                </p>
            </section>

            {/* Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-t border-neutral-200/50" />
            </div>

            {/* The Algorithm Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Column */}
                    <div>
                        <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                            How It Works
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mb-8">
                            The Algorithm
                        </h2>
                        <div className="space-y-6 text-neutral-500 leading-relaxed">
                            <p>
                                Our proprietary AI scans luxury catalogs across thousands of
                                brands, analyzing materials, construction techniques, and design
                                DNA. We then cross-reference these findings with emerging
                                manufacturers who deliver the same quality—without the markup.
                            </p>
                            <p>
                                Every dupe we feature undergoes rigorous vetting. We compare
                                thread counts, hardware finishes, leather grades, and
                                craftsmanship details to ensure you&apos;re getting the real
                                thing—just without the designer price tag.
                            </p>
                            <p>
                                The result? Savings of up to 90% on products that are visually
                                and functionally indistinguishable from their luxury
                                counterparts.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-8">
                            <div>
                                <p className="text-3xl font-semibold text-neutral-900">90%</p>
                                <p className="text-sm text-neutral-400 mt-1">Avg. Savings</p>
                            </div>
                            <div>
                                <p className="text-3xl font-semibold text-neutral-900">50K+</p>
                                <p className="text-sm text-neutral-400 mt-1">Products Scanned</p>
                            </div>
                            <div>
                                <p className="text-3xl font-semibold text-neutral-900">4.9★</p>
                                <p className="text-sm text-neutral-400 mt-1">User Rating</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="relative">
                        <div
                            className={cn(
                                "relative aspect-[4/5] rounded-2xl overflow-hidden",
                                "bg-neutral-100"
                            )}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop"
                                alt="Modern minimalist architecture"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        {/* Decorative Element */}
                        <div
                            className={cn(
                                "absolute -bottom-4 -right-4 -z-10",
                                "w-full h-full rounded-2xl",
                                "bg-neutral-100"
                            )}
                        />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 text-center">
                        Our Values
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mb-16 text-center">
                        What We Stand For
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div
                                className={cn(
                                    "inline-flex items-center justify-center",
                                    "w-12 h-12 rounded-2xl",
                                    "bg-white shadow-sm mb-6",
                                    "text-2xl"
                                )}
                            >
                                ✨
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                                Quality First
                            </h3>
                            <p className="text-neutral-500">
                                We never compromise on materials or craftsmanship. Every product
                                meets our rigorous standards.
                            </p>
                        </div>

                        <div className="text-center">
                            <div
                                className={cn(
                                    "inline-flex items-center justify-center",
                                    "w-12 h-12 rounded-2xl",
                                    "bg-white shadow-sm mb-6",
                                    "text-2xl"
                                )}
                            >
                                🎯
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                                Radical Transparency
                            </h3>
                            <p className="text-neutral-500">
                                We show you exactly what you&apos;re getting and how it compares
                                to the original. No hidden compromises.
                            </p>
                        </div>

                        <div className="text-center">
                            <div
                                className={cn(
                                    "inline-flex items-center justify-center",
                                    "w-12 h-12 rounded-2xl",
                                    "bg-white shadow-sm mb-6",
                                    "text-2xl"
                                )}
                            >
                                💚
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                                Sustainable Choice
                            </h3>
                            <p className="text-neutral-500">
                                By choosing dupes, you&apos;re supporting smaller manufacturers
                                and reducing fashion waste.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-4">
                    Ready to discover your next find?
                </h2>
                <p className="text-neutral-500 mb-8">
                    Start exploring our curated collection of luxury dupes.
                </p>
                <a
                    href="/"
                    className={cn(
                        "inline-flex items-center justify-center",
                        "px-8 py-3 rounded-full",
                        "text-base font-medium text-white",
                        "bg-neutral-900 hover:bg-neutral-800",
                        "transition-colors duration-200"
                    )}
                >
                    Start Searching
                </a>
            </section>
        </div>
    );
}
