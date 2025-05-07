import * as z from "zod";

const skillSchema = z.object({
  name: z.string().min(2, "Min length - 2 characters"),
  level: z.enum(["Beginner", "Intermediate", "Expert"]),
});

const collegeSchema = z.object({
  degree: z.string().min(1, "Required"),
  universityName: z.string().min(1, "Required"),
  startYear: z.date({ required_error: "Start date is required" }),
  endYear: z.date({ required_error: "End date is required" }),
});

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
  skills: z.array(skillSchema).min(1, "Add at least one skill"),
  colleges: z.array(collegeSchema).min(1, "Add at least one education"),
});

export type FormFields = z.infer<typeof formSchema>;
