import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "In Ly Giá Rẻ | Thiết kế 3D & In ấn Cao cấp",
  description:
    "Trải nghiệm in ấn của tương lai. Nâng tầm thương hiệu với chất lượng in ly đột phá, ứng dụng không gian 3D/VR trực quan, và thiết kế không giới hạn.",
  keywords: [
    "in ly",
    "in ấn 3D",
    "thiết kế bao bì",
    "VR packaging",
    "thương hiệu",
    "CMYK printing",
  ],
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
      </head>
      <body
        className={`${beVietnamDisplay.variable} ${beVietnamBody.variable} font-body bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden`}
      >
        {/* Global Halftone/Noise Overlay for print texture effect */}
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.035] mix-blend-overlay print-noise-texture"></div>
        {children}
      </body>
    </html>
  );
}
