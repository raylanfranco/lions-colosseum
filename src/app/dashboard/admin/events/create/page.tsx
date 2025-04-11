"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MediaUploadButton from "@/components/MediaUploadButton";

export default function CreateEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("0");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      if (photo) formData.append("photo", photo);

      const res = await fetch("/api/admin/events", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          location,
          price: parseFloat(price),
          date: startDate,
          endDate,
          photo: photoUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }

      router.push("/dashboard/admin/events");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 uppercase">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="input h-32 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            className="input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Price ($)</label>
          <input
            type="number"
            step="0.01"
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Start Date</label>
            <input
              type="datetime-local"
              className="input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">End Date</label>
            <input
              type="datetime-local"
              className="input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Upload Event Photo</label>
          <MediaUploadButton onUploadComplete={(url) => setPhotoUrl(url)} />
          {photoUrl && (
            <div className="mt-4">
              <Image
                src={photoUrl}
                alt="Uploaded Event Photo"
                width={400}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
          )}
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <button
          type="submit"
          className="bg-amber-400 text-black px-6 py-3 rounded-md uppercase font-semibold hover:bg-white hover:text-black transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </section>
  );
}
