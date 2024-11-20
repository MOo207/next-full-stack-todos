import { auth } from "@/src/app/api/auth/[...nextauth]/auth";
import LoginPageClient from "@/src/app/components/pages/LoginPageClient";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    locale: string;
  };
}

const LoginPage = async ({ params }: Awaited<PageProps>) => {
  const { locale } = params;

  // Authenticate the user session
  const session = await auth();

  if (session && session.user?.id) {
    redirect(`/${locale}/todos`);
  }

  // Load translations for the client
  const messages = (await import(`@/src/i18n/messages/${locale}.json`)).default;

  return <LoginPageClient locale={locale} messages={messages} />;
};

export default LoginPage;
