import { createContext } from "react";
import type { TSlideItemWithId } from "../types";

type TSliderContext = {
  slideNumber:number,
  slides:TSlideItemWithId[]
}

export const SliderContext = createContext<TSliderContext>(
  {  
    slideNumber: 0,
    slides:[]
  }
);
