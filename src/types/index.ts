import { JSX } from "react";

type ComponentProps = {
  onNext: () => void;
  onBack: () => void;
  reset: () => void;
};

export type Step = {
  label: string;
  Component: ({ onNext, onBack, reset }: ComponentProps) => JSX.Element;
};
