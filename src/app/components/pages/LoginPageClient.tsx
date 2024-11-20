"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useTranslations, NextIntlClientProvider } from "next-intl";
import { z } from "zod";
import { signInSchema, createZodErrorMap } from "@/src/app/lib/zod";
import useAuthStore from "@/src/app/store/authStore";
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
}) => (
  <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Riyadh">
    <LoginContent />
  </NextIntlClientProvider>
);

const LoginContent = () => {
  const { locale } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Login");
  const { login, isLoading } = useAuthStore();

  const [formError, setFormError] = useState<string | null>(null);

  // Handle errors from query params (e.g., NextAuth)
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      const errorMessages: Record<string, string> = {
        CredentialsSignin: t("invalidCredentials"),
        Configuration: t("serverError"),
        default: t("error"),
      };
      setFormError(errorMessages[errorParam] || errorMessages.default);
    }
  }, [searchParams, t]);

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Clear previous errors
    setFormError(null);

    // Set the localized error map for zod
    z.setErrorMap(createZodErrorMap(t));

    // Validate input fields using zod
    const validation = signInSchema.safeParse({ email, password });
    if (!validation.success) {
      setFormError(
        validation.error.issues.map((issue) => t(issue.message)).join(", ")
      );
      return;
    }

    try {
      await login(email, password);
      router.push(`/${locale}/todos`);
    } catch (err) {
      const error = err as Error;
      if (error.message == "CredentialsSignin") {
        setFormError(t("invalidCredentials"));
        } else
        setFormError(t("serverError"));
        } finally {
          
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-center text-3xl font-bold text-gray-900">{t("title")}</h2>
          <LanguageSwitcher />
        </div>
        <Form action={handleSubmit} className="space-y-6">
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
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <Button
            type="submit"
            text={isLoading ? t("loggingIn") : t("loginButton")}
            className={`w-full py-2 px-4 rounded ${
              isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={isLoading}
          />
        </Form>
      </div>
    </div>
  );
};

export default LoginPageClient;
