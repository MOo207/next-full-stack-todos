"use client";

import { BsThreeDotsVertical } from "react-icons/bs"; // Import the icon

interface TodoToggleProps {
  todo: { id: string; title: string | null; isCompleted: boolean };
  onToggle: (id: string) => Promise<void>;
}

export const TodoToggle = ({ todo, onToggle }: TodoToggleProps) => {
  return (
    <div className="flex items-center gap-3">
      {/* Icon to the left of the checkbox */}
      <BsThreeDotsVertical className="text-gray-400" size={16} />

      {/* Checkbox */}
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 cursor-pointer ${
          todo.isCompleted
            ? "bg-primary border-primary"
            : "bg-white border-gray-300"
        }`}
        onClick={() => onToggle(todo.id)}
      >
        {todo.isCompleted && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 01.083 1.32l-.083.094-8 8a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l.094.083L8 12.584l7.293-7.292a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Title with strike-through when completed */}
      <span
        className={`${
          todo.isCompleted ? "line-through text-gray-500" : "text-gray-900"
        }`}
      >
        {todo.title}
      </span>
    </div>
  );
};
