"use client";

import { generateUploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();

interface Props {
  onUploadComplete: (url: string) => void;
}

export default function MediaUploadButton({ onUploadComplete }: Props) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-6">
      <UploadButton
        endpoint="imageUploader"
        appearance={{
          container: "",
          button:
            "bg-amber-400 text-black px-6 py-2 rounded-lg font-bold uppercase hover:bg-amber-300 transition shadow",
          allowedContent: "text-white/50 text-xs font-mono mt-2",
        }}
        onClientUploadComplete={(res) => {
          if (res?.[0]?.url) {
            onUploadComplete(res[0].url);
            console.log("✅ Uploaded URL:", res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          console.error("❌ Upload failed:", error.message);
          alert(`Upload failed: ${error.message}`);
        }}
      />
    </div>
  );
}
