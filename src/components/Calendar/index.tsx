"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  setMonth,
  setYear,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Primitives/Select";

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default function Calendar() {
  const today = useMemo(() => startOfToday(), []);
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));

  const firstDayCurrentMonth = useMemo(
    () => parse(currentMonth, "MMM-yyyy", new Date()),
    [currentMonth]
  );

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(firstDayCurrentMonth),
      end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    });
  }, [firstDayCurrentMonth]);

  const previousMonth = useCallback(() => {
    const newDate = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(newDate, "MMM-yyyy"));
  }, [firstDayCurrentMonth]);

  const nextMonth = useCallback(() => {
    const newDate = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(newDate, "MMM-yyyy"));
  }, [firstDayCurrentMonth]);

  const handleMonthChange = useCallback(
    (month: number) => {
      const updated = setMonth(firstDayCurrentMonth, month - 1);
      setCurrentMonth(format(updated, "MMM-yyyy"));
    },
    [firstDayCurrentMonth]
  );

  const handleYearChange = useCallback(
    (year: number) => {
      const updated = setYear(firstDayCurrentMonth, year);
      setCurrentMonth(format(updated, "MMM-yyyy"));
    },
    [firstDayCurrentMonth]
  );

  return (
    <div className="w-fit px-2 py-4 bg-[#FBFAFA]">
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <button
          type="button"
          onClick={previousMonth}
          className="flex flex-none items-center justify-center p-1.5 text-[#5C5C5C]"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-2">
          <Select
            value={format(firstDayCurrentMonth, "M")}
            onValueChange={(val) => handleMonthChange(Number(val))}
          >
            <SelectTrigger className="border border-[#DADADA] bg-white rounded-sm py-2 pl-2 pr-1 w-[116px] h-10 font-medium text-sm text-[#484848]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent className="h-[350px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <SelectItem key={i} value={(i + 1).toString()}>
                  {format(new Date(2000, i, 1), "MMMM")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={format(firstDayCurrentMonth, "yyyy")}
            onValueChange={(val) => handleYearChange(Number(val))}
          >
            <SelectTrigger className="border border-[#DADADA] bg-white rounded-sm py-2 pl-2 pr-1 w-[116px] h-10 font-medium text-sm text-[#484848]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="h-[350px]">
              {Array.from({ length: 100 }).map((_, i) => {
                const year = 1970 + i;
                return (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <button
          onClick={nextMonth}
          type="button"
          className="flex flex-none items-center justify-center p-1.5 text-[#5C5C5C]"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7">
        {days.map((day, dayIdx) => (
          <div
            key={day.toString()}
            className={cn(dayIdx === 0 && colStartClasses[getDay(day)], "p-1")}
          >
            <button
              type="button"
              onClick={() => setSelectedDay(day)}
              className={cn(
                isEqual(day, selectedDay) && "text-[#FBFAFA] bg-primary",
                !isEqual(day, selectedDay) &&
                  isToday(day) &&
                  "border border-primary",
                !isEqual(day, selectedDay) &&
                  isSameMonth(day, firstDayCurrentMonth) &&
                  "text-[#484848]",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) &&
                  "text-[#484848]/40",
                !isEqual(day, selectedDay) && "hover:bg-gray-200",
                "mx-auto flex h-10 w-10 items-center justify-center rounded-lg"
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
