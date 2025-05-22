export interface IAuth {
  uid: string;
  password: string;
  role: "teacher" | "student";
}

export interface AuthData {
  _id: string;
  uid: string;
  password?: string;
  role: "teacher" | "student";
  createdAt?: string;
  updatedAt?: string;
}
