import { prisma } from "@/src/app/lib/prisma";

export async function createTodo(userId: string, title: string) {
  if (!userId || !title.trim()) throw new Error("Invalid data for creating a todo.");
  return prisma.todo.create({ data: { userId, title, isCompleted: false } });
}

export async function updateTodo(id: string, title: string) {
  return prisma.todo.update({ where: { id }, data: { title } });
}

export async function deleteTodoById(id: string) {
  return prisma.todo.delete({ where: { id } });
}

export async function toggleTodoCompletion(id: string) {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) throw new Error("Todo not found.");

  return prisma.todo.update({
    where: { id },
    data: { isCompleted: !todo.isCompleted },
  });
}

export async function fetchTodosByUser(userId: string) {
  return prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}
