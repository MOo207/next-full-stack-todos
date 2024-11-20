import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default async function Layout({
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
  const messages = (await import(`@/src/i18n/messages/${locale}.json`)).default;
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
