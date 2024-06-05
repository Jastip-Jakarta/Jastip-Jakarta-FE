import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axios-with-config";
import { ILoginType, IRegisterType } from "./types";

export const Login = async (body: ILoginType) => {
  try {
    const response = await axiosWithConfig.post("/users/login", body);
    return response.data as Response<{
      nama: string;
      token: string;
    }>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const Register = async (body: IRegisterType) => {
  try {
    const response = await axiosWithConfig.post("/users/register", body);
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
