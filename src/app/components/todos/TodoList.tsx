"use client";

import TodoItem from "@/src/app/components/todos/TodoItem";
import { Todo } from "@prisma/client";

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

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
