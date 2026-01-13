"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { calculateSavings } from "@/lib/mock-data";
import type { ProductPair } from "@/lib/types";

interface ProductCardProps {
    product: ProductPair;
    priority?: boolean;
    className?: string;
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

export function ProductCard({
    product,
    priority = false,
    className,
}: ProductCardProps) {
    const savingsPercent = calculateSavings(
        product.original.price,
        product.dupe.price
    );

    return (
        <article
            className={cn(
                "group relative overflow-hidden rounded-2xl",
                "bg-white border border-neutral-200/50",
                "shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
                "transition-all duration-300 ease-out",
                "hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)]",
                className
            )}
        >
            {/* Image Container with Crossfade Effect - Links to Product Page */}
            <Link
                href={`/products/${product.id}`}
                className="block relative aspect-[4/5] overflow-hidden bg-neutral-100"
            >
                {/* Dupe Image (Default - visible) */}
                <Image
                    src={product.dupe.imageUrl}
                    alt={`${product.title} by ${product.dupe.brand}`}
                    fill
                    priority={priority}
                    className={cn(
                        "object-cover",
                        "transition-opacity duration-500 ease-out",
                        "group-hover:opacity-0"
                    )}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Original Image (Revealed on hover) */}
                <Image
                    src={product.original.imageUrl}
                    alt={`${product.title} by ${product.original.brand}`}
                    fill
                    className={cn(
                        "object-cover",
                        "transition-opacity duration-500 ease-out",
                        "opacity-0 group-hover:opacity-100"
                    )}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Savings Badge */}
                <div className="absolute top-3 right-3 z-10">
                    <span
                        className={cn(
                            "inline-flex items-center",
                            "px-2.5 py-1 rounded-full",
                            "text-xs font-semibold",
                            "bg-emerald-100 text-emerald-800",
                            "shadow-sm"
                        )}
                    >
                        Save {savingsPercent}%
                    </span>
                </div>

                {/* Hover Indicator */}
                <div
                    className={cn(
                        "absolute bottom-3 left-3 right-3",
                        "px-3 py-2 rounded-lg",
                        "bg-black/70 backdrop-blur-sm",
                        "text-white text-xs text-center",
                        "opacity-0 group-hover:opacity-100",
                        "transition-opacity duration-300",
                        "pointer-events-none"
                    )}
                >
                    Viewing: {product.original.brand} Original
                </div>
            </Link>

            {/* Info Area - Also Links to Product Page */}
            <Link href={`/products/${product.id}`} className="block p-4">
                {/* Title */}
                <h3 className="font-medium text-neutral-900 mb-2 line-clamp-1">
                    {product.title}
                </h3>

                {/* Price Row */}
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-lg font-bold text-neutral-900">
                        {formatCurrency(product.dupe.price)}
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                        {formatCurrency(product.original.price)}
                    </span>
                </div>

                {/* Brand */}
                <p className="text-xs text-neutral-500">
                    Dupe by{" "}
                    <span className="font-medium text-neutral-700">
                        {product.dupe.brand}
                    </span>
                </p>
            </Link>
        </article>
    );
}
