"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

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

interface Event {
  id: string;
  title: string;
  location: string;
  startDate: string;
  photo?: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchFeed = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      console.log(`POSTS.`, data);
      setPosts(data);
    };

    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      console.log(`EVENTS.`, data);
      setEvents(data);
    };

    fetchFeed();
    fetchEvents();
  }, []);

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newPost }),
    });

    const newCreatedPost = await res.json();
    setPosts((prev) => [newCreatedPost, ...prev]);
    setNewPost("");
  };

  if (status === "loading") {
    return <div className="text-white text-center mt-32">Loading...</div>;
  }

  return (
    <section className="flex bg-stone-950 text-white min-h-screen">
      {/* Left (Feed) */}
      <div className="w-2/3 p-8 border-r border-white/10">
        <h2 className="text-2xl font-bold mb-6 uppercase">Community Feed</h2>

        {/* Post Creator */}
        <div className="mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-4 bg-stone-800 border border-white/10 rounded text-white resize-none"
          />
          <button
            onClick={handleCreatePost}
            className="mt-2 bg-amber-400 text-black px-4 py-2 rounded hover:bg-amber-300 font-bold"
          >
            Post
          </button>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-stone-800 p-4 rounded-lg border border-white/10"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Image
                  src={post.user.avatar || "/placeholder-avatar.png"}
                  alt={post.user.fullName}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{post.user.fullName}</p>
                  <p className="text-xs text-white/50">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="mb-2 text-sm text-white/90">{post.content}</p>
              {post.image && (
                <Image
                  src={post.image}
                  alt="Post image"
                  width={400}
                  height={300}
                  className="rounded-lg mt-2"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right (Events) */}
      <div className="w-1/3 p-8">
        <h2 className="text-2xl font-bold mb-6 uppercase">Upcoming Events</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-stone-800 p-4 rounded-lg border border-white/10"
            >
              {event.photo && (
                <Image
                  src={event.photo}
                  alt={event.title}
                  width={400}
                  height={200}
                  className="rounded-md mb-2"
                />
              )}
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-white/70">{event.location}</p>
              <p className="text-sm text-white/50">
                {new Date(event.startDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
