"use client";

import { BsFillTrashFill } from "react-icons/bs";
import { motion } from "framer-motion"; // Import Framer Motion for animations

interface TodoDeleteProps {
  todoId: string;
  onDelete: (id: string) => Promise<void>;
}

export const TodoDelete = ({ todoId, onDelete }: TodoDeleteProps) => {
  const handleDelete = async () => {
      await onDelete(todoId);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="p-2 text-red-500 hover:text-red-700 bg-gray-100 hover:bg-gray-200 rounded-full transition flex items-center justify-center"
      onClick={handleDelete}
      aria-label="Delete todo"
    >
      <BsFillTrashFill size={16} />
    </motion.button>
  );
};
