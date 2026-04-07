import type { TActionSlide, TSlideItemWithId } from "../types";




export type TSliderUIProps = {
  isFirstRender?: boolean;
  isAnimation?:boolean;
  isDeleteAnimation?:boolean;
  indexShowSlide: number;
  showingSlide: TSlideItemWithId;
  prevSlide: TSlideItemWithId;
  nextSlide:  TSlideItemWithId;
  onSetIndexSlide: (index:number)=>void;
  onHandleChangeSlide: (action:TActionSlide) => void;
  indexesPag: number[];
  toggleIntervalSlide: (flag: boolean) => void;
};
