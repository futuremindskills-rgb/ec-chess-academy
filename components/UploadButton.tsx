"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

type FileUploadProps = {
  onUploadComplete: (url: string) => void;
  endpoint: "imageUploader" | "pdfUploader";
};

export function FileUpload({ onUploadComplete, endpoint }: FileUploadProps) {
  return (
    <UploadButton<OurFileRouter, typeof endpoint>
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res?.[0]?.url) {
          onUploadComplete(res[0].url);
        }
      }}
      onUploadError={(error) => {
        alert(error.message);
      }}
    />
  );
}
