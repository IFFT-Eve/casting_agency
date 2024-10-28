import { BaseDelete, BaseResponse, BaseUpdate } from "../../types/baseResponse";
import { Actor } from "../../types";
import { axiosClient } from "../axiosClient";

export const getAllActors = async () => {
  return axiosClient.get<BaseResponse<Actor[]>>("actors").then((res) => {
    return {
      data: res.data.data,
      success: res.data.success,
    };
  });
};

export const getActor = async (id: number) => {
  return axiosClient.get<BaseResponse<Actor>>(`actors/${id}`).then((res) => {
    return {
      data: res.data.data,
      success: res.data.success,
    };
  });
};

export const createActor = async (body: Actor) => {
  return axiosClient
    .post<BaseResponse<BaseUpdate>>("create-actor", body)
    .then((res) => {
      return {
        update_count: res.data.data.update_count,
        success: res.data.success,
      };
    });
};

export const updateActor = async (body: Actor) => {
  return axiosClient
    .patch<BaseResponse<BaseUpdate>>("update-actor", body)
    .then((res) => {
      return {
        update_count: res.data.data.update_count,
        success: res.data.success,
      };
    });
};

export const deleteActor = async (id: number) => {
  return axiosClient
    .delete<BaseResponse<BaseDelete>>(`actors/${id}`)
    .then((res) => {
      return {
        delete_count: res.data.data.delete_count,
        success: res.data.success,
      };
    });
};
