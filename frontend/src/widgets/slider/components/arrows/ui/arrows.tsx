import { IconButtonUI } from "@/shared/ui/icon-button";
import styles from "./arrows.module.css";
import type { TArrow } from "@/widgets/slider/types";
import type { TThemeElementsPage } from "@/shared/types/types";
import { memo } from "react";


type ArrowUIProps = {
  arrows: TArrow[];
  themeArrows: TThemeElementsPage;
  isDisabled?: boolean;
}

export const ArrowsUIComponent = (
  {
    arrows,
    themeArrows,
    isDisabled

  }:ArrowUIProps) => {


  return (
       
    <div className={styles["slider-arrows"]}>
      {arrows.map((arrow) => (
        <IconButtonUI
          key={arrow.key}
          onClick={arrow.onClick}
          iconClass={arrow.icon}
          isActive={false}
          colorIcon={themeArrows}
          sizeIcon={33}
          isDisabled = {isDisabled}
        />
      ))}
    </div>
  );
};


export const ArrowsUI = memo(ArrowsUIComponent);
ArrowsUI.displayName = 'ArrowsUI';