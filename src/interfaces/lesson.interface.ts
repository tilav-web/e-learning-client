import type { ResourceData } from "./resource.interface";

export interface ILesson {
  _id?: string;
  module: string;
  order: number;
  title: string;
  desc: string;
  type: "file" | "video" | "quiz";
  target: string;
  resources: string[];
}

export interface LessonData {
  _id: string;
  module: string;
  order: number;
  title: string;
  desc: string;
  type: "file" | "video" | "quiz";
  target: string;
  resources: ResourceData[];
}
