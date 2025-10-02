"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogoutIcon } from "@/features/admin/assets/icons/sidebar.vectors";
import { navigation } from "@/features/admin/constants/sidebar.constant";
import styles from "./Sidebar.module.scss";
import logo from "@/features/admin/assets/images/logo.png";
import { toast } from "react-toastify";
import { removeCookie } from "@/libs/cookie";
import Image from "next/image";

const Sidebar = () => {
  const router = useRouter();
  const path = usePathname();

  const logout = async () => {
    removeCookie("tokenAldora");
    toast.success("Hesabdan uğurla çıxıldı");
    router.push("/admin/auth/login");
  };

  return (
    <div className={styles.sidebar}>
      <Link className={styles.logo} href={`/admin/home`}>
        <Image src={logo} alt={"Logo"} />
      </Link>

      <div className={styles.navigation}>
        <div className={styles.navigation__list}>
          {navigation.map((nav, index) => (
            <Link key={`nav_item_${index}`} href={nav.path}>
              <div
                className={`${styles.icon} ${path === `${nav.path}` && styles.active}`}
              >
                <nav.icon />
                <p>{nav.name}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className={`${styles.navigation__list} ${styles.second}`}>
          <button className={`${styles.icon}`} onClick={logout}>
            <LogoutIcon />
            <p>Çıxış edin</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
