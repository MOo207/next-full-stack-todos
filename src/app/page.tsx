"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Default locale redirection
    const defaultLocale = "en";
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return null; // No content rendered here
}
