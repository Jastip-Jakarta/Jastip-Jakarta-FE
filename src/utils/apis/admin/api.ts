import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axios-with-config";
import { IAdmin, IUserForAdminSuper, UploadImgPayload } from "./types";
import { IOrders } from "../order/types";
import { IRegisterType } from "../auth/types";

export const getProfileAdmin = async () => {
  try {
    const response = await axiosWithConfig.get("/admin/profile");
    return response.data as Response<IAdmin>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
export const getUsersForAdminSuper = async () => {
  try {
    const response = await axiosWithConfig.get("/admin/user");

    return response.data as Response<IUserForAdminSuper[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const addNewUserByAdminSuper = async (body: IRegisterType) => {
  try {
    const response = await axiosWithConfig.post("/admin/user", {
      name: body.name,
      email: body.email,
      phone: +body.phone,
      password: body.password,
    });
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const searchUserForAdmin = async (keyword: string) => {
  try {
    const response = await axiosWithConfig.get(`/admin/user/search?name=${keyword}`);
    return response.data as Response<IUserForAdminSuper[]>;
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

export const uploadImgAdminP = async (foto_Id: number, body: { photo_received: string }) => {
  try {
    const formData = new FormData();
    formData.append("photo_received", body.photo_received);

    const response = await axiosWithConfig.put(`/admin/foto/${foto_Id}`, formData);
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const createEstimatedOrders = async (estimation: string, regionCode: string, batch: string) => {
  try {
    const response = await axiosWithConfig.post(`/admin/order/estimasi?code=${regionCode}&batch=${batch}`, {
      estimation,
    });
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
