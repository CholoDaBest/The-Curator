"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Camera, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchHeroProps {
    placeholder?: string;
    className?: string;
    onSearch?: (query: string) => void;
    onUpload?: () => void;
}

type SearchState = "idle" | "scanning";

// Random categories/terms to simulate AI finding a match
const AI_SUGGESTIONS = ["chair", "sofa", "bag", "jewelry", "sweater", "lamp"];

export function SearchHero({
    placeholder = "Paste a link or describe the item...",
    className,
    onSearch,
    onUpload,
}: SearchHeroProps) {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchState, setSearchState] = useState<SearchState>("idle");
    const inputRef = useRef<HTMLInputElement>(null);

    // Call onSearch on every keystroke
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setQuery(value);
            onSearch?.(value);
        },
        [onSearch]
    );

    const simulateSearch = useCallback(() => {
        if (!query.trim() && searchState === "idle") return;

        // Start scanning animation
        setSearchState("scanning");
        const searchTerm = query;

        // Simulate processing for 2 seconds
        setTimeout(() => {
            setSearchState("idle");
            // Keep the query and trigger search
            onSearch?.(searchTerm);
        }, 2000);
    }, [query, searchState, onSearch]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            simulateSearch();
        }
    };

    const handleUploadClick = () => {
        setSearchState("scanning");

        // After 2 seconds, simulate AI finding a random match
        setTimeout(() => {
            setSearchState("idle");
            // Pick a random suggestion to simulate AI finding a match
            const randomSuggestion =
                AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)];
            setQuery(randomSuggestion);
            onSearch?.(randomSuggestion);
            onUpload?.();
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className={cn("w-full max-w-2xl mx-auto", className)}
        >
            <div
                className={cn(
                    "relative flex items-center",
                    "h-16 px-6 rounded-full",
                    "bg-white border border-neutral-200/50",
                    "shadow-[0_20px_60px_rgb(0,0,0,0.1)]",
                    "transition-all duration-300 ease-out",
                    // Focus state
                    isFocused &&
                    "ring-2 ring-black/5 ring-offset-2 shadow-[0_25px_70px_rgb(0,0,0,0.15)]"
                )}
            >
                {/* Left Icon */}
                <div className="flex-shrink-0 mr-4">
                    <AnimatePresence mode="wait">
                        {searchState === "scanning" ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Loader2
                                    className="w-5 h-5 text-neutral-900 animate-spin"
                                    strokeWidth={1.5}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="search"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Search
                                    className="w-5 h-5 text-neutral-400"
                                    strokeWidth={1.5}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input / Scanning State */}
                <div className="flex-1 relative">
                    <AnimatePresence mode="wait">
                        {searchState === "scanning" ? (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-3"
                            >
                                <span className="text-lg text-neutral-900 font-medium">
                                    Analyzing aesthetics...
                                </span>
                                <div className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 h-1.5 rounded-full bg-neutral-400"
                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.input
                                key="input"
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholder}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className={cn(
                                    "w-full bg-transparent",
                                    "text-lg text-neutral-900",
                                    "placeholder:text-neutral-400",
                                    "focus:outline-none"
                                )}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Clear Button (when there's a query) */}
                {query && searchState === "idle" && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            onSearch?.("");
                            inputRef.current?.focus();
                        }}
                        className={cn(
                            "flex-shrink-0 mr-2",
                            "text-xs font-medium text-neutral-400 hover:text-neutral-600",
                            "transition-colors duration-200"
                        )}
                    >
                        Clear
                    </button>
                )}

                {/* Upload Button with Tooltip */}
                <div className="flex-shrink-0 ml-2 relative group">
                    <button
                        type="button"
                        onClick={handleUploadClick}
                        disabled={searchState === "scanning"}
                        aria-label="Upload image to find dupe"
                        className={cn(
                            "flex items-center justify-center",
                            "w-10 h-10 rounded-full",
                            "bg-neutral-100 hover:bg-neutral-200",
                            "text-neutral-600 hover:text-neutral-900",
                            "transition-all duration-200",
                            "active:scale-95",
                            "disabled:opacity-50 disabled:pointer-events-none"
                        )}
                    >
                        <Camera className="w-5 h-5" strokeWidth={1.5} />
                    </button>

                    {/* Tooltip */}
                    <div
                        className={cn(
                            "absolute bottom-full right-0 mb-2",
                            "px-3 py-1.5 rounded-lg",
                            "bg-neutral-900 text-white text-xs font-medium",
                            "whitespace-nowrap",
                            "opacity-0 group-hover:opacity-100",
                            "translate-y-1 group-hover:translate-y-0",
                            "transition-all duration-200",
                            "pointer-events-none"
                        )}
                    >
                        Upload to find dupe
                        {/* Tooltip Arrow */}
                        <div className="absolute top-full right-4 -mt-px">
                            <div className="border-4 border-transparent border-t-neutral-900" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Helper Text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="mt-4 text-center text-sm text-neutral-400"
            >
                Try: &quot;Bottega Veneta pouch bag&quot; or paste an Instagram link
            </motion.p>
        </motion.div>
    );
}
