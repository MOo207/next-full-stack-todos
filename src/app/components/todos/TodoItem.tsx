"use client";

import { motion } from "framer-motion"; // Import Framer Motion for animations
import { TodoDelete } from "@/src/app/components/todos/TodoDelete";
import { TodoEdit } from "@/src/app/components/todos/TodoEdit";
import { TodoToggle } from "@/src/app/components/todos/TodoToggle";

interface TodoItemProps {
  todo: { id: string; title: string | null; isCompleted: boolean };
  onEdit: (id: string, newTitle: string) => Promise<void>;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TodoItem = ({ todo, onEdit, onToggle, onDelete }: TodoItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }} // Start with a fade-in + slide-up effect
      animate={{ opacity: 1, y: 0 }} // Smoothly appear
      exit={{ opacity: 0, y: 10 }} // Smoothly disappear
      transition={{ duration: 0.3 }} // Animation duration
      layout // Enable layout animation for reordering
      className={`flex items-center justify-between p-4 border-b border-gray-200 transition-shadow rounded-lg ${
        todo.isCompleted
          ? "bg-gray-50 shadow-lg text-gray-500 line-through" // Elevated shadow for completed tasks
          : "bg-white shadow-md text-gray-900" // Subtle shadow for active tasks
      }`}
    >
      <TodoToggle todo={todo} onToggle={onToggle} />

      <div className="flex items-center gap-2">
        <TodoEdit todo={todo} onEdit={onEdit} />
        <TodoDelete todoId={todo.id} onDelete={onDelete} />
      </div>
    </motion.div>
  );
};

export default TodoItem;
