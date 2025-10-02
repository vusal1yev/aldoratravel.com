import React from "react";

// Styles
import styles from "./SectionHead.module.scss";

const SectionHead = ({
  title,
  subtitle,
  changeSide,
}: {
  title: string;
  subtitle: string;
  changeSide: boolean;
}) => {
  return (
    <div className={`${styles.section__head} ${changeSide && styles.active}`}>
      <div className={styles.section__head__content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div></div>

      {/*<div className={styles.section__head__navigation}>*/}
      {/*  <div className={styles.item}>*/}
      {/*    <ArrowLeft />*/}
      {/*  </div>*/}
      {/*  <div className={styles.item}>*/}
      {/*    <ArrowRight />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default SectionHead;
