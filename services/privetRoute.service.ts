import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const checkRequest = async (requiresSecurity: boolean) => {
  const cookieStore = await cookies();
  const token = cookieStore?.get("tokenAldora")?.value;

  const { data, status } = await axios
    .get(`${process.env.NEXT_PUBLIC_ADMIN_API_DOMAIN}/Auth/check`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response ? err.response : { data: "", status: 999 };
    });

  console.log(data);
  console.log(status);

  if (status !== 200 && requiresSecurity) {
    redirect("/admin/auth/login");
  } else if (status === 200 && !requiresSecurity) {
    redirect(`/admin/home`);
  }

  return data;
};
