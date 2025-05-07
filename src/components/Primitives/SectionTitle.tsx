import { cn } from "@/lib/utils";
import React from "react";

const SectionTitle = ({
  title,
  lg = false,
}: {
  title: string;
  lg?: boolean;
}) => {
  return (
    <p
      className={cn(
        "font-semibold text-[#484848] leading-[58px]",
        lg ? "text-2xl" : "text-xl"
      )}
    >
      {title}
    </p>
  );
};

export default SectionTitle;
