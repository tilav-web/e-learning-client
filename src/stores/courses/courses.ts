import type { ICourse } from "@/interfaces/courses.interface";
import { create } from "zustand";

interface CoursesState {
  courses: ICourse[] | null;
  setAllCourses: (courses: ICourse[]) => void;
}

export const useCourses = create<CoursesState>((set) => ({
  courses: null,
  setAllCourses: (courses) => set({ courses }),
}));
