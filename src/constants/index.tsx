import UploadResume from "@/components/Sections/UploadResume";
import { Step } from "@/types";

export const STEPS: Step[] = [
  {
    label: "Upload Resume",
    Component: UploadResume,
  },
  {
    label: "Basic Information",
    Component: UploadResume,
  },
  {
    label: "Skill Set",
    Component: UploadResume,
  },
  {
    label: "Education",
    Component: UploadResume,
  },
  {
    label: "Summary",
    Component: UploadResume,
  },
  {
    label: "Completed",
    Component: UploadResume,
  },
];
