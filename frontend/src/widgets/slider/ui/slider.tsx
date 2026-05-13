import styles from "./slider.module.css";
import { memo } from "react";
import { SlidesList } from "../components/slides-list/slides-list";
import { Dots } from "../components/dots/dots";
import { Arrows } from "../components/arrows/arrows";

export type TSliderUIProps = {
  toggleAutoPlayChangeSlide?: (flag: boolean) => void;
};

export const SliderComponentUI = ({ toggleAutoPlayChangeSlide }: TSliderUIProps) => {

  const handleToggleAutoPlayChangeSlide = (flag:boolean)=>{
    return toggleAutoPlayChangeSlide ? () => toggleAutoPlayChangeSlide(flag) : ()=>{}
  }

  return (
    <div
      className={styles.slider}
      // нужно сделать аналог на тач скринах
      onMouseEnter={handleToggleAutoPlayChangeSlide(true)}
      onMouseLeave={handleToggleAutoPlayChangeSlide(false)}
    >
      <SlidesList />
      <div className={styles["slider-nav"]}>
        <Arrows />
        <Dots />
      </div>
    </div>
  );
};

export const  SliderUI = memo(SliderComponentUI);
SliderUI.displayName = "SliderUI";
