import {type FC, type ReactNode } from "react";
import styles from "./button.module.css";
import clsx from "clsx";

type ButtonUIProps = {
  onClick: () => void;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  color: "primary" | "secondary";
  fullSize?: boolean;
  isDisabled?: boolean;
};

export const ButtonUI: FC<ButtonUIProps> = ({
  onClick,
  children,
  type = "button",
  color,
  fullSize,
  isDisabled,
}) => {
  const className = clsx(
    styles.button,
    color === "primary" ? styles.btnColorPrimary : styles.btnColorSecondary,
    fullSize ? styles.fullWidthBtn : "",
  );
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
