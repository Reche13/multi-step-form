import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="text-xs leading-[16px] text-[#5C5C5C] font-medium ml-0.5"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={clsx(
            "py-1 px-4 h-[56px] rounded-sm bg-dim-100 caret-primary border outline-none text-sm text-[#5C5C5C] font-medium",
            error ? "border-error" : "border-transparent",
            className
          )}
          {...rest}
        />
        {error && (
          <span className="text-xs font-normal text-error mt-2">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
