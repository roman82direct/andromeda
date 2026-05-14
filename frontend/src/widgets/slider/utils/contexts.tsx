import { createContext, type ReactNode} from "react";
import type { TSlideItemWithId, TActionSlide, ThemeSlide } from "../types";
// убрать лишние поля и возможно как то разделить контексты:
// type TSliderContext = {
//   slideNumber: number;
//   slides: TSlideItemWithId[];
//   dotsPag: number[];
//   setIndexSlide: (index: number) => void;
//   currentSlideTheme: ThemeSlide;
//   handleChangeSlide: (action: TActionSlide) => void;
//   transitionEnabled:boolean;
//   handleTransitionEnd:()=>void;
//   isAnimation: boolean;
// };

//  связать состоянием слайдера в редюсере?
export type TSliderStateContext = {
  slideNumber: number;
  dotsPag: number[];
  currentSlideTheme: ThemeSlide;
  transitionEnabled:boolean;
  isAnimation: boolean;
}

export type TSliderActionsContenxt = {
  setIndexSlide: (index: number) => void;
  handleChangeSlide: (action: TActionSlide) => void;
  handleTransitionEnd:()=>void;
}

export type TSlidesContext = {
  // TSlideItemWithId   убрать тип
  slides: TSlideItemWithId[];
  children: (slides: TSlideItemWithId[])=>ReactNode;
}


export const SliderStateContext = createContext<TSliderStateContext | null>(null)

export const SliderActionsContext = createContext<TSliderActionsContenxt | null>(null)

export const SlidesContext = createContext<TSlidesContext | null>(null)





// export const SliderContext = createContext<TSliderContext>({
//   slideNumber: 0,
//   slides: [],
//   dotsPag: [],
//   setIndexSlide: () => {},
//   // для пагинации если слайдчерный чтобы тема точек было белая допустим
//   currentSlideTheme: "light",
//   handleChangeSlide: () => {},
//   transitionEnabled:true,
//   handleTransitionEnd: ()=>{},
//   isAnimation: false
// });
