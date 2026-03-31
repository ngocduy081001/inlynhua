import React from "react";

const pricingPlans = [
  {
    name: "Khởi Nghiệp",
    volume: "1.000 Ly",
    price: "1,200đ",
    unit: "/ly",
    features: [
      "In 1 màu đơn sắc chuẩn",
      "Ly dung tích tiêu chuẩn",
      "Free thiết kế 2D",
      "Giao hàng 3-5 ngày",
    ],
    highlight: false,
    dark: false,
    accent: false,
  },
  {
    name: "Vận Hành",
    volume: "5.000 Ly",
    price: "850đ",
    unit: "/ly",
    features: [
      "In 2-4 màu (Pha CMYK)",
      "Đa dạng dung tích",
      "Mẫu mô phỏng 3D",
      "Giao siêu tốc 2-3 ngày",
      "Freeship nội thành",
    ],
    highlight: true,
    dark: true,
    accent: false,
    badge: "Đề xuất",
  },
  {
    name: "Đại Lý / Chuỗi",
    volume: "10.000+",
    price: "Liên hệ",
    unit: "",
    features: [
      "Độ phân giải siêu cao",
      "In nắp dập riêng",
      "Chăm sóc riêng 24/7",
      "Chiết khấu luỹ tiến",
      "Lưu kho bãi linh hoạt",
    ],
    highlight: false,
    dark: false,
    accent: true,
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-[#f4f2eb] relative overflow-hidden">

      {/* Subtle divider */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-20">
        <div className="w-full h-px bg-slate-300" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20 mb-20">
          <div className="lg:max-w-lg">
            <p className="text-sm text-[#6d8869] font-bold tracking-widest uppercase mb-4">
              Bảng giá
            </p>
            <h2 className="font-display font-light italic text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] tracking-wide leading-[1.2]">
              Rõ ràng<br />
              không phí ẩn
            </h2>
          </div>
          
          <div className="lg:max-w-sm lg:pb-2">
            <p className="text-sm border-l-2 border-slate-300 pl-4 py-1 text-slate-500 font-medium leading-relaxed">
              Chi tiết đến từng đồng. Linh hoạt cho giai đoạn test thị trường đến mở rộng chuỗi quy mô toàn quốc.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl md:rounded-[2rem] p-8 lg:p-10 flex flex-col transition-all duration-300 ${
                plan.dark 
                  ? "bg-[#1a1a1a] text-white scale-100 lg:scale-[1.03] z-10 shadow-2xl" 
                  : plan.accent 
                    ? "bg-[#f8eb96] text-[#1a1a1a] hover:-translate-y-2"
                    : "bg-white text-[#1a1a1a] hover:-translate-y-2 shadow-sm"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 right-8 bg-[#6d8869] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {plan.badge}
                </div>
              )}

              <div className="mb-8 border-b border-current/10 pb-8">
                <h3 className={`text-xs font-bold tracking-widest uppercase mb-5 ${
                  plan.dark ? "text-slate-500" : "text-slate-400"
                }`}>
                  {plan.name}
                </h3>
                <div className="font-display font-black text-5xl lg:text-6xl tracking-tighter mb-2 flex items-baseline gap-1">
                  {plan.price}
                  {plan.unit && (
                    <span className="text-xl font-bold tracking-normal opacity-40">
                      {plan.unit}
                    </span>
                  )}
                </div>
                <div className={`text-xs font-bold uppercase tracking-widest mt-4 ${
                  plan.dark ? "text-[#f8eb96]" : "text-[#6d8869]"
                }`}>
                  Lô từ: {plan.volume}
                </div>
              </div>

              <ul className="flex-grow space-y-4 mb-10">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className={`mt-0.5 text-xs ${plan.dark ? "text-[#f8eb96]" : "text-[#6d8869]"}`}>
                      ✓
                    </span>
                    <span className={`text-sm font-medium leading-relaxed ${
                      plan.dark ? "text-slate-300" : "text-slate-600"
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all active:scale-95 ${
                  plan.dark 
                    ? "bg-[#f8eb96] text-[#1a1a1a] hover:bg-white" 
                    : plan.accent 
                      ? "bg-[#1a1a1a] text-[#f4f2eb] hover:bg-[#6d8869]"
                      : "bg-[#f4f2eb] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f4f2eb]"
                }`}
              >
                Chọn gói này
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
