import * as z from "zod";

export const formSchema = z.object({
  resume: z
    .instanceof(File)
    .nullable()
    .refine((file) => file?.size !== 0, {
      message: "Resume file is required.",
    }),
  firstname: z.string().min(3, "Min length - 3 characters"),
  lastname: z.string().min(3, "Min length - 3 characters"),
  email: z.string().email("Enter valid email id"),
  phone: z.string().min(10, "Enter valid phone number"),
});

export type FormFields = z.infer<typeof formSchema>;
