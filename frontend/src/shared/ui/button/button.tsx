import { type FC, type ReactNode } from "react";
import styles from "./button.module.css";
import clsx from "clsx";

type TButtonVariant = "filled" | "outlined" | "text";

type TButtonColor = "primary" | "secondary" | "subscribe";

type ButtonUIProps = {
  onClick: () => void;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  color: TButtonColor;
  fullSize?: boolean;
  isDisabled?: boolean;
  variant: TButtonVariant;
};

type classCssBtn = string;
// определяем 'cтруктуру кнопки'
const typesButton: Record<TButtonVariant, classCssBtn> = {
  filled: "button-filled",
  outlined: "button-outlined",
  text: "button-text",
};

//  задаем цвета кнопки

const colorsButton: Record<TButtonColor, classCssBtn> = {
  primary: "btn-color-primary",
  secondary: "btn-color-secondary",
  subscribe: "btn-form-subscribe",
};

export const ButtonUI: FC<ButtonUIProps> = ({
  onClick,
  children,
  type = "button",
  color,
  fullSize,
  isDisabled,
  variant,
}) => {
  const className = clsx(
    styles.button,
    styles[colorsButton[color]],
    styles[typesButton[variant]],
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
