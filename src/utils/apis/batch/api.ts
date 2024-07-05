import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axios-with-config";
import { IBatch } from "./types";

export const getBatch = async () => {
  try {
    const response = await axiosWithConfig.get("/batch");
    return response.data as Response<IBatch[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const createBatch = () => {};
