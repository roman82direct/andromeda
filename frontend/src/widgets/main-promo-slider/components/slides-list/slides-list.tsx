import styles from "./slides-list.module.css";
import type React from "react";
import { renderedSlides } from "@/widgets/main-promo-slider/utils/renderSlides";

// import { useContext } from "react";
// import { SliderContext } from "@/widgets/slider/utils/contexts";
import {
  useSliderStateContext,
  useSliderActionsContext,
  useGetSlidesContext,
} from "../../hooks/useInitialContext";
import { useMemo } from "react";
import clsx from "clsx";

export const SlidesList = () => {
  //  создать ui комопонент с чилдрен - модель универсальной карусели ??
  const { slideNumber, transitionEnabled } = useSliderStateContext();
  const { handleTransitionEnd } = useSliderActionsContext();
  const { slides, quantityShowSlides } = useGetSlidesContext();

  const showSlides = quantityShowSlides ? quantityShowSlides : 1;
  const stylesTranslate = useMemo(
    () => ({
      transform: `translateX(-${(slideNumber * 100) / showSlides}%)`,
      transition: transitionEnabled ? "transform 0.5s ease-in-out" : "none",
      "--show-quntity": quantityShowSlides,
    }),
    [slideNumber, transitionEnabled, showSlides, quantityShowSlides],
  ) as React.CSSProperties;
  //  сделать чилдрен функцию!!!!
  //   const renderedSlides = useMemo(()=>{
  //     return slides.map((slide, index) => {
  //         return <SlideUI key={index} showingSlide={slide} />
  // })
  //   },[slides])

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={clsx(styles["slides-list"], styles[`show-quntity`])}
      style={stylesTranslate}
    >
      {/* здесь просто children */}
      {/* {renderedSlides} */}
      {/*  вставить сюда вместо чилдрен исходную функцию рендера */}
      {renderedSlides(slides)}
    </div>
  );
};
