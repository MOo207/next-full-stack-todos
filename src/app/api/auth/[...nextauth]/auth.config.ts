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
          where: { email: credentials.email },
        });

        // Return null for invalid credentials
        if (!user) {
          return null;
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          return null;
        }

        // Return user if credentials are valid
        return { id: user.id, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Custom login page
    error: "/auth/error", // Custom error page
  },
  callbacks: {
    // Customize the session object
    async session({ session, user, token }) {
      if (token?.id) {
        session.user.id = token.id; // Add user ID to the session
      }
      return session;
    },

    // Pass the user ID to the token object
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id; // Store the user ID in the JWT
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
