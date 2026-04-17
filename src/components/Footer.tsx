import React from "react";
import Link from "next/link";
import { footerLegalLinks } from "@/data/mockData";

export const Footer: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <footer className={`bg-[#1a1a1a] pt-24 pb-8 relative overflow-hidden ${className}`}>

      {/* Decorative huge text */}
      <h2 className="absolute -bottom-10 left-0 text-[15vw] font-display font-light italic text-white/[0.03] whitespace-nowrap leading-none select-none pointer-events-none tracking-wide">
        In Ly Giá Rẻ
      </h2>

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-24">

          {/* Footer Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center gap-3 pr-4">
              <span className="font-display font-light italic text-3xl tracking-wide text-[#f4f2eb]">
                In Ly <span className="text-[#6d8869]">HCM</span>
              </span>
            </Link>
            <p className="text-sm border-l-2 border-slate-700 pl-4 text-slate-400 font-medium leading-relaxed max-w-sm">
              Trở thành đối tác đóng gói toàn diện số 1 của ngành F&B Việt Nam. Chất lượng tối đa, vận hành tức tốc, giá xưởng gốc.
            </p>

            <div className="flex gap-3 mt-2">
              <a href="#" className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-[#f8eb96] hover:text-[#1a1a1a] hover:border-transparent transition-all" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f text-sm" />
              </a>
              <a href="#" className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-[#f8eb96] hover:text-[#1a1a1a] hover:border-transparent transition-all" aria-label="Instagram">
                <i className="fa-brands fa-instagram text-sm" />
              </a>
              <a href="#" className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-[#f8eb96] hover:text-[#1a1a1a] hover:border-transparent transition-all" aria-label="Tiktok">
                <i className="fa-brands fa-tiktok text-sm" />
              </a>
            </div>
          </div>

          {/* Links: Services */}
          <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
            <h4 className="text-xs font-bold text-[#6d8869] tracking-widest mb-6 uppercase">
              Sản phẩm
            </h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Ly PET cứng</Link></li>
              <li><Link href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Ly PP nhiệt</Link></li>
              <li><Link href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Màng & Ống hút</Link></li>
              <li><Link href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Quai xách</Link></li>
            </ul>
          </div>

          {/* Contact Component */}
          <div className="md:col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="bg-white/[0.05] backdrop-blur-sm rounded-2xl md:rounded-[2rem] p-8 flex flex-col items-start border border-white/[0.08]">
              <h4 className="font-display font-light italic text-2xl text-[#f4f2eb] mb-6 tracking-wide">
                Liên hệ ngay
              </h4>
              <div className="text-sm text-slate-400 font-medium mb-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#6d8869]"><i className="fa-solid fa-location-dot text-xs" /></div>
                TP. Hồ Chí Minh, VN
              </div>
              <div className="text-sm text-slate-400 font-medium mb-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#6d8869]"><i className="fa-solid fa-envelope text-xs" /></div>
                tuvan@inlynhua.vn
              </div>
              <a href="tel:0396505693" className="text-2xl font-display font-light italic text-[#f8eb96] mt-6 hover:text-white transition-colors tracking-wide">
                0396 505 693
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-medium tracking-widest text-slate-600">
            © {new Date().getFullYear()} In Ly Giá Rẻ
          </p>
          <div className="flex gap-6">
            {footerLegalLinks.map((text) => (
              <Link
                key={text}
                href="#"
                className="text-xs font-medium tracking-widest text-slate-600 hover:text-[#f8eb96] transition-colors"
                scroll={false}
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
