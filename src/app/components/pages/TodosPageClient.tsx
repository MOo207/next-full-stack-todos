"use client";

import { useEffect } from "react";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import useTodoStore from "@/src/app/store/todoStore";
import { Todo } from "@prisma/client";
import { TodoList } from "@/src/app/components/todos/TodoList";
import { AddTodo } from "@/src/app/components/todos/AddTodo";
import LanguageSwitcher from "@/src/app/components/shared/LanguageSwitcher";
import { Header } from "@/src/app/components/todos/Header"; // Import the Header
import { todoSchema, createZodErrorMap } from "@/src/app/lib/zod";
import { z } from "zod";
import SignOutButton from "../shared/SignOutButton";

const TodosPageClient = ({
  initialTodos,
  userId,
  locale,
  messages,
  userName,
}: {
  initialTodos: Todo[];
  userId: string;
  locale: string;
  messages: Record<string, string>;
  userName: string; // Pass user name for personalized greeting
}) => {
  const { todos, setTodos, addTodo, updateTodoStatus, updateTodoTitle, removeTodo, error } =
    useTodoStore();

  const t = useTranslations("TodoPage");

  // Set Zod's global error map for localization
  useEffect(() => {
    z.setErrorMap(createZodErrorMap(t));
  }, [t]);

  // Hydrate the initial state
  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos, setTodos]);

  const handleAddTodo = async (title: string) => {
    const validation = todoSchema.safeParse({ title, description: "" });
    if (!validation.success) {
      alert(
        validation.error.issues.map((issue) => t(issue.message)).join(", ")
      );
      return;
    }
    await addTodo(title, userId);
  };

  const handleUpdateTodoTitle = async (todoId: string, newTitle: string) => {
    const validation = todoSchema.safeParse({ title: newTitle, description: "" });
    if (!validation.success) {
      alert(
        validation.error.issues.map((issue) => t(issue.message)).join(", ")
      );
      return;
    }
    await updateTodoTitle(todoId, newTitle);
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Riyadh">
      <TodosContent
        todos={todos}
        handleAddTodo={handleAddTodo}
        updateTodoStatus={updateTodoStatus}
        updateTodoTitle={handleUpdateTodoTitle}
        removeTodo={removeTodo}
        error={error}
        userName={userName} // Pass the username to TodosContent
        locale={locale} // Pass locale to TodosContent
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
  userName,
  locale,
}: any) => {
  const t = useTranslations("TodoPage");

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header Component */}
      <div className="flex items-center justify-between">
        <Header greeting={t("greeting", { name: userName })} locale={locale} />
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <div className="w-2" />
          <SignOutButton locale={locale} />
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>

        {/* Display error message if any */}
        {error && <p className="text-red-500">{t("fetchError")}</p>}

        {/* Todo List */}
        <TodoList
          todos={todos}
          onEdit={updateTodoTitle}
          onToggle={updateTodoStatus}
          onDelete={removeTodo}
        />

        {/* Add Form at the End */}
        <div className="mt-6">
          <AddTodo onAdd={handleAddTodo} />
        </div>
      </div>
    </div>
  );
};


export default TodosPageClient;
