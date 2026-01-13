"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log error to reporting service
        console.error("Application Error:", error);
    }, [error]);

    return (
        <div
            className={cn(
                "min-h-screen flex flex-col items-center justify-center",
                "px-4 bg-gradient-to-b from-neutral-50 to-white"
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md"
            >
                {/* Icon */}
                <div
                    className={cn(
                        "flex items-center justify-center",
                        "w-20 h-20 rounded-2xl",
                        "bg-red-50 mx-auto mb-6"
                    )}
                >
                    <AlertTriangle
                        className="w-10 h-10 text-red-500"
                        strokeWidth={1.5}
                    />
                </div>

                {/* Text */}
                <h1 className="text-2xl font-semibold text-neutral-900 mb-3">
                    Something went wrong
                </h1>
                <p className="text-neutral-500 mb-8">
                    We encountered an unexpected error. Our team has been notified
                    and is working on a fix.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={reset} className="gap-2">
                        <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
                        Try again
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = "/"}>
                        Go home
                    </Button>
                </div>

                {/* Error ID for support */}
                {error.digest ? (
                    <p className="mt-8 text-xs text-neutral-400">
                        Error ID: {error.digest}
                    </p>
                ) : null}
            </motion.div>
        </div>
    );
}
