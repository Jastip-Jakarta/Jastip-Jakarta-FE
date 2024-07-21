import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axios-with-config";
import { IRegion, RegionPayload } from "./types";

export const getRegions = async () => {
  try {
    const response = await axiosWithConfig.get("region");
    return response.data as Response<IRegion[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getRegion = async (code: string) => {
  try {
    const response = await axiosWithConfig.get(`/region/${code}`);
    return response.data as Response<IRegion>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
export const createRegion = async (body: RegionPayload) => {
  try {
    const response = await axiosWithConfig.post("admin/region", body);
    return response.data as Response<{}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
