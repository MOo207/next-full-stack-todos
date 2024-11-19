// src/app/[locale]/auth/login/page.tsx
import { auth } from "@/src/app/api/auth/[...nextauth]/auth";
import LoginPageClient from "@/src/app/components/pages/LoginPageClient";
import { redirect } from "next/navigation";

const LoginPage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = await params;

  // Authenticate the user session
  const session = await auth();

  if (session && session.user?.id) {
    // Redirect to todos page if already logged in
    redirect(`/${locale}/todos`);
  }

  // Load translations for the client
  const messages = (await import(`@/src/i18n/messages/${locale}.json`)).default;

  // Pass locale and messages to client component
  return <LoginPageClient locale={locale} messages={messages} />;
};

export default LoginPage;
