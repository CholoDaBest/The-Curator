"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface CardProps {
    product: Product;
    priority?: boolean;
    className?: string;
}

export function Card({ product, priority = false, className }: CardProps) {
    const discount = product.originalPrice
        ? Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
        : null;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
                "group relative overflow-hidden rounded-2xl",
                "bg-white border border-neutral-200/50",
                "shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
                "transition-shadow duration-300",
                "hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]",
                className
            )}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block absolute inset-0"
                >
                    <Image
                        src={product.imageUrl}
                        alt={`${product.brand} - ${product.name}`}
                        fill
                        priority={priority}
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                </a>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
                    {product.isNew ? (
                        <span className="px-2.5 py-1 text-xs font-medium bg-neutral-900 text-white rounded-full">
                            New
                        </span>
                    ) : null}
                    {discount ? (
                        <span className="px-2.5 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                            -{discount}%
                        </span>
                    ) : null}
                </div>

                {/* Quick Actions - Outside the main link */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <button
                        type="button"
                        aria-label="Add to favorites"
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                            "flex items-center justify-center",
                            "w-9 h-9 rounded-full",
                            "bg-white/90 backdrop-blur-sm",
                            "text-neutral-600 hover:text-red-500",
                            "shadow-[0_4px_12px_rgb(0,0,0,0.1)]",
                            "transition-all duration-200",
                            "active:scale-95"
                        )}
                    >
                        <Heart className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button
                        type="button"
                        aria-label="View product"
                        onClick={() => window.open(product.affiliateUrl, "_blank")}
                        className={cn(
                            "flex items-center justify-center",
                            "w-9 h-9 rounded-full",
                            "bg-white/90 backdrop-blur-sm",
                            "text-neutral-600 hover:text-neutral-900",
                            "shadow-[0_4px_12px_rgb(0,0,0,0.1)]",
                            "transition-all duration-200",
                            "active:scale-95"
                        )}
                    >
                        <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                    {product.brand}
                </p>
                <h3 className="font-medium text-neutral-900 mb-2 line-clamp-2">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-neutral-900">
                        {formatPrice(product.price)}
                    </span>
                    {product.originalPrice ? (
                        <span className="text-sm text-neutral-400 line-through">
                            {formatPrice(product.originalPrice)}
                        </span>
                    ) : null}
                </div>
            </div>
        </motion.article>
    );
}
