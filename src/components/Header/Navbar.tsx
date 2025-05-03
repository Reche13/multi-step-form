import Link from "next/link";
import React from "react";

const navList = [
  {
    label: "Company",
    href: "/",
  },
  {
    label: "Case studies",
    href: "/",
  },
  {
    label: "Impact",
    href: "/",
  },
  {
    label: "Operations",
    href: "/",
  },
  {
    label: "Career",
    href: "/",
  },
];

const Navbar = () => {
  return (
    <nav className="flex items-center gap-3 rounded-full px-1 py-px border border-[#83839638]">
      {navList.map((nav) => (
        <Link
          className="text-surface-black text-sm leading-[24px] font-medium px-4 py-2"
          key={nav.label}
          href={nav.href}
        >
          {nav.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
