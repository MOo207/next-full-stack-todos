import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";
import getMessages from "@/src/i18n/request";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Explicitly declare it as a Promise
}) {
  const resolvedParams = await params; // Await the params
  const { locale } = resolvedParams;

  // Validate the locale
  if (!["en", "ar"].includes(locale)) {
    console.log(`Invalid locale: ${locale}`);
  }

  // Fetch messages for the locale
  const messages = await getMessages({ requestLocale: locale.toString() });
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body>
        <SessionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
