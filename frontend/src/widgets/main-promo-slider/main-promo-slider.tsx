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
  autoPlay = true,
  autoPlayTime = 3000,
  // typeSlider?:'' --> попробуй масштабировать
  pagePaginationSize = 3,
}:  SliderCommonSettings) => {

  // убрать отдельно
    const renderSliderUI = useCallback(
  ({isPagination,settingAutoPlay}: MainPromoSliderUIProps) => {
   return ( <MainPromoSliderUI 
      isPagination={isPagination}
      settingAutoPlay={settingAutoPlay}
    />)
   },
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
