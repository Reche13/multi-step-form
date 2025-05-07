import React, { useEffect, useRef, useState } from "react";

import { motion } from "motion/react";
import { Step } from "@/types";

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  const [margins, setMargins] = useState({
    left: 0,
    right: 0,
  });

  const stepRef = useRef<(HTMLDivElement | null)[]>([]);

  const calculateProgress = () => {
    return Math.min(1, (currentStep + 1) / (steps.length - 1)) * 100;
  };

  useEffect(() => {
    const first = stepRef.current[0];
    const last = stepRef.current[steps.length - 1];
    if (first && last) {
      setMargins({
        left: first.offsetWidth / 2,
        right: last.offsetWidth / 2,
      });
    }
  }, [stepRef.current, steps.length]);

  return (
    <>
      <div className={`grid grid-cols-6 relative`}>
        {steps.map((step, index) => (
          <div
            ref={(el) => {
              stepRef.current[index] = el;
            }}
            key={step.label}
            className="flex flex-col items-center gap-4"
          >
            <div
              className={`w-8 h-8 flex items-center justify-center border-2 rounded-full transition-all duration-300 ${
                index < currentStep || currentStep === steps.length - 1
                  ? "bg-primary border-primary"
                  : index === currentStep
                  ? "bg-white border-primary"
                  : "bg-white border-[#D1D5DB]"
              }`}
            >
              {index < currentStep || currentStep === steps.length - 1 ? (
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    d="M1 6L4.33333 9.33333L12.6667 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : index === currentStep ? (
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              ) : null}
            </div>

            <div className="text-sm text-[#484848] font-medium">
              {step.label}
            </div>
          </div>
        ))}

        {margins.left !== 0 && margins.right !== 0 && (
          <div
            style={{
              width: `calc(100% - (${margins.left + margins.right}px))`,
              marginLeft: `${margins.left}px`,
              marginRight: `${margins.right}px`,
            }}
            className="absolute w-0 z-[-1] top-[15px] left-0 h-0.5 bg-[#D1D5DB]"
          >
            <motion.div
              className="bg-primary h-full"
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{ duration: 0.4, ease: "easeIn" }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Stepper;
