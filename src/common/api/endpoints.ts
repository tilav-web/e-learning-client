export const API = {
  LOGIN: "/auth/login",
  FINDME: "/auth/find/me",
  LOGOUT: "/auth/logout",
  COURSES: "/courses",
  COURSE_FIND_BY_ID: (id: string) => `/courses/course/${id}`,
  LESSON_FIND_BY_ID: (id: string) => `/lessons/lesson/${id}`,
  CURRICULUM_FIND_BY_GROUP: (id: string) => `/curriculums/group/${id}`,
  LESSON_SCHEDULE_FIND_BY_ID: (id: string) => `/lesson-schedule/schedule/${id}`,
  LESSON_SCHEDULE_FIND_BY_DAY: (day: string) =>
    `/lesson-schedule/schedule/day/${day}`,
  LESSON_SCHEDULE_FIND_BY_WEEK: (week: string) =>
    `/lesson-schedule/schedule/week/${week}`,
  LESSON_SCHEDULE_FIND_BY_AUTH_AND_DAY: (day: string) =>
    `/lesson-schedule/schedule/group/day/${day}`,
  LESSON_SCHEDULE_FIND_BY_AUTH_AND_WEEK: (week: string) =>
    `/lesson-schedule/schedule/group/week/${week}`,
  GROUPS: "/groups",
};
