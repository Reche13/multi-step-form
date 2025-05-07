"use client";

import clsx from "clsx";
import CalendarIcon from "@/assets/icons/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/Primitives/Popover";

import Calendar from "@/components/Calendar";
import { format } from "date-fns";

interface CalendarInputProps {
  className?: string;
  error?: string;
  label: string;
  onDateChange: (date: Date) => void;
  selectedDate: Date;
}

export default function CalendarInput({
  className,
  error,
  label,
  onDateChange,
  selectedDate,
}: CalendarInputProps) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <Popover>
        <div
          className={clsx(
            "py-1 px-4 h-[56px] rounded-sm bg-dim-100 border outline-none flex items-center justify-between",
            error ? "border-error" : "border-transparent",
            className
          )}
        >
          <div className="text-sm font-medium text-[#484848]">
            {selectedDate
              ? format(selectedDate, "dd MMM yyyy")
              : "Select a date"}
          </div>

          <PopoverTrigger asChild>
            <button className="cursor-pointer">
              <CalendarIcon />
            </button>
          </PopoverTrigger>
        </div>

        <PopoverContent>
          <Calendar selectedDate={selectedDate} onChange={onDateChange} />
        </PopoverContent>
      </Popover>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
