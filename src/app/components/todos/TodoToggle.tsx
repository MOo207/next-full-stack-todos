"use client";

import { AiOutlineCheckCircle } from "react-icons/ai";

interface TodoToggleProps {
  todo: { id: string; title: string | null; isCompleted: boolean };
  onToggle: (id: string) => Promise<void>;
}

export const TodoToggle = ({ todo, onToggle }: TodoToggleProps) => {
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${
        todo.isCompleted ? "text-gray-500" : "text-black"
      }`}
      onClick={() => onToggle(todo.id)}
    >
      <AiOutlineCheckCircle
        size={20}
        className={todo.isCompleted ? "text-green-500" : "text-gray-400"}
      />
      <span>{todo.title}</span>
    </div>
  );
};
