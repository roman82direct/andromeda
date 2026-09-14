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
  layOutTrackStyles?: React.CSSProperties;
  customStyles?: {
    gap?:number;
  }
}
export const  SliderTrack = <T,>(
  {
    children,   
    layOutTrackStyles,   
    customStyles
  }: SliderTrackProps<T>) => {
  const { slideNumber, transitionEnabled } = useSliderStateContext();
  const { handleTransitionEnd } = useSliderActionsContext();
  // Хук → конкретизирует тип через generic <T>
  const { slides, quantityShowSlides } = useGetSlidesContext<T>(); // обязательно указать тип данных слайда
  
  const gap = customStyles?.gap ?  customStyles?.gap : 0;
  const showSlides = quantityShowSlides ? quantityShowSlides : 1;
  const stylesTranslateDefault = useMemo(
    () => ({
      //  подумать ,вдруг перемещение слайдов станет вертикальным ?
      // вычтем все расстояние между элементами чтобы смещение было верным
      // slideNumber * gap
transform: `translateX(calc(
  -${(slideNumber * 100) / showSlides}%
  - ${slideNumber * gap }px
))`,
      transition: transitionEnabled ? "transform 0.35s ease-in-out" : "none",
      "--show-quntity": quantityShowSlides,
      //  кастомзируем расположение слайдов
      "--gapTrack": `${gap}px`,
      ...  layOutTrackStyles
    }),
    [
      slideNumber, 
      transitionEnabled, 
      showSlides, 
      quantityShowSlides,  
      layOutTrackStyles,
      // gapForTranslateMultiple,
      gap
    ],
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
