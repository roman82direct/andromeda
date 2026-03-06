import type { TSlideItem } from "@/shared/types/ui/slider";

export type TSliderUIProps = {
  indexShowSlide: number;
  showingSlide: TSlideItem;
  onSetIndexSlide: (index: number) => void;
  onHandleChangeSlide: (value: "increment" | "decrement") => void;
  indexesPag: number[];
  toggleIntervalSlide:(flag: boolean)=>void;
};
