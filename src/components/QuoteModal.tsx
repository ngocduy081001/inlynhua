"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

const QUANTITY_OPTIONS = [
  "1.000 – 2.000 ly",
  "3.000 – 5.000 ly",
  "6.000 – 8.000 ly",
  "10.000 ly trở lên",
  "Chưa xác định",
];

type FormStatus = "idle" | "loading" | "success" | "error";

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 300);
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName("");
        setPhone("");
        setEmail("");
        setBusiness("");
        setQuantity("");
        setMessage("");
        setStatus("idle");
        setErrorMsg("");
      }, 400);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg("Vui lòng điền họ tên và số điện thoại.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          business: business.trim(),
          plan: selectedPlan,
          quantity,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gửi thất bại");
      }

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[201] w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#f4f2eb] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#1a1a1a] rounded-t-3xl sm:rounded-t-3xl px-8 pt-8 pb-7">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Đóng"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#6d8869] mb-2">
                In Ly Giá Rẻ
              </p>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                {selectedPlan ? `Gói ${selectedPlan}` : "Nhận Báo Giá"}
              </h2>
              {selectedPlan && (
                <span className="inline-block mt-3 bg-[#f8eb96] text-[#1a1a1a] text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                  Đã chọn gói này
                </span>
              )}
            </div>

            <div className="px-8 py-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#6d8869] flex items-center justify-center mx-auto mb-6">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M8 18L15 25L28 11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-display font-black text-[#1a1a1a] mb-3 tracking-tight">
                      Gửi thành công!
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                      Chúng tôi đã nhận thông tin của bạn và sẽ liên hệ lại trong vòng <strong>2 giờ</strong> làm việc.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-10 py-3.5 rounded-full bg-[#1a1a1a] text-[#f4f2eb] text-sm font-bold tracking-widest uppercase hover:bg-[#6d8869] transition-colors"
                    >
                      Đóng
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold tracking-[2px] uppercase text-slate-500 mb-2">
                          Họ & Tên <span className="text-red-400">*</span>
                        </label>
                        <input
                          ref={firstInputRef}
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nguyễn Văn A"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#1a1a1a] placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6d8869]/40 focus:border-[#6d8869] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-[2px] uppercase text-slate-500 mb-2">
                          Điện Thoại <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0912 345 678"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#1a1a1a] placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6d8869]/40 focus:border-[#6d8869] transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-bold tracking-[2px] uppercase text-slate-500 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#1a1a1a] placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6d8869]/40 focus:border-[#6d8869] transition-all"
                      />
                    </div>

                    {/* Business */}
                    <div>
                      <label className="block text-[10px] font-bold tracking-[2px] uppercase text-slate-500 mb-2">
                        Tên Quán / Thương Hiệu
                      </label>
                      <input
                        type="text"
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        placeholder="Trà sữa Milk House, Coffee ABC..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#1a1a1a] placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6d8869]/40 focus:border-[#6d8869] transition-all"
                      />
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-[10px] font-bold tracking-[2px] uppercase text-slate-500 mb-2">
                        Số Lượng Dự Kiến
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {QUANTITY_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setQuantity(opt === quantity ? "" : opt)}
                            className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all border ${
                              quantity === opt
                                ? "bg-[#1a1a1a] text-[#f8eb96] border-[#1a1a1a]"
                                : "bg-white text-slate-500 border-slate-200 hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] font-bold tracking-[2px] uppercase text-slate-500 mb-2">
                        Ghi Chú Thêm
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Yêu cầu đặc biệt về màu sắc, thiết kế, timeline giao hàng..."
                        rows={3}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#1a1a1a] placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6d8869]/40 focus:border-[#6d8869] transition-all resize-none"
                      />
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {errorMsg && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-500 text-sm font-medium bg-red-50 px-4 py-3 rounded-xl border border-red-100"
                        >
                          {errorMsg}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={`w-full py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
                        status === "loading"
                          ? "bg-slate-300 text-slate-400 cursor-not-allowed"
                          : "bg-[#1a1a1a] text-[#f4f2eb] hover:bg-[#6d8869] shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {status === "loading" ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          Gửi Yêu Cầu Báo Giá
                          <span>→</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-400 pb-2">
                      Chúng tôi sẽ liên hệ lại trong <strong className="text-slate-600">2 giờ làm việc</strong>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
