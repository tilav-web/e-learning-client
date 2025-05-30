import { getTimeFromDate } from "@/common/utils/get-time-from-date";
import { getWeekDay } from "@/common/utils/get-week-day";
import { DatePicker } from "@/components/date-picker";
import type { LessonScheduleData } from "@/interfaces/lesson-schedule.interface";
import { lessonScheduleService } from "@/services/lesson-schedule.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LessonScheduleDayCard() {
  const [schedules, setSchedules] = useState<LessonScheduleData[] | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    (async () => {
      try {
        if (!date) return;
        const data = await lessonScheduleService.findByAuthAndDay(
          date.toString()
        );
        setSchedules(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [date]);

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    } else {
      setDate(undefined);
    }
  };

  return (
    <div className="max-w-[400px]">
      <div className="mb-2">
        <DatePicker date={date} handleDateChange={handleDateChange} />
      </div>
      <div className="border rounded border-t-3 border-t-green-500">
        <div className="flex items-center justify-between border-b p-2 mb-2">
          <h4 className="capitalize">{date && getWeekDay(date.toString())}</h4>
          <p className="text-sm text-muted-foreground">
            {date?.toLocaleDateString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="p-4 flex flex-col gap-2">
          {schedules &&
            schedules.length > 0 &&
            schedules.map((schedule) => (
              <Link target="_blanck" to={schedule?.target} key={schedule?._id}>
                <div className="border p-2 rounded mb-2">
                  <h5>{schedule?.subject?.title}</h5>
                  <div className="text-sm text-muted-foreground flex items-center justify-between">
                    <p className="capitalize">
                      {schedule?.teacher?.short_name}
                    </p>
                    <p>
                      {getTimeFromDate(schedule?.start_date?.toString())} /{" "}
                      {getTimeFromDate(schedule?.end_date?.toString())}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
