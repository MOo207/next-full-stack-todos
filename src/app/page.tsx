"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react"; // Import from next-auth

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession(); // Get session and status

  useEffect(() => {
    const defaultLocale = "en"; // Default locale

    // Redirect based on session status
    if (status === "loading") {
      // Avoid redirecting until the session status is loaded
      return;
    }

    if (session?.user) {
      // Redirect authenticated users to todos
      router.replace(`/${defaultLocale}/todos`);
    } else {
      // Redirect unauthenticated users to login
      router.replace(`/${defaultLocale}/auth/login`);
    }
  }, [router, session, status]);

  return null; // No content rendered here
}
