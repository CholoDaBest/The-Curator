"use client";

import { motion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export function EmptyState({
    title = "No products found",
    description = "Try adjusting your search or filters to find what you're looking for.",
    actionLabel = "Explore all products",
    onAction,
    className,
}: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "flex flex-col items-center justify-center",
                "py-24 px-4 text-center",
                className
            )}
        >
            {/* Icon Container */}
            <div
                className={cn(
                    "flex items-center justify-center",
                    "w-20 h-20 rounded-2xl",
                    "bg-neutral-100 mb-6"
                )}
            >
                <Package
                    className="w-10 h-10 text-neutral-400"
                    strokeWidth={1.5}
                />
            </div>

            {/* Text Content */}
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {title}
            </h3>
            <p className="text-neutral-500 max-w-sm mb-8">
                {description}
            </p>

            {/* Action Button */}
            <Button onClick={onAction} className="gap-2">
                {actionLabel}
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Button>
        </motion.div>
    );
}
