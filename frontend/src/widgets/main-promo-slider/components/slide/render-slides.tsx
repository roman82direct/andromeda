import { PromoSlideUI } from "./promo-slide.tsx";
import type { TPromoSlideItem } from "../../types";

export const renderedSlides = (slides: TPromoSlideItem[]) => {
  return slides.map((slide, index) => {
    return <PromoSlideUI key={index} showingSlide={slide} />;
  });
};
