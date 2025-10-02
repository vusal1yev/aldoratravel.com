import axios from "axios";
import { getCookie } from "@/libs/cookie";

export const getAllToursRequest = async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/Travel`)
    .catch((err) => {
      return err.response;
    });
};

export const getPopularToursRequest = async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_SITE_API_DOMAIN}/Travel/popular`)
    .catch((err) => {
      return err.response;
    });
};

export const createTourRequest = async (data: FormData) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/Travel`, data, {
      headers: {
        Authorization: `Bearer ${getCookie("tokenAldora")}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
};

export const updateTourRequest = async (data: FormData, id: string) => {
  return await axios
    .put(
      `${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/admin/gallery/${id}`,
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

export const deleteTourRequest = async (id: string) => {
  return await axios
    .delete(`${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/admin/gallery/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie("tokenAldora")}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
};
