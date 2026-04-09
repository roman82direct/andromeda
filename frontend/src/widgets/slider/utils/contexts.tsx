import { createContext } from "react";
import type { TSlideItemWithId,TActionSlide, ThemeSlide } from "../types";

type TSliderContext = {
  slideNumber:number,
  slides:TSlideItemWithId[],
  dotsPag: number[],
  setIndexSlide:(index:number)=>void;
  currentSlideTheme: ThemeSlide;
  handleChangeSlide: (action:TActionSlide)=>void;
}

export const SliderContext = createContext<TSliderContext>(
  {  
    slideNumber: 0,
    slides:[],
    dotsPag:[],
    setIndexSlide: ()=>{},
    // для пагинации если слайдчерный чтобы тема точек было белая допустим
    currentSlideTheme:'light',
    handleChangeSlide: ()=>{}
  }
);
