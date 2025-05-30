"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeeklyCalendarSelectorProps {
  date: Date | undefined;
  handleDateChange: (date: Date | undefined) => void;
}

export default function WeeklyCalendarSelector({
  date,
  handleDateChange,
}: WeeklyCalendarSelectorProps) {
  const currentYear = date ? date.getFullYear() : new Date().getFullYear();

  const getWeeksForYear = (year: number) => {
    const weeks = [];
    const startDate = new Date(year, 0, 1);

    // Find the first Monday of the year (or the Monday before if Jan 1 is not Monday)
    const firstMonday = new Date(startDate);
    const dayOfWeek = startDate.getDay();
    const daysToMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    firstMonday.setDate(startDate.getDate() + daysToMonday - 7);

    const currentWeekStart = new Date(firstMonday);
    let weekNumber = 1;

    while (currentWeekStart.getFullYear() <= year) {
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(currentWeekStart.getDate() + 6);

      if (
        currentWeekStart.getFullYear() === year ||
        weekEnd.getFullYear() === year
      ) {
        weeks.push({
          weekNumber,
          start: new Date(currentWeekStart),
          end: new Date(weekEnd),
        });
        weekNumber++;
      }

      currentWeekStart.setDate(currentWeekStart.getDate() + 7);

      if (
        currentWeekStart.getFullYear() > year &&
        currentWeekStart.getMonth() > 1
      ) {
        break;
      }
    }

    return weeks;
  };

  const weeks = getWeeksForYear(currentYear);

  const getCurrentWeek = () => {
    if (!date) return 0;
    const currentWeek = weeks.find(
      (week) => date >= week.start && date <= week.end
    );
    return currentWeek ? weeks.indexOf(currentWeek) : 0;
  };

  const [selectedWeekIndex, setSelectedWeekIndex] = useState(getCurrentWeek());

  const formatDate = (date: Date) => {
    const months = [
      "yanvar",
      "fevral",
      "mart",
      "aprel",
      "may",
      "iyun",
      "iyul",
      "avgust",
      "sentabr",
      "oktabr",
      "noyabr",
      "dekabr",
    ];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  const handlePrevious = () => {
    if (selectedWeekIndex > 0) {
      const newIndex = selectedWeekIndex - 1;
      setSelectedWeekIndex(newIndex);
      handleDateChange(weeks[newIndex].start);
    }
  };

  const handleNext = () => {
    if (selectedWeekIndex < weeks.length - 1) {
      const newIndex = selectedWeekIndex + 1;
      setSelectedWeekIndex(newIndex);
      handleDateChange(weeks[newIndex].start);
    }
  };

  const handleWeekChange = (value: string) => {
    const newIndex = Number.parseInt(value);
    setSelectedWeekIndex(newIndex);
    handleDateChange(weeks[newIndex].start);
  };

  const selectedWeek = weeks[selectedWeekIndex];

  return (
    <div className="bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="default"
              size="sm"
              onClick={handlePrevious}
              disabled={selectedWeekIndex === 0}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex-1 text-center">
              <h1 className="text-lg font-medium text-gray-900 mb-3">
                Haftani tanlang
              </h1>

              <Select
                value={selectedWeekIndex.toString()}
                onValueChange={handleWeekChange}
              >
                <SelectTrigger className="w-full max-w-xs mx-auto bg-white border border-gray-300 rounded">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="h-[300px]">
                  {weeks.map((week, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {week.weekNumber}. {formatDate(week.start)} /{" "}
                      {formatDate(week.end)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={handleNext}
              disabled={selectedWeekIndex === weeks.length - 1}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {selectedWeek && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hidden md:block">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedWeek.weekNumber}-hafta
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                {formatDate(selectedWeek.start)} -{" "}
                {formatDate(selectedWeek.end)}, {currentYear}
              </p>

              <div className="grid grid-cols-7 gap-2 mt-6">
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date(selectedWeek.start);
                  date.setDate(selectedWeek.start.getDate() + i);
                  const dayNames = [
                    "Yak",
                    "Dush",
                    "Sesh",
                    "Chor",
                    "Pay",
                    "Jum",
                    "Shan",
                  ];

                  return (
                    <div
                      key={i}
                      className="text-center p-3 rounded-lg bg-gray-50"
                    >
                      <div className="text-sm font-medium text-gray-600 mb-1">
                        {dayNames[i]}
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {date.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
