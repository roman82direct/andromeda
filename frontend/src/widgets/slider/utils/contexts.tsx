import { createContext } from "react";
import type { TSlideItemWithId, TActionSlide, ThemeSlide, TRenderIndexesSlides } from "../types";
// убрать лишние поля и возможно как то разделить контексты:
type TSliderContext = {
  slideNumber: number;
  slides: TSlideItemWithId[];
  dotsPag: number[];
  setIndexSlide: (index: number) => void;
  currentSlideTheme: ThemeSlide;
  handleChangeSlide: (action: TActionSlide) => void;
  indexesSlides:TRenderIndexesSlides;
  animation: boolean;
};

export const SliderContext = createContext<TSliderContext>({
  slideNumber: 0,
  slides: [],
  dotsPag: [],
  setIndexSlide: () => {},
  // для пагинации если слайдчерный чтобы тема точек было белая допустим
  currentSlideTheme: "light",
  handleChangeSlide: () => {},
  indexesSlides: {
    prev:0,
    current:1,
    next:2,
    
  },
  animation: true
});
