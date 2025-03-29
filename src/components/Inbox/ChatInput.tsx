"use client";

import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 border-t border-white/10 p-4"
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 bg-white/5 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
      />

      <button
        type="submit"
        className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-5 py-2 rounded-full transition"
        disabled={disabled || !message.trim()}
      >
        Send
      </button>
    </form>
  );
}
