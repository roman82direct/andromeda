import { SlideUI } from "../slide/slide";
import styles from "./slides-list.module.css";
import type React from "react";
import { useContext } from "react";
import { SliderContext } from "@/widgets/slider/utils/contexts";

export const SlidesList = () => {
  //  получаем данные из контекста номер слайда для вычисления его положения
  //  относительно translateX и все слайды
  const { slides,indexesSlides,  animation } = useContext(SliderContext);

  // работает по принципу ленты
  const stylesTranslate = {
    // transform: `translateX(-${slideNumber * 100}%)`,
  } as React.CSSProperties;
  // console.log(indexesSlides)

  const classCurrent = animation ? 'current' : '';
  return (
    <div className={styles["slides-list"]} style={stylesTranslate}>
      {/* {slides.map((slide, index) => (
        //  как мемоизировать слайд????
        <SlideUI key={index} showingSlide={slide} />
      ))} */}
      {/* <SlideUI key={"indexesSlides.prev"} showingSlide={slides[indexesSlides.prev]} positionSlide={'prev'}/> */}
      <SlideUI key={"indexesSlides.current"} showingSlide={slides[indexesSlides.current]} positionSlide={classCurrent} />
      {/* <SlideUI key={"indexesSlides.next"} showingSlide={slides[indexesSlides.next]} positionSlide={'next'}/> */}
    </div>
  );
};
