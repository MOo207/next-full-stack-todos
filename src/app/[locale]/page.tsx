"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import LoadingPage from "../components/pages/LoadingPage";

export default function LocaleHomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const validLocales = ["en", "ar"];
    const locale = validLocales.includes(pathname.split("/")[1]) ? pathname.split("/")[1] : "en";

    if (status === "authenticated" && !pathname.startsWith(`/${locale}/todos`)) {
      router.replace(`/${locale}/todos`);
    } else if (status === "unauthenticated" && !pathname.startsWith(`/${locale}/auth/login`)) {
      router.replace(`/${locale}/auth/login`);
    }
  }, [status, pathname, router]);

  if (status === "loading") {
    return <LoadingPage />;
  }

  return null;
}
