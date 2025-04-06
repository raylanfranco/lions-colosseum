"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Profile" },
  { href: "/dashboard/inbox", label: "Inbox" },
  { href: "/dashboard/settings", label: "Settings" },
];

const adminLinks = [
  { href: "/dashboard/admin/users", label: "User Management" },
  { href: "/dashboard/admin/events", label: "Event Management" },
  { href: "/dashboard/admin/media", label: "Media Manager" },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  console.log("Session role:", session?.user.role);

  return (
    <aside className="w-64 bg-stone-900 h-screen fixed left-0 top-0 flex flex-col border-r border-white/10 z-50">
      <div className="flex items-center justify-center h-20 border-b border-white/10">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={96} height={64} />
        </Link>
      </div>

      <div className="flex-1 flex flex-col">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-6 py-4 text-white text-sm uppercase font-medium tracking-widest transition hover:bg-stone-800",
              pathname === link.href && "bg-stone-800"
            )}
          >
            {link.label}
          </Link>
        ))}

        {/* Admin-only links */}
        {session?.user.role.toLowerCase() === "admin" &&
          adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-6 py-4 text-white text-sm uppercase font-medium tracking-widest transition hover:bg-stone-800",
                pathname === link.href && "bg-stone-800"
              )}
            >
              {link.label}
            </Link>
          ))}
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="px-6 py-4 text-sm font-medium uppercase tracking-widest text-red-400 hover:text-white hover:bg-stone-800 transition"
      >
        Log Out
      </button>
    </aside>
  );
}
