import axios from "axios";
import { getCookie } from "@/libs/cookie";

export const getAllDestinationsRequest = async (
  page: number,
  pageSize: number,
) => {
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_SITE_API_DOMAIN}/Destination?page=${page}&pageSize=${pageSize}`,
      {},
    )
    .catch((err) => {
      return err.response;
    });
};

export const getPopularDestinationsRequest = async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_SITE_API_DOMAIN}/Destination/popular`)
    .catch((err) => {
      return err.response;
    });
};

export const createDestinationRequest = async (data: FormData) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/Destination`, data, {
      headers: {
        Authorization: `Bearer ${getCookie("tokenAldora")}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
};

export const updateDestinationRequest = async (data: FormData, id: string) => {
  return await axios
    .put(
      `${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/Destination/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getCookie("tokenAldora")}`,
        },
      },
    )
    .catch((err) => {
      return err.response;
    });
};

export const deleteDestinationRequest = async (id: string) => {
  return await axios
    .delete(`${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/Destination/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie("tokenAldora")}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
};
