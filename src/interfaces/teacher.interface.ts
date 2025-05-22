import type { AuthData } from "./auth.interface";
import type { IGroup } from "./group.interface";

export interface ITeacher {
  _id?: string;
  auth: string;
  first_name: string;
  second_name: string;
  thrid_name: string;
  full_name: string;
  short_name: string;
  image: string;
  birth_date: string;
  phone: string;
  email: string;
  groups: string[];
}

export interface TeacherData extends AuthData {
  teacher: {
    _id: string;
    auth: string;
    groups: IGroup[];
    first_name: string;
    second_name: string;
    thrid_name: string;
    full_name: string;
    short_name: string;
    image: string;
    birth_date: string;
    phone: string;
    email: string;
  };
}
