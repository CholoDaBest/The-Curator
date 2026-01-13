/**
 * Shared TypeScript interfaces and types.
 */

export interface Product {
    id: string;
    name: string;
    brand: string;
    description: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    category: string;
    tags: string[];
    affiliateUrl: string;
    rating?: number;
    reviewCount?: number;
    isNew?: boolean;
    isTrending?: boolean;
}

export interface Collection {
    id: string;
    name: string;
    description: string;
    coverImage: string;
    productCount: number;
    slug: string;
}

export interface SearchResult {
    products: Product[];
    totalCount: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

export interface FilterOptions {
    categories: string[];
    priceRange: {
        min: number;
        max: number;
    };
    brands: string[];
    sortBy: "relevance" | "price_asc" | "price_desc" | "newest" | "rating";
}

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface NavLink {
    label: string;
    href: string;
}

/**
 * Represents a product comparison between an expensive original
 * and an affordable alternative ("dupe").
 */
export interface ProductPair {
    id: string;
    title: string;
    category: string;
    original: {
        price: number;
        brand: string;
        imageUrl: string;
    };
    dupe: {
        price: number;
        brand: string;
        affiliateUrl: string;
        imageUrl: string;
    };
    tags: string[];
}
