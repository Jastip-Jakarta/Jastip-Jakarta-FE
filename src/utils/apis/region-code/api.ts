import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axios-with-config";
import { IRegion } from "./types";

export const getRegions = async () => {
  try {
    const response = await axiosWithConfig.get("region");
    return response.data as Response<IRegion[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getRegion = async () => {};
export const createRegion = async () => {};
