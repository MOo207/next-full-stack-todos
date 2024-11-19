import { create } from "zustand";
import authService from "@/src/app/services/authService";
import { signIn, signOut } from "next-auth/react";

interface AuthState {
  isLoading: boolean;
  error: string | null;
  session: any | null; // Replace with the actual session type if available
  register: (
    name: string,
    email: string,
    password: string,
    onError?: (message: string) => void
  ) => Promise<void>;
  login: (
    email: string,
    password: string,
    onSuccess?: () => void,
    onError?: (message: string) => void
  ) => Promise<void>;
  logout: () => Promise<void>;
  fetchSession: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,
  session: null,

  // Register action
  register: async (name, email, password, onError) => {
    set({ isLoading: true, error: null });
    try {
      await authService.register({ name, email, password });
      set({ isLoading: false });
    } catch (err: any) {
      const errorMessage = parseError(err, "Registration failed");
      set({ error: errorMessage, isLoading: false });
      onError?.(errorMessage);
    }
  },

  // Login action
  login: async (email, password, onSuccess, onError) => {
    set({ isLoading: true, error: null });
    try {
      const result = await signIn("credentials", { redirect: false, email, password });
      if (result?.error) {
        throw new Error(result.error || "Login failed");
      }
      await setSessionFromServer(set); // Update session
      onSuccess?.();
    } catch (err: any) {
      const errorMessage = parseError(err, "Login failed");
      set({ error: errorMessage, isLoading: false });
      onError?.(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout action
  logout: async () => {
    set({ isLoading: true });
    try {
      await signOut({ redirect: false });
      set({ session: null, isLoading: false });
    } catch (err: any) {
      const errorMessage = parseError(err, "Logout failed");
      set({ error: errorMessage, isLoading: false });
      console.error("Logout error:", errorMessage);
    }
  },

  // Fetch current session
  fetchSession: async () => {
    set({ isLoading: true });
    try {
      await setSessionFromServer(set);
    } catch (err: any) {
      const errorMessage = parseError(err, "Failed to fetch session");
      set({ error: errorMessage });
      console.error("Fetch session error:", errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;

// Helper to parse errors
function parseError(err: any, defaultMessage: string): string {
  if (!err) return defaultMessage;
  if (typeof err === "string") return err;
  if (err.message) return err.message;
  if (err.response?.data?.error) return err.response.data.error;
  return defaultMessage;
}

// Helper to fetch and set the session from the server
async function setSessionFromServer(set: any): Promise<void> {
  try {
    const response = await fetch("/api/auth/session", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch session");
    }

    const session = await response.json();
    set({ session, error: null });
  } catch (err) {
    console.error("Session fetch failed:", err);
    throw err;
  }
}
