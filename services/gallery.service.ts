import axios from "axios";
import { getCookie } from "@/libs/cookie";

export const getAllGalleryRequest = async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/Gallery/`)
    .catch((err) => {
      return err.response;
    });
};

export const getPopularGalleryRequest = async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_SITE_API_DOMAIN}/Gallery/popular`)
    .catch((err) => {
      return err.response;
    });
};

export const createGalleryRequest = async (data: FormData) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/Gallery/`, data, {
      headers: {
        Authorization: `Bearer ${getCookie("tokenAldora")}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
};

export const updateGalleryRequest = async (data: FormData, id: string) => {
  return await axios
    .put(`${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/Gallery/${id}`, data, {
      headers: {
        Authorization: `Bearer ${getCookie("tokenAldora")}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteGalleryRequest = async (id: string) => {
  return await axios
    .delete(`${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/Gallery/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie("tokenAldora")}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
};
