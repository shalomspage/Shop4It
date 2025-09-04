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
      />

      {/* Popular Products */}
      <ProductSection 
        title="Popular Products" 
        endpoint="/products/popular/" 
      />
    </>
  );
};

export default HomePage;
