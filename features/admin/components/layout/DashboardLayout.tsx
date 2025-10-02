import Header from "@/features/admin/components/shared/Header/Header";
import Sidebar from "@/features/admin/components/shared/Sidebar/Sidebar";
import styles from "./DashboardLayout.module.scss";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={styles.dashboard__layout}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.inner}>
        <Header />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
