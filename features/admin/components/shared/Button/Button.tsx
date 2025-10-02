import React, { ButtonHTMLAttributes, CSSProperties } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  isRed?: boolean;
  text: string;
  icon?: any;
  textStyle?: CSSProperties;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  isRed,
  text,
  textStyle,
  icon: Icon,
  ...props
}: ButtonProps) => {
  return (
    <button className={`${styles.button} ${isRed && styles.red}`} {...props}>
      {Icon && <Icon />}
      <span style={textStyle}>{text}</span>
    </button>
  );
};

export default Button;
