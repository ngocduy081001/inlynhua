import React from "react";

const features = [
  {
    icon: "fa-print",
    title: "Màu in đỉnh cao",
    desc: "Chồng màu chuẩn xác nhờ công nghệ in Flexo, bám sát bản thiết kế gốc trên ly thực tế.",
  },
  {
    icon: "fa-shield-check",
    title: "Kiểm soát 100%",
    desc: "Bộ tiêu chuẩn QC khép kín tại nhà máy, lọc bỏ phế phẩm trước khi giao tận tay khách hàng.",
  },
  {
    icon: "fa-leaf",
    title: "Vật liệu sạch",
    desc: "100% hạt nhựa tinh khiết. Áp dụng các phương thức có thể tái chế bảo vệ sức khỏe.",
  },
  {
    icon: "fa-truck-fast",
    title: "Giao vận nhanh",
    desc: "Giao vận nội thành siêu tốc, hỗ trợ gửi kèm chành xe chuyên nghiệp về các tỉnh.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-[#f4f2eb] relative">

      {/* Subtle divider */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-20">
        <div className="w-full h-px bg-slate-300" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20 mb-20">
          <div className="lg:max-w-lg">
            <p className="text-sm text-[#6d8869] font-bold tracking-widest uppercase mb-4">
              Cam kết
            </p>
            <h2 className="font-display font-light italic text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] tracking-wide leading-[1.2]">
              Vì sao chọn<br />
              chúng tôi
            </h2>
          </div>
          
          <div className="lg:max-w-sm lg:pb-2">
            <p className="text-sm border-l-2 border-slate-300 pl-4 py-1 text-slate-500 font-medium leading-relaxed">
              Bảo chứng niềm tin cho chủ doanh nghiệp kinh doanh thức uống. Việc của bạn là nấu đồ ăn ngon, bao bì để chúng tôi lo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl md:rounded-[2rem] group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
               <div className="w-14 h-14 rounded-full bg-[#f4f2eb] text-[#6d8869] flex items-center justify-center mb-10 text-xl group-hover:bg-[#1a1a1a] group-hover:text-[#f8eb96] transition-colors duration-300">
                 <i className={`fa-solid ${item.icon}`} />
               </div>
               <h3 className="font-display text-xl font-black text-[#1a1a1a] mb-3 tracking-tight leading-tight">
                 {item.title}
               </h3>
               <p className="text-slate-500 text-sm font-medium leading-relaxed">
                 {item.desc}
               </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
