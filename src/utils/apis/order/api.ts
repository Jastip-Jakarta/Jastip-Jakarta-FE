import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axios-with-config";
import {
  IOrderAdminJakartaType,
  IOrderProcessBatch,
  IOrders,
  IOrdersProcess,
  IOrdersProcessCustomerOrders,
  IOrdersProcessCustomers,
  IOrderType,
} from "./types";

export const createOrder = async (body: IOrderType) => {
  try {
    const response = await axiosWithConfig.post("/users/order", body);
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const searchUserOrders = async (keyword: string) => {
  try {
    const response = await axiosWithConfig.get(`/users/order/search?item_name=${keyword}`);
    return response.data as Response<IOrders[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
export const searchUserOrdersByAdmin = async (keyword: string) => {
  try {
    const response = await axiosWithConfig.get(`/admin/order/search?jastip=${keyword}`);
    return response.data as Response<IOrders[]>;
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

export const getOrdersProcessBatchByAdmin = async () => {
  try {
    const response = await axiosWithConfig.get("/admin/order/batch");
    return response.data as Response<IOrderProcessBatch[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getOrdersProcessCustomersByAdmin = async (code: string, batch: string) => {
  try {
    const response = await axiosWithConfig.get(`/admin/order/name/?code=${code}&batch=${batch}`);
    return response.data as Response<IOrdersProcessCustomers>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getOrdersProcessCustomerOrdersByAdmin = async (
  code: string,
  batch: string,
  customerName: string
) => {
  try {
    const response = await axiosWithConfig.get(
      `/admin/order/name/orders?code=${code}&batch=${batch}&name=${customerName}`
    );
    return response.data as Response<IOrdersProcessCustomerOrders>;
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

export const updateOrderByAdminSuper = async (orderId: string, body: IOrderType) => {
  try {
    const response = await axiosWithConfig.put("/admin/order/" + orderId, body);
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
export const updateOrderByAdminJakarta = async (orderId: string, body: IOrderAdminJakartaType) => {
  try {
    const response = await axiosWithConfig.post("/admin/order/" + orderId, body);
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
export const updateStatusOrderByAdminPerwakilan = async (orderId: string, body: { status: string }) => {
  try {
    const response = await axiosWithConfig.put("/admin/order/status/" + orderId, body);
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
