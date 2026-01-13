"use client";

import { useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ProductCard } from "./ProductCard";
import type { ProductPair } from "@/lib/types";

interface ProductGridProps {
    products?: ProductPair[];
    query?: string;
    title?: string;
    subtitle?: string;
    className?: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2,
        },
    },
};

export function ProductGrid({
    products = MOCK_PRODUCTS,
    query = "",
    title = "Curated for You",
    subtitle = "Luxury looks, logic prices. Hover to compare.",
    className,
}: ProductGridProps) {
    // Filter products based on query
    const filteredProducts = useMemo(() => {
        if (!query.trim()) {
            return products;
        }

        const searchTerm = query.toLowerCase().trim();

        return products.filter((product) => {
            // Check title
            if (product.title.toLowerCase().includes(searchTerm)) {
                return true;
            }

            // Check category
            if (product.category.toLowerCase().includes(searchTerm)) {
                return true;
            }

            // Check tags
            if (product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))) {
                return true;
            }

            // Check brand names
            if (
                product.original.brand.toLowerCase().includes(searchTerm) ||
                product.dupe.brand.toLowerCase().includes(searchTerm)
            ) {
                return true;
            }

            return false;
        });
    }, [products, query]);

    // Dynamic title based on search
    const displayTitle = query.trim()
        ? `Results for "${query}"`
        : title;

    const displaySubtitle = query.trim()
        ? `${filteredProducts.length} ${filteredProducts.length === 1 ? "dupe" : "dupes"} found`
        : subtitle;

    return (
        <section className={cn("py-16 px-4 sm:px-6 lg:px-8", className)}>
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
                            {displayTitle}
                        </h2>
                        <p className="mt-2 text-neutral-500">{displaySubtitle}</p>
                    </div>
                    {!query.trim() && (
                        <button
                            type="button"
                            className={cn(
                                "hidden sm:flex items-center gap-1",
                                "text-sm font-medium text-neutral-600",
                                "hover:text-neutral-900 transition-colors duration-200"
                            )}
                        >
                            View all
                            <span aria-hidden="true">→</span>
                        </button>
                    )}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <div
                            className={cn(
                                "flex items-center justify-center",
                                "w-16 h-16 rounded-2xl",
                                "bg-neutral-100 mb-6"
                            )}
                        >
                            <SearchX className="w-8 h-8 text-neutral-400" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                            No vibes found
                        </h3>
                        <p className="text-neutral-500 max-w-sm">
                            We couldn&apos;t find any dupes matching &quot;{query}&quot;.
                            <br />
                            Try a different search term.
                        </p>
                    </motion.div>
                ) : (
                    /* Responsive Grid with AnimatePresence */
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    layout
                                >
                                    <ProductCard product={product} priority={index < 3} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
