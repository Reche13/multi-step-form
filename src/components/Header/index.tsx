import Image from "next/image";
import React from "react";

import logo from "@/assets/logos/beyondlabs-logo.png";

const Header = () => {
  return (
    <div className="w-full px-8">
      <div className="w-full max-w-[1280px] mx-auto">
        <Image src={logo} alt="Beyond Labs" width={125} height={44} />
      </div>
    </div>
  );
};

export default Header;
