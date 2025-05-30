import { privateInstance } from "@/common/api/client-api";
import { API } from "@/common/api/endpoints";

class LessonService {
  async findById(id: string) {
    try {
      const res = await privateInstance.get(API.LESSON_FIND_BY_ID(id));
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const lessonService = new LessonService();
