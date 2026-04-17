import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CupPriceTable } from "@/components/CupPriceTable";
import { PricingCalculator } from "@/components/PricingCalculator";
import { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bảng Giá Ly Nhựa PP, PET, Ly Giấy | In Ly Giá Rẻ",
  description: "Bảng giá ly nhựa PP, PET và ly giấy chi tiết từ nhà cung cấp Uy Kiệt. So sánh giá sỉ, giá lẻ theo chất liệu và dung tích.",
};

export default function BangGiaPage() {
  const comparisonData = [
    {
      criteria: "Đặc Điểm",
      pp: "Hơi đục nhẹ, nhựa mềm, dẻo dai. Cầm êm tay.",
      bau: "Nhựa dẻo, thiết kế bo tròn ở đáy. Trẻ trung.",
      pet: "Cực kì trong suốt, cứng cáp, sáng bóng.",
      paper: "Giấy sần kraft hoặc giấy mịn trắng sang trọng."
    },
    {
      criteria: "Chịu Nhiệt",
      pp: "100°C (Nóng thoải mái)",
      bau: "100°C (Nóng thoải mái)",
      pet: "< 60°C (Chỉ dùng LẠNH)",
      paper: "Chịu nhiệt cực tốt."
    },
    {
      criteria: "Ép Màng",
      pp: "✅ Rất Khít",
      bau: "✅ Rất Khít",
      pet: "❌ Không Ép Được",
      paper: "❌ Không Ép Được"
    },
    {
      criteria: "Nắp Phù Hợp",
      pp: "Bằng, Cầu, Tim, Nắp Bật",
      bau: "Tim, Cầu, Bằng",
      pet: "Cầu vòm PET, Bằng, Trực tiếp",
      paper: "Nắp giấy, nắp bật vòm"
    },
    {
      criteria: "Thẩm Mỹ & In Ấn",
      pp: "Mực bám tốt. Phù hợp các thiết kế khối, icon đậm.",
      bau: "Giới trẻ yêu thích dáng ly vì cực hợp khoe thạch, trân châu.",
      pet: "Sang chảnh bậc nhất. Logo nổi bật, đồ uống cực kỳ 'ngon mắt'.",
      paper: "Trend bảo vệ môi trường, phong cách Bắc Âu Tối Giản."
    },
    {
      criteria: "Phù Hợp Cho",
      pp: "Trà sữa ship đi xa, Sâm bí đao, Nước ép...",
      bau: "Trà dâu, trà sữa pudding, flan...",
      pet: "Cafe lạnh, Trà trái cây cao cấp, Matcha đá xay.",
      paper: "Cafe nóng buổi sáng, take-away organic."
    }
  ];

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-[#f4f2eb] pt-32 pb-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-light italic text-[#1a1a1a] tracking-tight mb-4">
              BẢNG GIÁ <span className="text-[#6d8869] font-bold">LY NHỰA</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
              Tra cứu giá ly nhựa PP, PET, ly giấy trực tiếp từ nhà cung cấp. Lọc theo chất liệu, kích cỡ hoặc tìm kiếm mã sản phẩm.
            </p>
          </div>

          {/* Cup Price Table */}
          <CupPriceTable />

          {/* Calculator Section */}
          <PricingCalculator />

          {/* Comparison Table */}
          <div className="relative w-full overflow-hidden bg-white/50 backdrop-blur-xl border border-white rounded-[2rem] shadow-2xl mb-24">
            <div className="text-center pt-10 pb-4">
              <h2 className="text-2xl md:text-4xl font-display font-light italic text-[#1a1a1a]">
                So Sánh <span className="text-[#6d8869] font-bold">Chất Liệu</span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#1a1a1a] text-white">
                    <th className="p-6 font-display font-bold tracking-widest text-sm uppercase w-1/5 whitespace-nowrap">Tiêu Chí</th>
                    <th className="p-6 font-display font-bold tracking-widest text-sm uppercase w-[20%] text-[#f8eb96] whitespace-nowrap">Ly PP (Trơn/Sọc)</th>
                    <th className="p-6 font-display font-bold tracking-widest text-sm uppercase w-[20%] whitespace-nowrap">Ly PP Đáy Bầu</th>
                    <th className="p-6 font-display font-bold tracking-widest text-sm uppercase w-[20%] text-[#b4ac8f] whitespace-nowrap">Ly PET Cao Cấp</th>
                    <th className="p-6 font-display font-bold tracking-widest text-sm uppercase w-[20%] whitespace-nowrap">Ly Giấy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50 text-sm md:text-base">
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="hover:bg-white/60 transition-colors">
                      <td className="p-6 font-bold text-[#1a1a1a]">{row.criteria}</td>
                      <td className="p-6 text-slate-700">{row.pp}</td>
                      <td className="p-6 text-slate-700">{row.bau}</td>
                      <td className="p-6 text-slate-700">{row.pet}</td>
                      <td className="p-6 text-slate-700">{row.paper}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lời khuyên section */}
          <div className="bg-[#1a1a1a] rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <i className="fa-solid fa-lightbulb text-9xl text-white"></i>
            </div>
            
            <div className="flex-1 relative z-10">
              <span className="text-[#f8eb96] text-xs font-bold tracking-widest uppercase mb-4 block">Hành trang cho chủ quán</span>
              <h2 className="text-3xl md:text-5xl font-display font-light italic text-white mb-6">
                Lời Khuyên Gói Gọn
              </h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#6d8869] text-white flex items-center justify-center shrink-0 mt-1">1</div>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    <strong className="text-white">Bán Trà Sữa / Quán bình dân ship mang đi:</strong> Lựa Chọn <strong>Ly Nhựa PP</strong> (Trơn hoặc đáy bầu). Ưu thế là <strong>Ép Được Màng</strong> nilon, shipper chạy cỡ nào cũng không sợ đổ.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#f8eb96] text-[#1a1a1a] flex items-center justify-center shrink-0 mt-1">2</div>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    <strong className="text-white">Cà Phê Ủ Lạnh, Nước Ép Sang Chảnh:</strong> Chọn <strong>Ly Nhựa PET</strong>. Trong suốt, cứng cáp, đi kèm Nắp Cầu — ly nước lên hình long lanh.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#6d8869] text-white flex items-center justify-center shrink-0 mt-1">3</div>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    <strong className="text-white">Trend Organic / Cà Phê Nóng:</strong> Ưu tiên <strong>Ly Giấy Kraft</strong>. Màu nâu trầm nâng tầm thương hiệu sống xanh cho doanh nghiệp F&B.
                  </p>
                </div>
              </div>
              
              <div className="mt-12">
                <Link href="/" className="inline-flex items-center gap-3 bg-white text-[#1a1a1a] px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[#f8eb96] transition-colors">
                  Về Trang Chủ <span>→</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </>
  );
}
