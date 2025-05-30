export interface IResource {
  _id?: string;
  lesson: string;
  title: string;
  type: "file" | "link";
  target: string;
  resources: string[];
}

export interface ResourceData {
  _id: string;
  lesson: string;
  title: string;
  type: "file" | "link";
  target: string;
  resources: ResourceData[];
}
