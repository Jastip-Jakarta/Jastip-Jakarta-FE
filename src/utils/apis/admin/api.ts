import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axios-with-config";
import { IAdmin, UploadImgPayload } from "./types";
import { IOrders } from "../order/types";

export const getProfileAdmin = async () => {
  try {
    const response = await axiosWithConfig.get("/admin/profile");
    return response.data as Response<IAdmin>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getOrdersByAdmin = async () => {
  try {
    const response = await axiosWithConfig.get("/admin/order");
    return response.data as Response<IOrders[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const uploadImgAdminJ = async (body: UploadImgPayload) => {
  try {
    const formData = new FormData();
    formData.append("delivery_batch_id", body.delivery_batch_id);
    formData.append("user_order_ids", JSON.stringify(body.user_order_ids));
    formData.append("photo_packed", body.photo_packed);

    const response = await axiosWithConfig.post("/admin/foto", formData);
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const createEstimatedOrders = async (
  estimation: string,
  regionCode: string,
  batch: string
) => {
  try {
    const response = await axiosWithConfig.post(
      `/admin/order/estimasi?code=${regionCode}&batch=${batch}`,
      {
        estimation,
      }
    );
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
