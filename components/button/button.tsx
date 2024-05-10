import { MouseEventHandler } from "react";
import styles from "./button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outlined" | "custom";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  children,
  variant = "primary",
  size = "lg",
  className = "",
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        disabled ? styles.disabled : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
