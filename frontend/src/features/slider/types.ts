import type { TIconClassCssIcon } from "@/shared/types/ui/icon";
import type { ReactNode } from "react";

//  тип  операции со слайдом
export type TypeOperationFlip = "increment" | "decrement";

export const SliderActionTypes = {
  changeSlide: "CHANGE_SLIDE",
  transitionEnd: "TRANSITION_END",
  setIndex: "SET_INDEX",
  setPreparedSlides: "SET_PREPARED_SLIDES",
  toggleAutoPlay: "TOGGLE_AUTOPLAY",
} as const;
// опишем действия слайда
export type TSliderAction<T> =
  | {
      type: typeof SliderActionTypes.changeSlide;
      payload: TypeOperationFlip;
    }
  | {
      type: typeof SliderActionTypes.transitionEnd;
      payload: boolean;
    }
  | {
      type: typeof SliderActionTypes.setIndex;
      payload: number;
    }
  | {
      type: typeof SliderActionTypes.setPreparedSlides;
      payload: T[];
    }
  | {
      type: typeof SliderActionTypes.toggleAutoPlay;
      payload: boolean;
    };

export type TArrow = {
  key: "right" | "left";
  onClick: () => void;
  icon: TIconClassCssIcon;
};

// type slide = TSlideItem

//   общие параметры слайдера
//  переделать слайдер под след настройки
//  и выделать в типы слайдера

// export type ThemeSlide = "dark" | "light"; //пока заглушка нужнали она здесь ?

// //  перенести в main-promo-slider
// export type BasedSlide = {
//   typeTheme?: ThemeSlide;
// }

export type Callback = ()=>void;

export type TSettingAutoplay = {runAutoPlay: Callback,stopAutoPlay: Callback };

export type TArgsRenderMainPromoSliderUI = {
  isPagination?: boolean;
  // settingAutoPlay: TSettingAutoplay
}


export type RenderSliderUIFunc = ({
  isPagination}:TArgsRenderMainPromoSliderUI)=> ReactNode;


export type SliderCommonSettings = {
  infiniteLoop?: boolean;
  quantityShowSlides?: number;
  isPagination?: boolean;
  autoPlay?: boolean;
  autoPlayTime?: number;
  pagePaginationSize?: number;
};


export type TSliderProps<T> = 
  SliderCommonSettings & {
  slides: T[],
  children: RenderSliderUIFunc;
};

// возможно пробить тип дженерика дальше ?
//  выделить в типы хука или слайдера
export type ChangeSlideSettings = Pick<
  SliderCommonSettings,
  "autoPlay" | "autoPlayTime" | "pagePaginationSize" | "infiniteLoop"
>;
//  для хука автоплея слайдов
export type AutoPlaySetting = Pick<
  SliderCommonSettings,
  "autoPlay" | "infiniteLoop" | "autoPlayTime"
> & {
  goNextSlide: ()=>void;
  goPrevSlide: ()=>void;
  indexSlide: number;
  slidesArrLength: number;
  isAutoPlayState?: boolean;
};
