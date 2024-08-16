"use server";

import { LIGHTNOVEL_API_ENDPOINT } from "@/common/enum/endpoint/lightnovel";
import { FETCH_POST } from "@/common/fetch/post";
import { serverActionResponse } from "@/common/response/action.response";
import { ResponseMessage } from "@/common/response/message.response";
import { lightnovelCreateSchema } from "@/schemas/zod/lightnovel/create-lightnovel.schema";

export const createLightnovel = async (
  values: string
): Promise<ServerActionResponse<LightnovelDetailData>> => {
  const validationValues = lightnovelCreateSchema.safeParse(JSON.parse(values));

  if (!validationValues.success) {
    return serverActionResponse({
      status: 400,
      message: ResponseMessage.DATA_INPUT_ERROR,
      data: null,
    });
  }

  return serverActionResponse<LightnovelDetailData>({
    apiResponse: await FETCH_POST<LightnovelDetailData>(
      LIGHTNOVEL_API_ENDPOINT.CREATE_LIGHTNOVEL_V1,
      validationValues.data,
      true,
      "no-cache"
    ),
  });
};
