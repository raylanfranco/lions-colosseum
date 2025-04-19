// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      fullName: string;
      role: "USER" | "ADMIN";
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    fullName: string;
    role: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    fullName?: string;
    role?: string;
  }
}
