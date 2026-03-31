/* ─── Mock data for Blog & Category pages ─── */

// === CATEGORIES ===
export interface Category {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly icon: string; // Font Awesome class
  readonly postCount: number;
  readonly color: string; // tailwind gradient
}

export const categories: readonly Category[] = [
  {
    id: "1",
    name: "Xu hướng In ấn",
    slug: "xu-huong-in-an",
    description:
      "Cập nhật các xu hướng mới nhất trong ngành in ấn bao bì, từ chất liệu đến công nghệ.",
    icon: "fa-solid fa-chart-line",
    postCount: 12,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "2",
    name: "Thiết kế 3D",
    slug: "thiet-ke-3d",
    description:
      "Hướng dẫn và chia sẻ kinh nghiệm thiết kế 3D cho sản phẩm in ấn.",
    icon: "fa-solid fa-cube",
    postCount: 8,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "3",
    name: "Công nghệ VR",
    slug: "cong-nghe-vr",
    description:
      "Ứng dụng thực tế ảo trong ngành in ấn và trải nghiệm sản phẩm.",
    icon: "fa-solid fa-vr-cardboard",
    postCount: 6,
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: "4",
    name: "Thương hiệu",
    slug: "thuong-hieu",
    description:
      "Xây dựng và phát triển thương hiệu thông qua bao bì sản phẩm.",
    icon: "fa-solid fa-star",
    postCount: 15,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "5",
    name: "Bền vững",
    slug: "ben-vung",
    description:
      "Giải pháp in ấn thân thiện với môi trường và phát triển bền vững.",
    icon: "fa-solid fa-leaf",
    postCount: 9,
    color: "from-green-500 to-teal-600",
  },
  {
    id: "6",
    name: "Case Study",
    slug: "case-study",
    description:
      "Phân tích các dự án thực tế và bài học kinh nghiệm từ ngành in ấn.",
    icon: "fa-solid fa-briefcase",
    postCount: 7,
    color: "from-rose-500 to-pink-600",
  },
];

// === BLOG POSTS ===
export interface BlogPost {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly content?: string;
  readonly thumbnail: string;
  readonly category: Category;
  readonly author: Author;
  readonly publishedAt: string;
  readonly readTime: number; // minutes
  readonly tags: readonly string[];
  readonly isFeatured?: boolean;
}

export interface Author {
  readonly name: string;
  readonly avatar: string;
  readonly role: string;
}

const authors: Record<string, Author> = {
  minh: {
    name: "Trần Minh",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=TM&backgroundColor=6d8869",
    role: "Giám đốc Sáng tạo",
  },
  linh: {
    name: "Nguyễn Linh",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=NL&backgroundColor=8b7355",
    role: "Chuyên gia VR",
  },
  huy: {
    name: "Phạm Huy",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=PH&backgroundColor=1a1a1a",
    role: "Kỹ sư In ấn",
  },
};

