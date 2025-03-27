"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-white text-center mt-32">Loading...</div>;
  }

  return (
    <section className="flex justify-center items-center bg-stone-950 pt-16 text-white min-h-screen">
      <div className="w-full text-center lg:text-left px-[120px]">
        {/* Section Title */}
        <div className="flex items-center justify-center lg:justify-start mb-3">
          <div className="bg-amber-400 h-0.5 w-7" />
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest ml-3">
            Welcome Back
          </span>
        </div>

        {/* Greeting */}
        <h1 className="text-[3.63rem] leading-[3.88rem] italic font-bold uppercase mb-7">
          Hello, {session?.user?.name || "Warrior"}!
        </h1>

        <p className="text-lg mb-9 max-w-lg">
          Here's your dashboard. More features coming soon.
        </p>

        {/* Profile Section (Future Expansion) */}
        <div className="flex items-center space-x-6">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={80}
              height={80}
              className="rounded-full border-2 border-white"
            />
          )}
          <div>
            <p className="text-xl font-semibold">{session?.user?.email}</p>
            <p className="text-sm text-white/60">Active Member</p>
          </div>
        </div>
      </div>
    </section>
  );
}
