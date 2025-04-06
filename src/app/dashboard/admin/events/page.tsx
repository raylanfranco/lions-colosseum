"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  photo?: string | null;
  location: string;
  price: number;
  startDate: string;
  endDate?: string | null;
  description: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/admin/events");
        const data = await res.json();

        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Invalid response:", data);
          setEvents([]);
        }
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="w-full p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold uppercase">Manage Events</h1>
        <Link
          href="/dashboard/admin/events/create"
          className="bg-amber-400 text-black px-6 py-2 rounded-md text-sm font-semibold uppercase hover:bg-white hover:text-black transition"
        >
          Create Event
        </Link>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-white/50">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-stone-800 rounded-lg overflow-hidden shadow-md border border-white/10"
            >
              {event.photo && (
                <Image
                  src={event.photo}
                  alt={event.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{event.title}</h2>
                <p className="text-sm text-white/70 mb-2">
                  {new Date(event.startDate).toLocaleDateString()} @{" "}
                  {event.location}
                </p>
                <p className="text-sm text-white/50 line-clamp-2 mb-4">
                  {event.description}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-400 font-medium">
                    ${event.price.toFixed(2)}
                  </span>
                  <Link
                    href={`/dashboard/admin/events/${event.id}`}
                    className="text-amber-300 hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
