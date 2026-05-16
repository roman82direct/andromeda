import styles from "./slider.module.css";
import { memo } from "react";
import { SlidesList } from "../components/slides-list/slides-list";
import { Dots } from "../components/dots/dots";
import { Arrows } from "../components/arrows/arrows";

export type TSliderUIProps = {
  toggleAutoPlayChangeSlide?: (flag: boolean) => void;
  isPagination?: boolean;
};

export const SliderComponentUI = (
  { 
    toggleAutoPlayChangeSlide,
    isPagination

  }: TSliderUIProps) => {

  const handleMouseEnter = () => toggleAutoPlayChangeSlide?.(true);
  const handleMouseLeave = () => toggleAutoPlayChangeSlide?.(false);

  return (
    <div
      className={styles.slider}
      // нужно сделать аналог на тач скринах
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SlidesList />
      <div className={styles["slider-nav"]}>
        <Arrows />
        {isPagination && <Dots />}
      </div>
    </div>
  );
};

export const  SliderUI = memo(SliderComponentUI);
SliderUI.displayName = "SliderUI";
