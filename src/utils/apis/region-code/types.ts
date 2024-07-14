import { z } from "zod";

export interface IRegion {
  code: string;
  region: string;
  full_address: string;
  phone_number: number;
  admin_id: number;
}

export const regionSchema = z.object({
  code: z.string().min(1, { message: "Masukkan kode wilayah" }),
  region: z.string().min(1, { message: "Masukkan wilayah" }),
  full_address: z.string().min(1, { message: "Masukkan alamat" }),
  phone: z.string().min(1, { message: "Masukkan nomor telepon whatsapp" }),
  price: z.string().min(1, { message: "Masukkan harga kode wilayah" }),
  admin_perwakilan_name: z.string().min(1, { message: "Masukkan nama admin perwakilan" }),
});
export type RegionPayload = z.infer<typeof regionSchema>;
