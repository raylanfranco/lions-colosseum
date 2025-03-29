"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { roboto } from "@/app/ui/fonts";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <SessionProvider>
          {!isDashboard && <Navbar />}
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
