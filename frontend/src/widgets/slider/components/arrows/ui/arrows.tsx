import { IconButtonUI } from "@/shared/ui/icon-button";
import styles from "./arrows.module.css";
import type { TArrow } from "@/widgets/slider/types";
import type { TThemeElementsPage } from "@/shared/types/types";


type ArrowUIProps = {
  arrows: TArrow[];
  themeArrows: TThemeElementsPage;
  isDisabled?: boolean;
}

export const ArrowsUI = (
  {
    arrows,
    themeArrows,
    isDisabled

  }:ArrowUIProps) => {


  return (
        //  !!!выделить отдельно в UI - смотри с 45 принцип проектирования книги паттерны проектирования
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
