import * as z from "zod";

export const formSchema = z.object({
  resume: z
    .instanceof(File)
    .nullable()
    .refine((file) => file?.size !== 0, {
      message: "Resume file is required.",
    }),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

export type FormFields = z.infer<typeof formSchema>;
