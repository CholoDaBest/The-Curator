"use client";

import { useState } from "react";
import { Hero } from "@/components/features/Hero";
import { ProductGrid } from "@/components/features/ProductGrid";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Hero onSearch={setSearchQuery} />
      <ProductGrid query={searchQuery} />
    </>
  );
}
