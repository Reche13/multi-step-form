import React, { useState } from "react";
import SectionTitle from "../Primitives/SectionTitle";
import Line from "../Primitives/Line";
import { useFormContext } from "react-hook-form";
import { FormFields } from "@/schemas/formSchema";
import Button from "../Primitives/Button";
import { Download } from "lucide-react";

import { format } from "date-fns";

interface Props {
  onNext: () => void;
  onBack: () => void;
  reset: () => void;
}

const Summary = ({ onBack, onNext, reset }: Props) => {
  const [checked, setChecked] = useState(false);
  const { getValues } = useFormContext<FormFields>();
  const form = getValues();

  const handleConfirm = () => {
    console.log(form);
    reset();
    onNext();
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <SectionTitle lg title="Summary" />
        <div className="mt-6 flex flex-col gap-10">
          <Line />

          <div className="flex flex-col gap-10">
            <SummaryTitle title="Resume" />
            <div className="flex flex-col gap-5">
              <p className="text-sm font-normal text-[#272727]">File name</p>
              <p className="text-base flex items-center gap-4 font-semibold text-[#272727]">
                {form.resume?.name}
                {form.resume && (
                  <a
                    href={URL.createObjectURL(form.resume)}
                    download={form.resume.name}
                    className="inline-block text-orange-500"
                  >
                    <Download size={20} />
                  </a>
                )}
              </p>
            </div>
          </div>

          <Line />

          <div className="flex flex-col gap-8">
            <SummaryTitle title="Basic Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:max-w-[50vw]">
              <SummaryItem header="First Name" value={form.firstname} />
              <SummaryItem header="Last Name" value={form.lastname} />
              <SummaryItem header="Email Id" value={form.email} />
              <SummaryItem header="Phone Number" value={form.phone} />
            </div>
          </div>

          <Line />

          <div className="flex flex-col gap-8">
            <SummaryTitle title="Skill Sets" />
            <div className="grid grid-cols-2 gap-10 md:max-w-[50vw] pl-1">
              {form.skills?.length > 0 &&
                form.skills.map((skill, index) => (
                  <React.Fragment key={skill.name + skill.level + index}>
                    <SummaryItem
                      header={"Skill " + (index + 1)}
                      value={skill.name}
                    />
                    <SummaryItem header="Experience" value={skill.level} />
                  </React.Fragment>
                ))}
            </div>
          </div>

          <Line />

          <div className="flex flex-col gap-8">
            <SummaryTitle title="Education" />
            <div className="flex flex-col gap-10">
              {form.colleges?.length > 0 &&
                form.colleges.map((college, index) => (
                  <div
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-2"
                    key={college.degree + college.universityName + index}
                  >
                    <SummaryItem header="Degree Name" value={college.degree} />
                    <SummaryItem
                      header="University"
                      value={college.universityName}
                    />
                    <SummaryItem
                      header="Year of Starting"
                      value={format(college.startYear, "yyyy")}
                    />
                    <SummaryItem
                      header="Year of Completion"
                      value={format(college.endYear, "yyyy")}
                    />
                  </div>
                ))}
            </div>
          </div>

          <Line />
        </div>

        <p className="text-base font-normal text-[#484848] mt-16">
          By submitting this form, you confirm that all information provided is
          accurate and complete to the best of your knowledge. Any false or
          misleading information may result in disqualification from the
          recruitment process or termination of employment if discovered later.
          <br />
          <br />
          Submission of this form does not guarantee an interview or employment.
          Your personal data will be handled confidentially and used solely for
          recruitment purposes in accordance with Beyonds Labs LLC Privacy
          Policy.
        </p>

        <div className="flex items-center gap-2 mt-6">
          <input
            id="check"
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="w-4 h-4 accent-primary rounded border-gray-300 focus:ring-primary"
          />
          <label
            htmlFor="check"
            className="text-[#556171] text-base font-semibold"
          >
            By submitting, you agree to our Terms & Conditions.
          </label>
        </div>

        <div className="flex items-center gap-5 mt-14 pb-16">
          <Button onClick={onBack} className="w-[170px]" variant="secondary">
            EDIT
          </Button>
          <Button
            disabled={!checked}
            onClick={handleConfirm}
            className="w-[170px]"
          >
            CONFIRM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;

const SummaryTitle = ({ title }: { title: string }) => {
  return (
    <h3 className="text-[#484848] font-semibold text-xl leading-[58px]">
      {title}
    </h3>
  );
};

const SummaryItem = ({
  header,
  value = "",
}: {
  header: string;
  value?: string;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-normal text-[#272727]">{header}</p>
      <p className="text-base font-semibold text-[#272727]">{value}</p>
    </div>
  );
};
