import React from "react";
import Image from "next/image";

// logo
import logo_white from "@/features/site/assets/images/logo_white.png";

// Styles
import styles from "./Footer.module.scss";
import { HEADER_NAVIGATION_CONSTANT } from "@/features/site/constants/shared.constant";
import Link from "next/link";
import { JsonDataType } from "@/features/site/locales";

const Footer = ({ translate }: { translate: JsonDataType }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Image src={logo_white} alt="logo" width={200} height={200} />
        <p>Copyright © Aldora 2025 All rights reserved</p>
      </div>

      <nav className={styles.navs}>
        <article className={styles.item}>
          <h3 className={styles.title}>Menu</h3>
          <ul className={styles.list}>
            {HEADER_NAVIGATION_CONSTANT.map((nav, index) => (
              <li key={`link_${index}`}>
                <Link className={styles.link} href={`/en#${nav.path}`}>
                  {translate?.shared?.navigate[index]}
                </Link>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.item}>
          <h3 className={styles.title}>Contact Info</h3>
          <ul className={styles.list}>
            <li>
              <span className={styles.link}>
                {translate.shared.contact.phone}
              </span>
            </li>
            <li>
              <span className={styles.link}>
                {translate.shared.contact.mail}
              </span>
            </li>
            <li>
              <span className={styles.link}>
                {translate.shared.contact.address}
              </span>
            </li>
          </ul>
        </article>

        <article className={styles.item}>
          <h3 className={styles.title}>Follow us on</h3>
          <ul className={styles.list}>
            <li>
              <Link href={`/`} className={styles.link}>
                Instagram
              </Link>
            </li>
            <li>
              <Link href={`/`} className={styles.link}>
                Tiktok
              </Link>
            </li>
            <li>
              <Link href={`/`} className={styles.link}>
                Youtube
              </Link>
            </li>
            <li>
              <Link href={`/`} className={styles.link}>
                Facebook
              </Link>
            </li>
            <li>
              <Link href={`/`} className={styles.link}>
                X
              </Link>
            </li>
          </ul>
        </article>
      </nav>
    </footer>
  );
};

export default Footer;
