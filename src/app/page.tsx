import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductGrid } from "@/components/ProductGrid";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

// Page-level metadata (overrides layout default for homepage)
export const metadata: Metadata = {
  title: "In Ly Nhựa TPHCM & Toàn Quốc | Xưởng In Ly Giá Rẻ HCM",
  description:
    "Xưởng in ly nhựa theo yêu cầu tại Hồ Chí Minh (HCM). In ly trà sữa, in ly cà phê giá rẻ từ 1.200đ/ly, số lượng từ 1.000 ly. Giao tốc hành TPHCM. Hotline: 0396 505 693.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? "https://inlygiaRe.vn",
  },
};

// JSON-LD Structured Data
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inlygiaRe.vn";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "In Ly Giá Rẻ",
  url: siteUrl,
  description: "Dịch vụ in ly nhựa theo yêu cầu giá rẻ toàn quốc",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "In Ly Giá Rẻ",
  description: "Xưởng in ly nhựa tại Hồ Chí Minh (TPHCM). Dịch vụ in ly theo yêu cầu, in ly trà sữa, ly cafe giá rẻ toàn quốc.",
  url: siteUrl,
  telephone: "0396505693",
  image: `${siteUrl}/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "VN",
    addressRegion: "Hồ Chí Minh",
  },
  priceRange: "1.200đ – 1.500đ / ly",
  openingHours: "Mo-Sa 07:30-17:30",
  sameAs: [],
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
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

