import type { TActionSlide,  TSlideItemWithId } from "../types";




export type TSliderUIProps = {
  isFirstRender?: boolean;
  isAnimation?:boolean;
  isDeleteAnimation?:boolean;
  indexShowSlide: number;
  slides:  TSlideItemWithId[];
  onSetIndexSlide: (index:number)=>void;
  onHandleChangeSlide: (action:TActionSlide) => void;
  indexesPag: number[];
  toggleIntervalSlide?: (flag: boolean) => void;
};
