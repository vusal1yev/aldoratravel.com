import React from "react";
import DashboardLayout from "@/features/admin/components/layout/DashboardLayout";
import { checkRequest } from "@/services/privetRoute.service";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await checkRequest(true);
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
