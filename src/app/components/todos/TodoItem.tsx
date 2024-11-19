"use client";

import { TodoDelete } from "@/src/app/components/todos/TodoDelete";
import { TodoEdit } from "@/src/app/components/todos/TodoEdit";
import { TodoToggle } from "@/src/app/components/todos/TodoToggle";

interface TodoItemProps {
  todo: { id: string; title: string; isCompleted: boolean };
  onEdit: (id: string, newTitle: string) => Promise<void>;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TodoItem = ({ todo, onEdit, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div
      className={`flex items-center justify-between p-2 border rounded ${
        todo.isCompleted ? "bg-gray-100 line-through" : "bg-white"
      }`}
    >
      <TodoToggle todo={todo} onToggle={onToggle} />

      <div className="flex items-center gap-2">
        <TodoEdit todo={todo} onEdit={onEdit} />
        <TodoDelete todoId={todo.id} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default TodoItem;
