"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, icon, type = "text", ...props }, ref) => {
        return (
            <div className="relative w-full">
                {icon ? (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                        {icon}
                    </div>
                ) : null}
                <input
                    ref={ref}
                    type={type}
                    className={cn(
                        // Base styles
                        "w-full rounded-xl border border-neutral-200/50",
                        "bg-white/80 backdrop-blur-sm",
                        "text-neutral-900 placeholder:text-neutral-400",
                        "transition-all duration-200",
                        // Focus states
                        "focus:outline-none focus:ring-2 focus:ring-black/5 focus:ring-offset-2",
                        "focus:border-neutral-300",
                        // Shadow
                        "shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
                        // Padding based on icon presence
                        icon ? "pl-12 pr-4" : "px-4",
                        // Error state
                        error && "border-red-300 focus:ring-red-100",
                        className
                    )}
                    {...props}
                />
                {error ? (
                    <p className="mt-1.5 text-sm text-red-500">{error}</p>
                ) : null}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input, type InputProps };
