import React from "react";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <p className="font-semibold text-xl text-[#484848] leading-[58px]">
      {title}
    </p>
  );
};

export default SectionTitle;
