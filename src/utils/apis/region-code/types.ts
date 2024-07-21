import { z } from "zod";

export interface IRegion {
  code: string;
  region: string;
  full_address: string;
  price: number;
  phone_number: number;
  admin_id: number;
}

export const regionSchema = z.object({
  code: z.string().min(1, { message: "Masukkan kode wilayah" }),
  region: z.string().min(1, { message: "Masukkan wilayah" }),
  full_address: z.string().min(1, { message: "Masukkan alamat" }),
  phone: z
    .string()
    .min(1, { message: "Masukkan nomor whatsapp anda" })
    .startsWith("62", { message: "Nomor whatsapp tidak valid" })
    .length(13, { message: "Nomor whatsapp tidak valid" })
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Not a number",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number()),
  price: z.coerce.number().min(1, { message: "Masukkan harga kode wilayah" }),
  admin_id_perwakilan: z.coerce.number().min(1, { message: "Masukkan nama admin perwakilan" }),
});
export type RegionPayload = z.infer<typeof regionSchema>;
