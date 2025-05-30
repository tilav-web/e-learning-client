import type { AuthData } from "./auth.interface";
import type { GroupData } from "./group.interface";

export interface IStudent {
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
  group: string;
}

export interface StudentData extends AuthData {
  student: {
    _id: string;
    auth: string;
    group: GroupData;
    first_name: string;
    second_name: string;
    thrid_name: string;
    full_name: string;
    short_name: string;
    image: string;
    birth_date: string;
    phone: string;
    email: string;
    passport_pin: number;
    passport_number: string;
  };
}
