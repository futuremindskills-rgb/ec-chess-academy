"use client";

import { useState } from "react";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { Upload, FileText, RefreshCw, CheckCircle2, ExternalLink, Loader2 } from "lucide-react";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

interface PdfUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function PdfUpload({ value, onChange }: PdfUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]?.url) {
        onChange(res[0].url);
      }
      setIsUploading(false);
    },
    onUploadError: (err) => {
      setError(`Upload failed: ${err.message}`);
      setIsUploading(false);
    },
    onUploadBegin: () => {
      setIsUploading(true);
      setError("");
    },
  });

  const handleFileChange = async (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file only.");
      return;
    }
    await startUpload([file]);
  };

  const getFileName = (url: string) => {
    try {
      const parts = url.split("/");
      return decodeURIComponent(parts[parts.length - 1]).split("?")[0];
    } catch {
      return "regulations.pdf";
    }
  };

  return (
    <div className="space-y-3">
      {/* Upload Zone */}
      <label
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFileChange(file);
        }}
        className={`group relative cursor-pointer overflow-hidden border-2 border-dashed transition-all flex flex-col justify-center items-center h-40 rounded-2xl
          ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30 bg-slate-50"}`}
      >
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileChange(file);
            // Reset input so same file can be re-selected
            e.target.value = "";
          }}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-3 text-indigo-600">
            <Loader2 size={32} className="animate-spin" />
            <span className="font-black text-[10px] uppercase tracking-widest">Uploading PDF...</span>
          </div>
        ) : value ? (
          <>
            <div className="flex flex-col items-center gap-3 text-indigo-600">
              <div className="p-4 bg-indigo-100 rounded-2xl border-2 border-indigo-200">
                <FileText size={32} className="text-indigo-600" />
              </div>
              <div className="text-center px-4">
                <p className="font-black text-[10px] uppercase tracking-widest text-slate-600 truncate max-w-[220px]">
                  {getFileName(value)}
                </p>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">
                  Click or drop to replace PDF
                </p>
              </div>
            </div>
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 backdrop-blur-[2px]">
              <RefreshCw size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest">Replace PDF</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-indigo-500">
            <div className="p-3 bg-white rounded-full shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <Upload size={20} />
            </div>
            <span className="font-bold text-[10px] uppercase tracking-tighter">Upload PDF Regulations</span>
            <span className="font-bold text-[9px] text-slate-300 uppercase">PDF files only · Max 16MB</span>
          </div>
        )}
      </label>

      {/* Error */}
      {error && (
        <p className="text-[9px] font-black uppercase text-red-500 tracking-widest">{error}</p>
      )}

      {/* Success state */}
      {value && !isUploading && (
        <div className="flex items-center justify-between gap-2 bg-indigo-50 px-4 py-2.5 rounded-xl border border-indigo-100">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600">
            <CheckCircle2 size={12} /> PDF Uploaded
          </div>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[9px] font-black uppercase text-indigo-500 hover:text-indigo-700 transition-colors"
          >
            <ExternalLink size={10} /> View
          </a>
        </div>
      )}
    </div>
  );
}
