import styles from "./slider-track.module.css";
import type React from "react";
import {
  useSliderStateContext,
  useSliderActionsContext,
  useGetSlidesContext,
} from "@/features/slider/hooks/useInitialContext";
import { useMemo, type ReactNode } from "react";
import clsx from "clsx";

export type SliderTrackProps<T> = {
  children:(slides:T[]) => ReactNode;
}
export const  SliderTrack = <T,>({children}: SliderTrackProps<T>) => {
  const { slideNumber, transitionEnabled } = useSliderStateContext();
  const { handleTransitionEnd } = useSliderActionsContext();
  // Хук → конкретизирует тип через generic <T>
  const { slides, quantityShowSlides } = useGetSlidesContext<T>(); // обязательно указать тип данных слайда

  const showSlides = quantityShowSlides ? quantityShowSlides : 1;
  const stylesTranslate = useMemo(
    () => ({
      transform: `translateX(-${(slideNumber * 100) / showSlides}%)`,
      transition: transitionEnabled ? "transform 0.5s ease-in-out" : "none",
      "--show-quntity": quantityShowSlides,
    }),
    [slideNumber, transitionEnabled, showSlides, quantityShowSlides],
  ) as React.CSSProperties;
  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={clsx(styles["slides-list"], styles[`show-quntity`])}
      style={stylesTranslate}
    >
      {children(slides)}
    </div>
  );
};
