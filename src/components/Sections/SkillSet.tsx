import React, { useState } from "react";
import SectionTitle from "../Primitives/SectionTitle";
import Input from "../Primitives/Input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Primitives/Select";
import Button from "../Primitives/Button";
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
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import SortableSkill from "../DnD/SortableSkill";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export type SkillType = "Beginner" | "Intermediate" | "Expert";

const SkillSet = ({ onNext, onBack }: Props) => {
  const { setValue, watch } = useFormContext<FormFields>();

  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState<SkillType>("Beginner");
  const [error, setError] = useState("");

  const skills = watch("skills") || [];

  const sensors = useSensors(useSensor(PointerSensor));

  const addSkill = () => {
    if (skill.trim().length < 2) {
      setError("Min length - 2 characters");
      return;
    }
    const updated = [...skills, { name: skill.trim(), level }];
    setValue("skills", updated);
    setSkill("");
    setLevel("Beginner");
  };

  const removeSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    setValue("skills", updated);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = active.id;
      const newIndex = over.id;
      const reordered = arrayMove(skills, oldIndex, newIndex);
      setValue("skills", reordered);
    }
  };

  const handleNext = () => {
    if (skills.length > 0) {
      onNext();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <SectionTitle title="Add Skill Sets" />
        <div className="mt-6">
          <div className="flex gap-5">
            <Input
              className="w-[420px]"
              label="Add Skill"
              id="skill"
              type="text"
              value={skill}
              error={error}
              onChange={(e) => {
                setError("");
                setSkill(e.target.value);
              }}
            />

            <div className="flex flex-col">
              <span className="text-xs font-medium text-[#5C5C5C]">
                Experience Level
              </span>
              <Select
                value={level}
                onValueChange={(value) => setLevel(value as SkillType)}
              >
                <SelectTrigger className="w-[420px]">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addSkill} className="mt-10 w-[150px]">
            Add <Plus size={20} className="ml-2.5" />
          </Button>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={skills.map((_, index) => index)}
              strategy={rectSortingStrategy}
            >
              <div className="flex flex-wrap gap-5 mt-5">
                {skills.map((s, index) => (
                  <SortableSkill
                    key={s.name + s.level + index}
                    id={index}
                    name={s.name}
                    level={s.level}
                    onRemove={() => removeSkill(index)}
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

export default SkillSet;
