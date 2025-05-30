import type { CurriculumData } from "@/interfaces/curriculum.interface";
import { create } from "zustand";

interface CurriculumState {
  curriculums: CurriculumData[] | null;
  setCurriculums: (curriculums: CurriculumData[]) => void;
  setCurriculum: (curriculum: CurriculumData) => void;
}

export const useCurriculum = create<CurriculumState>((set) => ({
  curriculums: null,
  setCurriculums: (curriculums: CurriculumData[]) =>
    set({ curriculums: curriculums }),
  setCurriculum: (curriculum: CurriculumData) =>
    set((state) => ({
      curriculums: state.curriculums
        ? [...state.curriculums, curriculum]
        : [curriculum],
    })),
}));
