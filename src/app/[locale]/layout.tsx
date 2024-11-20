import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";
import getMessages from "@/src/i18n/request";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: any };
}) {
  const { locale } = await params;

  // Validate the locale
  if (!["en", "ar"].includes(locale)) {
    console.log(`Invalid locale: ${locale}`);
  }

  // Fetch messages for the locale
  const messages = await getMessages({ requestLocale: locale });
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
