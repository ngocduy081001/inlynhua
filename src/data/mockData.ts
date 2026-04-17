/* ─── All static text, URLs, and lists extracted from Stitch design ─── */

// === IMAGES ===
export const images = {
    heroCup:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAUZZuvihD-xc8DtlByQXxfQvewBBUoHbakka4IvUih8gK6oYWyCoth-Xa6F6uAoJCyam3TM_PNfIcY9xYW1QOZrz6b1zvCrEQDKwGhRE5IYJOYrs10EAQY4i5dlG8ajvsBRcAVL_rD0bGnw9Jf5nhQQvVTOgM-KvqMElDQ2oGuyAOlTCjwjuaur2L8l8yK3X4fO8H7RiYqKskEkvAkmfsv6vpAgYx901tu6lRM32YhOk2cy6MguaU7wHP7opIuBwcxFNneAz_baONg",
    cupProduct:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDVA_VsZMydQXE8mR3U8idX9jNNBw2gS7_AtbzmOyjtvmlBI8gqqWh9DXrjVq9KFGS5dojx9_u5QJBeVekA1UfPVjeBUPavCrLVXrAFTW1vivWMIw0uKxYM9LeidjCNcGFaKhk_RMfZTech2tIqjZ56v6wed9PbYaic9AQDb1UEV0R3IXgoCpji8MZOMmrLusSstMy1n7FyV7OvsMEI6gdtU7nbSv1YE03t6RRWo3OREUo6eL4n_KxZHudG87_JDUMry8f2WGR17FF0",
    qrCode:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDEPqdcZTO7tHbFTfSHE9SsYNh2U_rU8e_7agZnF0WL8RqpxWhe_koYBgHryjvcrOPqmPyOwLgFb0DeYCGQ0FltDVWpdpdxTH7B48cu5GrKJrlDRy_63QPM3P3FK-1FDRJLx975g7i54h9ywTWDAQSkv3hO98Gso02RvwBFSmGZX_G-QmYn-pItxoGoY-XFKku9zcpFo7rkQDuBXSfJnofDkPIsau9q6Ajfg2G_OqOe6Bxu73uL34ro4Wxrvt9mLewhBlnLT8yHlRdh",
} as const;

// === PRODUCT IMAGES ===
export const productImages = {
    // Vietnamese brands
    caPheSuaDa: "/images/cup_vn_coffee_v2_1774886435214.png",
    traNgot: "/images/cup_vn_milktea_1774886352978.png",
    trucLam: "/images/cup_vn_matcha_1774886372413.png",
    nangSaigon: "/images/cup_vn_smoothie_1774886390897.png",
    daoHuong: "/images/cup_vn_peach_1774886452645.png",
    duaXanh: "/images/cup_vn_coconut_1774886470785.png",
    duongNau: "/images/cup_vn_brownsugar_1774886487415.png",
    suaChua: "/images/cup_vn_yakult_v2_1774886592840.png",
    traChanh: "/images/cup_vn_lemontea_1774886612964.png",
    hongNhung: "/images/cup_vn_lychee_1774886543550.png",
    boSaiGon: "/images/cup_vn_avocado_1774886558968.png",
    // International brands
    petKimCuong: "/images/cup_small_pet_1774886203192.png",
    ppNapTim: "/images/cup_medium_heart_1774886220226.png",
    nhua2Lop: "/images/cup_tall_double_1774886236994.png",
    nhuaNapCau: "/images/cup_large_dome_1774886255911.png",
    leafCo: "/images/cup_brand_botanical_1774885972155.png",
} as const;

// === NAV LINKS ===
export interface NavLink {
    readonly href: string;
    readonly label: string;
    readonly hasDropdown?: boolean;
}

export const navLinks: readonly NavLink[] = [
    { href: "/", label: "Trang chủ" },
    { href: "/#products", label: "Sản phẩm" },
    { href: "/#pricing", label: "Bảng giá" },
    { href: "/#features", label: "Cam kết" },
    { href: "/tin-tuc", label: "Tin tức" },
    { href: "/studio", label: "Thiết kế" },
];

// === PRODUCTS ===
export interface Product {
    readonly name: string;
    readonly specs: string;
    readonly image: string;
}

export const products: readonly Product[] = [
    {
        name: "Cà Phê Ngon",
        specs: "360ml · Logo 1 màu trắng · Nắp phẳng",
        image: productImages.caPheSuaDa,
    },
    {
        name: "Trà Ngọt",
        specs: "500ml · Logo hồng pastel · Nắp tim",
        image: productImages.traNgot,
    },
    {
        name: "Trúc Lâm Matcha",
        specs: "700ml · Hoạ tiết tre toàn thân · 2 lớp",
        image: productImages.trucLam,
    },
    {
        name: "Nắng Saigon",
        specs: "700ml · Minh hoạ trái cây · Nắp dome",
        image: productImages.nangSaigon,
    },
    {
        name: "Đào Hương",
        specs: "500ml · Logo đào coral · Nắp phẳng",
        image: productImages.daoHuong,
    },
    {
        name: "Dừa Xanh",
        specs: "700ml · Logo dừa nâu · Nắp dome",
        image: productImages.duaXanh,
    },
    {
        name: "Đường Nâu Tiger",
        specs: "500ml · Logo đen bold · Nắp seal",
        image: productImages.duongNau,
    },
    {
        name: "Sữa Chua Chanh Leo",
        specs: "500ml · Logo tím nhạt · Nắp phẳng",
        image: productImages.suaChua,
    },
    {
        name: "Trà Chanh Hà Nội",
        specs: "360ml · Logo xanh lá · Nắp phẳng",
        image: productImages.traChanh,
    },
    {
        name: "Hồng Nhung",
        specs: "700ml · Hoạ tiết hoa rose gold · Nắp dome",
        image: productImages.hongNhung,
    },
    {
        name: "Bơ Sài Gòn",
        specs: "500ml · Logo bơ xanh · Nắp dome",
        image: productImages.boSaiGon,
    },
    {
        name: "Ly PET Kim Cương",
        specs: "360ml · Logo diamond trắng · Nắp phẳng",
        image: productImages.petKimCuong,
    },
    {
        name: "Neko Cha",
        specs: "500ml · Logo mèo hồng · Nắp tim",
        image: productImages.ppNapTim,
    },
    {
        name: "Matsu まつ",
        specs: "700ml · Hoạ tiết hình học xanh · 2 lớp",
        image: productImages.nhua2Lop,
    },
    {
        name: "Fruito Smoothie",
        specs: "700ml · Minh hoạ full-wrap · Nắp dome",
        image: productImages.nhuaNapCau,
    },
    {
        name: "Leaf & Co.",
        specs: "500ml · Logo lá olive · Nắp phẳng",
        image: productImages.leafCo,
    },
];

