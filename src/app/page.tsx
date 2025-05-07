"use client";

import Stepper from "@/components/Stepper";
import { STEPS } from "@/constants";
import { FormContextProvider } from "@/providers/FormContext";
import useStepper from "@/hooks/use-stepper";
import { useFormPersistence } from "@/hooks/use-form-persistance";
import React from "react";

function Home() {
  const { currentStep, next, back } = useStepper(STEPS);
  const { resetForm } = useFormPersistence();

  const ActiveSection = STEPS[currentStep].Component;

  return (
    <div className="w-full px-8">
      <div className="w-full max-w-[1280px] mx-auto pt-20">
        <Stepper steps={STEPS} currentStep={currentStep} />
      </div>
      <div className="w-full max-w-[1280px] mx-auto px-12  mt-10">
        <ActiveSection onNext={next} onBack={back} reset={resetForm} />
      </div>
    </div>
  );
}

export default function FormWrapper() {
  return (
    <FormContextProvider>
      <Home />
    </FormContextProvider>
  );
}
