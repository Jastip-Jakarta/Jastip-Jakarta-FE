import { OPTIONS } from "@/utils/constants/add-order";
import { z } from "zod";

export const orderSchema = z.object({
  item_name: z.string().min(1, { message: "Masukkan nama barang/titipan anda" }),
  tracking_number: z.string().min(1, { message: "Masukkan nomor resi anda" }),
  online_store: z.enum([...OPTIONS.tokoOnline], { message: "Masukkan nama toko online" }),
  whatsapp_number: z
    .string()
    .min(1, { message: "Masukkan nomor whatsapp anda" })
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
    }),
  code: z.enum([...OPTIONS.kodeWilayah], {
    message: "Masukkan kode wilayah anda",
  }),
});

export type IOrderType = z.infer<typeof orderSchema>;

export interface IOrders {
  order_id: number;
  status: string;
  name: string;
  item_name: string;
  tracking_number: string;
  tracking_number_jastip: string;
  online_store: string;
  code: string;
  region: string;
  full_address: string;
  whatsapp_number: number;
  weight_item: number;
}

export interface IOrdersProcess {
  code: string;
  region: string;
  estimasi: string;
  total_order: number;
  total_weight: number;
  total_price: number;
  orders: IOrdersProcessItem[];
}
export interface IOrdersProcessItem {
  order_id: number;
  name: string;
  item_name: string;
  status: string;
  tracking_number_jastip: string;
  tracking_number: string;
  online_store: string;
  WeightItem: number;
}
