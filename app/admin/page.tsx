import { 
  getTournaments, 
  getAlbums, // Updated Action
  getBlogPosts, 
  getEnquiries 
} from "@/app/actions/adminActions";
import { 
  Trophy, 
  FolderOpen, // Changed from ImageIcon to reflect Albums
  FileText, 
  MessageSquare, 
  TrendingUp,
  Image as ImageIcon
} from "lucide-react";

// FORCE UPDATE: This ensures the data is never cached
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard() {
  // Fetch data in parallel
  const [tournaments, albums, blogs, enquiries] = await Promise.all([
    getTournaments(),
    getAlbums(), // New Action fetching albums + their nested images
    getBlogPosts(),
    getEnquiries()
  ]);

  // Logic to count total individual photos across all albums
  const totalPhotos = albums.reduce((acc, album) => acc + (album.images?.length || 0), 0);

  const stats = [
    { 
      label: "Tournaments", 
      value: tournaments.length, 
      icon: Trophy, 
      color: "bg-blue-600" 
    },
    { 
      label: "Gallery Albums", // Updated Label
      value: albums.length, 
      icon: FolderOpen, 
      color: "bg-indigo-500" 
    },
    { 
      label: "Total Photos", // Added this to show the scale of the gallery
      value: totalPhotos, 
      icon: ImageIcon, 
      color: "bg-teal-500" 
    },
    { 
      label: "Blog Posts", 
      value: blogs.length, 
      icon: FileText, 
      color: "bg-amber-500" 
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
            <MessageSquare size={16} className="text-rose-500" />
            <span className="text-sm font-bold text-slate-600">{enquiries.length} New Enquiries</span>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Live Status Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-slate-200">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <h2 className="text-2xl font-bold">System Status: Live</h2>
                </div>
                <p className="text-slate-400 max-w-md text-sm leading-relaxed">
                All systems operational. Your database is synchronized with Cloudinary and Stripe. 
                Recent activity detected in <b>{albums.length > 0 ? albums[0].title : 'Gallery'}</b>.
                </p>
            </div>
            <div className="mt-8 flex gap-4">
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <p className="text-[10px] text-slate-400 uppercase font-black">Latest Enquiry</p>
                    <p className="text-sm font-bold">{enquiries[0]?.parentName || "None yet"}</p>
                </div>
            </div>
          </div>
          <TrendingUp className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-white opacity-5" />
        </div>

        {/* Quick Link / Info Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <h3 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-6 border-b pb-4">Recent Enquiries</h3>
            <div className="space-y-4">
                {enquiries.slice(0, 3).map((enq, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                            <MessageSquare size={14} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">{enq.parentName}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{enq.subject}</p>
                        </div>
                    </div>
                ))}
                {enquiries.length === 0 && <p className="text-slate-400 text-sm italic">No recent messages.</p>}
            </div>
        </div>

      </div>
    </div>
  );
}