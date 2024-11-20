import { auth } from "@/src/app/api/auth/[...nextauth]/auth";
import LoginPageClient from "@/src/app/components/pages/LoginPageClient";
import { redirect } from "next/navigation";

const LoginPage = async ({ params }: any) => {
  const { locale } = params; // Destructure params correctly

  // Authenticate the user session
  const session = await auth();

  if (session && session.user?.id) {
    // Redirect to the todos page if already logged in
    redirect(`/${locale}/todos`);
  }

  // Load translations for the client
  const messages = (await import(`@/src/i18n/messages/${locale}.json`)).default;

  return <LoginPageClient locale={locale} messages={messages} />;
};

export default LoginPage;
