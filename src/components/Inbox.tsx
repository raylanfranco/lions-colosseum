"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import ConversationList from "./ConversationList";
import ChatView from "./Inbox/ChatView";
import MessageInput from "./Inbox/MessageInput";

import Image from "next/image";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  sender: {
    id: string;
    fullName: string;
    avatar?: string | null;
  };
  receiver: {
    id: string;
    fullName: string;
    avatar?: string | null;
  };
}

export default function InboxPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  const currentUserId = session?.user?.id;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (!currentUserId) return;

    const fetchMessages = async () => {
      const res = await fetch("/api/message/inbox");
      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();
  }, [currentUserId]);

  if (!session || !currentUserId) return null;

  // Group messages by conversation partner
  const conversations = messages.reduce(
    (acc: Record<string, Message[]>, msg) => {
      const partner =
        msg.senderId === currentUserId ? msg.receiver : msg.sender;
      if (!acc[partner.id]) acc[partner.id] = [];
      acc[partner.id].push(msg);
      return acc;
    },
    {}
  );

  return (
    <div className="flex w-full h-[calc(100vh-64px)] bg-stone-900">
      {/* Left Sidebar */}
      <aside className="w-64 bg-stone-950 border-r border-white/10 p-4 overflow-y-auto">
        <h2 className="text-white text-lg mb-4 font-semibold uppercase">
          Inbox
        </h2>
        {Object.entries(conversations).map(([partnerId, convMessages]) => {
          const partner =
            convMessages[0].senderId === currentUserId
              ? convMessages[0].receiver
              : convMessages[0].sender;

          return (
            <button
              key={partnerId}
              className={`w-full flex items-center space-x-3 p-3 rounded-md transition ${
                activeUserId === partnerId
                  ? "bg-stone-800"
                  : "hover:bg-stone-800"
              }`}
              onClick={() => setActiveUserId(partnerId)}
            >
              <Image
                src={partner.avatar || "/placeholder-avatar.png"}
                alt={partner.fullName}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-white text-sm font-medium truncate">
                {partner.fullName}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Chat View */}
      <div className="flex-1 flex flex-col">
        {activeUserId && conversations[activeUserId] ? (
          <>
            <ChatView
              initialMessages={conversations[activeUserId] || []}
              currentUserId={currentUserId}
              selectedUserId={activeUserId}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/50">
            <p className="text-lg">Select a conversation to begin chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
