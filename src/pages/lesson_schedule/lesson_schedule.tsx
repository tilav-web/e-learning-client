import { useEffect, useState } from "react";
import LessonScheduleCard from "./_components/lesson-schedule-card";
import type { LessonScheduleData } from "@/interfaces/lesson-schedule.interface";
import { lessonScheduleService } from "@/services/lesson-schedule.service";
import WeeklyCalendarSelector from "./_components/weekly-calendar-selector";
import { useLessonSchedule } from "@/stores/lesson_schedule/lesson-schedule";
import { getDayMonthYear } from "@/common/utils/get-day-month-year";

// Hafta kunlarini guruhlash uchun yordamchi funksiya
const groupByDay = (schedules: LessonScheduleData[]) => {
  const grouped: { [key: string]: LessonScheduleData[] } = {};

  schedules?.forEach((schedule) => {
    const date = new Date(schedule.start_date);
    const dayKey = date?.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    if (!grouped[dayKey]) {
      grouped[dayKey] = [];
    }
    grouped[dayKey].push(schedule);
  });

  return grouped;
};

export default function LessonSchedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { schedules, setLessonSchedules } = useLessonSchedule();

  useEffect(() => {
    (async () => {
      try {
        if (!date || schedules[getDayMonthYear(date)]) return;
        const data = await lessonScheduleService.findByAuthAndWeek(
          date!.toString()
        );
        setLessonSchedules({ date, schedules: data });
      } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error);
      }
    })();
  }, [date, setLessonSchedules]);

  const groupedSchedules =
    schedules && date ? groupByDay(schedules[getDayMonthYear(date)]) : {};

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    } else {
      setDate(undefined);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <WeeklyCalendarSelector
          date={date}
          handleDateChange={handleDateChange}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(groupedSchedules).length > 0 ? (
          Object.keys(groupedSchedules).map((day) => (
            <LessonScheduleCard key={day} schedules={groupedSchedules[day]} />
          ))
        ) : (
          <p>Haftalik dars jadvali topilmadi.</p>
        )}
      </div>
    </div>
  );
}
