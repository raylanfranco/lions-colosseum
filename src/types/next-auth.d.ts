// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      fullName: string;
      role: "USER" | "ADMIN";
    };
  }

  interface User {
    id: string;
    email: string;
    fullName: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    fullName?: string;
    role?: string;
  }
}
