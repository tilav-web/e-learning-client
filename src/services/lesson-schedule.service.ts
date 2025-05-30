import { privateInstance } from "@/common/api/client-api";
import { API } from "@/common/api/endpoints";

class LessonScheduleService {
  async findById(id: string) {
    try {
      const res = await privateInstance.get(API.LESSON_SCHEDULE_FIND_BY_ID(id));
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByAuthAndDay(day: string) {
    try {
      const res = await privateInstance.get(
        API.LESSON_SCHEDULE_FIND_BY_AUTH_AND_DAY(day)
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByAuthAndWeek(week: string) {
    try {
      const res = await privateInstance.get(
        API.LESSON_SCHEDULE_FIND_BY_AUTH_AND_WEEK(week)
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const lessonScheduleService = new LessonScheduleService();
