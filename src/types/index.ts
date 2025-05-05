import { JSX } from "react";

type ComponentProps = {
  onNext: () => void;
  onBack: () => void;
};

export type Step = {
  label: string;
  Component: ({ onNext, onBack }: ComponentProps) => JSX.Element;
};
