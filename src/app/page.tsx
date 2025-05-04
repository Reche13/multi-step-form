"use client";
import { useState } from "react";

import Stepper from "@/components/Stepper";
import { STEPS } from "@/constants";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => {
      if (prev === STEPS.length - 1) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const ActiveSection = STEPS[currentStep].Component;

  return (
    <div className="w-full px-8">
      <div className="w-full max-w-[1280px] mx-auto pt-20">
        <Stepper steps={STEPS} currentStep={currentStep} />
      </div>
      <div className="w-full max-w-[1280px] mx-auto px-12  mt-10">
        <ActiveSection />
      </div>
      <button onClick={handleNext} className="border p-4 cursor-pointer">
        {currentStep === STEPS.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
