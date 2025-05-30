import type { IAuth } from "@/interfaces/auth.interface";
import type { IStudent } from "@/interfaces/student.interface";
import type { ITeacher } from "@/interfaces/teacher.interface";
import { create } from "zustand";

type AuthUser =
  | (IAuth & { teacher: ITeacher })
  | (IAuth & { student: IStudent })
  | null
  | undefined;

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
