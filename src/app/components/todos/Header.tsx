"use client";

import React from "react";

interface HeaderProps {
  greeting: string; // Fully formatted greeting with name already interpolated
  locale: string; // Locale for date formatting
}

export const Header = ({ greeting, locale }: HeaderProps) => {
  const formattedDate = new Date().toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-6">
      {/* Greeting */}
      <h1 className="text-2xl font-bold text-gray-900">
        {greeting} 😊
      </h1>

      {/* Date */}
      <p className="text-sm text-gray-500">{formattedDate}</p>
    </div>
  );
};
