"use server";
import { LIGHTNOVEL_API_ENDPOINT } from "@/common/enum/endpoint/lightnovel";
import { FETCH_GET } from "@/common/fetch/get";

export const getCategories = async (): Promise<
  ApiResponse<Category[] | null>
> => {
  return await FETCH_GET<Category[]>(
    LIGHTNOVEL_API_ENDPOINT.CATEGORIES_V1,
    true,
    "default"
  );
};
