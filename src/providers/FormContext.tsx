"use client";

import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormFields } from "@/schemas/formSchema";
import { LOCAL_STORAGE_KEY } from "@/hooks/use-form-persistance";

export const FormContextProvider = ({ children }: { children: ReactNode }) => {
  const savedForm =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_KEY)
      : null;
  const parsed = savedForm
    ? (JSON.parse(savedForm) as Partial<FormFields>)
    : undefined;

  const methods = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: null,
      ...parsed,
    },
    mode: "onChange",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
