import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        )
          return null;

        console.log("✅ Authorize Success:", {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        });

        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log("🐣 JWT Callback:", { token, user });
      if (user) {
        token.sub = user.id;
        token.fullName = (user as any).fullName;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("🧠 Session Callback:", { session, token });
      if (session.user) {
        session.user.id = token.sub!;
        session.user.fullName = token.fullName as string;
      }
      return session;
    },
  },
};
