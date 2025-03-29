"use client";

import { useState } from "react";

interface MessageInputProps {
  onSend: (content: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [content, setContent] = useState("");

  const handleSend = () => {
    if (!content.trim()) return;
    onSend(content.trim());
    setContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 border-t border-white/10 p-4 bg-stone-950">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-1 p-3 rounded bg-stone-800 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <button
        onClick={handleSend}
        className="bg-amber-400 text-black px-4 py-2 rounded hover:bg-white transition font-semibold"
      >
        Send
      </button>
    </div>
  );
}
