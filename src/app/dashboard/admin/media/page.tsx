"use client";

import MediaUploadButton from "@/components/MediaUploadButton";
import { useState } from "react";

export default function AdminMediaPage() {
  const [uploadUrl, setUploadUrl] = useState<string>();

  return (
    <section className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold uppercase">Media Manager</h1>
        <p className="text-white/50 text-sm">Upload videos or images below</p>
      </div>

      <div className="bg-stone-800 border border-white/10 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Media</h2>
        <MediaUploadButton onUploadComplete={setUploadUrl} />
      </div>

      {/* In future: Add a media gallery here with stored file URLs */}
    </section>
  );
}
