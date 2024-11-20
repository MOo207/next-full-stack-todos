"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcherAndSignOut() {
  const { locale } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onToggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    const newPathname = pathname.match(/^\/(en|ar)/)
      ? pathname.replace(/^\/(en|ar)/, `/${nextLocale}`)
      : `/${nextLocale}${pathname}`;

    startTransition(() => {
      router.replace(newPathname);
    });
  };

  const isArabic = locale === "ar";

  return (
    <div
      className={`flex items-center ${
        isArabic ? "flex-row-reverse space-x-reverse space-x-2" : "space-x-2"
      }`}
    >

      {/* Language Switcher */}
      <button
        onClick={onToggleLanguage}
        disabled={isPending}
        className={`px-4 py-2 rounded-full ${
          isArabic
            ? "bg-gray-100 text-gray-600 border border-gray-300"
            : "bg-gray-200 text-gray-800"
        } hover:bg-gray-300 transition`}
      >
        {locale === "en" ? "العربية" : "English"}
      </button>
    </div>
  );
}
