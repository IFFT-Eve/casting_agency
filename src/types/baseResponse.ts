export type BaseResponse<T> = {
  data: T;
  success: boolean;
};

export type BaseUpdate = {
  update_count: number;
  success: boolean;
};

export type BaseDelete = {
  delete_count: number;
  success: boolean;
};

export type BaseError = {
  [key: string]: string;
};
