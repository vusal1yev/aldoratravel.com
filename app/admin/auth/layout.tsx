import React from "react";
import { checkRequest } from "@/services/privetRoute.service";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await checkRequest(false);
  return children;
};

export default Layout;
