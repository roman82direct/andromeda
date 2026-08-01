import { PromoSlideUI } from "./promo-slide.tsx";
import type { TPromoSlideItem } from "../../types";
import type { ReactNode } from "react";
import React from "react";



//  подумать как можно сделать универн вариант 
export const renderedSlides = (slides: TPromoSlideItem[]) => {
  return slides.map((slide, index) => {
    return <PromoSlideUI key={index} showingSlide={slide} />;
  });
};
// https://grok.com/c/6445df89-8ec1-4752-bcac-b5977b114cf3?rid=8e7b5676-bdb4-4189-923e-26419a8da271
//  думать 
//  должно подойти 
export const renderSlides = <T,>(
  slides: T[],
  renderUIComponentOfSlide: (slide: T) => ReactNode
) => {
  //  использовать для id библиотеку
  return slides.map((slide, index) => (
    <React.Fragment key={index}>
      {renderUIComponentOfSlide(slide)}
    </React.Fragment>
  ));
};
