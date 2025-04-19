"use client";

import { useState } from "react";
import Image from "next/image";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface Post {
  id: string;
  content: string;
  image?: string | null;
  createdAt: string;
  user: {
    fullName: string;
    avatar?: string | null;
  };
}

interface PostCreationProps {
  session: any; // Could be refined with Session from "next-auth"
  onPostCreated?: (post: Post) => void;
}

// UploadThing helpers
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export default function PostCreationComponent({
  session,
  onPostCreated,
}: PostCreationProps) {
  const [newPost, setNewPost] = useState("");
  const [imageFile, setImageFile] = useState<{
    name: string;
    previewUrl: string;
    uploadedUrl: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadRes = await startUpload([file]);

    if (!uploadRes || uploadRes.length === 0) return;

    const uploadedUrl = uploadRes[0].url;

    setImageFile({
      name: file.name,
      previewUrl: URL.createObjectURL(file),
      uploadedUrl,
    });
  };

  const handleCreatePost = async () => {
    if (!newPost.trim() && !imageFile?.uploadedUrl) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newPost,
          image: imageFile?.uploadedUrl || null,
        }),
      });

      const newCreatedPost: Post = await res.json();

      if (onPostCreated) {
        onPostCreated(newCreatedPost);
      }

      setNewPost("");
      setImageFile(null);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-900 p-4 rounded-lg border border-stone-700 mb-6">
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder={`What's on your mind, ${
          session?.user?.name?.split(" ")[0] || "friend"
        }?`}
        className="w-full bg-stone-800 text-gray-200 p-3 rounded-md border border-stone-700 resize-none focus:outline-none focus:border-stone-600 mb-4"
        rows={3}
      />

      {imageFile && (
        <div className="mb-4">
          <div className="relative">
            <img
              src={imageFile.previewUrl}
              alt="Preview"
              className="w-full max-h-64 object-cover rounded-md"
            />
            <button
              onClick={() => setImageFile(null)}
              className="absolute top-2 right-2 bg-stone-800 text-white p-1 rounded-full opacity-80 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 px-3 py-2 bg-stone-800 text-gray-300 hover:text-white rounded-md cursor-pointer hover:bg-stone-700 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Photo/Video</span>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {imageFile && (
            <div className="text-sm text-amber-400 bg-stone-800 px-3 py-1 rounded-md flex items-center">
              <span className="truncate max-w-xs">
                {imageFile.name.length > 20
                  ? imageFile.name.substring(0, 17) + "..."
                  : imageFile.name}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleCreatePost}
          disabled={
            (!newPost.trim() && !imageFile) || isSubmitting || isUploading
          }
          className="bg-amber-500 cursor-pointer text-black px-4 py-2 rounded font-medium hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          {isSubmitting || isUploading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
