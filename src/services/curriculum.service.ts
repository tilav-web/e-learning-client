import { privateInstance } from "@/common/api/client-api";
import { API } from "@/common/api/endpoints";

class CurriculumService {
  async findAllByGroup(id: string) {
    try {
      const res = await privateInstance.get(API.CURRICULUM_FIND_BY_GROUP(id));
      return res.data
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const curriculumService = new CurriculumService();
