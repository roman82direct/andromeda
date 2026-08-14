import styles from "./main-promo-slider.module.css";
import { memo } from "react";
import { SliderTrack, useGetSlidesContext, useSliderStateContext } from "@/features/slider/";
import { Dots } from "../components/dots/dots";
import { Arrows } from "../components/arrows/arrows";
import {renderedSlides} from '../components/slide/render-slides';
import type { TPromoSlideItem } from "../types";

export type MainPromoSliderUIProps = {
  isPagination?: boolean;
};

//  надо посмотреть как можно оптимизировать ?
export const MainPromoSliderComponentUI = <T extends TPromoSlideItem>({
  isPagination,
}: MainPromoSliderUIProps) => {
  //  опредлеим тему такещуго слайда для стрелок и точек пагинации
  const { slides } = useGetSlidesContext<T>();
  const { slideNumber } = useSliderStateContext();
  
  const currentSlideTheme = slides[slideNumber].typeTheme;
  return (
    <div
      className={styles['main-promo-slider']}
    >
      <SliderTrack>{renderedSlides}</SliderTrack>
      <div className={styles["main-promo-slider-nav"]}>
        <Arrows themeArrows={currentSlideTheme }/>
        {isPagination && <Dots themeDots={currentSlideTheme} />}
      </div>
    </div>
  );
};

export const MainPromoSliderUI = memo(MainPromoSliderComponentUI);
MainPromoSliderUI.displayName = "MainPromoSliderUI";
