import { format } from "date-fns";
import Image from "next/image";

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isSender: boolean;
  isLatest: boolean;
  avatarUrl?: string;
  read?: boolean;
}

export default function MessageBubble({
  content,
  timestamp,
  isSender,
  isLatest,
  avatarUrl,
  read,
}: MessageBubbleProps) {
  return (
    <div
      className={`flex items-end gap-2 ${
        isSender ? "justify-end" : "justify-start"
      } mb-3`}
    >
      {/* Avatar (receiver only) */}
      {!isSender && avatarUrl && (
        <Image
          src={avatarUrl}
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md text-sm relative ${
          isSender
            ? "bg-amber-500 text-black rounded-br-none"
            : "bg-white/10 text-white rounded-bl-none"
        }`}
      >
        <p>{content}</p>

        <div className="flex justify-end items-center gap-1 mt-1 text-xs text-white/60">
          <span>{format(new Date(timestamp), "hh:mm a")}</span>

          {/* Read Receipt (only show on last sent message) */}
          {isSender && isLatest && (
            <span className="text-xs ml-1">{read ? "✓✓" : "✓"}</span>
          )}
        </div>
      </div>
    </div>
  );
}
