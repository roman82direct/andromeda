import type { TActionUser } from "@/shared/types/types";
import type { TIconClassCssIcon } from "@/shared/types/ui/icon";
import type { ReactNode } from "react";

type TImageSrc = string;

//   вывести в общий тип
export type TPathsImage = {
  "1x": TImageSrc;
  "2x": TImageSrc;
};
//   вывести в общий тип
export type TImage = {
  avif: TPathsImage;
  webp: TPathsImage;
  jpg: TPathsImage;
};

export type ThemeSlide = "dark" | "light";

export type TSlideItem = {
  image: TImage;
  title: string;
  desc?: string;
  pathsForActions: TActionUser[];
  typeTheme: ThemeSlide;
};

export type TActionSlide = "increment" | "decrement";

export type TSlide = "prev" | "current" | "next";

export type TRenderSlides = {
  [k in TSlide]:  TSlideItem;
};

export type TRenderIndexesSlides = {
  [k in TSlide]: number
}

export type TArrow = {
  key: "right" | "left";
  onClick: () => void;
  icon: TIconClassCssIcon;
};



type slide = TSlideItem


//   общие параметры слайдера 
//  переделать слайдер под след настройки
//  и выделать в типы слайдера
export type TConfigSliderProps = {
  // infiniteLoop: boolean;
  // showSlides: number;
  isPagination?: boolean;
  autoPlay?: boolean;
  autoPlayTime?: number;
  // typeSlider?:'' --> попробуй масштабировать
  children: (slides:TSlideItem[]) => ReactNode;  // Явное определение функции
  pagePaginationSize?:number;
  // width
  // height
}
//  выделить в типы хука или слайдера
export type TConfigChangeSlide =  Pick<TConfigSliderProps, 'autoPlay' | 'autoPlayTime' | 'pagePaginationSize'>;



// TSlideItemWithId   убрать везде !!!
