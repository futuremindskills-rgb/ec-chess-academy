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
  Tag
} from "lucide-react";
import { Metadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

// --- Dynamic SEO Optimization ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const posts = await getBlogPosts();
  const post = posts.find((p: any) => p.slug === params.slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | EC Chess Academy`,
    description: post.excerpt || `Learn more about ${post.title}.`,
    openGraph: {
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const posts = await getBlogPosts();
  const post = posts.find((p: any) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Calculate some related posts (optional logic)
  const relatedPosts = posts
    .filter((p: any) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <main className="bg-white min-h-screen font-sans pb-20">
      
      {/* --- ARTICLE HEADER / HERO --- */}
      <section className="relative pt-32 pb-16 bg-slate-900 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-slate-400 text-sm mb-8">
            <Link href="/blog" className="hover:text-teal-400 transition-colors">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-teal-400 truncate max-w-[200px] md:max-w-none">{post.title}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
               <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-widest">
                 {post.category || "General"}
               </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-[1.1]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-400 font-medium">
               <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
                    <User size={18} />
                  </div>
                  <span>Cornelius Chew</span>
               </div>
               <div className="flex items-center gap-2">
  <Calendar size={18} className="text-teal-500" />
  <time dateTime={new Date(post.date).toISOString()}>
    {new Date(post.date).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    })}
  </time>
</div>

               <div className="flex items-center gap-2">
                  <Clock size={18} className="text-teal-500" />
                  <span>{post.readTime}</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED IMAGE --- */}
      <div className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="max-w-5xl mx-auto">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[300px] md:h-[500px] object-cover rounded-[2rem] shadow-2xl border-4 border-white"
          />
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="container mx-auto px-6 pt-16 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Left: Navigation/Share */}
        <aside className="hidden lg:block w-16">
          <div className="sticky top-32 flex flex-col gap-6">
            <Link href="/blog">
              <button title="Back to Blog" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:border-teal-600 transition-all">
                <ArrowLeft size={20} />
              </button>
            </Link>
            <button title="Share Article" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </aside>

        {/* Main Article Content */}
        <article className="flex-1 max-w-3xl mx-auto">
          <div className="prose prose-lg prose-slate max-w-none 
            prose-headings:text-slate-900 prose-headings:font-black
            prose-p:text-slate-600 prose-p:leading-relaxed
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-blockquote:border-l-teal-500 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
            prose-img:rounded-2xl prose-img:shadow-lg
            prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline
          ">
            {/* If content is string/html. If it's structured, map it here */}
            {post.content}
          </div>

          {/* Post Footer Tags */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex items-center gap-4">
            <Tag size={20} className="text-slate-400" />
            <div className="flex gap-2">
               <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-sm font-medium">#{post.category}</span>
               <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-sm font-medium">#Learning</span>
            </div>
          </div>
        </article>

        {/* Sidebar Right: Author & Related */}
        <aside className="w-full lg:w-80 space-y-12">
           <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-teal-600" />
                About Author
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Cornelius Chew is the head coach at EC Chess Academy, specializing in differentiated learning and Howard Gardner's theory of Multiple Intelligences.
              </p>
              <Link href="/contact" className="text-teal-600 font-bold text-sm hover:underline">
                Book a Trial Class →
              </Link>
           </div>

           {relatedPosts.length > 0 && (
             <div className="space-y-6">
                <h4 className="font-bold text-slate-900 px-2">Related Articles</h4>
                {relatedPosts.map((rp: any) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                    <div className="flex gap-4 items-center">
                       <img src={rp.image} className="w-20 h-20 rounded-xl object-cover shrink-0" alt="" />
                       <div>
                          <h5 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug">
                            {rp.title}
                          </h5>
                          <p className="text-xs text-slate-500 mt-1">{rp.readTime}</p>
                       </div>
                    </div>
                  </Link>
                ))}
             </div>
           )}
        </aside>
      </div>
      
      {/* --- FOOTER CTA --- */}
      <section className="container mx-auto px-6 mt-24">
        <div className="bg-indigo-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-[80px]"></div>
          <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10">Confused by this topic?</h2>
          <p className="text-indigo-200 mb-8 max-w-xl mx-auto relative z-10">
            Let's break it down together. Join our personalized coaching sessions where we make and Science actually make sense.
          </p>
          <Link href="/contact" className="relative z-10">
            <button className="bg-white text-indigo-900 px-8 py-4 rounded-xl font-bold hover:bg-teal-400 hover:text-white transition-all">
              Inquire Now
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}