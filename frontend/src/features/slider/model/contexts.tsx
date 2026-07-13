import { createContext } from "react";
import type { TypeOperationFlip , } from "../types";
//  создать отдельную папку с контекстами!!!
//  связать состоянием слайдера в редюсере?

export type TBlockArrow = {
  isLeftArrow: boolean;
  isRightArrow: boolean;
};

export type ThemeSlide = 'dark' | 'light'; //пока заглушка нужнали она здесь ?

export type TSliderStateContext = {
  slideNumber: number;
  dotsPag: number[];
  currentSlideTheme?: ThemeSlide;
  transitionEnabled: boolean;
  isAnimation: boolean;
  isBlockArrow: TBlockArrow;
};

export type TSliderActionsContenxt = {
  setIndexSlide: (index: number) => void;
  handleChangeSlide: (action: TypeOperationFlip) => void;
  handleTransitionEnd: () => void;
};
// Главный generic контекст для слайдов
export type TSlidesContext<T = unknown> = {
  // TSlideItemWithId   убрать тип
  slides: T[];
  quantityShowSlides?: number;
};

export const SliderStateContext = createContext<TSliderStateContext | null>(
  null,
);

export const SliderActionsContext =
  createContext<TSliderActionsContenxt | null>(null);

export const SlidesContext = createContext<TSlidesContext<unknown> | null>(null);


