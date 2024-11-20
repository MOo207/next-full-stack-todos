jest.mock("@/src/app/lib/prisma", () => ({
    prisma: {
      todo: {
        create: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findUnique: jest.fn(),
      },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    },
  }));
  
  import { prisma } from "@/src/app/lib/prisma";
  import { expect } from '@jest/globals';
  import * as todoService from "@/src/app/services/todoService";
  
  describe("todoService", () => {
    it("should create a new todo", async () => {
      const mockTodo = { id: "1", title: "Test Todo", isCompleted: false };
      (prisma.todo.create as jest.Mock).mockResolvedValue(mockTodo);
  
      const result = await todoService.createTodo("user-id", "Test Todo");
      expect(prisma.todo.create).toHaveBeenCalledWith({
        data: {
          userId: "user-id",
          title: "Test Todo",
          isCompleted: false,
        },
      });
      expect(result).toEqual(mockTodo);
    });
  
    it("should fetch todos by user", async () => {
      const mockTodos = [
        { id: "1", title: "Todo 1", isCompleted: false },
        { id: "2", title: "Todo 2", isCompleted: true },
      ];
      (prisma.todo.findMany as jest.Mock).mockResolvedValue(mockTodos);
  
      const result = await todoService.fetchTodosByUser("user-id");
      expect(prisma.todo.findMany).toHaveBeenCalledWith({
        where: { userId: "user-id" },
        orderBy: { createdAt: "desc" },
      });
      expect(result).toEqual(mockTodos);
    });
  
    it("should update a todo's title", async () => {
      const mockUpdatedTodo = { id: "1", title: "Updated Todo", isCompleted: false };
      (prisma.todo.update as jest.Mock).mockResolvedValue(mockUpdatedTodo);
  
      const result = await todoService.updateTodo("1", "Updated Todo");
      expect(prisma.todo.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: { title: "Updated Todo" },
      });
      expect(result).toEqual(mockUpdatedTodo);
    });
  
    it("should delete a todo by ID", async () => {
      const mockDeletedTodo = { id: "1", title: "Deleted Todo", isCompleted: false };
      (prisma.todo.delete as jest.Mock).mockResolvedValue(mockDeletedTodo);
  
      const result = await todoService.deleteTodoById("1");
      expect(prisma.todo.delete).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(result).toEqual(mockDeletedTodo);
    });
  
    it("should toggle a todo's completion status", async () => {
      const mockTodo = { id: "1", title: "Todo", isCompleted: false };
      const mockUpdatedTodo = { ...mockTodo, isCompleted: true };
  
      (prisma.todo.findUnique as jest.Mock).mockResolvedValue(mockTodo);
      (prisma.todo.update as jest.Mock).mockResolvedValue(mockUpdatedTodo);
  
      const result = await todoService.toggleTodoCompletion("1");
      expect(prisma.todo.findUnique).toHaveBeenCalledWith({ where: { id: "1" } });
      expect(prisma.todo.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: { isCompleted: true },
      });
      expect(result).toEqual(mockUpdatedTodo);
    });
  
    it("should throw an error if todo is not found during toggle", async () => {
      (prisma.todo.findUnique as jest.Mock).mockResolvedValue(null);
  
      await expect(todoService.toggleTodoCompletion("1")).rejects.toThrow("Todo not found.");
      expect(prisma.todo.findUnique).toHaveBeenCalledWith({ where: { id: "1" } });
    });
  });
  