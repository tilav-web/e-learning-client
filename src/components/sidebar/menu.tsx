import type { Roles } from "@/private/private-route";
import { BookOpen, House, Table2, Users } from "lucide-react";

export const menu = [
  {
    title: "Asosiy",
    roles: ["teacher", "student"] as Roles[],
    items: [
      {
        icon: House,
        url: "/dashboard",
        name: "Bosh sahifa",
        roles: ["teacher", "student"] as Roles[],
      },
      {
        icon: BookOpen,
        url: "/dashboard/courses",
        name: "Fanlar",
        roles: ["teacher", "student"] as Roles[],
      },
      {
        icon: Users,
        url: "/dashboard/groups",
        name: "Guruhlar",
        roles: ["teacher"] as Roles[],
      },
      {
        icon: Users,
        url: "/dashboard/curriculum",
        name: "O'quv reja",
        roles: ["student"] as Roles[],
      },
      {
        icon: Table2,
        url: "/dashboard/lesson-schedule",
        name: "Dars jadvali",
        roles: ["student", "teacher"] as Roles[],
      },
    ],
  },
];
