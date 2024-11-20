"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

interface AddTodoProps {
  onAdd: (title: string) => Promise<void>;
}

export const AddTodo = ({ onAdd }: AddTodoProps) => {
  const t = useTranslations("TodoPage");
  const [inputValue, setInputValue] = useState(""); // Manage input state

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      alert(t("addError")); // Show error if input is empty
      return;
    }
    await onAdd(inputValue.trim());
    setInputValue(""); // Clear input after submission
  };

  return (
    <motion.form
      onSubmit={handleAdd}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex items-center justify-between p-4 border-2 border-dashed rounded-lg bg-white hover:bg-gray-50 focus-within:bg-gray-50 transition-all shadow-md"
    >
      {/* Add Todo Input and Icon */}
      <div className="flex items-center gap-2 flex-1">
        <FiPlus size={20} className="text-primary" />
        <input
          type="text"
          placeholder={t("AddTodoPlaceholder")}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-transparent outline-none placeholder-gray-400 text-black"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
      >
        {t("addButton")}
      </motion.button>
    </motion.form>
  );
};
