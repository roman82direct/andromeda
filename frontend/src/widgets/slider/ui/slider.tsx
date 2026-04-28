import styles from "./slider.module.css";
import { memo } from "react";
import { SlidesList } from "../components/slides-list/slides-list";
import { Dots } from "../components/dots/dots";
import { Arrows } from "../components/arrows/arrows";

export type TSliderUIProps = {
  toggleIntervalSlide?: (flag: boolean) => void;
};

export const SliderComponentUI = ({ toggleIntervalSlide }: TSliderUIProps) => {
  return (
    <div
      className={styles.slider}
      onMouseEnter={toggleIntervalSlide ? () => toggleIntervalSlide(false) : ()=>{}}
      onMouseLeave={toggleIntervalSlide ? () => toggleIntervalSlide(true) : ()=>{}}
    >
      <SlidesList />
      <div className={styles["slider-nav"]}>
        <Arrows />
        <Dots />
      </div>
    </div>
  );
};

export const SliderUI = memo(SliderComponentUI);
SliderUI.displayName = "SliderUI";
