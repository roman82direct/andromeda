import { SlideUI } from "../slide/slide";
import styles from "./slides-list.module.css";
import type React from "react";
import { useContext } from "react";
import { SliderContext } from "@/widgets/slider/utils/contexts";

export const SlidesList = () => {
  //  получаем данные из контекста номер слайда для вычисления его положения
  //  относительно translateX и все слайды
  const { slideNumber, slides,transitionEnabled, handleTransitionEnd } = useContext(SliderContext);
  console.log(slideNumber)
  // работает по принципу ленты
  // console.log(slides)
  const stylesTranslate = {
    transform: `translateX(-${slideNumber * 100}%)`,
    transition:  transitionEnabled ? 'transform 0.7s ease-in-out' : 'none'

  } as React.CSSProperties;

 

  return (
    <div 
        onTransitionEnd={handleTransitionEnd}
        className={styles["slides-list"]} 
        style={stylesTranslate}>
      {slides.map((slide, index) => {
        //  как мемоизировать слайд????
         
       
        return <SlideUI key={index} showingSlide={ slide} />
})}
    </div>
  );
};
