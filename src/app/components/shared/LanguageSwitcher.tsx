"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const { locale } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
    <div className="language-switcher">
      <button onClick={onToggle} disabled={isPending}>
        {locale === "en" ? "English" : "العربية"}
      </button>
    </div>
  );
}
