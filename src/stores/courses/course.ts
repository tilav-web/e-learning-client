import type { CourseData } from "@/interfaces/courses.interface";
import { create } from "zustand";

interface CourseState {
  course: {
    [key: string]: CourseData;
  } | null;
  loading: boolean;
  setCourse: (course: CourseData) => void;
  handleLoading: (value: boolean) => void;
}

export const useCourse = create<CourseState>((set) => ({
  course: null,
  loading: false,
  setCourse: (course) =>
    set((state) => {
      if (!state.course) {
        state.course = {};
      }

      if (!state.course[course._id]) {
        return {
          course: {
            ...state.course,
            [course._id]: course,
          },
        };
      }
      return state;
    }),
  handleLoading: (value) => set({ loading: value }),
}));
