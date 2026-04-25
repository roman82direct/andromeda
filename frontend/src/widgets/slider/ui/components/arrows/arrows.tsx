import { IconButtonUI } from "@/shared/ui/icon-button";
import { SliderContext } from "@/widgets/slider/utils/contexts";
import { useCallback, useContext } from "react";
import styles from "./arrows.module.css";
import type { TArrow } from "@/widgets/slider/types";

export const Arrows = () => {
  const { handleChangeSlide, currentSlideTheme,  isAnimating } = useContext(SliderContext);
  const themeArrows = currentSlideTheme === "light" ? "primary" : "secondary";
  const handleDecrementSlide = useCallback(() => {
    handleChangeSlide("decrement");
  }, [handleChangeSlide]);
  const handleIncrementSlide = useCallback(() => {
    handleChangeSlide("increment");
  }, [handleChangeSlide]);

  const arrows: TArrow[] = [
    {
      key: "right",
      onClick: handleDecrementSlide,
      icon: "arrow-right",
    },
    {
      key: "left",
      onClick: handleIncrementSlide,
      icon: "arrow-left",
    },
  ];
  console.log(isAnimating )
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
          isDisabled = {isAnimating}
        />
      ))}
    </div>
  );
};
