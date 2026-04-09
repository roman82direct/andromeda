import { createContext } from "react";
import type { TSlideItemWithId } from "../types";

type TSliderContext = {
  slideNumber:number,
  slides:TSlideItemWithId[],
  dotsPag: number[],
  setIndexSlide:(index:number)=>void;
}

export const SliderContext = createContext<TSliderContext>(
  {  
    slideNumber: 0,
    slides:[],
    dotsPag:[],
    setIndexSlide: ()=>{}
  }
);
