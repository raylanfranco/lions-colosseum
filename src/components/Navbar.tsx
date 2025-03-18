"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex h-16 w-full items-center justify-between bg-stone-950 border-b-2 border-b-white/15 text-white/65">
      {/* Logo */}
      <Link href="/" className="flex items-center py-2 px-6 border-r border-white/15 hover:bg-[var(--dark-hover)] transition">
        <Image src="/logo.svg" alt="Logo" width={96} height={64} className="h-16" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <NavLink href="/" label="Home" hasBorder/>
        <NavLink href="/about" label="About" hasBorder/>
        <NavLink href="/media" label="Media" hasBorder/>
        <NavLink href="/shop" label="Shop" hasBorder />
        <Link href="/join" className="bg-[var(--accent)] text-[var(--background)] px-8 py-6 uppercase text-sm font-medium tracking-widest hover:bg-white hover:text-[var(--background)] transition">
          Become a Member
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(true)} className="md:hidden block text-white p-3">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16M4 12h16m-16 6h16" />
        </svg>
      </button>

      {/* Mobile Slide-In Menu */}
      {isOpen && <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
    </header>
  );
}

// 🔥 Mobile Slide-In Menu Component
function MobileMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 right-0 h-screen w-64 bg-stone-900 text-white shadow-lg flex flex-col items-center pt-20 space-y-6"
    >
      {/* Close Button */}
      <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-white">
        ✕
      </button>

      <Link href="/" onClick={() => setIsOpen(false)} className="mobile-nav-link">Home</Link>
      <Link href="/about" onClick={() => setIsOpen(false)} className="mobile-nav-link">About</Link>
      <Link href="/media" onClick={() => setIsOpen(false)} className="mobile-nav-link">Media</Link>
      <Link href="/shop" onClick={() => setIsOpen(false)} className="mobile-nav-link">Shop</Link>
      <Link href="/join" onClick={() => setIsOpen(false)} className="bg-[var(--accent)] text-[var(--background)] px-6 py-3 uppercase text-sm font-medium tracking-widest hover:bg-white hover:text-[var(--background)] transition">
        Become a Member
      </Link>
    </motion.div>
  );
}

// 🔥 Reusable Navigation Link Component
function NavLink({ href, label, hasBorder = false }: { href: string; label: string; hasBorder?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center h-16 px-8 m-0 uppercase text-sm font-medium tracking-widest transition hover:bg-[var(--dark-hover)] hover:text-white 
      ${hasBorder ? "border-l border-white/15" : ""}`}
    >
      {label}
    </Link>
  );
}
