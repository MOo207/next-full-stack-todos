"use client";

import { BsThreeDotsVertical } from "react-icons/bs"; // Import the icon
import { motion } from "framer-motion"; // Import framer-motion for animations

interface TodoToggleProps {
  todo: { id: string; title: string | null; isCompleted: boolean };
  onToggle: (id: string) => Promise<void>;
}

export const TodoToggle = ({ todo, onToggle }: TodoToggleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3"
    >
      {/* Icon to the left of the checkbox */}
      <BsThreeDotsVertical className="text-gray-400" size={16} />

      {/* Checkbox */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 cursor-pointer transition-colors ${
          todo.isCompleted
            ? "bg-primary border-primary"
            : "bg-white border-gray-300"
        }`}
        onClick={() => onToggle(todo.id)}
      >
        {todo.isCompleted && (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 01.083 1.32l-.083.094-8 8a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l.094.083L8 12.584l7.293-7.292a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </motion.svg>
        )}
      </motion.div>

      {/* Title with strike-through when completed */}
      <motion.span
        whileHover={{ color: todo.isCompleted ? "gray" : "#302c44" }}
        className={`transition-all ${
          todo.isCompleted ? "line-through text-gray-500" : "text-gray-900"
        }`}
      >
        {todo.title}
      </motion.span>
    </motion.div>
  );
};
