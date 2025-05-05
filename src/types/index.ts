import { JSX } from "react";

type ComponentProps = {
  onNext: () => void;
};

export type Step = {
  label: string;
  Component: ({ onNext }: ComponentProps) => JSX.Element;
};
