"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { ButtonVariant, ButtonSize } from "@/lib/types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-neutral-900 text-white hover:bg-neutral-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
    secondary:
        "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
    ghost:
        "bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
    outline:
        "bg-transparent border border-neutral-200/50 text-neutral-900 hover:bg-neutral-50",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading = false,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    // Base styles
                    "inline-flex items-center justify-center gap-2",
                    "rounded-lg font-medium",
                    "transition-all duration-200",
                    "active:scale-95",
                    "focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:ring-offset-2",
                    "disabled:opacity-50 disabled:pointer-events-none",
                    // Variant and size
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
