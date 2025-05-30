import type { SubjectData } from "./subject.interface";

export interface ICurriculum {
  _id: string;
  groups: string[];
  subjects: string[];
  elective_subjects: string[];
  semester: string;
}

export interface CurriculumData {
  _id: string;
  groups: string[];
  subjects: SubjectData[];
  elective_subjects: SubjectData[];
  semester: string;
}
