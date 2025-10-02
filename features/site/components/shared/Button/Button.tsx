import React from "react";
import styles from "./Button.module.scss";

type content = {
  title?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ title, children, onClick }: content) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children ? (
        children
      ) : (
        <span className={styles.button__title}>{title}</span>
      )}
    </button>
  );
};

export default Button;
