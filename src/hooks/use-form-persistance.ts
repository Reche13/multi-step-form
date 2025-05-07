import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormFields } from "@/schemas/formSchema";

export const LOCAL_STORAGE_KEY = "multiStepFormData";

export const useFormPersistence = () => {
  const { watch, reset } = useFormContext<FormFields>();
  const preventSaveRef = useRef(false);

  const values = watch();
  const { resume, ...safeValues } = values;

  useEffect(() => {
    if (preventSaveRef.current) {
      preventSaveRef.current = false;
      return;
    }

    if (Object.keys(safeValues).length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(safeValues));
    }
  }, [safeValues]);

  const resetForm = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    reset();
    preventSaveRef.current = true;
  };

  return { resetForm };
};
