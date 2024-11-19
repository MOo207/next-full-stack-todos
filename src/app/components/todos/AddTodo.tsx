"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Form from "@/src/app/components/shared/Form";
import Input from "@/src/app/components/shared/Input";
import Button from "@/src/app/components/shared/Button";

interface AddTodoProps {
  onAdd: (title: string) => Promise<void>;
}

export const AddTodo = ({ onAdd }: AddTodoProps) => {
  const t = useTranslations("TodoPage");
  const [inputValue, setInputValue] = useState(""); // Fully managed here

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      alert(t("addError"));
      return;
    }
    await onAdd(inputValue.trim()); // Notify parent via onAdd prop
    setInputValue(""); // Reset input after adding
  };

  return (
    <Form onSubmit={handleAdd} className="flex gap-2 mb-4">
      <Input
        name="input"
        type="text"
        placeholder={t("newTodoPlaceholder")}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <Button type="submit" text={t("addButton")} className="bg-blue-500 text-white p-2 rounded" />
    </Form>
  );
};
