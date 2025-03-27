"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setMessage("");
      } else {
        setMessage("Password reset email sent!");
        setError("");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <section className="flex justify-center items-center bg-stone-950 pt-16 text-white">
      <div className="w-full text-center lg:text-left px-[120px] justify-items-center">
        {/* Section Title */}
        <div className="flex items-center justify-center lg:justify-start mb-3">
          <div className="bg-amber-400 h-0.5 w-7" />
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest ml-3">
            Reset Password
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[3.63rem] text-center leading-[3.88rem] italic font-bold uppercase mb-7">
          Forgot your password?
        </h1>

        {/* Message or Error */}
        {message && (
          <p className="text-green-500 text-center mb-4 text-sm">{message}</p>
        )}
        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        {/* Reset Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-5 max-w-lg mx-auto lg:mx-0 w-full"
        >
          <InputField
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="border-2 border-white text-white text-sm font-medium uppercase tracking-widest py-4 px-8 transition hover:bg-white hover:text-black cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <p className="mt-6 text-center text-white/70 text-sm">
          Remembered your password?{" "}
          <a href="/login" className="text-amber-400 hover:underline">
            Log in here
          </a>
        </p>
      </div>

      {/* Background Image */}
      <Image
        src="/join.jpeg"
        alt="Colosseum"
        width={1162}
        height={853}
        className="h-full w-full object-cover"
        priority
      />
    </section>
  );
}

// 🔥 Reusable InputField Component
function InputField({
  type,
  placeholder,
  className = "",
  value,
  onChange,
}: {
  type: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-transparent border-2 border-white/[0.15] text-white py-4 px-5 w-full focus:outline-none focus:ring-2 focus:ring-amber-400 ${className}`}
    />
  );
}
