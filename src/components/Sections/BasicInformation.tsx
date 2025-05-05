import React from "react";
import Button from "../Primitives/Button";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const BasicInformation = ({ onNext, onBack }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-4">
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

export default BasicInformation;
