"use client";
import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({
  title,
  subtitle,
  modalClose,
  children,
}: {
  title?: string;
  subtitle?: string;
  modalClose: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div className={styles.modal}>
      <div onClick={modalClose} className={styles.modal__outer}></div>
      <div className={styles.modal__inner}>
        <div className={styles.head}>
          {title && <p className={styles.title}>{title}</p>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <>{children}</>
      </div>
    </div>
  );
};

export default Modal;
