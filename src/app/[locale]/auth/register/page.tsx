// src/app/[locale]/auth/register/page.tsx
import RegisterPageClient from "@/src/app/components/pages/RegisterPageClient";

const RegisterPage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = await params;

  // Fetch localized messages for the client-side
  const messages = (await import(`@/src/i18n/messages/${locale}.json`)).default;

  return <RegisterPageClient locale={locale} messages={messages} />;
};

export default RegisterPage;
