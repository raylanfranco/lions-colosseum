"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ChatInput from "./ChatInput";
import { getSocket } from "@/lib/socket";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  sender: {
    fullName: string;
    avatar?: string | null;
  };
}

interface ChatViewProps {
  initialMessages: Message[];
  currentUserId: string;
  selectedUserId: string;
}

export default function ChatView({
  initialMessages,
  currentUserId,
  selectedUserId,
}: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    const socket = getSocket();

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const handleSendMessage = async (content: string) => {
    const newMsg = {
      senderId: currentUserId,
      receiverId: selectedUserId,
      content,
    };

    const res = await fetch("/api/message/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMsg),
    });

    const savedMsg = await res.json();

    const socket = getSocket();
    socket.emit("send-message", savedMsg);

    setMessages((prev) => [...prev, savedMsg]);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isCurrentUser = msg.senderId === currentUserId;

          return (
            <div
              key={msg.id}
              className={`flex ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isCurrentUser && (
                <Image
                  src={msg.sender.avatar || "/placeholder-avatar.png"}
                  alt="Sender Avatar"
                  width={36}
                  height={36}
                  className="rounded-full mr-2 self-end"
                />
              )}

              <div
                className={`rounded-lg px-4 py-2 max-w-xs text-sm shadow-md ${
                  isCurrentUser
                    ? "bg-amber-400 text-black rounded-br-none"
                    : "bg-stone-800 text-white rounded-bl-none"
                }`}
              >
                <p>{msg.content}</p>
                <span className="text-xs text-white/50 block mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}
