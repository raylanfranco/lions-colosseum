"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import EventCard from "@/components/EventCard";
import PostCreationComponent from "@/components/PostCreation";
import Post from "@/components/Posts";

interface Post {
  id: string;
  content: string;
  image?: string | null;
  createdAt: string;
  user: {
    fullName: string;
    avatar?: string | null;
    email: string;
  };
}

interface Event {
  id: string;
  title: string;
  location: string;
  startDate: string;
  photo?: string;
  price: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const success = searchParams.get("success");
  const purchasedEventId = searchParams.get("event");

  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [purchasedEvents, setPurchasedEvents] = useState<string[]>([]);

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const canEditOrDelete = (post: Post) =>
    post.user.email === session?.user?.email ||
    session?.user?.role.toLowerCase() === "admin";

  const handleDelete = async (postId: string) => {
    const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
  };

  const handleEdit = async (postId: string, newContent: string) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newContent }),
    });
    if (res.ok) {
      const updated = await res.json();
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, content: updated.content } : p
        )
      );
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Retrieve localStorage only when authenticated
  useEffect(() => {
    if (status === "authenticated") {
      const stored = JSON.parse(
        localStorage.getItem("purchasedEvents") || "[]"
      );
      setPurchasedEvents(stored);
    }
  }, [status]);

  // Add event to localStorage if purchased
  useEffect(() => {
    if (status === "authenticated" && success && purchasedEventId) {
      const existing = JSON.parse(
        localStorage.getItem("purchasedEvents") || "[]"
      );
      if (!existing.includes(purchasedEventId)) {
        existing.push(purchasedEventId);
        localStorage.setItem("purchasedEvents", JSON.stringify(existing));
        setPurchasedEvents(existing);
      }
    }
  }, [status, success, purchasedEventId]);

  // Fetch posts + events
  useEffect(() => {
    const fetchFeed = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };

    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    };

    fetchFeed();
    fetchEvents();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Handle new post created from the PostCreationComponent
  const handlePostCreated = (newPost: any) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  if (status === "loading") {
    return <div className="text-white text-center mt-32">Loading...</div>;
  }

  return (
    <section className="flex bg-stone-950 text-white min-h-screen">
      {/* Left (Feed) */}
      <div className="w-2/3 p-8 border-r border-white/10">
        <h2 className="text-2xl font-bold mb-6 uppercase">Community Feed</h2>

        {/* Post Creator - Integrated here */}
        <PostCreationComponent
          session={session}
          onPostCreated={handlePostCreated}
        />

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              sessionUserEmail={session?.user?.email || ""}
              sessionUserRole={session?.user?.role || "USER"}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>

      {/* Right (Events) */}
      <div className="w-1/3 p-8">
        <h2 className="text-2xl font-bold mb-6 uppercase">Upcoming Events</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              purchasedEvents={purchasedEvents}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
