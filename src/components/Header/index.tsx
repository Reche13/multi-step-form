import Image from "next/image";
import React from "react";

import logo from "@/assets/logos/beyondlabs-logo.png";
import Navbar from "./Navbar";
import Cta from "./Cta";

const Header = () => {
  return (
    <div className="w-full px-16">
      <div className="w-full max-w-[1280px] mx-auto pt-3 pb-2 flex items-center justify-between">
        <Image src={logo} alt="Beyond Labs" width={125} height={44} />
        <Navbar />
        <Cta />
      </div>
    </div>
  );
};

export default Header;
