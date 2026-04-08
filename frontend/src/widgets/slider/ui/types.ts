import type { TActionSlide } from "../types";




export type TSliderUIProps = {
  indexShowSlide: number;
  onSetIndexSlide: (index:number)=>void;
  onHandleChangeSlide: (action:TActionSlide) => void;
  indexesPag: number[];
  toggleIntervalSlide: (flag: boolean) => void;
};
