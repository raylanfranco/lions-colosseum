"use client";

import Image from "next/image";
import { useState } from "react";

interface PostProps {
  post: {
    id: string;
    content: string;
    image?: string | null;
    createdAt: string;
    user: {
      fullName: string;
      avatar?: string | null;
      email: string;
    };
  };
  sessionUserEmail: string;
  sessionUserRole: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
}

export default function Post({
  post,
  sessionUserEmail,
  sessionUserRole,
  onDelete,
  onEdit,
}: PostProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  const canModify =
    post.user.email === sessionUserEmail || sessionUserRole === "ADMIN";

  const handleSave = () => {
    onEdit(post.id, editContent);
    setEditing(false);
  };

  return (
    <div className="bg-stone-800 p-5 rounded-xl border border-white/10 shadow-sm hover:shadow-lg transition duration-300 hover:scale-[1.01]">
      <div className="flex items-center space-x-4 mb-3">
        <Image
          src={post.user.avatar || "/placeholder-avatar.png"}
          alt={post.user.fullName}
          width={40}
          height={40}
          className="rounded-full border border-white/20"
        />
        <div>
          <p className="text-base font-semibold">{post.user.fullName}</p>
          <p className="text-xs text-white/50 italic">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {editing ? (
        <>
          <textarea
            className="w-full bg-stone-700 text-white p-2 rounded-md border border-stone-600 resize-none"
            rows={3}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="text-green-400 hover:underline text-sm cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setEditContent(post.content);
              }}
              className="text-gray-400 hover:underline text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p className="mb-3 text-sm text-white/90 leading-relaxed">
          {post.content}
        </p>
      )}

      {post.image && (
        <div className="w-full h-64 overflow-hidden rounded-lg cursor-pointer group">
          <Image
            src={post.image}
            alt="Post image"
            width={400}
            height={256}
            className="w-full h-full object-cover rounded-lg border border-white/10 group-hover:opacity-80 transition"
            onClick={() => setLightboxImage(post.image!)}
          />
        </div>
      )}

      {canModify && !editing && (
        <div className="flex gap-2 mt-3 justify-end">
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-amber-400 hover:underline cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm("Delete this post?")) onDelete(post.id);
            }}
            className="text-sm text-red-500 hover:underline cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Full Size"
            className="max-w-full max-h-[90vh] rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
