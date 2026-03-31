import React from "react";

const processes = [
  {
    number: "01",
    title: "Tư vấn & Khảo sát",
    desc: "Khảo sát loại hình đồ uống. Gợi ý dáng ly và kiểu nắp phù hợp nhất.",
  },
  {
    number: "02",
    title: "Thiết kế & Duyệt mẫu",
    desc: "Dựng bản vẽ kỹ thuật. Render mockup để bạn duyệt trước khi in.",
  },
  {
    number: "03",
    title: "Sản xuất & Kiểm định",
    desc: "In siêu nét trên dây chuyền tự động. QC nghiêm ngặt từng lô.",
  },
  {
    number: "04",
    title: "Đóng gói & Giao hàng",
    desc: "Giao tốc hành trong 24h nội thành. Chành xe chuyên nghiệp các tỉnh.",
  },
];

export const ProcessSection = () => {
  return (
    <section id="process" className="py-20 bg-[#f4f2eb] relative overflow-hidden">

      {/* Subtle divider line */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-20">
        <div className="w-full h-px bg-slate-300" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20 mb-20">
          <div className="lg:max-w-lg">
            <p className="text-sm text-[#6d8869] font-bold tracking-widest uppercase mb-4">
              Quy trình
            </p>
            <h2 className="font-display font-light italic text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] tracking-wide leading-[1.2]">
              Từ file thiết kế<br />
              đến tận tay
            </h2>
          </div>
          
          <div className="lg:max-w-sm lg:pb-2">
            <p className="text-sm border-l-2 border-slate-300 pl-4 py-1 text-slate-500 font-medium leading-relaxed">
              Không phải chờ đợi. Mọi khâu được tự động hoá để rút ngắn thời gian giao hàng xuống mức tối thiểu.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {processes.map((step, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col p-8 rounded-2xl md:rounded-[2rem] transition-all duration-300 hover:-translate-y-2 ${
                idx === 3 
                  ? "bg-[#1a1a1a] text-white" 
                  : idx === 0 
                    ? "bg-[#f8eb96] text-[#1a1a1a]" 
                    : "bg-white text-[#1a1a1a]"
              }`}
            >
              <span className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-10 ${
                idx === 3 
                  ? "border border-white/30 text-white/60" 
                  : "border border-slate-300 text-slate-400"
              }`}>
                {step.number}
              </span>
              <h3 className="font-display text-xl font-black mb-3 leading-tight tracking-tight">
                {step.title}
              </h3>
              <p className={`text-sm font-medium leading-relaxed ${
                idx === 3 ? "text-slate-400" : "text-slate-500"
              }`}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
