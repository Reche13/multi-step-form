import { JSX } from "react";

export type Step = {
  label: string;
  Component: () => JSX.Element;
};
