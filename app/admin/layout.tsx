import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "@/features/admin/assets/styles/global.scss";
import { ToastContainer } from "react-toastify";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADMIN",
  description: "ADMIN",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppinsFont.variable}`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
