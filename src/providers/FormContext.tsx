"use client";

import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormFields } from "@/schemas/formSchema";

export const FormContextProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: null,
      name: "",
      email: "",
    },
    mode: "onChange",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
