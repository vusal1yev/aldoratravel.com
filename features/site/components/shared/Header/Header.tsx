"use client";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import logo_white from "@/features/site/assets/images/logo_white.png";
import { JsonDataType } from "@/features/site/locales";
import LanguageSwitcher from "@/features/site/components/shared/LanguageSwitcher/LanguageSwitcher";
import Sidebar from "@/features/site/components/shared/Sidebar/Sidebar";
import Image from "next/image";

const Header = ({ translate }: { translate: JsonDataType }) => {
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);

  return (
    <>
      <header className={styles.header}>
        {/* Logo */}
        <picture
          onClick={() => {
            alert("navigate home");
          }}
          className={styles.header__logo}
        >
          <Image width={150} height={150} src={logo_white} alt="Logo" />
        </picture>
        {/**/}

        <div className={styles.header__buttons}>
          {/* Language Switcher */}
          {!sidebarToggle && <LanguageSwitcher translate={translate} />}
          {/**/}

          {/* Hamburger Icon */}
          <button
            className={`${styles.hamburger} ${sidebarToggle && styles.active}`}
            onClick={() => setSidebarToggle((prev) => !prev)}
          >
            <div className={styles.icon}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          {/**/}
        </div>
      </header>

      <Sidebar
        translate={translate}
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
    </>
  );
};

export default Header;
