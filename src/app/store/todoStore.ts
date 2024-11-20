import { create } from "zustand";
import { fetchTodosByUser, createTodo, deleteTodo, todoStatus, editTodo } from "@/src/app/actions/todoActions";

interface Todo {
  id: string;
  title: string | null;
  isCompleted: boolean;
  updatedAt?: Date | null;
  createdAt?: Date;
  userId?: string | null;
}

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;

  setTodos: (todos: Todo[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  fetchTodos: (userId: string) => Promise<void>;
  addTodo: (title: string, userId: string) => void;
  updateTodoStatus: (todoId: string) => void;
  updateTodoTitle: (todoId: string, newTitle: string) => void;
  removeTodo: (todoId: string) => void;
}

const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  isLoading: false,
  error: null,

  setTodos: (todos) => set({ todos }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchTodos: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const fetchedTodos = await fetchTodosByUser(userId);
      set({ todos: fetchedTodos.filter(todo => todo.title !== null) as Todo[] });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch todos." });
    } finally {
      set({ isLoading: false });
    }
  },

  addTodo: async (title: string, userId: string) => {
    const optimisticTodo: Todo = { id: `temp-${Date.now()}`, title, isCompleted: false };
    set((state) => ({ todos: [...state.todos, optimisticTodo] })); // Optimistic update

    try {
      const formData = new FormData();
      formData.append("input", title);
      const newTodo = await createTodo(formData, userId);
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === optimisticTodo.id ? newTodo : todo)),
      }));
    } catch (error: any) {
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== optimisticTodo.id), // Rollback on error
      }));
      set({ error: error.message || "Failed to add todo." });
    }
  },

  updateTodoStatus: async (todoId: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    })); // Optimistic toggle

    try {
      const formData = new FormData();
      formData.append("inputId", todoId);
      await todoStatus(formData); // Server sync
    } catch (error: any) {
      set({ error: error.message || "Failed to toggle todo." });
    }
  },

  updateTodoTitle: async (todoId: string, newTitle: string) => {
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === todoId ? { ...todo, title: newTitle } : todo)),
    })); // Optimistic update

    try {
      const formData = new FormData();
      formData.append("inputId", todoId);
      formData.append("newTitle", newTitle);
      await editTodo(formData); // Server sync
    } catch (error: any) {
      set({ error: error.message || "Failed to update todo title." });
    }
  },

  removeTodo: async (todoId: string) => {
    const originalTodos = [...useTodoStore.getState().todos];
    console.log("Before delete:", originalTodos);
    console.log("Deleting todo with id:", todoId);
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
    }));
    console.log("After delete:", useTodoStore.getState().todos);
  
    try {
      const formData = new FormData();
      formData.append("inputId", todoId);
      await deleteTodo(formData); // Server sync
    } catch (error: any) {
      console.log("Rollback due to error:", error.message);
      set({ todos: originalTodos }); // Rollback on error
      set({ error: error.message || "Failed to delete todo." });
    }
  },
}));

export default useTodoStore;
