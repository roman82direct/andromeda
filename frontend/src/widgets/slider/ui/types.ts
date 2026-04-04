import type { TSlideItem } from "@/shared/types/ui/slider";

export type TIndexesSlides = {
  prev: null | number;
  current:number
}


export type TSliderUIProps = {
  isAnimation?:boolean;
  isDeleteAnimation?:boolean;
  // передаем для пагинации
  indexShowSlide: number;
  showingSlide: TSlideItem;
  prevSlide: TSlideItem;
  // onSetIndexesSlides: (indexes:TIndexesSlides) => void;
  onSetIndexesSlides: React.Dispatch<React.SetStateAction<TIndexesSlides>>;
  onHandleChangeSlide: (value: "increment" | "decrement") => void;
  indexesPag: number[];
  toggleIntervalSlide: (flag: boolean) => void;
};
