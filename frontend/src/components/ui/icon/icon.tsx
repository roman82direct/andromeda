import type { CSSProperties, FC } from "react";
import styles from "./icon.module.css";
import clsx from "clsx";
import { CounterUI } from "../counter";

//  работа со сложными иконками
export type IconClassCssIcon =
  | "close"
  | "come-in"
  | "search"
  | "global"
  | "read"
  | "info"
  | "clock"
  | "location"
  | "cart"
  | "heart"
  | "full-heart"
  | "profile"
  | "home"
  | "youtube"
  | "facebook"
  | "visa"
  | "instagram"
  | "mastercard";

//  возможно добавить кастомное изменение цвета иконки + псевдоклассы
export type IconUIProps = {
  iconClass: IconClassCssIcon;
  sizeIcon?: number;
  turnIcon?: number;
  interactiveMode?: boolean;
  isDisabledState?: boolean;
  counterQuantity?: number;
};

export const IconUI: FC<IconUIProps> = ({
  iconClass,
  sizeIcon = 20,
  turnIcon = 1,
  interactiveMode,
  isDisabledState,
  counterQuantity
}) => {
  const className = clsx(
    styles.icon,
    styles[iconClass],
    interactiveMode ? styles["icon-interactive"] : "",
    isDisabledState ? styles["icon-interactive-disabled"] : "",
  );
  const iconStyle = {
    "--size-icon": sizeIcon,
    "--turn": turnIcon,
  } as CSSProperties;
  return (
    <div className={styles['icon-container']}>
      <div style={iconStyle} className={className} aria-hidden={true}>
      </div>
      {counterQuantity && counterQuantity > 0 && (
          <div className={styles['counter-container']}>
            <CounterUI counterQuantity={counterQuantity} />
          </div>
           
          )}
    </div>
  );
};
