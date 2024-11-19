"use client";

import { useState } from "react";
import { useTranslations, NextIntlClientProvider } from "next-intl";
import { signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Form from "@/src/app/components/shared/Form";
import Input from "@/src/app/components/shared/Input";
import Button from "@/src/app/components/shared/Button";
import LanguageSwitcher from "@/src/app/components/shared/LanguageSwitcher";

const LoginPageClient = ({
  locale,
  messages,
}: {
  locale: string;
  messages: Record<string, string>;
}) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LoginContent />
    </NextIntlClientProvider>
  );
};

const LoginContent = () => {
  const router = useRouter();
  const { locale } = useParams();
  const t = useTranslations("Login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: `/${locale}/todos`,
      });

      if (result?.ok) {
        router.push(`/${locale}/todos`);
      } else {
        setError(t("error"));
      }
    } catch (err) {
      setError(t("error"));
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-center text-3xl font-bold text-gray-900">{t("title")}</h2>
          <LanguageSwitcher />
        </div>
        <Form action={handleLogin} className="space-y-6">
          <Input
            name="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            className="w-full"
          />
          <Input
            name="password"
            type="password"
            placeholder={t("passwordPlaceholder")}
            className="w-full"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            text={isLoading ? t("loggingIn") : t("loginButton")}
            className={`w-full py-2 px-4 rounded ${
              isLoading ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"
            }`}
          />
        </Form>
        <div className="text-center">
          <p className="text-sm">
            {t("noAccount")}{" "}
            <Link
              href={`/${locale}/auth/register`}
              className="text-blue-600 hover:underline"
            >
              {t("registerLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPageClient;
