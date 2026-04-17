import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PostCard } from "@/components/blog/PostCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import {
  categories,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/data/blogData";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate all category pages at build time
export function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

// Dynamic metadata per category
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const category = getCategoryBySlug(slug);
    if (!category) {
      return { title: "Không tìm thấy | In Ly Nhựa Giá Rẻ" };
    }
    return {
      title: `${category.name} | Blog | In Ly Nhựa Giá Rẻ`,
      description: category.description,
    };
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f4f2eb]">
        {/* Category Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-36 md:pb-20 px-6 md:px-12 bg-[#f4f2eb]">
          <div className="relative max-w-[1400px] mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
              <Link href="/" className="hover:text-[#6d8869] transition-colors">
                Trang chủ
              </Link>
              <span className="text-slate-300">/</span>
              <Link href="/tin-tuc" className="hover:text-[#6d8869] transition-colors">
                Blog
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-[#6d8869] font-medium">{category.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20 mb-12">
              <div className="lg:max-w-xl">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 text-[#6d8869] shadow-sm">
                  <i className={`${category.icon} text-2xl`} />
                </div>
                <h1 className="font-display font-light italic text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] tracking-wide leading-[1.2] mb-4">
                  {category.name}
                </h1>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-xs text-[#6d8869] font-bold tracking-widest uppercase">
                    {category.postCount} bài viết
                  </span>
                </div>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-3 border-t border-slate-300 pt-8">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/tin-tuc/chuyen-muc/${cat.slug}`}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${cat.slug === slug
                      ? "bg-[#1a1a1a] text-[#f8eb96]"
                      : "bg-white text-slate-500 hover:bg-[#1a1a1a] hover:text-[#f8eb96] shadow-sm"
                    }`}
                >
                  <i className={`${cat.icon} text-[11px]`} />
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="w-full h-px bg-slate-300" />
        </div>

        {/* Posts + Sidebar */}
        <section className="px-6 md:px-12 py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Posts */}
              <div className="lg:col-span-2">
                {posts.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-sm text-slate-500 font-medium">
                        Hiển thị{" "}
                        <span className="text-[#1a1a1a] font-bold">
                          {posts.length}
                        </span>{" "}
                        bài viết
                      </span>
                      <div className="flex items-center gap-2">
                        <button className="px-4 py-2 text-xs font-bold text-[#f8eb96] bg-[#1a1a1a] rounded-full tracking-wider uppercase">
                          Mới nhất
                        </button>
                        <button className="px-4 py-2 text-xs font-bold text-slate-400 bg-white hover:bg-[#1a1a1a] hover:text-[#f8eb96] rounded-full transition-all shadow-sm tracking-wider uppercase">
                          Phổ biến
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl md:rounded-[2rem] shadow-sm">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#f4f2eb] flex items-center justify-center mb-4">
                      <i className="fa-solid fa-inbox text-2xl text-slate-400" />
                    </div>
                    <h3 className="text-lg font-display font-black text-[#1a1a1a] mb-2">
                      Chưa có bài viết
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">
                      Chuyên mục này hiện chưa có bài viết nào. Hãy quay lại sau!
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {posts.length > 0 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button className="w-10 h-10 rounded-full bg-[#1a1a1a] text-[#f8eb96] font-bold text-sm flex items-center justify-center">
                      1
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-slate-500 hover:bg-[#1a1a1a] hover:text-[#f8eb96] font-medium text-sm flex items-center justify-center transition-all shadow-sm">
                      2
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-slate-500 hover:bg-[#1a1a1a] hover:text-[#f8eb96] flex items-center justify-center transition-all shadow-sm">
                      <i className="fa-solid fa-arrow-right text-xs" />
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
