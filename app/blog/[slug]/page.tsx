import { getBlogPosts } from "@/app/actions/adminActions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  ChevronRight, 
  BookOpen,
  User,
  Tag,
  MessageCircle
} from "lucide-react";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import ShareButton from "@/components/shareButton";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const posts = await getBlogPosts();
  const decodedSlug = decodeURIComponent(params.slug);
  const post = posts.find((p: any) => p.slug === decodedSlug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | EC Chess Academy`,
    description: post.excerpt || `Learn more about ${post.title}.`,
    openGraph: { images: [post.image] },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const locale = await getLocale();
  const isZh = locale === "zh";
  const posts = await getBlogPosts();
  const decodedSlug = decodeURIComponent(params.slug);
  const post = posts.find((p: any) => p.slug === decodedSlug);

  if (!post) notFound();

  const relatedPosts = posts
    .filter((p: any) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <main className="bg-white min-h-screen pb-20 selection:bg-teal-100">
      {/* --- READING PROGRESS BAR (Optional CSS) --- */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-slate-100">
        <div className="h-full bg-teal-500 w-0 transition-all duration-150" id="progress-bar"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 bg-[#0f172a] overflow-hidden">
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#2dd4bf 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-slate-400 text-sm mb-10 animate-fade-in">
            <Link href="/blog" className="hover:text-teal-400 transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> {isZh ? "網誌" : "Blog"}
            </Link>
            <ChevronRight size={14} />
            <span className="text-teal-400 font-medium truncate max-w-[200px] md:max-w-none">{post.title}</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest mb-6">
               {post.category || (isZh ? "棋藝教育" : "Chess Education")}
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-[1.2] lg:leading-[1.1]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-slate-300">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-teal-500/30 p-0.5">
                    <img src="/api/placeholder/100/100" className="w-full h-full rounded-full object-cover" alt={isZh ? "作者" : "Author"} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Herman Wong</p>
                    <p className="text-xs text-slate-400">{isZh ? "總教練" : "Head Coach"}</p>
                  </div>
               </div>
               
               <div className="h-8 w-px bg-slate-700 hidden sm:block"></div>

               <div className="flex flex-col gap-1">
                 <span className="text-xs uppercase text-slate-500 font-bold tracking-wider">{isZh ? "發佈時間" : "Published"}</span>
                 <div className="flex items-center gap-2 text-sm font-medium">
                    <Calendar size={16} className="text-teal-500" />
                    {new Date(post.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
                 </div>
               </div>

               <div className="flex flex-col gap-1">
                 <span className="text-xs uppercase text-slate-500 font-bold tracking-wider">{isZh ? "閱讀時長" : "Read Time"}</span>
                 <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock size={16} className="text-teal-500" />
                    <span>{post.readTime}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Article Column */}
          <div className="flex-1">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[300px] md:h-[550px] object-cover"
              />
              
              <div className="px-6 md:px-16 py-12 md:py-20">
                <article className="prose prose-lg prose-slate max-w-none 
                  prose-headings:text-slate-900 prose-headings:font-bold
                  prose-p:text-slate-600 prose-p:leading-loose prose-p:mb-8
                  prose-strong:text-slate-900
                  prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50/50 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                  prose-img:rounded-3xl prose-img:shadow-2xl
                  prose-li:text-slate-600
                ">
                  {/* IMPORTANT: If post.content is a string with newlines but no HTML tags, 
                      use a helper to preserve the structure */}
                  <div className="whitespace-pre-line">
                    {post.content}
                  </div>
                </article>

                <div className="mt-16 pt-10 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <Tag size={18} className="text-teal-600" />
                    {['Chess', post.category, 'Education'].map(tag => (
                      <span key={tag} className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full hover:bg-teal-500 hover:text-white transition-colors cursor-default">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                   <ShareButton
  title={post.title}
/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[380px] space-y-10">
            {/* Author Card */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl group-hover:bg-teal-500/30 transition-all duration-700"></div>
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
                <BookOpen size={20} className="text-teal-400" /> {isZh ? "關於作者" : "About Author"}
              </h4>
              <p className="text-slate-300 leading-relaxed mb-8 relative z-10 text-sm">
                {isZh
                  ? "Herman Wong 為 EC Chess Academy 總教練，專注於差異化教學與多元智能理論實踐。"
                  : "Herman Wong is the head coach at EC Chess Academy, specializing in differentiated learning and Howard Gardner's theory of Multiple Intelligences."}
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-teal-600 transition-all relative z-10">
                {isZh ? "預約體驗課" : "Book a Trial Class"} <ChevronRight size={16} />
              </Link>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-8">{isZh ? "相關文章" : "Related Reads"}</h4>
              <div className="space-y-8">
                {relatedPosts.map((rp: any) => (
                  <Link key={rp.slug} href={`/blog/${encodeURIComponent(rp.slug)}`} className="group flex gap-4">
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-2xl">
                      <img src={rp.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h5 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 text-sm leading-snug">
                        {rp.title}
                      </h5>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">{rp.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Sidebar Card */}
            <div className="bg-teal-50 rounded-[2rem] p-8 border border-teal-100">
               <MessageCircle className="text-teal-600 mb-4" size={32} />
               <h4 className="text-lg font-extrabold text-slate-900 mb-2">{isZh ? "有疑問？" : "Have questions?"}</h4>
               <p className="text-slate-600 text-sm mb-6 leading-relaxed">{isZh ? "我們的導師團隊隨時準備幫助你的孩子精進棋藝。" : "Our experts are ready to help your child master the game of kings."}</p>
               <Link href="/contact" className="block text-center bg-white border-2 border-teal-600 text-teal-600 py-3 rounded-xl font-bold hover:bg-teal-600 hover:text-white transition-all">
                 {isZh ? "聯絡我們" : "Message Us"}
               </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}