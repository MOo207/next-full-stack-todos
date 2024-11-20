"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  // Define animation variants
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="mb-6"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Greeting */}
      <motion.h1
        className="text-2xl font-bold text-gray-900"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {greeting} 😊
      </motion.h1>

      {/* Date */}
      <motion.p
        className="text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {formattedDate}
      </motion.p>
    </motion.div>
  );
};
