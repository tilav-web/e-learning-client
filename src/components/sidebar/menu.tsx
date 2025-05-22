import type { Roles } from "@/private/private-route";
import { House } from "lucide-react";

export const menu = [
  {
    title: "Asosiy",
    roles: ["teacher", "student"] as Roles[],
    items: [
      {
        icon: House,
        url: "/dashboard",
        name: "Dashboard",
        roles: ["teacher", "student"] as Roles[],
      },
    ],
  },
];
