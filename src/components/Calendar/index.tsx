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

interface CalendarProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

export default function Calendar({ selectedDate, onChange }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    format(selectedDate ?? Date.now(), "MMM-yyyy")
  );

  const firstDayCurrentMonth = useMemo(
    () => parse(currentMonth, "MMM-yyyy", new Date()),
    [currentMonth]
  );

  const days = useMemo(() => {
    const start = startOfWeek(firstDayCurrentMonth);
    const end = endOfWeek(endOfMonth(firstDayCurrentMonth));
    return eachDayOfInterval({ start, end }).map((day) => ({
      date: day,
      dayOfMonth: format(day, "d"),
      iso: format(day, "yyyy-MM-dd"),
      isSelected: isEqual(day, selectedDate),
      isToday: isToday(day),
      isSameMonth: isSameMonth(day, firstDayCurrentMonth),
      colStart: getDay(day),
    }));
  }, [firstDayCurrentMonth, selectedDate]);

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

  const selectedMonth = format(firstDayCurrentMonth, "M");
  const selectedYear = format(firstDayCurrentMonth, "yyyy");

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
            value={selectedMonth}
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
            value={selectedYear}
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
        {days.map(
          (
            {
              date,
              dayOfMonth,
              iso,
              isSelected,
              isToday,
              isSameMonth,
              colStart,
            },
            idx
          ) => (
            <div
              key={iso}
              className={cn(idx === 0 && colStartClasses[colStart], "p-1")}
            >
              <button
                type="button"
                onClick={() => onChange(date)}
                className={cn(
                  "mx-auto flex h-10 w-10 items-center justify-center rounded-lg",
                  isSelected && "text-[#FBFAFA] bg-primary",
                  !isSelected && isToday && "border border-primary",
                  !isSelected && isSameMonth && "text-[#484848]",
                  !isSelected &&
                    !isToday &&
                    !isSameMonth &&
                    "text-[#484848]/40",
                  !isSelected && "hover:bg-gray-200"
                )}
              >
                <time dateTime={iso}>{dayOfMonth}</time>
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
