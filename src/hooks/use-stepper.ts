import { Step } from "@/types";
import { useState } from "react";

const useStepper = (steps: Step[]) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep((prev) => {
      if (prev === steps.length - 1) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const back = () => {
    setCurrentStep((prev) => {
      if (prev === 0) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  };

  const goto = (index: number) => {
    if (index < 0 || index > steps.length - 1) return;
    setCurrentStep(index);
  };

  return {
    currentStep,
    next,
    back,
    goto,
  };
};

export default useStepper;
