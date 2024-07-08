import { z } from "zod";

export const batchSchema = z.object({
  batch: z.coerce.number().min(1, "Masukkan batch"),
  year: z.coerce.number().min(1, "Masukkan year"),
  month: z.coerce.number().min(1, "Masukkan month"),
});

export type BatchPayload = z.infer<typeof batchSchema>;
export interface IBatch extends BatchPayload {
  delivery_batch: string;
}
