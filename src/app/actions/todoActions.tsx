"use server";

import { revalidatePath } from "next/cache";
import * as todoService from "@/src/app/services/todoService";

/**
 * Fetch todos for a specific user
 */
export async function fetchTodosByUser(userId: string) {
  return todoService.fetchTodosByUser(userId);
}

/**
 * Create a new todo
 */
export async function createTodo(formData: FormData, userId: string) {
  const title = formData.get("input") as string;
  const newTodo = await todoService.createTodo(userId, title);

  revalidatePath("/todos");
  return newTodo;
}

/**
 * Delete a todo
 */
export async function deleteTodo(formData: FormData) {
  const todoId = formData.get("inputId") as string;
  await todoService.deleteTodoById(todoId);

  revalidatePath("/todos");
}

/**
 * Toggle a todo's completion status
 */
export async function todoStatus(formData: FormData) {
  const todoId = formData.get("inputId") as string;
  const updatedTodo = await todoService.toggleTodoCompletion(todoId);

  revalidatePath("/todos");
  return updatedTodo;
}

/**
 * Edit a todo's title
 */
export async function editTodo(formData: FormData) {
  const todoId = formData.get("inputId") as string;
  const newTitle = formData.get("newTitle") as string;
  const updatedTodo = await todoService.updateTodo(todoId, newTitle);

  revalidatePath("/todos");
  return updatedTodo;
}
