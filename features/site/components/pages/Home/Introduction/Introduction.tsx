import React from "react";

// Types
import { JsonDataType } from "@/features/site/locales";

// Components
import Image from "next/image";
import Header from "@/features/site/components/shared/Header/Header";

// Images
import introduction_background from "@/features/site/assets/images/introduction_background.jpg";

// Styles
import styles from "./Introduction.module.scss";

const Introduction = ({ translate }: { translate: JsonDataType }) => {
  return (
    <section id={"introduction"} className={styles.introduction}>
      <Header translate={translate} />

      <Image
        className={styles.introduction__image}
        src={introduction_background}
        alt="Introduction Backgorund"
      />

      <div className={styles.introduction__content}>
        <h1 className={styles.title}>{translate.introduction.title}</h1>
        <p className={styles.subtitle}>{translate.introduction.subtitle}</p>
      </div>

      <div className={styles.introduction__overlay}></div>
    </section>
  );
};

export default Introduction;
