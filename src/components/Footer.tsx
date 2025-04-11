// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-white/10 px-8 py-10 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.svg"
            alt="Lion's Colosseum Logo"
            width={48}
            height={48}
          />
          <span className="text-xl font-bold uppercase tracking-widest">
            Lion's Colosseum
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-6 text-sm uppercase font-medium tracking-wider">
          <Link href="/dashboard">Profile</Link>
          <Link href="/dashboard/inbox">Inbox</Link>
          <Link href="/dashboard/settings">Settings</Link>
          <Link href="/dashboard/admin/events">Events</Link>
          <Link href="/dashboard/admin/media">Media</Link>
        </nav>

        {/* Social */}
        <div className="flex space-x-4 text-white/70 hover:text-white">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition"
          >
            <FaYoutube size={20} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition"
          >
            <FaFacebookF size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
