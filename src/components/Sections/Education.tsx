import React from "react";
import SectionTitle from "../Primitives/SectionTitle";
import Button from "../Primitives/Button";
import Input from "../Primitives/Input";
import Calendar from "../Calendar";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Education = ({ onBack, onNext }: Props) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <SectionTitle title="Add Education" />
        <div className="mt-6">
          <div className="flex gap-5">
            <Input
              className="w-[420px]"
              label="Add Degree"
              id="degree"
              type="text"
            />
            <Input
              className="w-[420px]"
              label="University/College"
              id="university"
              type="text"
            />
          </div>
        </div>
      </div>

      <Calendar />

      <div className="flex items-center justify-end gap-5 mt-24">
        <Button onClick={onBack} className="w-[170px]" variant="secondary">
          BACK
        </Button>
        <Button onClick={onNext} className="w-[170px]">
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default Education;
