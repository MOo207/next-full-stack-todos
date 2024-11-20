"use client";

import { useState } from "react";
import Input from "@/src/app/components/shared/Input";
import Button from "@/src/app/components/shared/Button";
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from "react-icons/ai"; // Import icons

interface TodoEditProps {
  todo: { id: string; title: string | null;};
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
    <div className="flex items-center gap-2">
      <Input
        name="edit"
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <Button
        text={<AiOutlineCheck />} // Save icon
        onClick={handleSave}
        className="bg-green-500 text-white p-2 rounded flex items-center justify-center"
      />
      <Button
        text={<AiOutlineClose />} // Cancel icon
        onClick={() => setIsEditing(false)}
        className="bg-gray-300 text-white p-2 rounded flex items-center justify-center"
      />
    </div>
  ) : (
    <button
      className="p-1 text-blue-500 hover:text-blue-700"
      onClick={() => setIsEditing(true)}
    >
      <AiOutlineEdit size={18} /> {/* Edit icon */}
    </button>
  );
};
