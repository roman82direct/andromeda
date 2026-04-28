import { SlideUI } from "../slide/slide";
import styles from "./slides-list.module.css";
import type React from "react";
import { useContext } from "react";
import { SliderContext } from "@/widgets/slider/utils/contexts";

export const SlidesList = () => {
  //  создать ui комопонент с чилдрен - модель универсальной карусели ??
  const { slideNumber, slides,transitionEnabled, handleTransitionEnd } = useContext(SliderContext);
  const stylesTranslate = {
    transform: `translateX(-${slideNumber * 100}%)`,
    transition:  transitionEnabled ? 'transform 0.8s ease-in-out' : 'none'

  } as React.CSSProperties;

 

  return (
    <div 
        onTransitionEnd={handleTransitionEnd}
        className={styles["slides-list"]} 
        style={stylesTranslate}>
          {/* здесь просто children */}
      {slides.map((slide, index) => {
        return <SlideUI key={index} showingSlide={ slide} />
})}
    </div>
  );
};
