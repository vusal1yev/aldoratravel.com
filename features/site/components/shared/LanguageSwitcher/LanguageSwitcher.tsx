"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LanguageIcon } from "@/features/site/assets/icons/shared.vectore";
import { JsonDataType } from "@/features/site/locales";
import { LANGUAGE_SELECTION_CONSTANT } from "@/features/site/constants/language.constant";
import useClickOutside from "@/hooks/useClickOutside";
import styles from "./LanguageSwitcher.module.scss";

const LanguageSwitcher = ({ translate }: { translate: JsonDataType }) => {
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(boxRef, () => setOpen(false));

  return (
    <div
      className={styles.header__language}
      style={{ position: "relative" }}
      ref={boxRef}
    >
      <div
        className={styles.header__language__button}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <LanguageIcon />
      </div>

      {open && (
        <div className={`${styles.modal__content} ${styles.active}`}>
          {LANGUAGE_SELECTION_CONSTANT.map((lang, index) => {
            if (String(params.lang) !== lang.path) {
              return (
                <Link
                  key={`language_item_${index}`}
                  href={`/${lang.path}`}
                  className={`${styles.button} ${styles.button__transparent}`}
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
      )}
    </div>
  );
};

export default LanguageSwitcher;
