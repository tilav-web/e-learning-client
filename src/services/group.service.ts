import { privateInstance } from "@/common/api/client-api";
import { API } from "@/common/api/endpoints";

class GroupService {
  async findAll() {
    try {
      const res = await privateInstance.get(API.GROUPS);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const groupService = new GroupService();
