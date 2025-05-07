import React from "react";
import Button from "../Primitives/Button";

const Completion = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center gap-10 mt-12">
        <div className="text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold text-[#484848]">
            <span className="text-primary">Great! </span>
            Thank You for Applying
          </h2>
          <p className="text-[#484848] font-normal text-base max-w-[54ch]">
            We appreciate your application. Our team will review it, and we’ll
            reach out soon if there’s a match. Stay tuned!
          </p>
        </div>
        <Button className="w-[225px]">TRACK APPLICATION</Button>
      </div>
    </div>
  );
};

export default Completion;
