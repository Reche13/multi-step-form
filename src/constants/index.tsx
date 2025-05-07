import BasicInformation from "@/components/Sections/BasicInformation";
import Education from "@/components/Sections/Education";
import SkillSet from "@/components/Sections/SkillSet";
import Summary from "@/components/Sections/Summary";
import UploadResume from "@/components/Sections/UploadResume";
import { Step } from "@/types";

export const STEPS: Step[] = [
  {
    label: "Upload Resume",
    Component: UploadResume,
  },
  {
    label: "Basic Information",
    Component: BasicInformation,
  },
  {
    label: "Skill Set",
    Component: SkillSet,
  },
  {
    label: "Education",
    Component: Education,
  },
  {
    label: "Summary",
    Component: Summary,
  },
  {
    label: "Completed",
    Component: UploadResume,
  },
];
