import type { TIconClassCssIcon } from "@/shared/types/ui/icon";

export type KeySlideItem = string;
export type TypeSlideValue = unknown;

export type TSlideItem<K extends KeySlideItem = KeySlideItem, T = TypeSlideValue> = {
 [key in K]:T
} | {
  [key in K]?:T
};
//  тип  операции со слайдом
export type TypeOperationFlip = "increment" | "decrement";

export const SliderActionTypes  = {
 changeSlide: 'CHANGE_SLIDE',
 transitionEnd: 'TRANSITION_END',
 setIndex: 'SET_INDEX',
 setPreparedSlides: 'SET_PREPARED_SLIDES',
 toggleAutoPlay: 'TOGGLE_AUTOPLAY'

} as const
// опишем действия слайда
export type TSliderAction<T> =
  | {
      type: typeof SliderActionTypes.changeSlide;
      payload: TypeOperationFlip;
    }
  | {
      type:  typeof SliderActionTypes.transitionEnd;
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
export type TConfigSliderProps = {
  infiniteLoop?: boolean;
  quantityShowSlides?: number;
  isPagination?: boolean;
  autoPlay?: boolean;
  autoPlayTime?: number;
  // typeAnimation или transform ?
  // typeSlider?:'' --> попробуй масштабировать
  pagePaginationSize?: number;
  // width
  // height
};
//  выделить в типы хука или слайдера
export type TConfigChangeSlide = Pick<
  TConfigSliderProps,
  "autoPlay" | "autoPlayTime" | "pagePaginationSize" | "infiniteLoop"
>;
//  для хука автоплея слайдов
export type TAutoPlaySetting<T> = Pick<
  TConfigSliderProps,
  "autoPlay" | "infiniteLoop" | "autoPlayTime"
> & {
  dispatch: (action: TSliderAction<T>) => void;
  indexSlide: number;
  slidesArrLength: number;
  isAutoPlayState?: boolean;
};


