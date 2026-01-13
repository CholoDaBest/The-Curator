"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_PRODUCTS, formatSavings, calculateSavings } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

/**
 * Formats a number as USD currency.
 */
function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(amount);
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut" as const,
        },
    },
};

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = use(params);
    const product = MOCK_PRODUCTS.find((p) => p.id === id);

    // 404 State
    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-semibold text-neutral-900 mb-4">
                        Product Not Found
                    </h1>
                    <p className="text-neutral-500 mb-8">
                        We couldn&apos;t find the dupe you&apos;re looking for.
                    </p>
                    <Link href="/">
                        <Button className="gap-2">
                            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                            Back to Search
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    const savings = product.original.price - product.dupe.price;
    const savingsPercent = calculateSavings(product.original.price, product.dupe.price);

    // Mock AI-generated description based on category
    const whyItWorks = getWhyItWorks(product.category, product.title);

    return (
        <div className="min-h-screen pt-20 pb-16">
            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
            >
                <Link
                    href="/"
                    className={cn(
                        "inline-flex items-center gap-2",
                        "text-sm font-medium text-neutral-600",
                        "hover:text-neutral-900 transition-colors duration-200"
                    )}
                >
                    <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                    Back to Search
                </Link>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column - Visuals */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="lg:sticky lg:top-24 lg:self-start"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {/* Original Image */}
                            <div className="space-y-3">
                                <div
                                    className={cn(
                                        "relative aspect-[4/5] overflow-hidden rounded-2xl",
                                        "bg-neutral-100 border border-neutral-200/50"
                                    )}
                                >
                                    <Image
                                        src={product.original.imageUrl}
                                        alt={`${product.title} by ${product.original.brand}`}
                                        fill
                                        priority
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 50vw, 25vw"
                                    />
                                    {/* Label */}
                                    <div
                                        className={cn(
                                            "absolute bottom-3 left-3 right-3",
                                            "px-3 py-2 rounded-lg",
                                            "bg-white/90 backdrop-blur-sm",
                                            "shadow-sm"
                                        )}
                                    >
                                        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            The Inspiration
                                        </p>
                                        <p className="text-sm font-semibold text-neutral-900">
                                            {formatCurrency(product.original.price)}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-center text-neutral-500">
                                    {product.original.brand}
                                </p>
                            </div>

                            {/* Dupe Image */}
                            <div className="space-y-3">
                                <div
                                    className={cn(
                                        "relative aspect-[4/5] overflow-hidden rounded-2xl",
                                        "bg-neutral-100 border-2 border-emerald-500",
                                        "ring-4 ring-emerald-100"
                                    )}
                                >
                                    <Image
                                        src={product.dupe.imageUrl}
                                        alt={`${product.title} by ${product.dupe.brand}`}
                                        fill
                                        priority
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 50vw, 25vw"
                                    />
                                    {/* Label */}
                                    <div
                                        className={cn(
                                            "absolute bottom-3 left-3 right-3",
                                            "px-3 py-2 rounded-lg",
                                            "bg-emerald-500 text-white",
                                            "shadow-sm"
                                        )}
                                    >
                                        <p className="text-xs font-medium uppercase tracking-wider opacity-90">
                                            The Find
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {formatCurrency(product.dupe.price)}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-center text-neutral-500">
                                    {product.dupe.brand}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - The Pitch */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        {/* Header */}
                        <motion.div variants={itemVariants}>
                            <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">
                                {product.category}
                            </p>
                            <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mb-2">
                                {product.title}
                            </h1>
                            <p className="text-neutral-500">
                                <span className="text-neutral-900 font-medium">
                                    {product.original.brand}
                                </span>{" "}
                                vs{" "}
                                <span className="text-emerald-600 font-medium">
                                    {product.dupe.brand}
                                </span>
                            </p>
                        </motion.div>

                        {/* Price Analysis */}
                        <motion.div
                            variants={itemVariants}
                            className={cn(
                                "p-6 rounded-2xl",
                                "bg-gradient-to-br from-neutral-50 to-neutral-100",
                                "border border-neutral-200/50"
                            )}
                        >
                            <p className="text-sm font-medium text-neutral-500 mb-4">
                                Your Savings
                            </p>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-2xl font-semibold text-neutral-400 line-through">
                                    {formatCurrency(product.original.price)}
                                </span>
                                <span className="text-2xl text-neutral-400">−</span>
                                <span className="text-2xl font-semibold text-neutral-900">
                                    {formatCurrency(product.dupe.price)}
                                </span>
                                <span className="text-2xl text-neutral-400">=</span>
                                <span
                                    className={cn(
                                        "px-4 py-2 rounded-full",
                                        "bg-emerald-100 text-emerald-700",
                                        "text-2xl font-bold"
                                    )}
                                >
                                    Save {formatSavings(product.original.price, product.dupe.price)}
                                </span>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${savingsPercent}%` }}
                                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                                        className="h-full bg-emerald-500 rounded-full"
                                    />
                                </div>
                                <span className="text-sm font-semibold text-emerald-600">
                                    {savingsPercent}% off
                                </span>
                            </div>
                        </motion.div>

                        {/* Why It Works */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-neutral-400" strokeWidth={1.5} />
                                <h2 className="text-lg font-semibold text-neutral-900">
                                    Why This Works
                                </h2>
                            </div>
                            <p className="text-neutral-600 leading-relaxed">{whyItWorks}</p>
                            <ul className="space-y-2">
                                {getMatchPoints(product.category).map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div
                                            className={cn(
                                                "flex-shrink-0 w-5 h-5 rounded-full",
                                                "bg-emerald-100 flex items-center justify-center"
                                            )}
                                        >
                                            <Check
                                                className="w-3 h-3 text-emerald-600"
                                                strokeWidth={2}
                                            />
                                        </div>
                                        <span className="text-neutral-600">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* CTA */}
                        <motion.div variants={itemVariants} className="pt-4">
                            <a
                                href={product.dupe.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <Button
                                    size="lg"
                                    className={cn(
                                        "w-full h-14 text-base gap-2",
                                        "bg-neutral-900 hover:bg-neutral-800",
                                        "shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
                                    )}
                                >
                                    Buy at {product.dupe.brand} — {formatCurrency(product.dupe.price)}
                                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                                </Button>
                            </a>
                            <p className="mt-3 text-center text-xs text-neutral-400">
                                Clicking this link may earn us a commission at no extra cost to you.
                            </p>
                        </motion.div>

                        {/* Tags */}
                        <motion.div variants={itemVariants} className="pt-4">
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={cn(
                                            "px-3 py-1 rounded-full",
                                            "text-xs font-medium",
                                            "bg-neutral-100 text-neutral-600"
                                        )}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

/**
 * Generate mock AI description based on category
 */
function getWhyItWorks(category: string, title: string): string {
    const descriptions: Record<string, string> = {
        Furniture: `Both pieces share the same iconic silhouette and design DNA that made the original a design classic. The dupe uses comparable materials and construction techniques to achieve that premium look and feel at a fraction of the cost.`,
        Fashion: `This dupe captures the exact aesthetic and craftsmanship details that make the original so covetable. From the stitching patterns to the hardware finish, it's a remarkably close match that photographs identically.`,
        Jewelry: `The dupe replicates the proportions, finish, and weight of the original with impressive accuracy. Unless you're a trained jeweler, the visual difference is virtually undetectable in everyday wear.`,
        Home: `Same design language, similar materials, indistinguishable on a shelf. The dupe manufacturer clearly studied the original's appeal and translated it effectively at an accessible price point.`,
    };

    return (
        descriptions[category] ||
        `This ${title} dupe captures the essence of the original design while making it accessible. The quality-to-price ratio is exceptional.`
    );
}

/**
 * Generate match points based on category
 */
function getMatchPoints(category: string): string[] {
    const points: Record<string, string[]> = {
        Furniture: [
            "Similar materials and construction quality",
            "Matching silhouette and proportions",
            "Comparable comfort and durability",
        ],
        Fashion: [
            "Identical visual aesthetic",
            "Quality craftsmanship at a fraction of the price",
            "Same styling versatility",
        ],
        Jewelry: [
            "Matching dimensions and proportions",
            "Similar weight and quality feel",
            "Identical styling potential",
        ],
        Home: [
            "Same visual impact and design language",
            "Comparable material quality",
            "Indistinguishable at normal viewing distance",
        ],
    };

    return points[category] || [
        "Captures the essence of the original",
        "Exceptional quality-to-price ratio",
        "Highly rated by customers",
    ];
}
