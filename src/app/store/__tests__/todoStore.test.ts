import { act, renderHook } from "@testing-library/react";
import useTodoStore from "../todoStore";
import * as todoActions from "@/src/app/actions/todoActions";
import { expect } from '@jest/globals';

// Mock actions
jest.mock("@/src/app/actions/todoActions", () => ({
  fetchTodosByUser: jest.fn(),
  createTodo: jest.fn(),
  deleteTodo: jest.fn(),
  todoStatus: jest.fn(),
  editTodo: jest.fn(),
}));

describe("todoStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset store state
    const { result } = renderHook(() => useTodoStore());
    act(() => {
      result.current.setTodos([]);
      result.current.setError(null);
      result.current.setLoading(false);
    });
  });

  it("should fetch todos and exclude todos with null titles", async () => {
    const mockTodos = [
      { id: "1", title: "Test Todo 1", isCompleted: false },
      { id: "2", title: null, isCompleted: true },
    ];
    (todoActions.fetchTodosByUser as jest.Mock).mockResolvedValue(mockTodos);

    const { result } = renderHook(() => useTodoStore());

    await act(async () => {
      await result.current.fetchTodos("test-user");
    });

    expect(result.current.todos).toEqual([{ id: "1", title: "Test Todo 1", isCompleted: false }]);
    expect(todoActions.fetchTodosByUser).toHaveBeenCalledWith("test-user");
  });

  it("should optimistically add a new todo and rollback on error", async () => {
    const mockError = new Error("Failed to add todo.");
    (todoActions.createTodo as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useTodoStore());

    await act(async () => {
      await result.current.addTodo("Optimistic Todo", "test-user");
    });

    // Optimistic state
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe("Optimistic Todo");

    // After rollback
    expect(result.current.todos.length).toBe(0);
    expect(result.current.error).toEqual(mockError.message);
  });

  it("should toggle a todo's status optimistically and handle errors", async () => {
    const mockTodo = { id: "1", title: "Test Todo", isCompleted: false };
    const mockError = new Error("Failed to toggle todo.");
    (todoActions.todoStatus as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useTodoStore());
    act(() => {
      result.current.setTodos([mockTodo]);
    });

    await act(async () => {
      result.current.updateTodoStatus("1");
    });

    // Optimistic state
    expect(result.current.todos[0].isCompleted).toBe(true);

    // Error handling
    expect(result.current.error).toBe(mockError.message);
  });

  it("should update a todo's title optimistically and handle errors", async () => {
    const mockTodo = { id: "1", title: "Test Todo", isCompleted: false };
    const mockError = new Error("Failed to update title.");
    (todoActions.editTodo as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useTodoStore());
    act(() => {
      result.current.setTodos([mockTodo]);
    });

    await act(async () => {
      result.current.updateTodoTitle("1", "Updated Title");
    });

    // Optimistic state
    expect(result.current.todos[0].title).toBe("Updated Title");

    // Error handling
    expect(result.current.error).toBe(mockError.message);
  });

  it("should delete a todo optimistically and rollback on error", async () => {
    const mockTodo = { id: "1", title: "Test Todo", isCompleted: false };
    const mockError = new Error("Failed to delete todo.");
    (todoActions.deleteTodo as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useTodoStore());
    act(() => {
      result.current.setTodos([mockTodo]);
    });

    await act(async () => {
      result.current.removeTodo("1");
    });

    // Optimistic state
    expect(result.current.todos).toHaveLength(0);

    // Rollback on error
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0]).toEqual(mockTodo);
    expect(result.current.error).toBe(mockError.message);
  });
});
