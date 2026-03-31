import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductGrid } from "@/components/ProductGrid";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBanner />
        <ProductGrid />
        <ProcessSection />
        <PricingSection />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}
