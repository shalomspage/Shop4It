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
      {/* Featured Products (from backend) */}
      <ProductSection title="Featured Products" />
      {/* Popular Products (optional) */}
      <ProductSection title="Popular Products" />
    </>
  );
};

export default HomePage;
