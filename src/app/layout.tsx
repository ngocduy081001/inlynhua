import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { QuoteProvider } from "@/context/QuoteContext";

const beVietnamDisplay = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const beVietnamBody = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inlygiaRe.vn";

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────
  metadataBase: new URL(siteUrl),
  title: {
    default: "In Ly Giá Rẻ | In Ly Nhựa Theo Yêu Cầu – Từ 1.000 Ly",
    template: "%s | In Ly Giá Rẻ",
  },
  description:
    "Dịch vụ in ly nhựa theo yêu cầu giá rẻ, chỉ từ 1.000 ly. In 1-4 màu CMYK, mẫu 3D miễn phí, giao hàng toàn quốc 1-5 ngày. Báo giá ngay – hotline 0396 505 693.",
  keywords: [
    "in ly nhựa giá rẻ",
    "in ly theo yêu cầu",
    "in ly trà sữa",
    "in ly cà phê",
    "in bao bì nhựa",
    "in CMYK",
    "in ly 1000 cái",
    "bao bì thương hiệu",
    "in ấn giá rẻ HCM",
    "in ly nhựa tphcm",
  ],

  // ── Canonical & Authors ───────────────────────────────────────────
  alternates: { canonical: siteUrl },
  authors: [{ name: "In Ly Giá Rẻ", url: siteUrl }],
  creator: "In Ly Giá Rẻ",
  publisher: "In Ly Giá Rẻ",

  // ── Open Graph ────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: "In Ly Giá Rẻ",
    title: "In Ly Giá Rẻ | In Ly Nhựa Theo Yêu Cầu – Từ 1.000 Ly",
    description:
      "In ly nhựa theo yêu cầu, giá rẻ, chỉ từ 1.000 ly. Thiết kế 3D miễn phí, giao hàng toàn quốc. Hotline: 0396 505 693.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "In Ly Giá Rẻ – In Ly Nhựa Theo Yêu Cầu",
      },
    ],
  },

  // ── Twitter Card ──────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "In Ly Giá Rẻ | In Ly Nhựa Theo Yêu Cầu",
    description: "In ly nhựa chỉ từ 1.000 cái. Thiết kế 3D miễn phí. Giao toàn quốc.",
    images: [`${siteUrl}/og-image.jpg`],
  },

  // ── Robots ────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ── Verification (thêm sau khi có Google Search Console) ─────────
  // verification: { google: "YOUR_GOOGLE_VERIFICATION_CODE" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        {/* Material Symbols — dùng cho Studio */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${beVietnamDisplay.variable} ${beVietnamBody.variable} font-body bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden`}
      >
        {/* Global Halftone/Noise Overlay for print texture effect */}
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.035] mix-blend-overlay print-noise-texture"></div>
        <QuoteProvider>
          {children}
        </QuoteProvider>
      </body>
    </html>
  );
}
