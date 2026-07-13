import { SlideUI } from "../components/slide/slide";
import type { TPromoSlideItem } from "../types";

export const renderedSlides = (slides: TPromoSlideItem[]) => {
  return slides.map((slide, index) => {
    return <SlideUI key={index} showingSlide={slide} />;
  });
};
