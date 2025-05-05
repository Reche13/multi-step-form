"use client";

import Stepper from "@/components/Stepper";
import { STEPS } from "@/constants";
import { FormContextProvider } from "@/providers/FormContext";
import useStepper from "@/hooks/use-stepper";

export default function Home() {
  const { currentStep, next, back } = useStepper(STEPS);

  const ActiveSection = STEPS[currentStep].Component;

  return (
    <div className="w-full px-8">
      <div className="w-full max-w-[1280px] mx-auto pt-20">
        <Stepper steps={STEPS} currentStep={currentStep} />
      </div>
      <div className="w-full max-w-[1280px] mx-auto px-12  mt-10">
        <FormContextProvider>
          <ActiveSection onNext={next} onBack={back} />
        </FormContextProvider>
      </div>
      <button onClick={next} className="border p-4 cursor-pointer">
        {currentStep === STEPS.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
