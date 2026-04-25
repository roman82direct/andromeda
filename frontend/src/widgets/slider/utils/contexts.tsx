import { createContext } from "react";
import type { TSlideItemWithId, TActionSlide, ThemeSlide } from "../types";
// убрать лишние поля и возможно как то разделить контексты:
type TSliderContext = {
  slideNumber: number;
  slides: TSlideItemWithId[];
  dotsPag: number[];
  setIndexSlide: (index: number) => void;
  currentSlideTheme: ThemeSlide;
  handleChangeSlide: (action: TActionSlide) => void;
  transitionEnabled:boolean;
  handleTransitionEnd:()=>void;
  isAnimating:boolean
};

export const SliderContext = createContext<TSliderContext>({
  slideNumber: 0,
  slides: [],
  dotsPag: [],
  setIndexSlide: () => {},
  // для пагинации если слайдчерный чтобы тема точек было белая допустим
  currentSlideTheme: "light",
  handleChangeSlide: () => {},
  transitionEnabled:true,
  handleTransitionEnd: ()=>{},
  isAnimating:false
});
