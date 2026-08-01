import { memo} from "react";
import type { SliderCommonSettings} from "@/features/slider";
import { sliderStore } from "./model/sliderStore";
import { Slider } from "@/features/slider";
import { renderMainPromoSliderUI } from "./ui/render-main-promo-slider-ui";



 const DEFAULT_SLIDER_SETTINGS: SliderCommonSettings = {
    infiniteLoop: true,
    quantityShowSlides: 1,
    isPagination: true,
    autoPlay: true,
    autoPlayTime: 3000,
    pagePaginationSize: 3,
  }

export const MainPromoSliderComponent = () => {

return (
        <Slider {...DEFAULT_SLIDER_SETTINGS} slides={sliderStore}>{
           renderMainPromoSliderUI
        }</Slider>
          
        
  );
};

export const MainPromoSlider = memo(MainPromoSliderComponent);
MainPromoSlider.displayName = "MainPromoSlider";
