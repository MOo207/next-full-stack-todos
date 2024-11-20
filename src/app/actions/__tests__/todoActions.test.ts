import { revalidatePath } from "next/cache";
import * as todoActions from "@/src/app/actions/todoActions";
import * as todoService from "@/src/app/services/todoService";
import { expect } from '@jest/globals';

jest.mock("@/src/app/services/todoService");
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("todoActions", () => {
  it("should create a todo and revalidate path", async () => {
    const formData = new FormData();
    formData.set("input", "Test Todo");
    const userId = "test-user";

    const mockTodo = { id: "1", title: "Test Todo", isCompleted: false };
    (todoService.createTodo as jest.Mock).mockResolvedValue(mockTodo);

    const result = await todoActions.createTodo(formData, userId);

    expect(todoService.createTodo).toHaveBeenCalledWith(userId, "Test Todo");
    expect(revalidatePath).toHaveBeenCalledWith("/todos");
    expect(result).toEqual(mockTodo);
  });

  it("should delete a todo and revalidate path", async () => {
    const formData = new FormData();
    formData.set("inputId", "test-todo-id");

    await todoActions.deleteTodo(formData);

    expect(todoService.deleteTodoById).toHaveBeenCalledWith("test-todo-id");
    expect(revalidatePath).toHaveBeenCalledWith("/todos");
  });

  it("should toggle a todo's completion status and revalidate path", async () => {
    const formData = new FormData();
    formData.set("inputId", "test-todo-id");

    const mockUpdatedTodo = { id: "1", title: "Test Todo", isCompleted: true };
    (todoService.toggleTodoCompletion as jest.Mock).mockResolvedValue(mockUpdatedTodo);

    const result = await todoActions.todoStatus(formData);

    expect(todoService.toggleTodoCompletion).toHaveBeenCalledWith("test-todo-id");
    expect(revalidatePath).toHaveBeenCalledWith("/todos");
    expect(result).toEqual(mockUpdatedTodo);
  });

  it("should edit a todo's title and revalidate path", async () => {
    const formData = new FormData();
    formData.set("inputId", "test-todo-id");
    formData.set("newTitle", "Updated Title");

    const mockUpdatedTodo = { id: "1", title: "Updated Title", isCompleted: false };
    (todoService.updateTodo as jest.Mock).mockResolvedValue(mockUpdatedTodo);

    const result = await todoActions.editTodo(formData);

    expect(todoService.updateTodo).toHaveBeenCalledWith("test-todo-id", "Updated Title");
    expect(revalidatePath).toHaveBeenCalledWith("/todos");
    expect(result).toEqual(mockUpdatedTodo);
  });

  it("should fetch todos by user", async () => {
    const userId = "test-user";

    const mockTodos = [
      { id: "1", title: "Todo 1", isCompleted: false },
      { id: "2", title: "Todo 2", isCompleted: true },
    ];
    (todoService.fetchTodosByUser as jest.Mock).mockResolvedValue(mockTodos);

    const result = await todoActions.fetchTodosByUser(userId);

    expect(todoService.fetchTodosByUser).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockTodos);
  });
});
