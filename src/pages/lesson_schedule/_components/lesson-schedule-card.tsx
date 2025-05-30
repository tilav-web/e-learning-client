import { getTimeFromDate } from "@/common/utils/get-time-from-date";
import { getWeekDay } from "@/common/utils/get-week-day";
import type { LessonScheduleData } from "@/interfaces/lesson-schedule.interface";
import { Link } from "react-router-dom";

export default function LessonScheduleCard({
  schedules,
}: {
  schedules: LessonScheduleData[];
}) {
  // Check if schedules is empty or undefined
  if (!schedules || schedules.length === 0) {
    return <div>No lessons scheduled for this day.</div>;
  }

  // Ensure start_date is a Date object
  const startDate = schedules[0].start_date
    ? new Date(schedules[0].start_date)
    : null;

  // Validate that startDate is a valid Date
  if (!startDate || isNaN(startDate.getTime())) {
    return <div>Invalid date for this schedule.</div>;
  }

  return (
    <div className="h-full w-full">
      <div className="border h-full rounded border-t-3 border-t-green-500">
        <div className="flex items-center justify-between border-b p-2 mb-2">
          <h4 className="capitalize">{getWeekDay(startDate.toString())}</h4>
          <p className="text-sm text-muted-foreground">
            {startDate.toLocaleDateString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="p-4 flex flex-col gap-2">
          {schedules.map((schedule) => {
            // Convert start_date and end_date to Date objects
            const scheduleStartDate = schedule.start_date
              ? new Date(schedule.start_date)
              : null;
            const scheduleEndDate = schedule.end_date
              ? new Date(schedule.end_date)
              : null;

            return (
              <Link target="_blanck" to={schedule?.target} className="block" key={schedule?._id}>
                <div className="border p-2 rounded mb-2">
                  <h5>{schedule?.subject?.title || "No subject"}</h5>
                  <div className="text-sm text-muted-foreground flex items-center justify-between">
                    <p className="capitalize">
                      {schedule?.teacher?.short_name || "No teacher"}
                    </p>
                    <p>
                      {scheduleStartDate && !isNaN(scheduleStartDate.getTime())
                        ? getTimeFromDate(scheduleStartDate.toString())
                        : "N/A"}{" "}
                      /{" "}
                      {scheduleEndDate && !isNaN(scheduleEndDate.getTime())
                        ? getTimeFromDate(scheduleEndDate.toString())
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
