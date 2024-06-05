import { z } from "zod";

export const LoginSchema = z.object({
  email_or_phone: z.string().min(1, { message: "Masukkan email atau nomor whatsapp" }),
  password: z.string().min(1, { message: "Masukkan password" }),
});

export type ILoginType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Masukkan nama" }),
  email: z.string().min(1, { message: "Masukkan email" }),
  phone: z
    .string()
    .min(1, { message: "Masukkan nomor whatsapp" })
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Not a number",
        });

        // This is a special symbol you can use to
        // return early from the transform function.
        // It has type `never` so it does not affect the
        // inferred return type.
        return z.NEVER;
      }
      return parsed;
    }),
  password: z.string().min(1, { message: "Masukkan password" }),
});

export type IRegisterType = z.infer<typeof RegisterSchema>;
