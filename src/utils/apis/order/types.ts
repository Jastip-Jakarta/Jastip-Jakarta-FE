import { OPTIONS } from "@/utils/constants/add-order";

import { z } from "zod";

export const orderSchema = z.object({
  item_name: z.string().min(1, { message: "Masukkan nama barang/titipan anda" }),
  tracking_number: z.string().min(1, { message: "Masukkan nomor resi anda" }),
  online_store: z.enum([...OPTIONS.tokoOnline], { message: "Masukkan nama toko online" }),
  whatsapp_number: z
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
  code: z.enum([...OPTIONS.kodeWilayah], {
    message: "Masukkan kode wilayah anda",
  }),
});

export type IOrderType = z.infer<typeof orderSchema>;

export const orderSchemaAdminJakarta = z.object({
  status: z.string().min(1, { message: "Ubah status paket" }),
  weight_item: z.coerce.number().min(1, { message: "Masukkan berat barang" }),
  delivery_batch: z.string(),
  tracking_number_jastip: z.string().min(1, { message: "Masukkan nomor resi jastip" }),
});

export type IOrderAdminJakartaType = z.infer<typeof orderSchemaAdminJakarta>;

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
  delivery_batch: string;
  detail_orders: {
    code: string;
    estimasi: string;
    orders: IOrdersProcessItem[];
    package_received_photo: string;
    package_wrapped_photo: string;
    region: string;
    total_order: number;
    total_price: number;
    total_weight: number;
  }[];
}
export interface IOrdersProcessItem {
  order_id: number;
  name: string;
  item_name: string;
  status: string;
  tracking_number_jastip: string;
  tracking_number: string;
  online_store: string;
  weight_item: number;
}

export interface IOrderProcessBatch {
  delivery_batch: string;
  region_code: {
    code: string;
    region: string;
  }[];
}
export interface IOrdersProcessCustomers {
  delivery_batch: string;
  code: string;
  region: string;
  estimasi: string;
  customer_jastip: {
    id: string;
    name: string;
  }[];
}
export interface IOrdersProcessCustomerOrders {
  delivery_batch: string;
  code: string;
  estimasi: string;
  orders: IOrdersProcessItem[];
  package_received_photo: string;
  package_wrapped_photo: string;
  region: string;
  total_order: number;
  total_price: number;
  total_weight: number;
  customer_jastip: {
    id: string;
    name: string;
  };
}
