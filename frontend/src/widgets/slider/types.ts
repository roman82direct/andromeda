import type { TActionUser } from "@/shared/types/types";


type TImageSrc = string;

//   вывести в общий тип
export type TPathsImage = {
  "1x": TImageSrc;
  "2x": TImageSrc;
}
//   вывести в общий тип
export type TImage = {
  avif: TPathsImage;
  webp: TPathsImage;
  jpg: TPathsImage;
}

export type TSlideItem = {
  image: TImage;
  title: string;
  desc?: string;
  pathsForActions: TActionUser[];
  typeTheme:'dark' | 'light'
};


export type TActionSlide = 'increment' | 'decrement';

export type TSlide ='prev' | 'current'| 'next';

export type TSlideItemWithId = {id: string} & TSlideItem

export type TRenderSlides = {
  prev:  TSlideItemWithId,
  current:  TSlideItemWithId,
  next:  TSlideItemWithId
}

