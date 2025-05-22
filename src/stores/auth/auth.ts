import type { StudentData } from "@/interfaces/student.interface";
import type { TeacherData } from "@/interfaces/teacher.interface";
import { create } from "zustand";

type AuthUser = TeacherData | StudentData | null | undefined;

interface AuthState {
  auth: AuthUser;
  login: (data: AuthUser) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  auth: undefined,
  isAuthenticated: false,
  login: (data) => set({ auth: data }),
  logout: () => set({ auth: null }),
}));
