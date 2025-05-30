export interface ISubject {
  _id?: string;
  title: string;
  desc?: string;
  time_interval: number;
  credit: number;
}

export interface SubjectData {
  _id: string;
  title: string;
  desc?: string;
  time_interval: number;
  credit: number;
  createdAt: Date;
  updatedAt: Date;
}
