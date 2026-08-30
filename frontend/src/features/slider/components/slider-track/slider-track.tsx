import styles from "./slider-track.module.css";
import React from "react";
import {
  useSliderStateContext,
  useSliderActionsContext,
  useGetSlidesContext,
} from "@/features/slider/hooks/useInitialContext";
import { useMemo, type ReactNode } from "react";
import clsx from "clsx";


//  абстрагировать - возможно слайдер может стать вертикальным в  будущем
export type SliderTrackProps<T> = {
  children:(slides:T[]) => ReactNode;
  layOutTrackStyles?: React.CSSProperties
}
export const  SliderTrack = <T,>({children,   layOutTrackStyles}: SliderTrackProps<T>) => {
  const { slideNumber, transitionEnabled } = useSliderStateContext();
  const { handleTransitionEnd } = useSliderActionsContext();
  // Хук → конкретизирует тип через generic <T>
  const { slides, quantityShowSlides } = useGetSlidesContext<T>(); // обязательно указать тип данных слайда

  const showSlides = quantityShowSlides ? quantityShowSlides : 1;
  const stylesTranslateDefault = useMemo(
    () => ({
      //  подумать ,вдруг перемещение слайдов станет вертикальным ?
      transform: `translateX(-${(slideNumber * 100) / showSlides}%)`,
      transition: transitionEnabled ? "transform 0.5s ease-in-out" : "none",
      "--show-quntity": quantityShowSlides,
      //  кастомзируем расположение слайдов
      ...  layOutTrackStyles
    }),
    [slideNumber, transitionEnabled, showSlides, quantityShowSlides,  layOutTrackStyles],
  ) as React.CSSProperties;
  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={clsx(styles["slides-list"], styles[`show-quntity`])}
      style={stylesTranslateDefault}
    >
      {children(slides)}
    </div>
  );
};
