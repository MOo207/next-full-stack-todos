"use client";

import TodoItem from "@/src/app/components/todos/TodoItem";
import { Todo } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";

interface TodoListProps {
  todos: Todo[];
  onEdit: (id: string, newTitle: string) => Promise<void>;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TodoList = ({ todos, onEdit, onToggle, onDelete }: TodoListProps) => {
  if (!todos || todos.length === 0) {
    return <p className="text-gray-500">No todos to display.</p>;
  }

  // Animation variants for the todo items
  const variants = {
    hidden: { opacity: 0, y: 20 }, // Start state: hidden and slightly moved down
    visible: { opacity: 1, y: 0 }, // Visible state: fully visible at original position
    exit: { opacity: 0, scale: 0.95 }, // Exit state: fade out and slightly shrink
  };

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            layout // Smooth transition when items are rearranged
          >
            <TodoItem
              todo={todo}
              onEdit={onEdit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
