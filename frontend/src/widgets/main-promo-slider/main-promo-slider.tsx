import { memo, useCallback, } from "react";
import { MainPromoSliderUI, type MainPromoSliderUIProps } from "./ui/main-promo-slider";
// import type { TPromoSlideItem } from "./types";
import type {
  SliderCommonSettings,
//  ChangeSlideSettings,
} from "@/features/slider/types";
// import { useChangeSlide } from "@/features/slider/hooks/useChangeSlide";
import { sliderStore } from "./model/sliderStore";
// import {
//   SliderStateContext,
//   SliderActionsContext,
//   SlidesContext,
// } from "@/features/slider/model/contexts";
import { Slider } from "@/features/slider";

// сделай пагинацию!!!!!!!!!как раб пагинация сучетом беск цикла
// с учетом бесконеч цикла
//  и стрелки и автоплей

export const MainPromoSliderComponent = ({
  infiniteLoop = true,
  quantityShowSlides = 1,
  isPagination,
  autoPlay = false,
  autoPlayTime = 3000,
  // typeSlider?:'' --> попробуй масштабировать
  pagePaginationSize = 3,
}:  SliderCommonSettings) => {
    const renderSliderUI = useCallback(
  ({isPagination,toggleAutoPlayChangeSlide}: MainPromoSliderUIProps) => (
    <MainPromoSliderUI 
      isPagination={isPagination}
      toggleAutoPlayChangeSlide={toggleAutoPlayChangeSlide}
    />
  ),
  []
);
  return (
        <Slider 
          infiniteLoop = {infiniteLoop}
          quantityShowSlides  = { quantityShowSlides }
          autoPlay = { autoPlay}
          autoPlayTime = {autoPlayTime}
          pagePaginationSize = {pagePaginationSize}
          slides ={sliderStore}
          isPagination = {isPagination}
          >{
           renderSliderUI
          
          }</Slider>
          
        
  );
};

export const MainPromoSlider = memo(MainPromoSliderComponent);
MainPromoSlider.displayName = "MainPromoSlider";
