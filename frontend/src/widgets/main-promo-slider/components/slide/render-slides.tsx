import { PromoSlideUI } from "./promo-slide.tsx";
import type { TPromoSlideItem } from "../../types";



//  подумать как можно сделать универн вариант 
export const renderedSlides = (slides: TPromoSlideItem[]) => {
  return slides.map((slide, index) => {
    return <PromoSlideUI key={index} showingSlide={slide} />;
  });
};
// https://grok.com/c/6445df89-8ec1-4752-bcac-b5977b114cf3?rid=8e7b5676-bdb4-4189-923e-26419a8da271
//  думать 
export const renderedAnySlides = <T,>(slides: T[], TagElement: React.ElementType ) => {
  return slides.map((slideData, index) => {
    return <TagElement key={index} {...slideData} />;
  });
};