// === FEATURES ===
export interface Feature {
    readonly faIcon: string;
    readonly title: string;
    readonly description: string;
}

export const features: readonly Feature[] = [
    {
        faIcon: "fa-solid fa-vr-cardboard",
        title: "Mô phỏng VR 360",
        description:
            "Mô phỏng VR 360 độ kết linh hoạt không cần trên nền tảng của mô phỏng VR 360 ldi vn bao.",
    },
    {
        faIcon: "fa-solid fa-gem",
        title: "Chất liệu Thượng hạng",
        description:
            "Chất liệu thượng hạng nằm top, bền, và liên thời. hgfjirn nhất lần chất lượng.",
    },
    {
        faIcon: "fa-solid fa-truck-fast",
        title: "Giao hàng Tốc độ",
        description:
            "Giao hàng tốc độ chi dòng giao hàng kim, giao hàng lôi nda cho túc sản phẩm.",
    },
];

// === STUDIO TOOLS ===
export interface StudioTool {
    readonly icon: string;
    readonly label: string;
}

export const studioTools: readonly StudioTool[] = [
    { icon: "title", label: "Thêm văn bản" },
    { icon: "upload_file", label: "Tải lên Logo" },
    { icon: "category", label: "Hình ảnh" },
    { icon: "palette", label: "Màu nền" },
    { icon: "layers", label: "Lớp phủ" },
];

// === PANTONE COLORS ===
export interface PantoneColor {
    readonly tailwindClass: string;
    readonly label: string;
}

export const pantoneColors: readonly PantoneColor[] = [
    { tailwindClass: "bg-[#1a1a1a]", label: "Đen In" },
    { tailwindClass: "bg-[#6d8869]", label: "Xanh Sage" },
    { tailwindClass: "bg-[#f8eb96]", label: "Vàng Nắng" },
    { tailwindClass: "bg-white border border-slate-200", label: "Trắng" },
    { tailwindClass: "bg-[#f4f2eb]", label: "Kem" },
];

// === QUANTITY OPTIONS ===
export interface QuantityOption {
    readonly value: string;
    readonly label: string;
}

export const quantityOptions: readonly QuantityOption[] = [
    { value: "500", label: "500 cái" },
    { value: "1000", label: "1.000 cái" },
    { value: "5000", label: "5.000 cái" },
    { value: "10000", label: "10.000 cái" },
];

// === PRODUCT SPECS (Studio right panel) ===
export const productSpecs = {
    size: "700ml (Standard)",
    material: "Nhựa PET Cao cấp",
    defaultQuantity: "1000",
    price: "4.250.000",
    currency: "₫",
    shippingLabel: "Miễn phí ship",
    vrRenderVersion: "VR_RENDER_V1.04",
} as const;

// === FOOTER LINKS ===
export const footerProductLinks = [
    "Ly PET Kim Cương",
    "Ly PP nắp tim",
    "Ly Nhựa 2 Lớp",
    "Ly Nhựa Nắp Cầu",
] as const;

export const footerCompanyLinks = [
    "Về chúng tôi",
    "Liên hệ",
    "Blog",
    "Tuyển dụng",
] as const;

export const footerLegalLinks = [
    "Chính sách bảo mật",
    "Điều khoản dịch vụ",
    "Biểu khoản dịch vụ",
] as const;

// === HERO TEXT ===
export const heroText = {
    title1: "Định Hình Thương Hiệu",
    title2: "Trong Không Gian 3D",
    subtitle:
        "Thúc đẩy khi thiết kế bao bì kiểu mới, nâng cao phong cách thương hiệu In Ấn Không Gian 3D.",
    ctaPrimary: "Bắt đầu thiết kế",
    ctaSecondary: "Kích hoạt chế độ VR",
    priceFrom: "500.000 đ",
    vrBadge: "Xem thực tế ảo",
} as const;

// === STUDIO TEXT ===
export const studioText = {
    pageTitle: "Công cụ Thiết kế 3D & Thực tế ảo (VR)",
    toolsSectionTitle: "Công cụ thiết kế",
    lightingLabel: "Cấu hình ánh sáng",
    vrButtonLabel: "Xem trong không gian VR",
    vrLabLabel: "Phòng Lab VR",
    saveLabel: "Lưu dự án",
    specsTitle: "Thông số kỹ thuật",
    vrPreviewTitle: "Bản xem trước thực tế ảo",
    pantoneTitle: "Màu sắc in ấn (Pantone)",
    subtotalLabel: "Tạm tính",
    addToCartLabel: "THÊM VÀO GIỎ HÀNG",
    qrHint: "Quét bằng điện thoại để trải nghiệm VR thực tế",
    editZone: "Edit Zone",
} as const;
