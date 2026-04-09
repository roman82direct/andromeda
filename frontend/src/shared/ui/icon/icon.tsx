import { memo, type CSSProperties } from "react";
import styles from "./icon.module.css";
import clsx from "clsx";
import { CounterUI } from "../counter";
import { type TIconClassCssIcon } from "@/shared/types/ui/icon";

export type TColor = "secondary" | "primary";

const colorsMap: Record<TColor, string> = {
  // если что можно расширить на  hover и active
  //  primary:{hover:'', active:'', default:''}
  primary: "var(--color-primary, #15242a)",
  secondary: "var(--color-secondary, #f8f9fa)",
};

export type IconUIProps = {
  iconClass: TIconClassCssIcon;
  sizeIcon?: number;
  turnIcon?: number;
  interactiveMode?: boolean;
  isDisabledState?: boolean;
  counterQuantity?: number;
  inheritColor?: boolean;
  colorIcon: TColor;
};

export const IconUIComponent = ({
  iconClass,
  sizeIcon = 20,
  turnIcon = 1,
  interactiveMode = false,
  isDisabledState,
  counterQuantity,
  inheritColor,
  colorIcon = "primary",
}: IconUIProps) => {
  const className = clsx(
    styles.icon,
    styles[iconClass],
    !inheritColor && interactiveMode ? styles["icon-interactive"] : "",
    isDisabledState ? styles["icon-interactive-disabled"] : "",
    inheritColor && !interactiveMode ? styles["icon-current-color"] : "",
  );
  //
  const colorData = colorsMap[colorIcon ?? "secondary"];
  const iconStyle = {
    "--size-icon": `${sizeIcon}px`,
    "--turn": turnIcon,
    // "--current-color-icon": `${colorData}`,
    "--current-color-icon": colorData,
  } as CSSProperties;
  return (
    <div style={iconStyle} className={styles["icon-container"]}>
      <div className={className} aria-hidden={true}></div>
      {counterQuantity && counterQuantity > 0 && (
        <div className={styles["counter-container"]}>
          <CounterUI counterQuantity={counterQuantity} />
        </div>
      )}
    </div>
  );
};

export const IconUI = memo(IconUIComponent);

IconUI.displayName = "IconUI";
