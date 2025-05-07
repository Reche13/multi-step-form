import { useRef } from "react";
import SectionTitle from "../Primitives/SectionTitle";
import Button from "../Primitives/Button";

import Image from "next/image";
import fileUploadImage from "@/assets/icons/fileUpload.svg";
import pdfFileImage from "@/assets/icons/pdfFile.svg";
import FileLoading from "@/assets/icons/fileLoading";
import FileComplete from "@/assets/icons/fileComplete";
import trash from "@/assets/icons/trash.svg";
import cross from "@/assets/icons/cross.svg";

import { formatSize } from "@/lib/utils";

import { AnimatePresence, motion } from "motion/react";
import { useFormContext } from "react-hook-form";
import { FormFields } from "@/schemas/formSchema";
import { useFileStore } from "@/store/useFileStore";

interface Props {
  onNext: () => void;
}

const UploadResume = ({ onNext }: Props) => {
  const {
    progress,
    uploadedBytes,
    status,
    error,
    setProgress,
    setUploadedBytes,
    setStatus,
    setError,
  } = useFileStore();

  const { setValue, watch, trigger } = useFormContext<FormFields>();

  const file = watch("resume");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setValue("resume", selected, { shouldValidate: true });
    simulateUpload(selected);
  };

  const simulateUpload = (upload: File) => {
    if (!upload) return;

    setError("");
    setStatus("uploading");
    setProgress(0);
    setUploadedBytes(0);

    let fakeProgress = 0;

    const interval = setInterval(() => {
      const increment = Math.random() * 20;
      fakeProgress += increment;

      if (fakeProgress >= 100) {
        setProgress(100);
        setUploadedBytes(upload.size);
        setStatus("done");
        clearInterval(interval);
      } else {
        const percent = Math.floor(fakeProgress);
        setProgress(percent);
        setUploadedBytes(Math.floor((percent / 100) * upload.size));
      }
    }, 300);
  };

  const handleRemove = () => {
    setValue("resume", null, { shouldValidate: true });
    setProgress(0);
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleNext = async () => {
    if (!file) {
      setError("Resume cannot be empty");
      return;
    }
    const isValid = await trigger("resume");
    if (isValid) {
      onNext();
    } else {
      setError("Resume cannot be empty");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <SectionTitle title="Upload Resume" />
        <div className="relative w-[530px] h-[252px] flex flex-col items-center justify-center rounded-2xl border-dashed border-[2.5px] border-[#CBD0DC]">
          <Image
            src={fileUploadImage}
            alt="Upload File"
            width={28}
            height={28}
          />
          <div className="mt-6 text-center">
            <p className="text-base font-medium text-[#484848]">
              Choose a file or drag & drop it here
            </p>
            <p className="text-sm font-normal text-[#A9ACB4] mt-2">
              Please Upload Your Resume (PDF, DOC formats only)
            </p>
          </div>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            ref={inputRef}
            className="hidden"
          />

          <Button
            onClick={() => inputRef.current?.click()}
            className="w-[170px] mt-6"
            variant="secondary"
          >
            Browse File
          </Button>

          {error && (
            <div className="absolute mt-6 top-full text-sm text-error">
              {error}
            </div>
          )}

          {file && (
            <AnimatePresence>
              <motion.div
                transition={{ duration: 0.2, ease: "easeInOut" }}
                animate={{ height: "auto", opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-full mt-6 w-full left-0 bg-[#FFF5F2] rounded-2xl p-6 flex flex-col gap-6"
              >
                <div className="flex gap-5">
                  <Image
                    src={pdfFileImage}
                    alt="PDF File"
                    width={56}
                    height={54}
                  />
                  <div className="flex flex-col gap-2.5">
                    <p className="font-medium text-base text-[#292D32]">
                      {file.name}
                    </p>
                    <div className="flex items-center">
                      <div className="text-sm font-normal text-[#A9ACB4]">
                        <span>{formatSize(uploadedBytes)}</span> of{" "}
                        <span>{formatSize(file?.size)}</span>
                        {"  "}•
                      </div>

                      <div className="text-sm font-normal text-[#292D32] flex items-center gap-1.5 ml-1">
                        {status === "uploading" && (
                          <>
                            <FileLoading />
                            <span>Uploading...</span>
                          </>
                        )}
                        {status === "done" && (
                          <>
                            <FileComplete />
                            <span>Completed</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {status === "uploading" && (
                  <div className="w-full h-2 rounded-full bg-[#CBD0DC]">
                    <motion.div
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                )}

                {status === "done" && (
                  <button
                    onClick={handleRemove}
                    className="absolute top-6 right-12 cursor-pointer"
                  >
                    <Image src={trash} alt="Delete" width={19} height={19} />
                  </button>
                )}

                {status === "uploading" && (
                  <button
                    onClick={handleRemove}
                    className="absolute top-6 right-12 cursor-pointer"
                  >
                    <Image src={cross} alt="Delete" width={19} height={19} />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className="w-full mt-6 flex justify-end pb-12">
          <Button onClick={handleNext} className="w-[170px]">
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
