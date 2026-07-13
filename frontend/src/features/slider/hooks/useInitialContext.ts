import { useContext } from "react";
import {
  SliderStateContext,
  SliderActionsContext,
  SlidesContext,
  type TSlidesContext,
} from "../model/contexts";
// ==================== HOOKS ====================
// возможно объединить
//  получаем все состояние слайдера
export const useSliderStateContext = () => {
  const contextState = useContext(SliderStateContext);
  if (!contextState) {
    throw new Error("useSliderState must be used inside Provider");
  }
  return contextState;
};
//  получаем экшены слайдера
export const useSliderActionsContext = () => {
  const contextActions = useContext(SliderActionsContext);
  if (!contextActions) {
    throw new Error("useSliderState must be used inside Provider");
  }
  return contextActions;
};
//  получаем сами слайды
//  сужаем тип слайдов нужно укаазать в дженерик какой тип слайда полчаем из контекста
//  с пом этого хука
export const useGetSlidesContext = <T = unknown>(): TSlidesContext<T> => {
  const contextSlides = useContext(SlidesContext) as TSlidesContext<T> | null;
  if (!contextSlides) {
    throw new Error("useGetSlidesContext must be used inside Provider");
  }
  return contextSlides;
};
