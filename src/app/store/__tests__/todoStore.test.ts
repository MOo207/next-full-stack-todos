import { act, renderHook } from "@testing-library/react-hooks";
import useTodoStore from "../todoStore";
import * as todoActions from "@/src/app/actions/todoActions";

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

  it("should fetch todos", async () => {
    const mockTodos = [
      { id: "1", title: "Test Todo 1", isCompleted: false },
      { id: "2", title: "Test Todo 2", isCompleted: true },
    ];
    (todoActions.fetchTodosByUser as jest.Mock).mockResolvedValue(mockTodos);

    const { result } = renderHook(() => useTodoStore());

    await act(async () => {
      await result.current.fetchTodos("test-user");
    });

    expect(result.current.todos).toEqual(mockTodos);
    expect(todoActions.fetchTodosByUser).toHaveBeenCalledWith("test-user");
  });

  it("should add a new todo", async () => {
    const mockTodo = { id: "1", title: "Test Todo", isCompleted: false };
    (todoActions.createTodo as jest.Mock).mockResolvedValue(mockTodo);

    const { result } = renderHook(() => useTodoStore());

    await act(async () => {
      await result.current.addTodo("Test Todo", "test-user");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0]).toEqual(mockTodo);
    expect(todoActions.createTodo).toHaveBeenCalledWith(expect.any(FormData), "test-user");
  });

  it("should toggle a todo's status", async () => {
    const mockTodo = { id: "1", title: "Test Todo", isCompleted: false };
    (todoActions.todoStatus as jest.Mock).mockResolvedValue({
      ...mockTodo,
      isCompleted: true,
    });

    const { result } = renderHook(() => useTodoStore());
    await act(async () => {
      await result.current.addTodo("Test Todo", "test-user");
    });

    act(() => {
      result.current.updateTodoStatus("1");
    });

    expect(result.current.todos[0].isCompleted).toBe(true);
    expect(todoActions.todoStatus).toHaveBeenCalledWith(expect.any(FormData));
  });

  it("should update a todo's title", async () => {
    const mockTodo = { id: "1", title: "Test Todo", isCompleted: false };
    (todoActions.editTodo as jest.Mock).mockResolvedValue({
      ...mockTodo,
      title: "Updated Todo",
    });

    const { result } = renderHook(() => useTodoStore());
    await act(async () => {
      await result.current.addTodo("Test Todo", "test-user");
    });

    act(() => {
      result.current.updateTodoTitle("1", "Updated Todo");
    });

    expect(result.current.todos[0].title).toBe("Updated Todo");
    expect(todoActions.editTodo).toHaveBeenCalledWith(expect.any(FormData));
  });

  it("should delete a todo", async () => {
    (todoActions.deleteTodo as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useTodoStore());
    await act(async () => {
      await result.current.addTodo("Test Todo", "test-user");
    });

    const todoId = result.current.todos[0].id;

    await act(async () => {
      await result.current.removeTodo(todoId);
    });

    expect(result.current.todos).toHaveLength(0);
    expect(todoActions.deleteTodo).toHaveBeenCalledWith(expect.any(FormData));
  });
});
