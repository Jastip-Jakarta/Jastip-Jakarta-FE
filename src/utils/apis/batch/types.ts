export interface BatchPayload {
  batch: number;
  year: number;
  month: number;
}
export interface IBatch extends BatchPayload {
  delivery_batch: string;
}
