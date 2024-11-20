"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FiPlus } from "react-icons/fi";

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
    <form
      onSubmit={handleAdd}
      className="flex items-center justify-between p-4 border-2 border-dashed rounded-lg bg-white hover:bg-gray-50 focus-within:bg-gray-50 transition-all"
    >
      {/* Add Todo Button */}
      <div className="flex items-center gap-2">
        <FiPlus size={20} className="text-primary" />
        <input
          type="text"
          placeholder={t("AddTodoPlaceholder")}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-transparent outline-none placeholder-gray-400 text-black"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
      >
        {t("addButton")}
      </button>
    </form>
  );
};
