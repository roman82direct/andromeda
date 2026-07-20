import styles from "./main-promo-slider.module.css";
import { memo, useCallback } from "react";
import { SlidesList } from "@/features/slider/";
import { Dots } from "../components/dots/dots";
import { Arrows } from "../components/arrows/arrows";
import {renderedSlides} from '../utils/renderSlides';
import type { TSettingAutoplay } from "@/features/slider/types";

export type MainPromoSliderUIProps = {
  settingAutoPlay?: TSettingAutoplay
  isPagination?: boolean;
};

//  надо посмотреть как можно оптимизировать ?
export const MainPromoSliderComponentUI = ({
  settingAutoPlay,
  isPagination,
}: MainPromoSliderUIProps) => {
  // передать сюдя функции веместо объекта чтобы избежать лишней мемоизации
  const handlerOn = useCallback(()=>{
    settingAutoPlay?.runAutoPlay()
   
  },[settingAutoPlay])

   const handlerOff =  useCallback(()=>{
    settingAutoPlay?.stopAutoPlay()
  },[settingAutoPlay])
  return (
    <div
      className={styles.slider}
      // нужно сделать аналог на тач скринах+ перелистиывание слайдов рукой
      onMouseEnter={handlerOn}
      onMouseLeave={handlerOff}
    >
      <SlidesList>{renderedSlides}</SlidesList>
      <div className={styles["slider-nav"]}>
        <Arrows />
        {isPagination && <Dots />}
      </div>
    </div>
  );
};

export const MainPromoSliderUI = memo(MainPromoSliderComponentUI);
MainPromoSliderUI.displayName = "MainPromoSliderUI";
