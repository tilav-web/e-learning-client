import { privateInstance } from "@/common/api/client-api";
import { API } from "@/common/api/endpoints";

class CourseService {
  async findAll() {
    try {
      const res = await privateInstance.get(API.COURSES);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async findById(id: string) {
    try {
      const res = await privateInstance.get(API.COURSE_FIND_BY_ID(id));
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const courseService = new CourseService();
