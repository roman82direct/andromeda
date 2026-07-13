import { useContext } from "react";
import {
  SliderStateContext,
  SliderActionsContext,
  SlidesContext,
  type TSlidesContext,
} from "../model/contexts";

// возможно объединить
export const useSliderStateContext = () => {
  const contextState = useContext(SliderStateContext);
  if (!contextState) {
    throw new Error("useSliderState must be used inside Provider");
  }
  return contextState;
};

export const useSliderActionsContext = () => {
  const contextActions = useContext(SliderActionsContext);
  if (!contextActions) {
    throw new Error("useSliderState must be used inside Provider");
  }
  return contextActions;
};

export const useGetSlidesContext = <T = unknown>() => {
  const contextSlides = useContext(SlidesContext) as TSlidesContext<T> | null;
  if (!contextSlides) {
    throw new Error("useGetSlidesContext must be used inside Provider");
  }
  return contextSlides;
};
