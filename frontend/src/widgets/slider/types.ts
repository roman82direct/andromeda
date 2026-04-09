import type { TActionUser } from "@/shared/types/types";
import type { TIconClassCssIcon } from "@/shared/types/ui/icon";


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

export type ThemeSlide = 'dark' | 'light';

export type TSlideItem = {
  image: TImage;
  title: string;
  desc?: string;
  pathsForActions: TActionUser[];
  typeTheme: ThemeSlide
};


export type TActionSlide = 'increment' | 'decrement';

export type TSlide ='prev' | 'current'| 'next';

export type TSlideItemWithId = {id?: string, typeSlide?: TSlide} & TSlideItem

export type TRenderSlides = {
  [k in TSlide]:TSlideItemWithId
}

export type  TArrow = {
    key:'right' | 'left';
    onClick: ()=>void;
    icon:TIconClassCssIcon;
  }

