import { memo, useCallback, } from "react";
import { MainPromoSliderUI,  } from "./ui/main-promo-slider";
import type { SliderCommonSettings} from "@/features/slider";
import { sliderStore } from "./model/sliderStore";
import { Slider } from "@/features/slider";
import type { TArgsRenderMainPromoSliderUI } from "@/features/slider";





export const MainPromoSliderComponent = ({
  infiniteLoop = true,
  quantityShowSlides = 1,
  isPagination,
  autoPlay = true,
  autoPlayTime = 3000,
  pagePaginationSize = 3,
}:  SliderCommonSettings) => {

  // убрать отдельно
    const renderSliderUI = useCallback(
  ({isPagination}: TArgsRenderMainPromoSliderUI ) => {



   return ( <MainPromoSliderUI 
      isPagination={isPagination}
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
