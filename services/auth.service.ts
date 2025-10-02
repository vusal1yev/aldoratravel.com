import axios from "axios";

export const loginRequest = async (dataRaw: string) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/Auth/signin`, dataRaw, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((err) => {
      return err.response;
    });
};
