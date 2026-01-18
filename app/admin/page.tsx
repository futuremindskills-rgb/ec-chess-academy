import { 
  getTournaments, 
  getGalleryImages, 
  getBlogPosts, 
  getEnquiries 
} from "@/app/actions/adminActions";
import { 
  Trophy, 
  Image as ImageIcon, 
  FileText, 
  MessageSquare, 
  TrendingUp 
} from "lucide-react";

// FORCE UPDATE: This ensures the data is never cached
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard() {
  // Fetch data in parallel
  const [tournaments, images, blogs, enquiries] = await Promise.all([
    getTournaments(),
    getGalleryImages(),
    getBlogPosts(),
    getEnquiries()
  ]);

  const stats = [
    { 
      label: "Tournaments", 
      value: tournaments.length, 
      icon: Trophy, 
      color: "bg-blue-600" 
    },
    { 
      label: "Gallery Images", 
      value: images.length, 
      icon: ImageIcon, 
      color: "bg-indigo-500" 
    },
    { 
      label: "Blog Posts", 
      value: blogs.length, 
      icon: FileText, 
      color: "bg-amber-500" 
    },
    { 
      label: "Enquiries", 
      value: enquiries.length, 
      icon: MessageSquare, 
      color: "bg-rose-500" 
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Dashboard Overview</h1>
      
      {/* Stats Grid - Now 4 columns on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Status Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <h2 className="text-2xl font-bold">System Status: Live</h2>
          </div>
          <p className="text-slate-400 max-w-md">
            All systems operational. Real-time data sync active for Tournaments, Blogs, Gallery, and Enquiries.
          </p>
        </div>
        <TrendingUp className="absolute right-8 bottom-[-20px] w-40 h-40 text-white opacity-5" />
      </div>
    </div>
  );
}