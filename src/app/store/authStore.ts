import { create } from "zustand";
import { signIn, signOut } from "next-auth/react";

interface AuthState {
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Use NextAuth's signIn method with `redirect: false`
      const result = await signIn("credentials", { redirect: false, email, password });

      if (!result || result.error) {
        throw new Error(result?.error || "Invalid email or password.");
      }
    } catch (error: any) {
      set({ error: error.message });
      throw error; // Re-throw error so it can be handled in the UI
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await signOut({ redirect: false });
    } catch (error: any) {
      set({ error: "Error logging out." });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
