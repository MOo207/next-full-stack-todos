"use client";

import { useEffect } from "react";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { signOut } from "next-auth/react"; // Import the signOut function
import useTodoStore from "@/src/app/store/todoStore";
import { Todo } from "@prisma/client";
import { TodoList } from "@/src/app/components/todos/TodoList";
import { AddTodo } from "@/src/app/components/todos/AddTodo";
import LanguageSwitcher from "@/src/app/components/shared/LanguageSwitcher"; // Import the LanguageSwitcher

const TodosPageClient = ({
  initialTodos,
  userId,
  locale,
  messages,
}: {
  initialTodos: Todo[];
  userId: string;
  locale: string;
  messages: Record<string, string>;
}) => {
  const { todos, setTodos, addTodo, updateTodoStatus, updateTodoTitle, removeTodo, error } =
    useTodoStore();

  // Hydrate the initial state
  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos, setTodos]);

  const handleAddTodo = async (title: string) => {
    await addTodo(title, userId); // Handle adding a todo
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `/${locale}/auth/login` }); // Redirect to login after signing out
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Riyadh">
      <TodosContent
        todos={todos}
        handleAddTodo={handleAddTodo}
        updateTodoStatus={updateTodoStatus}
        updateTodoTitle={updateTodoTitle}
        removeTodo={removeTodo}
        error={error}
        onSignOut={handleSignOut} // Pass the sign-out handler
      />
    </NextIntlClientProvider>
  );
};

const TodosContent = ({
  todos,
  handleAddTodo,
  updateTodoStatus,
  updateTodoTitle,
  removeTodo,
  error,
  onSignOut,
}: any) => {
  const t = useTranslations("TodoPage");

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher /> {/* Add the LanguageSwitcher here */}
          <button
            onClick={onSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {t("signOut")} {/* Ensure "signOut" is translated in your JSON */}
          </button>
        </div>
      </div>

      {/* Updated to pass the correct handler */}
      <AddTodo onAdd={handleAddTodo} />

      {error && <p className="text-red-500">{t("fetchError")}</p>}

      <TodoList
        todos={todos}
        onEdit={updateTodoTitle}
        onToggle={updateTodoStatus}
        onDelete={removeTodo}
      />
    </div>
  );
};

export default TodosPageClient;
