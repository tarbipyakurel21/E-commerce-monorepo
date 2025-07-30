import HeroSection from "@/components/HeroSection";
import React from "react";
import ProductsPage from "./products/page";

export default function HomePage() {
  return (
    <main>
       <HeroSection />
       <ProductsPage/>
    </main>
  );
};