export const blogPosts: readonly BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Xu hướng Bao bì In ấn năm 2026",
    slug: "top-10-xu-huong-bao-bi-in-an-2026",
    excerpt:
      "Khám phá những xu hướng bao bì nổi bật nhất trong năm 2026, từ thiết kế tối giản đến công nghệ in ấn thông minh tích hợp QR code và AR.",
    thumbnail: "/images/blog/packaging-trends.png",
    category: categories[0],
    author: authors.minh,
    publishedAt: "2026-03-25",
    readTime: 8,
    tags: ["xu hướng", "bao bì", "2026"],
    isFeatured: true,
  },
  {
    id: "2",
    title: "Hướng dẫn Thiết kế 3D cho Ly Nhựa Cao cấp",
    slug: "huong-dan-thiet-ke-3d-ly-nhua-cao-cap",
    excerpt:
      "Bước đầu tiên để tạo ra thiết kế 3D chuyên nghiệp cho sản phẩm ly nhựa, từ mô hình hóa đến render thực tế.",
    thumbnail: "/images/blog/3d-design.png",
    category: categories[1],
    author: authors.linh,
    publishedAt: "2026-03-22",
    readTime: 12,
    tags: ["3D", "thiết kế", "ly nhựa"],
    isFeatured: true,
  },
  {
    id: "3",
    title: "Trải nghiệm VR: Tương lai của Ngành In ấn",
    slug: "trai-nghiem-vr-tuong-lai-nganh-in-an",
    excerpt:
      "Công nghệ VR đang thay đổi cách khách hàng tương tác với sản phẩm in ấn. Tìm hiểu cách ứng dụng VR để nâng cao trải nghiệm khách hàng.",
    thumbnail: "/images/blog/vr-printing.png",
    category: categories[2],
    author: authors.linh,
    publishedAt: "2026-03-20",
    readTime: 6,
    tags: ["VR", "thực tế ảo", "công nghệ"],
  },
  {
    id: "4",
    title: "Xây dựng Thương hiệu qua Bao bì: Chiến lược hiệu quả",
    slug: "xay-dung-thuong-hieu-qua-bao-bi",
    excerpt:
      "Bao bì không chỉ là vỏ bọc sản phẩm mà còn là công cụ Marketing mạnh mẽ. Hãy tìm hiểu cách tối ưu hóa thiết kế bao bì cho thương hiệu.",
    thumbnail: "/images/blog/branding.png",
    category: categories[3],
    author: authors.minh,
    publishedAt: "2026-03-18",
    readTime: 10,
    tags: ["thương hiệu", "marketing", "bao bì"],
  },
  {
    id: "5",
    title: "Giải pháp In ấn Xanh: Bền vững cho Tương lai",
    slug: "giai-phap-in-an-xanh-ben-vung",
    excerpt:
      "Khám phá các vật liệu thân thiện với môi trường và quy trình in ấn bền vững, giảm thiểu tác động đến hành tinh.",
    thumbnail: "/images/blog/eco-packaging.png",
    category: categories[4],
    author: authors.huy,
    publishedAt: "2026-03-15",
    readTime: 7,
    tags: ["bền vững", "môi trường", "xanh"],
  },
  {
    id: "6",
    title: "Case Study: Thiết kế Ly cho Chuỗi Trà sữa Hàng đầu",
    slug: "case-study-thiet-ke-ly-chuoi-tra-sua",
    excerpt:
      "Phân tích chi tiết dự án thiết kế và sản xuất ly nhựa tùy chỉnh cho một trong những chuỗi trà sữa lớn nhất Việt Nam.",
    thumbnail: "/images/blog/case-study.png",
    category: categories[5],
    author: authors.minh,
    publishedAt: "2026-03-12",
    readTime: 15,
    tags: ["case study", "trà sữa", "thiết kế"],
  },
  {
    id: "7",
    title: "Công nghệ In UV trên Nhựa: Tất cả Những gì Bạn cần Biết",
    slug: "cong-nghe-in-uv-tren-nhua",
    excerpt:
      "In UV là công nghệ in ấn tiên tiến cho phép tạo ra hình ảnh sắc nét trên bề mặt nhựa. Tìm hiểu ưu nhược điểm và ứng dụng thực tế.",
    thumbnail: "/images/blog/uv-printing.png",
    category: categories[0],
    author: authors.huy,
    publishedAt: "2026-03-10",
    readTime: 9,
    tags: ["UV", "công nghệ", "in ấn"],
  },
  {
    id: "8",
    title: "Render 3D Photorealistic: Từ Thiết kế đến Thực tế",
    slug: "render-3d-photorealistic-tu-thiet-ke-den-thuc-te",
    excerpt:
      "Kỹ thuật render 3D giúp khách hàng nhìn thấy sản phẩm hoàn chỉnh trước khi sản xuất. Hướng dẫn chi tiết từ A-Z.",
    thumbnail: "/images/blog/3d-render.png",
    category: categories[1],
    author: authors.linh,
    publishedAt: "2026-03-08",
    readTime: 11,
    tags: ["render", "3D", "photorealistic"],
  },
  {
    id: "9",
    title: "5 Sai lầm Thường gặp khi Thiết kế Bao bì",
    slug: "5-sai-lam-thuong-gap-khi-thiet-ke-bao-bi",
    excerpt:
      "Tránh các sai lầm phổ biến trong quá trình thiết kế bao bì để đảm bảo sản phẩm nhận diện thương hiệu mạnh mẽ và chuyên nghiệp.",
    thumbnail: "/images/blog/design-mistakes.png",
    category: categories[3],
    author: authors.minh,
    publishedAt: "2026-03-05",
    readTime: 6,
    tags: ["sai lầm", "thiết kế", "bao bì"],
  },
];

// === HELPER ===
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function getPostsByCategory(slug: string): BlogPost[] {
  return blogPosts.filter((p) => p.category.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.isFeatured);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
