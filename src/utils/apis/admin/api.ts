import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axios-with-config";
import { IAdmin } from "./types";
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
