"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex h-16 w-full items-center justify-between border-b-1 border-b-white/15 text-white/65 z-1 fixed overflow-hidden transition ${
        isScrolled ? "bg-stone-950 shadow-lg" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center py-1 px-6 border-r border-white/15 hover:bg-[var(--dark-hover)] transition"
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          width={96}
          height={64}
          className="h-16"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <NavLink href="/" label="Home" hasBorder />
        <NavLink href="/about" label="About" hasBorder />
        <NavLink href="/media" label="Media" hasBorder />
        <NavLink href="/shop" label="Shop" hasBorder />
        {!session && (
          <>
            <Link
              href="/join"
              className="bg-[var(--accent)] text-[var(--background)] px-8 py-6 m-0 uppercase text-sm font-medium tracking-widest hover:bg-white hover:text-[var(--background)] transition"
            >
              Become a Member
            </Link>
            <NavLink href="/login" label="Log In" loginButton />
          </>
        )}

        {/* Show only if logged in */}
        {session && (
          <>
            <Link
              href="/dashboard"
              className="bg-[var(--accent)] text-[var(--background)] px-8 py-6 m-0 uppercase text-sm font-medium tracking-widest hover:bg-white hover:text-[var(--background)] transition"
            >
              View Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center cursor-pointer h-16 px-8 m-0 uppercase text-sm font-medium tracking-widest transition hover:bg-[var(--dark-hover)] hover:text-white bg-stone-900"
            >
              Log Out
            </button>
          </>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden block text-white p-3 border-l-1 border-l-white/15 hover:bg-stone-700 transition"
      >
        <Image
          src="/hamburger-menu.svg"
          alt="Hamburger Menu"
          width={50}
          height={50}
          className="invert cursor-pointer"
        />
      </button>

      {/* Mobile Slide-In Menu */}
      {isOpen && <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
    </header>
  );
}

// 🔥 Mobile Slide-In Menu Component
function MobileMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const { data: session } = useSession();

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 right-0 h-screen w-64 bg-stone-900 text-white shadow-lg flex flex-col items-center pt-20 space-y-6"
    >
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-5 right-5 text-white cursor-pointer"
      >
        ✕
      </button>

      <Link
        href="/"
        onClick={() => setIsOpen(false)}
        className="mobile-nav-link"
      >
        Home
      </Link>
      <Link
        href="/about"
        onClick={() => setIsOpen(false)}
        className="mobile-nav-link"
      >
        About
      </Link>
      <Link
        href="/media"
        onClick={() => setIsOpen(false)}
        className="mobile-nav-link"
      >
        Media
      </Link>
      <Link
        href="/shop"
        onClick={() => setIsOpen(false)}
        className="mobile-nav-link"
      >
        Shop
      </Link>
      {!session ? (
        <>
          <Link
            href="/join"
            onClick={() => setIsOpen(false)}
            className="bg-[var(--accent)] text-[var(--background)] px-6 py-3 m-0 uppercase text-sm font-medium tracking-widest hover:bg-white hover:text-[var(--background)] transition"
          >
            Become a Member
          </Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="bg-[var(--accent)] text-[var(--background)] px-6 py-3 uppercase text-sm font-medium tracking-widest hover:bg-white hover:text-[var(--background)] transition"
          >
            Log In
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/dashboard"
            className="bg-[var(--accent)] text-[var(--background)] px-8 py-6 m-0 uppercase text-sm font-medium tracking-widest hover:bg-white hover:text-[var(--background)] transition"
          >
            View Dashboard
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center cursor-pointer h-16 px-8 m-0 uppercase text-sm font-medium tracking-widest transition hover:bg-[var(--dark-hover)] hover:text-white bg-stone-900"
          >
            Log Out
          </button>
        </>
      )}
    </motion.div>
  );
}

// 🔥 Reusable Navigation Link Component
function NavLink({
  href,
  label,
  hasBorder = false,
  loginButton,
}: {
  href: string;
  label: string;
  hasBorder?: boolean;
  loginButton?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center h-16 px-8 m-0 uppercase text-sm font-medium tracking-widest transition hover:bg-[var(--dark-hover)] hover:text-white 
      ${hasBorder ? "border-l border-white/15" : ""} ${
        loginButton ? "bg-stone-900" : ""
      } `}
    >
      {label}
    </Link>
  );
}
