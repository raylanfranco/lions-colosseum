"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Join() {
  const { data: session } = useSession();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  if (session) {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password, phoneNumber }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    const signInRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInRes?.ok) {
      router.push("/dashboard");
    } else {
      setError("Sign-in failed after registration.");
    }
  };

  return (
    <section className="flex h-screen justify-center items-center bg-stone-950 pt-16 text-white">
      <div className=" w-full text-center lg:text-left px-[120px]">
        {/* Section Title */}
        <div className="flex items-center justify-center lg:justify-start mb-3">
          <div className="bg-amber-400 h-0.5 w-7" />
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest ml-3">
            Membership
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[3.63rem] leading-[3.88rem] italic font-bold uppercase mb-7">
          Join the Colosseum Today!
        </h1>

        {/* Description */}
        <p className="text-lg mb-9 max-w-lg mx-auto lg:mx-0">
          Experience elite training, expert coaching, and an unmatched
          atmosphere. Sign up today and take the first step toward a stronger,
          better you.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-lg mx-auto lg:mx-0"
        >
          <InputField
            type="text"
            placeholder="Full Name"
            className="md:col-span-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <InputField
            type="email"
            placeholder="Email"
            className="md:col-span-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="tel"
            placeholder="Phone Number"
            className="md:col-span-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            className="md:col-span-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 border-2 border-white text-white cursor-pointer text-sm font-medium uppercase tracking-widest py-4 px-8 transition hover:bg-white hover:text-black"
          >
            Submit
          </button>
        </form>
      </div>
      <Image
        src="/join.jpeg"
        alt="Welcome to the Colosseum"
        width={1162}
        height={853}
        className="h-full w-full object-cover"
        priority
      />
    </section>
  );
}

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
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`bg-transparent border-2 border-white/[0.15] text-white py-4 px-5 w-full focus:outline-none focus:ring-2 focus:ring-amber-400 ${className}`}
      value={value}
      onChange={onChange}
    />
  );
}
