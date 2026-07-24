import { createContext } from "react";
import type { TypeOperationFlip } from "../types";
//  создать отдельную папку с контекстами!!!
//  связать состоянием слайдера в редюсере?

export type TBlockArrow = {
  isLeftArrow: boolean;
  isRightArrow: boolean;
};


export type TSliderStateContext = {
  slideNumber: number;
  dotsPag: number[];
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

// ==================== CONTEXTS ====================
export const SliderStateContext = createContext<TSliderStateContext | null>(
  null,
);

export const SliderActionsContext =
  createContext<TSliderActionsContenxt | null>(null);
// Контекст объявлен с широким типом - те можем хранить слайды люб типа
export const SlidesContext = createContext<TSlidesContext<unknown> | null>(
  null,
);
