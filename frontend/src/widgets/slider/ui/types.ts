import type { TSlideItem } from "@/shared/types/ui/slider";

export type TSliderUIProps = {
  isShowSlide?:boolean;
  indexShowSlide: number;
  showingSlide: TSlideItem;
  onSetIndexSlide: (index: number) => void;
  onHandleChangeSlide: (value: "increment" | "decrement") => void;
  indexesPag: number[];
  toggleIntervalSlide: (flag: boolean) => void;
  isRender:boolean;
};
