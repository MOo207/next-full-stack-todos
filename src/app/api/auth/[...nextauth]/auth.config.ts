import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/src/app/lib/prisma";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Return null to trigger a generic error
        }

        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // Return null for invalid credentials
        if (!user) {
          return null;
        }

        // Check password
        const isPasswordValid = credentials.password === user.password;
        if (!isPasswordValid) {
          return null;
        }

        // Return user if credentials are valid
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Custom login page
    error: "/auth/error", // Custom error page
  },
  callbacks: {
    // Customize the session object
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string; // Add user ID to the session
      }
      if (token?.name) {
        session.user.name = token.name as string; // Add user name to the session
      }
      return session;
    },

    // Pass the user ID and name to the token object
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id; // Store the user ID in the JWT
      }
      if (user?.name) {
        token.name = user.name; // Store the user name in the JWT
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
