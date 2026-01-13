import type { ProductPair } from "./types";

/**
 * High-quality mock data for product pair comparisons.
 * Each pair represents an expensive original vs. affordable dupe.
 */
export const MOCK_PRODUCTS: ProductPair[] = [
    {
        id: "550e8400-e29b-41d4-a716-446655440001",
        title: "Eames Lounge Chair",
        category: "Furniture",
        original: {
            price: 7395,
            brand: "Herman Miller",
            imageUrl:
                "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=1000&fit=crop",
        },
        dupe: {
            price: 849,
            brand: "Wayfair",
            affiliateUrl: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop",
        },
        tags: ["chair", "lounge", "mid-century", "leather", "iconic"],
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440002",
        title: "Cloud Modular Sofa",
        category: "Furniture",
        original: {
            price: 12995,
            brand: "Restoration Hardware",
            imageUrl:
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop",
        },
        dupe: {
            price: 1899,
            brand: "Valyou Furniture",
            affiliateUrl: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=1000&fit=crop",
        },
        tags: ["sofa", "modular", "cloud", "comfortable", "living room"],
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440003",
        title: "Pouch Clutch Bag",
        category: "Fashion",
        original: {
            price: 3200,
            brand: "Bottega Veneta",
            imageUrl:
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop",
        },
        dupe: {
            price: 128,
            brand: "Anthropologie",
            affiliateUrl: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=1000&fit=crop",
        },
        tags: ["bag", "clutch", "leather", "pouch", "minimalist"],
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440004",
        title: "Chunky Gold Hoops",
        category: "Jewelry",
        original: {
            price: 2450,
            brand: "Tiffany & Co.",
            imageUrl:
                "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1000&fit=crop",
        },
        dupe: {
            price: 58,
            brand: "Mejuri",
            affiliateUrl: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&h=1000&fit=crop",
        },
        tags: ["earrings", "hoops", "gold", "chunky", "statement"],
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440005",
        title: "Cashmere Crewneck Sweater",
        category: "Fashion",
        original: {
            price: 1295,
            brand: "Loro Piana",
            imageUrl:
                "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop",
        },
        dupe: {
            price: 128,
            brand: "Quince",
            affiliateUrl: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
        },
        tags: ["sweater", "cashmere", "knitwear", "basics", "luxury"],
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440006",
        title: "Minimalist Desk Lamp",
        category: "Home",
        original: {
            price: 695,
            brand: "Flos",
            imageUrl:
                "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=1000&fit=crop",
        },
        dupe: {
            price: 89,
            brand: "IKEA",
            affiliateUrl: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=1000&fit=crop",
        },
        tags: ["lamp", "desk", "lighting", "minimalist", "office"],
    },
];

/**
 * Get savings percentage between original and dupe.
 */
export function calculateSavings(original: number, dupe: number): number {
    return Math.round(((original - dupe) / original) * 100);
}

/**
 * Format price difference as a readable string.
 */
export function formatSavings(original: number, dupe: number): string {
    const saved = original - dupe;
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(saved);
}
