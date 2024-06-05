import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axios-with-config";
import { IEditUserType, IUser } from "./types";

export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get("/users/profile");
    return response.data as Response<IUser>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const editUser = async (body: Partial<IEditUserType>) => {
  try {
    const response = await axiosWithConfig.put("/users/profile", body);
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
