"use client";

import React from "react";
import CategorySection from "@/components/home/CategorySection";
import Hero from "@/components/home/Hero";
import ProductSection from "@/components/home/ProductSection";

const HomePage = () => {
  return (
    <>
      <Hero />
      <CategorySection />

      {/* Featured Products (temporarily using /popular/) */}
      <ProductSection 
        title="Featured Products" 
        endpoint="/products/popular/"
        limit={4} 
      />

      {/* Popular Products */}
      <ProductSection 
        title="Popular Products" 
        endpoint="/products/popular/" 
        limit={8}
      />
    </>
  );
};

export default HomePage;
