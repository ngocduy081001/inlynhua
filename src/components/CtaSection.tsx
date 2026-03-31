import React from "react";
import Link from "next/link";

/* stitch-component: CtaSection */
interface CtaSectionProps {
    readonly className?: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ className = "" }) => {
    return (
        <section className={`relative py-24 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 to-cyan-500 p-12 md:p-20">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-400/20 to-transparent" />
                    <div className="absolute -bottom-20 -right-20 size-60 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -top-10 -left-10 size-40 rounded-full bg-cyan-300/20 blur-3xl" />

                    <div className="relative text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Sẵn sàng nâng tầm thương hiệu?
                        </h2>
                        <p className="text-cyan-100 text-lg mb-8">
                            Bắt đầu thiết kế ngay hôm nay và trải nghiệm công nghệ in ấn 3D
                            tiên tiến nhất
                        </p>
                        <Link
                            href="/studio"
                            className="inline-flex items-center gap-2 bg-white hover:bg-cyan-50 text-cyan-700 px-10 py-4 rounded-xl text-sm font-bold transition-all shadow-xl active:scale-95"
                        >
                            <span className="material-symbols-outlined text-xl">
                                rocket_launch
                            </span>
                            Bắt đầu miễn phí
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
