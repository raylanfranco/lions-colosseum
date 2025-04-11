"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (session) {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <section className="flex justify-center items-center bg-stone-950 pt-16 text-white">
      <div className="w-full text-center lg:text-left px-[120px] justify-items-center">
        {/* Section Title */}
        <div className="flex items-center justify-center lg:justify-start mb-3">
          <div className="bg-amber-400 h-0.5 w-7" />
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest ml-3">
            Welcome Back
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[3.63rem] text-center leading-[3.88rem] italic font-bold uppercase mb-7">
          Log in to <br></br>your account
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-lg mx-auto lg:mx-0 w-full"
        >
          <InputField
            type="email"
            placeholder="Email"
            className="md:col-span-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="col-span-1 md:col-span-2 border-2 border-white text-white text-sm font-medium uppercase tracking-widest py-4 px-8 transition hover:bg-white hover:text-black cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Alternative Sign-In
        <div className="mt-6 text-center">
          <p className="text-sm text-white/70 mb-3">Or sign in with</p>
          <button
            onClick={() => signIn("google")}
            className="w-[511px] py-4 bg-amber-700 text-white uppercase font-bold tracking-widest hover:bg-amber-800 transition cursor-pointer"
          >
            Sign in with Google
          </button>
        </div> */}

        {/* Sign-up Redirect */}
        <p className="mt-6 text-center text-white/70 text-sm">
          Don't have an account?{" "}
          <a href="/join" className="text-amber-400 hover:underline">
            Sign up here
          </a>
        </p>
      </div>

      {/* Background Image */}
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
