import type { IGroup } from "./group.interface";
import type { ISubject } from "./subject.interface";
import type { ITeacher } from "./teacher.interface";

export interface ILessonSchedule {
  _id: string;
  subject: string;
  group: string;
  teacher: string;
  start_date: Date;
  end_date: Date;
  target: string;
}

export interface LessonScheduleData {
  _id: string;
  subject: ISubject;
  date: Date;
  target: string;
  group: IGroup;
  start_date: Date;
  end_date: Date;
  teacher: ITeacher;
  createdAt: Date;
  updatedAt: Date;
}
