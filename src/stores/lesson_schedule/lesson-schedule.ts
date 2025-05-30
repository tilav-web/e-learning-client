import { getDayMonthYear } from "@/common/utils/get-day-month-year";
import type { LessonScheduleData } from "@/interfaces/lesson-schedule.interface";
import { create } from "zustand";

interface LessonScheduleState {
  schedules: {
    [key: string]: LessonScheduleData[];
  };
  setLessonSchedules: ({
    date,
    schedules,
  }: {
    date: Date;
    schedules: LessonScheduleData[];
  }) => void;
}

export const useLessonSchedule = create<LessonScheduleState>((set) => ({
  schedules: {},
  setLessonSchedules: ({ date, schedules }) => {
    const day = getDayMonthYear(date);
    return set((state) => ({
      schedules: {
        ...state.schedules,
        [day]: schedules,
      },
    }));
  },
}));
