"use client";

import { useState } from "react";
import Input from "@/src/app/components/shared/Input";
import Button from "@/src/app/components/shared/Button";
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from "react-icons/ai"; // Import icons
import { motion } from "framer-motion"; // Import Framer Motion for animations

interface TodoEditProps {
  todo: { id: string; title: string | null };
  onEdit: (id: string, newTitle: string) => Promise<void>;
}

export const TodoEdit = ({ todo, onEdit }: TodoEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title || "");

  const handleSave = async () => {
    if (!editValue.trim()) {
      return;
    }
    await onEdit(todo.id, editValue.trim());
    setIsEditing(false);
  };

  return isEditing ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2"
    >
      <Input
        name="edit"
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <Button
        text={<AiOutlineCheck />}
        onClick={handleSave}
        className="bg-green-500 text-white p-2 rounded flex items-center justify-center hover:bg-green-600 transition"
      />
      <Button
        text={<AiOutlineClose />}
        onClick={() => setIsEditing(false)}
        className="bg-gray-300 text-black p-2 rounded flex items-center justify-center hover:bg-gray-400 transition"
      />
    </motion.div>
  ) : (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="p-1 text-blue-500 hover:text-blue-700 transition"
      onClick={() => setIsEditing(true)}
      aria-label="Edit todo"
    >
      <AiOutlineEdit size={18} />
    </motion.button>
  );
};
