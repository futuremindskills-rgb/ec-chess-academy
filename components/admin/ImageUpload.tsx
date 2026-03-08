"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Upload, Image as IconImage, RefreshCw, CheckCircle2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  return (
    <div className="space-y-3">
      <CldUploadWidget
        uploadPreset="physics" 
        onSuccess={(result: any) => onChange(result.info.secure_url)}
        options={{ maxFiles: 1 }} // Ensures one file per slot
      >
        {({ open }) => (
          <div 
            onClick={() => open()}
            className="group relative cursor-pointer overflow-hidden border-2 border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex flex-col justify-center items-center h-40 rounded-2xl bg-slate-50"
          >
            {value ? (
              <>
                <img src={value} alt="Upload" className="w-full h-full object-cover rounded-xl" />
                {/* Hover Overlay to Change Image */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 backdrop-blur-[2px]">
                   <RefreshCw size={24} className="animate-spin-slow" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Change Photo</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-indigo-500">
                <div className="p-3 bg-white rounded-full shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    <Upload size={20} />
                </div>
                <span className="font-bold text-[10px] uppercase tracking-tighter">Upload Image</span>
              </div>
            )}
          </div>
        )}
      </CldUploadWidget>
      
      {value && (
        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg w-fit border border-teal-100 animate-in fade-in slide-in-from-left-2">
          <CheckCircle2 size={12} /> Uploaded
        </div>
      )}
    </div>
  );
}