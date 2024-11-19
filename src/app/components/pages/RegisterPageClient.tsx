"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations, NextIntlClientProvider } from "next-intl";
import useAuthStore from "@/src/app/store/authStore";
import Form from "@/src/app/components/shared/Form";
import Input from "@/src/app/components/shared/Input";
import Button from "@/src/app/components/shared/Button";
import LanguageSwitcher from "@/src/app/components/shared/LanguageSwitcher";

const RegisterPageClient = ({
  locale,
  messages,
}: {
  locale: string;
  messages: Record<string, string>;
}) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <RegisterContent />
    </NextIntlClientProvider>
  );
};

const RegisterContent = () => {
  const { locale } = useParams();
  const router = useRouter();
  const t = useTranslations("Register");
  const { register, isLoading, error } = useAuthStore();

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      return; // Handle password mismatch error (optional custom state)
    }

    try {
      await register(name, email, password);
      router.push(`/${locale}/auth/login`);
    } catch (err) {
      console.error("Registration failed:", err);
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
            name="name"
            type="text"
            placeholder={t("namePlaceholder")}
            className="w-full"
          />
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
          <Input
            name="confirmPassword"
            type="password"
            placeholder={t("confirmPasswordPlaceholder")}
            className="w-full"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            text={isLoading ? t("registering") : t("registerButton")}
            className={`w-full py-2 px-4 rounded ${
              isLoading ? "bg-gray-300" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          />
        </Form>
        <div className="text-center mt-8">
          <p className="text-gray-500">
            {t("alreadyHaveAccount")}{" "}
            <a href={`/${locale}/auth/login`} className="text-indigo-600 hover:text-indigo-800">
              {t("loginLink")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPageClient;
