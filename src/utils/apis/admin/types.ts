export interface IAdmin {
  admin_id: number;
  name: string;
  email: string;
  role: string;
  phone_number: number;
  photo_profile: string;
  create_account: string;
  last_update: string;
}

export interface UploadImgPayload {
  delivery_batch_id: string;
  user_order_ids: number[];
  photo_packed: File;
}
