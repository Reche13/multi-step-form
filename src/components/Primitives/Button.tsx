import React from "react";
import clsx from "clsx";

const baseStyles =
  "px-4 py-2 h-12 flex items-center justify-center rounded-sm text-sm font-medium cursor-pointer";

const variants = {
  primary: "bg-primary hover:bg-primary/90 text-white",
  secondary:
    "border-2 border-black text-[#484848] bg-white hover:bg-surface-black/[3%]",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
