import React, { useState } from "react";
import SectionTitle from "../Primitives/SectionTitle";
import Button from "../Primitives/Button";
import Input from "../Primitives/Input";
import CalendarInput from "../Primitives/Input/CalendarInput";
import { useFormContext } from "react-hook-form";
import { FormFields } from "@/schemas/formSchema";
import { Plus } from "lucide-react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import SortableCollege from "../DnD/SortableCollege";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Education = ({ onBack, onNext }: Props) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormFields>();

  const [degree, setDegree] = useState("");
  const [uniName, setUniName] = useState("");
  const [startYear, setStartYear] = useState<Date>(new Date());
  const [endYear, setEndYear] = useState<Date>(new Date());
  const [DegreeError, setDegreeError] = useState("");
  const [UniError, setUniError] = useState("");
  const [error, setError] = useState("");

  const colleges = watch("colleges") || [];

  const sensors = useSensors(useSensor(PointerSensor));

  const addCollege = () => {
    if (degree.trim().length < 1) {
      setDegreeError("Degree is Required.");
      return;
    }
    if (uniName.trim().length < 2) {
      setUniError("University name is Required.");
      return;
    }
    if (!startYear || !endYear) {
      setError("Please select both start and end dates.");
      return;
    }

    const updated = [
      ...colleges,
      {
        degree,
        universityName: uniName,
        startYear,
        endYear,
      },
    ];
    setValue("colleges", updated);
    // Reset after adding
    setDegree("");
    setUniName("");
    setError("");
  };

  const removeCollege = (index: number) => {
    const updated = colleges.filter((_, i) => i !== index);
    setValue("colleges", updated);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = active.id;
      const newIndex = over.id;
      const reordered = arrayMove(colleges, oldIndex, newIndex);
      setValue("colleges", reordered);
    }
  };

  const handleNext = () => {
    if (colleges.length > 0) {
      onNext();
    } else {
      setError("Please add atleast 1 Education");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <SectionTitle title="Add Education" />
        <div className="mt-6 space-y-6">
          <div className="flex gap-5">
            <Input
              error={DegreeError}
              className="w-[420px]"
              label="Add Degree"
              id="degree"
              type="text"
              value={degree}
              onChange={(e) => {
                setDegreeError("");
                setDegree(e.target.value);
              }}
            />
            <Input
              error={UniError}
              className="w-[420px]"
              label="University/College"
              id="university"
              type="text"
              value={uniName}
              onChange={(e) => {
                setUniError("");
                setUniName(e.target.value);
              }}
            />
          </div>

          <div className="flex gap-5">
            <CalendarInput
              label="Starting Year"
              className="w-[420px]"
              onDateChange={setStartYear}
              selectedDate={startYear}
            />
            <CalendarInput
              label="Ending Year"
              className="w-[420px]"
              onDateChange={setEndYear}
              selectedDate={endYear}
            />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}

          <Button onClick={addCollege} className="mt-10 w-[150px]">
            Add <Plus size={20} className="ml-2.5" />
          </Button>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={colleges.map((_, index) => index)}
              strategy={verticalListSortingStrategy}
            >
              <div className="mt-6 flex flex-col gap-5 w-fit">
                {colleges.map((c, index) => (
                  <SortableCollege
                    key={c.universityName + c.degree + index}
                    id={index}
                    degree={c.degree}
                    uniName={c.universityName}
                    startYear={c.startYear}
                    endYear={c.endYear}
                    onRemove={() => removeCollege(index)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      <div className="flex items-center justify-end gap-5 mt-24">
        <Button onClick={onBack} className="w-[170px]" variant="secondary">
          BACK
        </Button>
        <Button onClick={handleNext} className="w-[170px]">
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default Education;
