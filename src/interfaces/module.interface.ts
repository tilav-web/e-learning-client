import type { LessonData } from "./lesson.interface";

export interface IModule {
  _id?: string;
  course: string;
  lessons: string[];
  title: string;
  desc: string;
}

export interface ModuleData {
  _id: string;
  course: string;
  lessons: LessonData[];
  title: string;
  desc: string;
}
