import type { CourseData } from "./courses.interface";
import type { StudentData } from "./student.interface";
import type { ITeacher } from "./teacher.interface";

export interface IGroup {
  _id: string;
  title: string;
  teacher: string;
  courses: string[];
  students: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface GroupData {
  _id: string;
  title: string;
  teacher: ITeacher;
  courses: CourseData[];
  students: StudentData[];
  createdAt?: string;
  updatedAt?: string;
}
