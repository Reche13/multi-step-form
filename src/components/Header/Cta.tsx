import Link from "next/link";
import React from "react";

const Cta = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center py-2.5 px-[17px] rounded-full border border-[#83839638] h-[44px] w-[170px]"
    >
      <span className="text-surface-black text-base leading-[24px] font-medium ">
        Build with us
      </span>
    </Link>
  );
};

export default Cta;
