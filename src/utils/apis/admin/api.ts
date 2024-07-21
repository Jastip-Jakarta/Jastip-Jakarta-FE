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

export const getAdminPerwakilan = async () => {
  try {
    const response = await axiosWithConfig.get("/admin/perwakilan");
    return response.data as Response<IAdmin[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const uploadImgAdminJ = async (body: UploadImgPayload) => {
  try {
    const formData = new FormData();
    formData.append("code", body.code);
    formData.append("batch", body.batch);
    formData.append("user_id", body.user_id);
    formData.append("photo_packed", body.photo_packed);

    const response = await axiosWithConfig.post("/admin/foto", formData);
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const uploadImgAdminP = async (body: { photo_received: string }) => {
  try {
    const formData = new FormData();
    formData.append("photo_received", body.photo_received);

    const response = await axiosWithConfig.put("/admin/foto/2", formData);
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
