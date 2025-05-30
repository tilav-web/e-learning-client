import type { IGroup } from "./group.interface";
import type { ModuleData } from "./module.interface";
import type { SubjectData } from "./subject.interface";
import type { ITeacher } from "./teacher.interface";

export interface ICourse {
  _id?: string;
  teacher: string;
  groups: string[];
  subject: SubjectData;
  modules: string[];
  type: "amalyot" | "seminar" | "maruza";
}

export interface CourseData {
  _id: string;
  teacher: ITeacher;
  groups: IGroup[];
  title: string;
  modules: ModuleData[];
  subject: SubjectData;
  type: "amalyot" | "seminar" | "maruza";
}
