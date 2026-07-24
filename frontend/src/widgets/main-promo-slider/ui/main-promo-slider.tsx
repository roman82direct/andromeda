import styles from "./main-promo-slider.module.css";
import { memo } from "react";
import { SliderTrack } from "@/features/slider/";
import { Dots } from "../components/dots/dots";
import { Arrows } from "../components/arrows/arrows";
import {renderedSlides} from '../components/slide/render-slides';

export type MainPromoSliderUIProps = {
  isPagination?: boolean;
};

//  надо посмотреть как можно оптимизировать ?
export const MainPromoSliderComponentUI = ({
  isPagination,
}: MainPromoSliderUIProps) => {


  return (
    <div
      className={styles['main-promo-slider']}
    >
      <SliderTrack>{renderedSlides}</SliderTrack>
      <div className={styles["main-promo-slider-nav"]}>
        <Arrows />
        {isPagination && <Dots />}
      </div>
    </div>
  );
};

export const MainPromoSliderUI = memo(MainPromoSliderComponentUI);
MainPromoSliderUI.displayName = "MainPromoSliderUI";
