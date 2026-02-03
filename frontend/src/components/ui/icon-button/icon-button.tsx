import type { FC, ReactNode } from "react";
import styles from "./icon-button.module.css";
import { IconUI, type IconClassCssIcon } from "../icon/icon";

//  возможно добавить кастомное изменение цвета иконки + псевдоклассы
type IconButtonUIProps = {
  isActive: boolean;
  iconActiveClass?: IconClassCssIcon;
  iconClass: IconClassCssIcon;
  onClick?: () => void;
  label?: string;
  sizeIcon?: number;
  type?: "button" | "submit" | "reset";
  turnIcon?: number;
  isDisabled?: boolean;
  children?: ReactNode;
  colorIcon: "primary" | "secondary";
};

export const IconButtonUI: FC<IconButtonUIProps> = ({
  isActive = false,
  iconActiveClass,
  iconClass,
  onClick,
  label,
  sizeIcon = 20,
  type = "button",
  turnIcon = 1,
  isDisabled = false,
  children,
  colorIcon = "primary",
}) => {
  const currentIconClass =
    isActive && iconActiveClass ? iconActiveClass : iconClass;
  return (
    <button
      disabled={isDisabled}
      aria-label={label}
      className={styles.iconButton}
      type={type}
      onClick={onClick}
    >
      {children}
      <IconUI
        sizeIcon={sizeIcon}
        turnIcon={turnIcon}
        iconClass={currentIconClass}
        interactiveMode
        isDisabledState={isDisabled}
        colorIcon={colorIcon}
      />
    </button>
  );
};
