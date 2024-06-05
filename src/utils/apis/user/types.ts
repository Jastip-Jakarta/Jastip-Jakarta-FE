import { z } from "zod";

export interface IUser {
  user_id: number;
  name: string;
  email: string;
  phone_number: number;
  photo_profile: string;
  create_account: string;
  last_update: string;
}

export const EditUserSchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  email: z.string().min(1, { message: "Email tidak boleh kosong" }),
  phone: z.number().min(1, { message: "Nomor whatsapp tidak boleh kosong" }),
});

export type IEditUserType = z.infer<typeof EditUserSchema>;
