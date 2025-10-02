import React from "react";
import styles from "./Sidebar.module.scss";
import { HEADER_NAVIGATION_CONSTANT } from "@/features/site/constants/shared.constant";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { JsonDataType } from "@/features/site/locales";
import { LANGUAGE_SELECTION_CONSTANT } from "@/features/site/constants/language.constant";
import { useBodyOverflow } from "@/hooks/useBodyOverflow";

const Sidebar = ({
  translate,
  sidebarToggle,
  setSidebarToggle,
}: {
  translate: JsonDataType;
  sidebarToggle: boolean;
  setSidebarToggle: any;
}) => {
  const pathname = usePathname();
  const params = useParams();

  useBodyOverflow(sidebarToggle);

  return (
    <aside className={`${styles.sidebar} ${sidebarToggle ? styles.open : ""}`}>
      <div className={styles.sidebar__content}>
        {HEADER_NAVIGATION_CONSTANT.map((nav, index) => {
          const segment =
            pathname.split("/")[2] || pathname.split("/")[1] || "";
          const isActive = segment === nav.path;

          return (
            <Link
              key={index}
              className={`${styles.link} ${isActive ? styles.active : ""}`}
              href={`/en#${nav.path}`}
              onClick={() => setSidebarToggle(false)}
            >
              {translate?.shared?.navigate[index]}
            </Link>
          );
        })}
      </div>

      <div className={styles.sidebar__footer}>
        <div className={styles.languages}>
          {LANGUAGE_SELECTION_CONSTANT.map((lang, index) => {
            if (String(params.lang) !== lang.path) {
              return (
                <Link
                  key={`language_item_${index}`}
                  href={`/${lang.path}`}
                  className={styles.language}
                >
                  <p className={styles.title}>
                    {
                      translate.shared.language[
                        lang.title as keyof typeof translate.shared.language
                      ]
                    }
                  </p>
                </Link>
              );
            }
            return null;
          })}
        </div>
        <div className={styles.contact}>
          <h3 className={styles.item}>{translate.shared.contact.phone}</h3>
          <h3 className={styles.item}>{translate.shared.contact.mail}</h3>
          <h3 className={styles.item}>{translate.shared.contact.address}</h3>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
