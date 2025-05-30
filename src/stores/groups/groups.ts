import type { GroupData } from "@/interfaces/group.interface";
import { create } from "zustand";

interface GroupsState {
  groups: GroupData[] | null;
  setGroups: (groups: GroupData[]) => void;
}

export const useGroups = create<GroupsState>((set) => ({
  groups: null,
  setGroups: (groups) => set({ groups }),
}));
