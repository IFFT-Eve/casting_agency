import { BaseDelete, BaseResponse, BaseUpdate } from "../../types/baseResponse";
import { Movie } from "../../types";
import { axiosClient } from "../axiosClient";

export const getAllMovies = async () => {
  return axiosClient.get<BaseResponse<Movie[]>>("movies").then((res) => {
    return {
      data: res.data.data,
      success: res.data.success,
    };
  });
};

export const getMovie = async (id: number) => {
  return axiosClient.get<BaseResponse<Movie>>(`movies/${id}`).then((res) => {
    return {
      data: res.data.data,
      success: res.data.success,
    };
  });
};

export const createMovie = async (body: Movie) => {
  return axiosClient
    .post<BaseResponse<BaseUpdate>>("create-movie", body)
    .then((res) => {
      return {
        update_count: res.data.data.update_count,
        success: res.data.success,
      };
    });
};

export const updateMovie = async (body: Movie) => {
  return axiosClient
    .patch<BaseResponse<BaseUpdate>>("update-movie", body)
    .then((res) => {
      return {
        update_count: res.data.data.update_count,
        success: res.data.success,
      };
    });
};

export const deleteMovie = async (id: number) => {
  return axiosClient
    .delete<BaseResponse<BaseDelete>>(`movies/${id}`)
    .then((res) => {
      return {
        delete_count: res.data.data.delete_count,
        success: res.data.success,
      };
    });
};
