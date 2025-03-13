'use client';
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { roboto } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${roboto.className} antialiased`}
        >
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </body>
      </html>
  );
}
