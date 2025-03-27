// lib/authOptions.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { AuthOptions } from "next-auth";
import prisma from "@/lib/db/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user['id'] = token.sub;
      }
      return session;
    }
  },
};
