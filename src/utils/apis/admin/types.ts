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
  code: string;
  batch: string;
  user_id: string;
  photo_packed: File;
}

export interface IAdmin {
  admin_id: number;
  name: string;
  role: string;
  email: string;
  phone_number: number;
  photo_profile: string;
  create_account: string;
  last_update: string;
}
