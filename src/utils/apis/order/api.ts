import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axios-with-config";
import { IOrders, IOrdersProcess, IOrderType } from "./types";

export const createOrder = async (body: IOrderType) => {
  try {
    const response = await axiosWithConfig.post("/users/order", body);
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getOrders = async () => {
  try {
    const response = await axiosWithConfig.get("/users/order/wait");
    return response.data as Response<IOrders[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getOrdersProcess = async () => {
  try {
    const response = await axiosWithConfig.get("/users/order/process");
    return response.data as Response<IOrdersProcess[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const response = await axiosWithConfig.get("/users/order/" + orderId);
    return response.data as Response<IOrders>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateOrder = async (orderId: string, body: IOrderType) => {
  try {
    const response = await axiosWithConfig.put("/users/order/" + orderId, body);
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
