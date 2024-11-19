"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const { locale } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const locales = [
    { code: "en", label: { en: "English", ar: "الإنجليزية" } },
    { code: "ar", label: { en: "Arabic", ar: "العربية" } },
  ];

  const onToggle = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    const newPathname = pathname.match(/^\/(en|ar)/)
      ? pathname.replace(/^\/(en|ar)/, `/${nextLocale}`)
      : `/${nextLocale}${pathname}`;

    startTransition(() => {
      router.replace(newPathname);
    });
  };

  return (
    <div className="flex items-center gap-4">
      {/* Label for the current locale */}
      <span className="text-sm font-medium">
        {locales.find((loc) => loc.code === locale)?.label[locale as "en" | "ar"]}
      </span>

      {/* Toggle slider */}
      <button
        onClick={onToggle}
        disabled={isPending}
        className={`relative w-12 h-6 flex items-center rounded-full bg-gray-300 ${
          isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
        }`}
      >
        <div
          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-md transform transition-transform ${
            locale === "ar" ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>

      {/* Label for the opposite locale */}
      <span className="text-sm font-medium">
        {locales.find((loc) => loc.code !== locale)?.label[locale as "en" | "ar"]}
      </span>
    </div>
  );
}
