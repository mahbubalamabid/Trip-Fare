import AllProductsSection from "@/components/AllProductsSection";
import FareDecreaseSection from "@/components/FareDecreaseSection";
import FareIncreaseSection from "@/components/FareIncreaseSection";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <FareIncreaseSection />
      <FareDecreaseSection />
      <AllProductsSection />
    </div>
  );
}
