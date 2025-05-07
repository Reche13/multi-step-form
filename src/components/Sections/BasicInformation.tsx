import React from "react";
import Button from "../Primitives/Button";
import SectionTitle from "../Primitives/SectionTitle";
import Input from "../Primitives/Input";
import { Controller, useFormContext } from "react-hook-form";
import { FormFields } from "@/schemas/formSchema";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const BasicInformation = ({ onNext, onBack }: Props) => {
  const {
    trigger,
    register,
    control,
    formState: { errors },
  } = useFormContext<FormFields>();

  const handleNext = async () => {
    const isValid = await trigger(["firstname", "lastname", "email", "phone"]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <SectionTitle title="Basic Information" />
        <div className="w-full">
          <div className="flex flex-col md:flex-row gap-5">
            <Input
              id="firstname"
              label="First Name"
              className="w-full md:w-[420px]"
              {...register("firstname")}
              error={errors.firstname?.message}
            />
            <Input
              id="lastname"
              label="Last Name"
              className="w-full md:w-[420px]"
              {...register("lastname")}
              error={errors.lastname?.message}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5 mt-5">
            <Input
              id="email"
              label="Email Address"
              className="w-full md:w-[420px]"
              {...register("email")}
              error={errors.email?.message}
            />
            <div
              className={`relative h-fit w-full md:w-[420px] mt-4 rounded-sm ${
                errors.phone && "border border-error"
              }`}
            >
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    country={"in"}
                    containerClass="bg-dim-100 border-none outline-none h-[56px] !flex !gap-4 !rounded-sm"
                    inputClass="!w-full !h-full !pl-[88px] !border-none !bg-dim-100"
                    buttonClass="!bg-[#ECECEC] !border-none !w-[80px] !flex !items-center !justify-center"
                  />
                )}
              />
              {errors.phone && (
                <span className="text-xs font-normal text-error mt-2 absolute top-full">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-5 mt-24 pb-12">
        <Button onClick={onBack} className="w-[170px]" variant="secondary">
          BACK
        </Button>
        <Button onClick={handleNext} className="w-[170px]">
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default BasicInformation;
