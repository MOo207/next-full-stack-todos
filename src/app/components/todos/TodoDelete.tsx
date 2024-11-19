"use client";

import { BsFillTrashFill } from "react-icons/bs";

interface TodoDeleteProps {
  todoId: string;
  onDelete: (id: string) => Promise<void>;
}

export const TodoDelete = ({ todoId, onDelete }: TodoDeleteProps) => {
  return (
    <button
      className="p-1 text-red-500 hover:text-red-700"
      onClick={() => onDelete(todoId)}
    >
      <BsFillTrashFill size={18} />
    </button>
  );
};
